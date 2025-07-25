// Services/AuthService.ts
import { AppDispatch } from '../Store';
import { loginStart, loginSuccess, loginFailure, logout } from '../Store/authSlice';
import { setUser, removeUser } from '../Store/userSlice';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role?: string;
  };
}

class AuthService {
  private baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  async login(credentials: LoginCredentials, dispatch: AppDispatch): Promise<void> {
    try {
      dispatch(loginStart());

      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data: AuthResponse = await response.json();

      // Update auth state
      dispatch(loginSuccess({
        token: data.token,
        refreshToken: data.refreshToken,
      }));

      // Update user profile
      dispatch(setUser(data.user));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }

  async register(credentials: RegisterCredentials, dispatch: AppDispatch): Promise<void> {
    try {
      dispatch(loginStart());

      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data: AuthResponse = await response.json();

      // Update auth state
      dispatch(loginSuccess({
        token: data.token,
        refreshToken: data.refreshToken,
      }));

      // Update user profile
      dispatch(setUser(data.user));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }

  async logout(dispatch: AppDispatch): Promise<void> {
    try {
      // Call logout endpoint if needed
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${this.baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state regardless of API call success
      dispatch(logout());
      dispatch(removeUser());
    }
  }

  async refreshToken(dispatch: AppDispatch): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      dispatch(loginSuccess({
        token: data.token,
        refreshToken: data.refreshToken || refreshToken,
      }));

      return data.token;
    } catch (error) {
      console.error('Token refresh error:', error);
      dispatch(logout());
      dispatch(removeUser());
      return null;
    }
  }

  async getCurrentUser(token: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseURL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get current user');
      }

      return await response.json();
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }
}

export default new AuthService();