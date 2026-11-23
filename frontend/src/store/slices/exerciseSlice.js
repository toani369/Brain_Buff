import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import exerciseService from '../../services/exerciseService';

export const fetchExercises = createAsyncThunk(
  'exercises/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await exerciseService.getAll(params);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to fetch exercises';
      return rejectWithValue(message);
    }
  }
);

export const createExercise = createAsyncThunk(
  'exercises/create',
  async (exerciseData, { rejectWithValue }) => {
    try {
      const data = await exerciseService.create(exerciseData);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to create exercise';
      return rejectWithValue(message);
    }
  }
);

export const updateExercise = createAsyncThunk(
  'exercises/update',
  async ({ id, exerciseData }, { rejectWithValue }) => {
    try {
      const data = await exerciseService.update(id, exerciseData);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to update exercise';
      return rejectWithValue(message);
    }
  }
);

export const deleteExercise = createAsyncThunk(
  'exercises/delete',
  async (id, { rejectWithValue }) => {
    try {
      await exerciseService.delete(id);
      return id;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to delete exercise';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  exercises: [],
  selectedExercise: null,
  loading: false,
  error: null,
  filters: {
    type: 'ALL',
    difficulty: 'ALL',
    search: ''
  }
};

const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { type: 'ALL', difficulty: 'ALL', search: '' };
    },
    setSelectedExercise: (state, action) => {
      state.selectedExercise = action.payload;
    },
    clearExerciseError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.exercises = payload;
        } else if (payload && Array.isArray(payload.content)) {
          state.exercises = payload.content;
        } else {
          state.exercises = [];
        }
      })
      .addCase(fetchExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch exercises';
      })
      .addCase(createExercise.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.exercises.push(action.payload);
        }
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = state.exercises.filter((ex) => ex.id !== action.payload);
      });
  }
});

export const { setFilters, clearFilters, setSelectedExercise, clearExerciseError } = exerciseSlice.actions;
export default exerciseSlice.reducer;
