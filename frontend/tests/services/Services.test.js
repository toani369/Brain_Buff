import authService from '../../src/services/authService';
import deckService from '../../src/services/deckService';
import exerciseService from '../../src/services/exerciseService';
import programService from '../../src/services/programService';
import sessionService from '../../src/services/sessionService';
import api from '../../src/services/api';

jest.mock('../../src/services/api', () => ({
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Services API Layer', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('authService.login sends credentials to /auth/login', async () => {
    api.post.mockResolvedValue({ data: { token: 'mock-jwt-token' } });
    const res = await authService.login({ username: 'user', password: 'password' });
    expect(api.post).toHaveBeenCalledWith('/auth/login', { username: 'user', password: 'password' });
    expect(res.token).toBe('mock-jwt-token');
  });

  test('deckService.getAll queries /decks', async () => {
    api.get.mockResolvedValue({ data: [{ id: 1, title: 'Deck 1' }] });
    const res = await deckService.getAll();
    expect(api.get).toHaveBeenCalledWith('/decks', { params: undefined });
    expect(res).toHaveLength(1);
  });

  test('exerciseService.getAll queries /exercises', async () => {
    api.get.mockResolvedValue({ data: [{ id: 1, title: 'Exercise 1' }] });
    const res = await exerciseService.getAll();
    expect(api.get).toHaveBeenCalledWith('/exercises', { params: undefined });
  });

  test('programService.create posts to /programs', async () => {
    api.post.mockResolvedValue({ data: 'Program created successfully' });
    await programService.create({ name: 'Program 1' });
    expect(api.post).toHaveBeenCalledWith('/programs', { name: 'Program 1' });
  });

  test('sessionService.submitSession posts to /sessions/submit', async () => {
    api.post.mockResolvedValue({ data: 'Session submitted successfully' });
    await sessionService.submitSession({ rawScore: 100 });
    expect(api.post).toHaveBeenCalledWith('/sessions/submit', { rawScore: 100 });
  });
});
