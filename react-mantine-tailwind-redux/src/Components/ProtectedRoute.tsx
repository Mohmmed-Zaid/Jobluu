// Components/ProtectedRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../Store/hooks';
import { setProfileLoaded, removeUser } from '../Store/userSlice';
import { Loader, Center } from '@mantine/core';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireProfile?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/signup',
  requireProfile = true
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Check if authSlice exists and has the required properties
  const authState = useAppSelector((state) => state.auth || {});
  const { profile, isProfileLoaded } = useAppSelector((state) => state.user);

  // Extract auth properties with fallbacks
  const isAuthenticated = authState.isAuthenticated || false;
  const token = authState.token || localStorage.getItem('authToken');
  const isLoading = authState.isLoading || false;

  useEffect(() => {
    // Check localStorage directly
    const persistedState = localStorage.getItem('persist:root');
    console.log('=== PROTECTED ROUTE DEBUG ===');
    console.log('Raw localStorage:', persistedState);
    
    if (persistedState) {
      try {
        const parsed = JSON.parse(persistedState);
        console.log('Parsed persist data:', {
          auth: parsed.auth ? JSON.parse(parsed.auth) : null,
          user: parsed.user ? JSON.parse(parsed.user) : null
        });
      } catch (e) {
        console.log('Error parsing persist data:', e);
      }
    }

    console.log('Current Redux Auth State:', authState);
    console.log('Current Redux User State:', { profile, isProfileLoaded });
    console.log('Current route:', location.pathname);
    console.log('Token from localStorage:', localStorage.getItem('authToken'));
    
    // Add a small delay to ensure Redux persist has loaded
    const initTimeout = setTimeout(() => {
      console.log('Setting initialized to true');
      setIsInitialized(true);
    }, 500);

    return () => clearTimeout(initTimeout);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      console.log('Not initialized yet, waiting...');
      return;
    }

    console.log('=== AFTER INITIALIZATION ===');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('token:', token);
    console.log('profile:', profile);
    console.log('isLoading:', isLoading);

    // If we have a token but no authentication state, consider as authenticated
    const hasValidAuth = isAuthenticated || token;

    // If authenticated but profile not loaded, mark as loaded
    if (hasValidAuth && !isProfileLoaded && profile) {
      console.log('✅ Has auth, setting profile as loaded');
      dispatch(setProfileLoaded(true));
    }

    // If no token and no auth state, clear user data
    if (!token && !isAuthenticated && profile) {
      console.log('⚠️ No token and not authenticated - clearing user data');
      dispatch(removeUser());
      localStorage.removeItem('authToken');
    }
  }, [token, isAuthenticated, isProfileLoaded, profile, dispatch, isInitialized]);

  // Show loading spinner while initializing or while authentication is being processed
  if (!isInitialized || isLoading) {
    console.log('🔄 Showing loading spinner - initialized:', isInitialized, 'isLoading:', isLoading);
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  // Check authentication - either Redux state or token in localStorage
  const hasValidAuth = isAuthenticated || token;

  // If not authenticated, redirect to login/signup
  if (!hasValidAuth) {
    console.log('❌ User not authenticated after initialization, redirecting to:', redirectTo);
    console.log('Final check - token:', token, 'isAuthenticated:', isAuthenticated);
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If profile is required but not available, redirect to profile setup
  if (requireProfile && !profile) {
    console.log('⚠️ Profile required but not available, redirecting to profile setup');
    return <Navigate to="/profile-setup" replace />;
  }

  console.log('✅ ProtectedRoute - Access granted to:', location.pathname);
  return <>{children}</>;
};

export default ProtectedRoute;