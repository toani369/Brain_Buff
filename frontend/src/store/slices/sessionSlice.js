import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sessionService from '../../services/sessionService';

export const submitSessionResult = createAsyncThunk(
  'sessions/submit',
  async (sessionData, { rejectWithValue }) => {
    try {
      const data = await sessionService.submitSession(sessionData);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to submit session result';
      return rejectWithValue(message);
    }
  }
);

export const fetchTraineeSessions = createAsyncThunk(
  'sessions/fetchByTrainee',
  async (traineeId, { rejectWithValue }) => {
    try {
      const data = await sessionService.getSessionsByTrainee(traineeId);
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && (error.response.data.message || error.response.data.error || error.response.data)) ||
        error.message ||
        'Failed to fetch trainee sessions';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  activeSession: null,
  currentExercise: null,
  status: 'READY', // 'READY', 'ACTIVE', 'COMPLETED'
  timer: 60,
  score: 0,
  rawScore: 0,
  accuracyRate: 100,
  completionTimeMs: 0,
  recentSessions: [
    {
      id: 1,
      exerciseName: 'Pattern Matrix Dual-N-Back',
      score: 94,
      accuracyRate: 95.5,
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      exerciseName: 'Spatial Grid Recall',
      score: 88,
      accuracyRate: 90.0,
      timestamp: new Date(Date.now() - 86400000).toISOString()
    },
    {
      id: 3,
      exerciseName: 'Speed Processing Challenge',
      score: 91,
      accuracyRate: 92.3,
      timestamp: new Date(Date.now() - 172800000).toISOString()
    }
  ],
  loading: false,
  error: null
};

const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    initSession: (state, action) => {
      state.currentExercise = action.payload || null;
      state.status = 'READY';
      state.timer = 60;
      state.score = 0;
      state.rawScore = 0;
      state.accuracyRate = 100;
      state.completionTimeMs = 0;
      state.error = null;
    },
    startSession: (state) => {
      state.status = 'ACTIVE';
    },
    tickTimer: (state) => {
      if (state.timer > 0 && state.status === 'ACTIVE') {
        state.timer -= 1;
        state.completionTimeMs += 1000;
        if (state.timer <= 0) {
          state.status = 'COMPLETED';
        }
      }
    },
    updateScore: (state, action) => {
      const { score, accuracy } = action.payload;
      if (score !== undefined) {
        state.score = score;
        state.rawScore = score;
      }
      if (accuracy !== undefined) state.accuracyRate = accuracy;
    },
    completeSession: (state, action) => {
      state.status = 'COMPLETED';
      if (action.payload) {
        if (action.payload.score !== undefined) state.score = action.payload.score;
        if (action.payload.rawScore !== undefined) state.rawScore = action.payload.rawScore;
        if (action.payload.accuracyRate !== undefined) state.accuracyRate = action.payload.accuracyRate;
        if (action.payload.completionTimeMs !== undefined) state.completionTimeMs = action.payload.completionTimeMs;
      }
      if (state.currentExercise) {
        state.recentSessions.unshift({
          id: Date.now(),
          exerciseName: state.currentExercise.title || 'Cognitive Challenge',
          score: state.score,
          accuracyRate: state.accuracyRate,
          timestamp: new Date().toISOString()
        });
      }
    },
    resetSession: (state) => {
      state.activeSession = null;
      state.currentExercise = null;
      state.status = 'READY';
      state.timer = 60;
      state.score = 0;
      state.rawScore = 0;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSessionResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitSessionResult.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(submitSessionResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to submit session result';
      })
      .addCase(fetchTraineeSessions.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.recentSessions = action.payload;
        }
      });
  }
});

export const {
  initSession,
  startSession,
  tickTimer,
  updateScore,
  completeSession,
  resetSession
} = sessionSlice.actions;

export default sessionSlice.reducer;
