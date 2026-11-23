import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { storage } from '../../utils/storage';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Login failed';
      return rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Registration failed';
      return rejectWithValue(message);
    }
  }
);

const initialToken = storage.getToken();
const initialUser = storage.getUser();
const initialRole = storage.getRole() || (initialUser ? initialUser.role : null);

const initialState = {
  token: initialToken || null,
  user: initialUser || null,
  role: initialRole || null,
  isAuthenticated: !!initialToken,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      storage.clearAuth();
    },
    clearAuthError: (state) => {
      state.error = null;
    },
    restoreSession: (state) => {
      const token = storage.getToken();
      const user = storage.getUser();
      const role = storage.getRole() || (user ? user.role : null);
      if (token) {
        state.token = token;
        state.user = user;
        state.role = role && typeof role === 'string' ? role.toUpperCase() : role;
        state.isAuthenticated = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase('auth/login/pending', (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase('auth/login/fulfilled', (state, action) => {
        const payload = action.payload || {};
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.token = payload.token !== undefined ? payload.token : state.token;

        if (payload.user) {
          state.user = { ...payload.user };
          if (payload.role && !state.user.role) {
            state.user.role = payload.role;
          }
          state.role = state.user.role || payload.role || state.role || null;
        } else if (payload.username || payload.role) {
          state.user = {
            username: payload.username || '',
            role: payload.role || null
          };
          state.role = payload.role || null;
        }

        if (state.role && typeof state.role === 'string') {
          state.role = state.role.toUpperCase();
        }

        if (state.token) {
          storage.setToken(state.token);
        }
        if (state.user) {
          storage.setUser(state.user);
        }
        if (state.role) {
          storage.setRole(state.role);
        }
      })
      .addCase('auth/login/rejected', (state, action) => {
        state.loading = false;
        state.error = action.payload || (action.error && action.error.message) || 'Invalid credentials';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || (action.error && action.error.message) || 'Registration failed';
      });
  }
});

export const { logout, clearAuthError, restoreSession } = authSlice.actions;
export default authSlice.reducer;
