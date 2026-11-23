import api from './api';

const deckService = {
  getAll: async (params) => {
    const response = await api.get('/decks', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/decks/${id}`);
    return response.data;
  },

  create: async (deckData) => {
    const response = await api.post('/decks', deckData);
    return response.data;
  },

  update: async (id, deckData) => {
    const response = await api.put(`/decks/${id}`, deckData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/decks/${id}`);
    return response.data;
  }
};

export default deckService;
