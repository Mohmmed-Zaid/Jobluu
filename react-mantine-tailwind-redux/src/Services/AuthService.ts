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
  confirmpassword: string;
  accountType: 'APPLICANT' | 'EMPLOYER';
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  user: {
    id: number;
    name: string;
    email: string;
    accountType: 'APPLICANT' | 'EMPLOYER';
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  message?: string;
}

export interface GoogleAuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    accountType: 'APPLICANT' | 'EMPLOYER';
    avatar?: string;
    googleId: string;
  };
}

declare global {
  interface Window {
    google: any;
    gapi: any;
    handleGoogleSignIn?: (response: any) => void;
  }
}

// Helper function to get environment variables safely
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // For Create React App
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue;
  }
  // For Vite
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return (import.meta.env as any)[key] || defaultValue;
  }
  // Fallback
  return defaultValue;
};

class AuthService {
  private baseURL = getEnvVar('REACT_APP_API_URL', 'http://localhost:8080/api');
  private googleClientId = '415838507936-96n91vkl063vie828l3vsrd3dpehql13.apps.googleusercontent.com';
  private googleInitialized = false;
  private initializationPromise: Promise<void> | null = null;
  private currentCallback: ((response: any) => void) | null = null;

  // Initialize Google Sign-In with disabled FedCM
  initializeGoogleAuth(): Promise<void> {
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    if (this.googleInitialized) {
      return Promise.resolve();
    }

    this.initializationPromise = new Promise((resolve, reject) => {
      // Remove any existing scripts first
      const existingScripts = document.querySelectorAll('script[src*="accounts.google.com"]');
      existingScripts.forEach(script => script.remove());

      // Load the Google Sign-In script
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setTimeout(() => {
          try {
            if (window.google && window.google.accounts && window.google.accounts.id) {
              // Initialize with FedCM disabled and other settings to avoid conflicts
              window.google.accounts.id.initialize({
                client_id: this.googleClientId,
                callback: this.handleGoogleResponse.bind(this),
                auto_select: false,
                cancel_on_tap_outside: true,
                use_fedcm_for_prompt: false, // Disable FedCM to avoid CORS issues
                itp_support: true,
              });

              // Set up global callback handler
              window.handleGoogleSignIn = this.handleGoogleResponse.bind(this);
              
              this.googleInitialized = true;
              console.log('Google Sign-In initialized successfully');
              resolve();
            } else {
              reject(new Error('Google Sign-In API not available'));
            }
          } catch (error) {
            console.error('Error initializing Google Auth:', error);
            reject(error);
          }
        }, 1000); // Increased delay to ensure full initialization
      };
      
      script.onerror = (error) => {
        console.error('Failed to load Google Sign-In script:', error);
        reject(new Error('Failed to load Google Sign-In script'));
      };
      
      document.head.appendChild(script);
    });

    return this.initializationPromise;
  }

  // Handle Google response
  private handleGoogleResponse(response: any) {
    console.log('Google Sign-In response received:', response);
    if (this.currentCallback) {
      this.currentCallback(response);
    }
  }

  // Prompt Google Sign-In using button rendering method
  promptGoogleSignIn(callback: (response: any) => void): void {
    if (!this.googleInitialized) {
      callback({ error: 'Google Sign-In not initialized' });
      return;
    }

    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
      callback({ error: 'Google Sign-In API not available' });
      return;
    }

    this.currentCallback = callback;

    try {
      // Create a temporary invisible button container
      const buttonContainer = document.createElement('div');
      buttonContainer.id = 'temp-google-signin-button';
      buttonContainer.style.position = 'fixed';
      buttonContainer.style.top = '-1000px';
      buttonContainer.style.left = '-1000px';
      buttonContainer.style.width = '200px';
      buttonContainer.style.height = '50px';
      buttonContainer.style.zIndex = '-1';
      document.body.appendChild(buttonContainer);

      // Render the Google Sign-In button
      window.google.accounts.id.renderButton(buttonContainer, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        shape: 'rectangular',
        text: 'signin_with',
        logo_alignment: 'left',
        width: 200,
        click_listener: () => {
          console.log('Google Sign-In button clicked programmatically');
        }
      });

      // Wait a moment for the button to render, then click it
      setTimeout(() => {
        const googleButton = buttonContainer.querySelector('[role="button"]') as HTMLElement;
        if (googleButton) {
          console.log('Clicking Google Sign-In button programmatically');
          googleButton.click();
        } else {
          console.error('Google Sign-In button not found');
          callback({ error: 'Failed to render Google Sign-In button' });
        }

        // Clean up the temporary button after a delay
        setTimeout(() => {
          if (document.body.contains(buttonContainer)) {
            document.body.removeChild(buttonContainer);
          }
        }, 5000);
      }, 500);

    } catch (error) {
      console.error('Error in promptGoogleSignIn:', error);
      callback({ error: 'Failed to initialize Google Sign-In' });
    }
  }

  // Alternative method: Create a visible Google button that user can click
  createGoogleSignInButton(containerId: string, callback: (response: any) => void): void {
    if (!this.googleInitialized) {
      console.error('Google Sign-In not initialized');
      return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.error('Container not found:', containerId);
      return;
    }

    this.currentCallback = callback;

    try {
      window.google.accounts.id.renderButton(container, {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        shape: 'rectangular',
        text: 'signup_with',
        logo_alignment: 'left',
        width: container.offsetWidth || 200,
      });
    } catch (error) {
      console.error('Error rendering Google button:', error);
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
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || 'Google sign-in failed');
      }

      const data: AuthResponse = await response.json();

      // Store token
      localStorage.setItem('token', data.token);
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      // Update auth state
      dispatch(loginSuccess({
        token: data.token,
        refreshToken: data.refreshToken || null,
      }));

      // Update user profile
      dispatch(setUser(data.user));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google sign-in failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }

  // Regular email/password login
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
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || 'Login failed');
      }

      const data: AuthResponse = await response.json();

      // Store token
      localStorage.setItem('token', data.token);
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      // Update auth state
      dispatch(loginSuccess({
        token: data.token,
        refreshToken: data.refreshToken || null,
      }));

      // Update user profile
      dispatch(setUser(data.user));

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(loginFailure(errorMessage));
      throw error;
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
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || 'Registration failed');
      }

      const data = await response.json();
      
      // Registration successful - clear loading state
      dispatch(loginSuccess({
        token: null,
        refreshToken: null,
      }));

      return data;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }

  // Reset Google initialization
  resetGoogleAuth(): void {
    this.googleInitialized = false;
    this.initializationPromise = null;
    this.currentCallback = null;
    
    // Remove existing scripts
    const existingScripts = document.querySelectorAll('script[src*="accounts.google.com"]');
    existingScripts.forEach(script => script.remove());
  }

  // Check if Google Auth is initialized
  isGoogleInitialized(): boolean {
    return this.googleInitialized;
  }

  // Logout user
  async logout(dispatch: AppDispatch): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${this.baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).catch(console.error);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      dispatch(logout());
      dispatch(removeUser());
      
      // Sign out from Google as well
      if (this.googleInitialized && window.google && window.google.accounts && window.google.accounts.id) {
        try {
          window.google.accounts.id.disableAutoSelect();
        } catch (error) {
          console.error('Error disabling Google auto-select:', error);
        }
      }
    }
  }

  // Refresh JWT token
  async refreshToken(dispatch: AppDispatch): Promise<string | null> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token available for refresh');
      }

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      
      localStorage.setItem('token', data.token);
      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }

      dispatch(loginSuccess({
        token: data.token,
        refreshToken: data.refreshToken,
      }));

      if (data.user) {
        dispatch(setUser(data.user));
      }

      return data.token;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout(dispatch);
      return null;
    }
  }

  // Validate current token
  async validateToken(dispatch: AppDispatch): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      const response = await fetch(`${this.baseURL}/auth/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      
      if (data.valid && data.user) {
        dispatch(setUser(data.user));
        return true;
      }

      return false;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  // Get current user
  async getCurrentUser(token?: string): Promise<any> {
    try {
      const authToken = token || localStorage.getItem('token');
      if (!authToken) {
        throw new Error('No authentication token');
      }

      const response = await fetch(`${this.baseURL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
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

  // Auto login
  async autoLogin(dispatch: AppDispatch): Promise<boolean> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return false;
      }

      const isValid = await this.validateToken(dispatch);
      if (isValid) {
        dispatch(loginSuccess({
          token,
          refreshToken: localStorage.getItem('refreshToken'),
        }));
        return true;
      }

      const newToken = await this.refreshToken(dispatch);
      return !!newToken;
    } catch (error) {
      console.error('Auto login error:', error);
      this.logout(dispatch);
      return false;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // Get auth headers for API calls
  getAuthHeaders(): Record<string, string> {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Decode JWT token
  decodeToken(token?: string): any {
    try {
      const targetToken = token || localStorage.getItem('token');
      if (!targetToken) return null;

      const payload = targetToken.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  }

  // Check if token is expired
  isTokenExpired(token?: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  // Request password reset
  async requestPasswordReset(email: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || 'Password reset request failed');
      }
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  }

  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || 'Password reset failed');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }
}

export default new AuthService();