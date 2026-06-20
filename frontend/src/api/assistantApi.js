import apiClient from './apiClient';

export const sendChatMessage = async (message, history) => {
  const response = await apiClient.post('/ai/orchestrate', { message });
  return {
    response: response.data.data.finalResponse,
    intent: response.data.data.intent
  };
};
