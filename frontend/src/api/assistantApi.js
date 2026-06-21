import apiClient from './apiClient';

export const sendChatMessage = async (message, history) => {
  const response = await apiClient.post('/ai/chat', { message, history });
  return {
    response: response.data.data.finalResponse,
    intent: response.data.data.intent
  };
};

export const transcribeAudio = async (audioBlob) => {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'audio.webm');
  const response = await apiClient.post('/ai/speech-to-text', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.data;
};
