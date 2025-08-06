// Store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  refreshToken: null,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      console.log('🔄 Auth Slice - loginStart called');
      state.isLoading = true;
      state.error = null;
      console.log('✅ Auth Slice - Login started');
    },
    loginSuccess: (state, action: PayloadAction<{ token: string | null; refreshToken?: string | null }>) => {
      console.log('🔄 Auth Slice - loginSuccess called with:', action.payload);
      state.isAuthenticated = !!action.payload.token;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || null;
      state.isLoading = false;
      state.error = null;
      console.log('✅ Auth Slice - Login successful');
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      console.log('🔄 Auth Slice - loginFailure called with:', action.payload);
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.isLoading = false;
      state.error = action.payload;
      console.log('❌ Auth Slice - Login failed');
    },
    logout: (state) => {
      console.log('🔄 Auth Slice - logout called');
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      state.isLoading = false;
      console.log('✅ Auth Slice - Logged out');
    },
    clearError: (state) => {
      console.log('🔄 Auth Slice - clearError called');
      state.error = null;
      console.log('✅ Auth Slice - Error cleared');
    },
    setTokens: (state, action: PayloadAction<{ token: string; refreshToken?: string }>) => {
      console.log('🔄 Auth Slice - setTokens called');
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken || null;
      state.isAuthenticated = true;
      console.log('✅ Auth Slice - Tokens set');
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  setTokens,
} = authSlice.actions;

export default authSlice.reducer;