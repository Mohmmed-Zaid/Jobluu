// Services/AuthService.ts
import { AppDispatch } from '../Store';
import { loginUser, loginStart, loginSuccess, loginFailure, logout, setUser } from '../Store/authSlice';
import { config } from '../config/config'; // Adjust path as needed

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  accountType: 'APPLICANT' | 'EMPLOYER';
}

class AuthService {
  // Fix: Use config file instead of process.env
  private baseURL = config.apiUrl;

  // Use the Redux thunk for login
  async login(credentials: LoginCredentials, dispatch: AppDispatch): Promise<void> {
    const result = await dispatch(loginUser(credentials));
    
    if (loginUser.rejected.match(result)) {
      throw new Error(result.payload as string);
    }
  }

  // Register new user
  async register(credentials: RegisterCredentials, dispatch: AppDispatch): Promise<void> {
    try {
      dispatch(loginStart());

      const response = await fetch(`${this.baseURL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Registration failed');
      }

      const data = await response.json();
      
      // Registration successful - clear loading state without logging in
      dispatch(loginSuccess({ token: '', refreshToken: null }));
      
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }

  // Google Sign-In
  async loginWithGoogle(
    credential: string, 
    accountType: 'APPLICANT' | 'EMPLOYER',
    dispatch: AppDispatch
  ): Promise<void> {
    try {
      dispatch(loginStart());

      const response = await fetch(`${this.baseURL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credential,
          accountType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.message || 'Google sign-in failed');
      }

      const data = await response.json();

      // Store tokens
      localStorage.setItem('token', data.token);
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      // Update Redux state
      dispatch(loginSuccess({
        token: data.token,
        refreshToken: data.refreshToken || null,
      }));
      dispatch(setUser(data.user));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google sign-in failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }

  // Logout user
  async logout(dispatch: AppDispatch): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Notify backend (optional)
        await fetch(`${this.baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).catch(console.error);
      }
    } finally {
      // Clear everything
      dispatch(logout());
    }
  }

  // Get auth headers for API calls
  getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    } : {
      'Content-Type': 'application/json',
    };
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Get current user from API
  async getCurrentUser(): Promise<any> {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to get current user');
    }

    return response.json();
  }

  // Generic API request method with auth headers
  async apiRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    // Handle token expiration
    if (response.status === 401) {
      // Token expired, redirect to login
      window.location.href = '/login';
    }
    
    return response;
  }
}

export default new AuthService();