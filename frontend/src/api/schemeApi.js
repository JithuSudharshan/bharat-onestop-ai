import apiClient from './apiClient';

export const fetchRecommendedSchemes = async () => {
  // Using the RAG pipeline endpoint which handles the scheme recommendation internally
  const response = await apiClient.post('/rag/recommend');
  return response.data.data.recommendations;
};
