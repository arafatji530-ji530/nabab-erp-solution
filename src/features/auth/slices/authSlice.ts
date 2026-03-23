/**
 * Authentication Redux Slice
 */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '@/services/api';
import { storage } from '@/shared/utils/formatters';
import { STORAGE_KEYS, ROLE_PERMISSIONS } from '@/shared/utils/constants';
import type { User, AuthState } from '@/types/domain';
import type { AuthAPI } from '@/types/api';

const initialState: AuthState = {
  user: storage.get<User>(STORAGE_KEYS.USER),
  token: storage.get<string>(STORAGE_KEYS.AUTH_TOKEN),
  isAuthenticated: !!storage.get<string>(STORAGE_KEYS.AUTH_TOKEN),
  isLoading: false,
};

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: AuthAPI.LoginRequest, { rejectWithValue }) => {
    try {
      const response = await apiService.auth.login(credentials);
      
      // Store in localStorage
      storage.set(STORAGE_KEYS.AUTH_TOKEN, response.token);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
      
      // Add permissions based on role
      const userWithPermissions = {
        ...response.user,
        permissions: [...(ROLE_PERMISSIONS[response.user.role] || [])],
      };
      
      storage.set(STORAGE_KEYS.USER, userWithPermissions);
      
      return userWithPermissions;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await apiService.auth.logout();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear storage regardless of API call success
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER);
  }
});

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await apiService.auth.getCurrentUser();
      const userWithPermissions = {
        ...user,
        permissions: [...(ROLE_PERMISSIONS[user.role] || [])],
      };
      storage.set(STORAGE_KEYS.USER, userWithPermissions);
      return userWithPermissions;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      storage.set(STORAGE_KEYS.USER, action.payload);
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      storage.remove(STORAGE_KEYS.AUTH_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      storage.remove(STORAGE_KEYS.USER);
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });

    // Get current user
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;

// Permission checker
export const selectHasPermission = (permission: string) => (state: { auth: AuthState }) => {
  const user = state.auth.user;
  if (!user) return false;
  return user.permissions.includes(permission);
};
