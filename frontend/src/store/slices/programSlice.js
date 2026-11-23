import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import programService from '../../services/programService';

export const fetchPrograms = createAsyncThunk(
  'programs/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const data = await programService.getAll(params);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to fetch programs';
      return rejectWithValue(message);
    }
  }
);

export const createProgram = createAsyncThunk(
  'programs/create',
  async (programData, { rejectWithValue }) => {
    try {
      const data = await programService.create(programData);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to create program';
      return rejectWithValue(message);
    }
  }
);

export const updateProgram = createAsyncThunk(
  'programs/update',
  async ({ id, programData }, { rejectWithValue }) => {
    try {
      const data = await programService.update(id, programData);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to update program';
      return rejectWithValue(message);
    }
  }
);

export const deleteProgram = createAsyncThunk(
  'programs/delete',
  async (id, { rejectWithValue }) => {
    try {
      await programService.delete(id);
      return id;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to delete program';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  programs: [],
  enrolledProgramIds: [1],
  selectedProgram: null,
  loading: false,
  error: null
};

const programSlice = createSlice({
  name: 'programs',
  initialState,
  reducers: {
    enrollProgram: (state, action) => {
      const id = action.payload;
      if (!state.enrolledProgramIds.includes(id)) {
        state.enrolledProgramIds.push(id);
      }
    },
    unenrollProgram: (state, action) => {
      state.enrolledProgramIds = state.enrolledProgramIds.filter((id) => id !== action.payload);
    },
    setSelectedProgram: (state, action) => {
      state.selectedProgram = action.payload;
    },
    clearProgramError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const payload = action.payload;
        if (Array.isArray(payload)) {
          state.programs = payload;
        } else if (payload && Array.isArray(payload.content)) {
          state.programs = payload.content;
        } else {
          state.programs = [];
        }
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch programs';
      })
      .addCase(createProgram.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && typeof action.payload === 'object') {
          state.programs.push(action.payload);
        }
      })
      .addCase(deleteProgram.fulfilled, (state, action) => {
        state.loading = false;
        state.programs = state.programs.filter((p) => p.id !== action.payload);
      });
  }
});

export const { enrollProgram, unenrollProgram, setSelectedProgram, clearProgramError } = programSlice.actions;
export default programSlice.reducer;
