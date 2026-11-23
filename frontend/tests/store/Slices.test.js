import authReducer, { logout, clearAuthError } from '../../src/store/slices/authSlice';
import deckReducer, { reset as resetDecks } from '../../src/store/slices/deckSlice';
import exerciseReducer, { setFilters, clearFilters } from '../../src/store/slices/exerciseSlice';
import metricReducer, { setMetrics } from '../../src/store/slices/metricSlice';
import programReducer, { enrollProgram, unenrollProgram } from '../../src/store/slices/programSlice';
import sessionReducer, { startSession, updateScore } from '../../src/store/slices/sessionSlice';

describe('Redux Slices Unit Tests', () => {
  test('authSlice handles logout and clearAuthError', () => {
    const state = authReducer({ token: 'tk', user: { username: 'admin' }, isAuthenticated: true, error: 'err' }, logout());
    expect(state.token).toBeNull();
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);

    const cleared = authReducer({ error: 'some error' }, clearAuthError());
    expect(cleared.error).toBeNull();
  });

  test('deckSlice handles reset', () => {
    const state = deckReducer({ decks: [{ id: 1 }], loading: true }, resetDecks());
    expect(state.decks).toEqual([]);
    expect(state.loading).toBe(false);
  });

  test('exerciseSlice handles filters', () => {
    const state = exerciseReducer(undefined, setFilters({ type: 'LOGIC' }));
    expect(state.filters.type).toBe('LOGIC');

    const cleared = exerciseReducer(state, clearFilters());
    expect(cleared.filters.type).toBe('ALL');
  });

  test('metricSlice handles setMetrics', () => {
    const state = metricReducer(undefined, setMetrics({ memoryIndex: 95.5, processingSpeed: 91.0 }));
    expect(state.memoryIndex).toBe(95.5);
    expect(state.processingSpeed).toBe(91.0);
  });

  test('programSlice handles enroll and unenroll', () => {
    const state = programReducer({ enrolledProgramIds: [] }, enrollProgram(42));
    expect(state.enrolledProgramIds).toContain(42);

    const unenrolled = programReducer(state, unenrollProgram(42));
    expect(unenrolled.enrolledProgramIds).not.toContain(42);
  });

  test('sessionSlice handles startSession and updateScore', () => {
    const state = sessionReducer(undefined, startSession());
    expect(state.status).toBe('ACTIVE');

    const scored = sessionReducer(state, updateScore({ score: 90, accuracy: 95 }));
    expect(scored.score).toBe(90);
    expect(scored.accuracyRate).toBe(95);
  });
});
