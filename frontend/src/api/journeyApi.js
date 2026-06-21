import apiClient from './apiClient';

export const journeyApi = {
  generateJourney: async () => {
    const response = await apiClient.post('/journey/generate');
    return response.data;
  },

  getCurrentJourney: async () => {
    const response = await apiClient.get('/journey/current');
    return response.data;
  },

  markActionCompleted: async (journeyId, actionId) => {
    const response = await apiClient.patch(`/journey/${journeyId}/action/${actionId}`);
    return response.data;
  }
};
