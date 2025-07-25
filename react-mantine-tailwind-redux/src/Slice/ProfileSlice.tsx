import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Types
interface ProfileData {
  id: string | null;
  name: string;
  title: string;
  location: string;
  experience: string;
  email: string;
  phone: string;
}

interface Stats {
  projects: number;
  followers: number;
  successRate: number;
  rating: number;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  current: boolean;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

interface ProfileState {
  profileData: ProfileData;
  about: string;
  skills: string[];
  avatar: string;
  banner: string;
  stats: Stats;
  experiences: Experience[];
  certifications: Certification[];
  loading: boolean;
  saving: boolean;
  uploadingAvatar: boolean;
  error: string | null;
  lastUpdated: string | null;
  isEditModalOpen: boolean;
}

// API response types
interface ApiResponse {
  id?: string;
  name?: string;
  title?: string;
  location?: string;
  experience?: string;
  email?: string;
  phone?: string;
  about?: string;
  skills?: string[];
  avatar?: string;
  banner?: string;
  stats?: Partial<Stats>;
  experiences?: Experience[];
  certifications?: Certification[];
}

interface AvatarUploadResponse {
  avatarUrl: string;
}

// API base URL - adjust according to your backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Async thunk for fetching user profile
export const fetchProfile = createAsyncThunk<ApiResponse, string, { rejectValue: string }>(
  'profile/fetchProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  }
);

// Async thunk for saving/updating user profile
export const saveProfile = createAsyncThunk<
  ApiResponse, 
  { userId: string; profileData: Partial<ProfileData & { about: string; skills: string[]; avatar: string }> }, 
  { rejectValue: string }
>(
  'profile/saveProfile',
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to save profile');
    }
  }
);

// Async thunk for uploading profile avatar
export const uploadAvatar = createAsyncThunk<
  string,
  { userId: string; file: File },
  { rejectValue: string }
>(
  'profile/uploadAvatar',
  async ({ userId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch(`${API_BASE_URL}/profile/${userId}/avatar`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: AvatarUploadResponse = await response.json();
      return data.avatarUrl;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to upload avatar');
    }
  }
);

// Initial state
const initialState: ProfileState = {
  // Profile data
  profileData: {
    id: null,
    name: '',
    title: '',
    location: '',
    experience: '',
    email: '',
    phone: '',
  },
  about: '',
  skills: [],
  avatar: '/avatar.png',
  banner: '/banner.png',
  
  // Stats
  stats: {
    projects: 0,
    followers: 0,
    successRate: 0,
    rating: 0,
  },
  
  // Experience and certifications
  experiences: [],
  certifications: [],
  
  // UI states
  loading: false,
  saving: false,
  uploadingAvatar: false,
  error: null,
  lastUpdated: null,
  
  // Modal states
  isEditModalOpen: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // UI state management
    setEditModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditModalOpen = action.payload;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    // Profile data updates (for optimistic updates)
    updateProfileData: (state, action: PayloadAction<Partial<ProfileData>>) => {
      state.profileData = { ...state.profileData, ...action.payload };
    },
    
    updateAbout: (state, action: PayloadAction<string>) => {
      state.about = action.payload;
    },
    
    updateSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    
    addSkill: (state, action: PayloadAction<string>) => {
      const skill = action.payload.trim();
      if (skill && !state.skills.includes(skill)) {
        state.skills.push(skill);
      }
    },
    
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills = state.skills.filter((_, index) => index !== action.payload);
    },
    
    updateAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    
    // Experience management
    addExperience: (state, action: PayloadAction<Experience>) => {
      state.experiences.push(action.payload);
    },
    
    updateExperience: (state, action: PayloadAction<{ index: number; data: Partial<Experience> }>) => {
      const { index, data } = action.payload;
      if (state.experiences[index]) {
        state.experiences[index] = { ...state.experiences[index], ...data };
      }
    },
    
    removeExperience: (state, action: PayloadAction<number>) => {
      state.experiences = state.experiences.filter((_, index) => index !== action.payload);
    },
    
    // Certification management
    addCertification: (state, action: PayloadAction<Certification>) => {
      state.certifications.push(action.payload);
    },
    
    removeCertification: (state, action: PayloadAction<number>) => {
      state.certifications = state.certifications.filter((_, index) => index !== action.payload);
    },
    
    // Reset profile to initial state
    resetProfile: (state) => {
      return { ...initialState };
    },
  },
  
  extraReducers: (builder) => {
    // Fetch Profile
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;
        
        // Update profile data
        state.profileData = {
          id: data.id || state.profileData.id,
          name: data.name || state.profileData.name,
          title: data.title || state.profileData.title,
          location: data.location || state.profileData.location,
          experience: data.experience || state.profileData.experience,
          email: data.email || state.profileData.email,
          phone: data.phone || state.profileData.phone,
        };
        
        state.about = data.about || state.about;
        state.skills = data.skills || state.skills;
        state.avatar = data.avatar || state.avatar;
        state.banner = data.banner || state.banner;
        
        // Update stats
        if (data.stats) {
          state.stats = { ...state.stats, ...data.stats };
        }
        
        // Update experiences and certifications
        state.experiences = data.experiences || state.experiences;
        state.certifications = data.certifications || state.certifications;
        
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      });
    
    // Save Profile
    builder
      .addCase(saveProfile.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.saving = false;
        state.lastUpdated = new Date().toISOString();
        // Profile data is already updated through optimistic updates
        // You can update with server response if needed
        if (action.payload) {
          // Update any server-generated fields
          state.profileData.id = action.payload.id || state.profileData.id;
        }
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload || 'Failed to save profile';
      });
    
    // Upload Avatar
    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.uploadingAvatar = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.uploadingAvatar = false;
        state.avatar = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.uploadingAvatar = false;
        state.error = action.payload || 'Failed to upload avatar';
      });
  },
});

// Export actions
export const {
  setEditModalOpen,
  clearError,
  updateProfileData,
  updateAbout,
  updateSkills,
  addSkill,
  removeSkill,
  updateAvatar,
  addExperience,
  updateExperience,
  removeExperience,
  addCertification,
  removeCertification,
  resetProfile,
} = profileSlice.actions;

// Selectors with proper typing
export const selectProfile = (state: { profile: ProfileState }) => state.profile;
export const selectProfileData = (state: { profile: ProfileState }) => state.profile.profileData;
export const selectAbout = (state: { profile: ProfileState }) => state.profile.about;
export const selectSkills = (state: { profile: ProfileState }) => state.profile.skills;
export const selectAvatar = (state: { profile: ProfileState }) => state.profile.avatar;
export const selectStats = (state: { profile: ProfileState }) => state.profile.stats;
export const selectExperiences = (state: { profile: ProfileState }) => state.profile.experiences;
export const selectCertifications = (state: { profile: ProfileState }) => state.profile.certifications;
export const selectProfileLoading = (state: { profile: ProfileState }) => state.profile.loading;
export const selectProfileSaving = (state: { profile: ProfileState }) => state.profile.saving;
export const selectProfileError = (state: { profile: ProfileState }) => state.profile.error;
export const selectIsEditModalOpen = (state: { profile: ProfileState }) => state.profile.isEditModalOpen;

// Export types for use in components
export type { ProfileData, Stats, Experience, Certification, ProfileState };

// Export reducer
export default profileSlice.reducer;