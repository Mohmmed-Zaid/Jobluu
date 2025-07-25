// Hooks/useAuth.ts
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { useNavigate } from 'react-router-dom';
import AuthService, { LoginCredentials, RegisterCredentials } from '../Services/AuthService';
import { clearError } from '../Store/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { 
    isAuthenticated, 
    token, 
    isLoading, 
    error: authError 
  } = useAppSelector((state) => state.auth);
  
  const { 
    profile, 
    isProfileLoaded 
  } = useAppSelector((state) => state.user);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      await AuthService.login(credentials, dispatch);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      };
    }
  }, [dispatch]);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      await AuthService.register(credentials, dispatch);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      };
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      await AuthService.logout(dispatch);
      navigate('/');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Logout failed' 
      };
    }
  }, [dispatch, navigate]);

  const refreshToken = useCallback(async () => {
    try {
      const newToken = await AuthService.refreshToken(dispatch);
      return { success: !!newToken, token: newToken };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Token refresh failed' 
      };
    }
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    isAuthenticated,
    isLoading,
    authError,
    profile,
    isProfileLoaded,
    token,
    
    // Actions
    login,
    register,
    logout,
    refreshToken,
    clearAuthError,
  };
};