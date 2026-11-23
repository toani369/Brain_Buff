import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import deckReducer from './slices/deckSlice';
import exerciseReducer from './slices/exerciseSlice';
import metricReducer from './slices/metricSlice';
import programReducer from './slices/programSlice';
import sessionReducer from './slices/sessionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    decks: deckReducer,
    exercises: exerciseReducer,
    metrics: metricReducer,
    programs: programReducer,
    sessions: sessionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
