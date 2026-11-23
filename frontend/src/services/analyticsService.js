import api from './api';

const analyticsService = {
  getMetrics: async (traineeId) => {
    const response = await api.get(`/analytics/${traineeId}`);
    return response.data;
  },

  saveMetrics: async (metricData) => {
    const response = await api.post('/analytics', metricData);
    return response.data;
  }
};

export default analyticsService;
