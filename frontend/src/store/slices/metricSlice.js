import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import analyticsService from '../../services/analyticsService';

export const fetchMetrics = createAsyncThunk(
  'metrics/fetch',
  async (traineeId, { rejectWithValue }) => {
    try {
      const data = await analyticsService.getMetrics(traineeId);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to fetch metrics';
      return rejectWithValue(message);
    }
  }
);

export const saveMetrics = createAsyncThunk(
  'metrics/save',
  async (metricData, { rejectWithValue }) => {
    try {
      const data = await analyticsService.saveMetrics(metricData);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to save metrics';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  memoryIndex: 82.5,
  processingSpeed: 79.0,
  attention: 88.4,
  logic: 85.0,
  focusScore: 86.2,
  recentTrend: {
    memory: '+4.2%',
    speed: '+2.8%',
    attention: '+5.1%',
    logic: '+3.5%'
  },
  loading: false,
  error: null
};

const metricSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    updateMetrics: (state, action) => {
      return { ...state, ...action.payload };
    },
    setMetrics: (state, action) => {
      const { memoryIndex, processingSpeed, focusScore } = action.payload || {};
      if (memoryIndex !== undefined) state.memoryIndex = memoryIndex;
      if (processingSpeed !== undefined) state.processingSpeed = processingSpeed;
      if (focusScore !== undefined) {
        state.focusScore = focusScore;
        state.attention = focusScore;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          if (action.payload.memoryIndex !== undefined) state.memoryIndex = action.payload.memoryIndex;
          if (action.payload.processingSpeed !== undefined) state.processingSpeed = action.payload.processingSpeed;
          if (action.payload.focusScore !== undefined) {
            state.focusScore = action.payload.focusScore;
            state.attention = action.payload.focusScore;
          }
        }
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch metrics';
      });
  }
});

export const { updateMetrics, setMetrics } = metricSlice.actions;
export default metricSlice.reducer;
