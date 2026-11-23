import api from './api';

const sessionService = {
  submitSession: async (sessionData) => {
    const response = await api.post('/sessions/submit', sessionData);
    return response.data;
  },

  getSessionsByTrainee: async (traineeId) => {
    const response = await api.get(`/sessions/trainee/${traineeId}`);
    return response.data;
  },

  getSessionById: async (id) => {
    const response = await api.get(`/sessions/${id}`);
    return response.data;
  }
};

export default sessionService;
