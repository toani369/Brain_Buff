import api from './api';

const exerciseService = {
  getAll: async (params) => {
    const response = await api.get('/exercises', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/exercises/${id}`);
    return response.data;
  },

  create: async (exerciseData) => {
    const response = await api.post('/exercises', exerciseData);
    return response.data;
  },

  update: async (id, exerciseData) => {
    const response = await api.put(`/exercises/${id}`, exerciseData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/exercises/${id}`);
    return response.data;
  }
};

export default exerciseService;
