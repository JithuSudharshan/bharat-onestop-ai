import apiClient from './apiClient';

export const fetchRecommendedSchemes = async () => {
  // Using the AI pipeline endpoint which handles the scheme recommendation internally
  const response = await apiClient.post('/ai/recommend');
  return response.data.data.recommendedSchemes || [];
};
