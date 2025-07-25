// Store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  profile: any | null; // Replace with your user type
  isProfileLoaded: boolean;
}

const initialState: UserState = {
  profile: null,
  isProfileLoaded: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      console.log('🔄 User Slice - setUser called with:', action.payload);
      state.profile = action.payload;
      state.isProfileLoaded = true;
      console.log('✅ User Slice - Profile set successfully');
    },
    removeUser: (state) => {
      console.log('🔄 User Slice - removeUser called');
      state.profile = null;
      state.isProfileLoaded = false;
      console.log('✅ User Slice - Profile removed');
    },
    setProfileLoaded: (state, action: PayloadAction<boolean>) => {
      state.isProfileLoaded = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<any>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
});

export const {
  setUser,
  removeUser,
  setProfileLoaded,
  updateProfile,
} = userSlice.actions;

export default userSlice.reducer;