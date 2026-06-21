import apiClient from './apiClient';

export const sendChatMessage = async (message, history, isVoice = false) => {
  const response = await apiClient.post('/ai/chat', { message, history, isVoice });
  return {
    response: response.data.data.finalResponse,
    intent: response.data.data.intent
  };
};

export const transcribeAudio = async (audioBlob) => {
  const formData = new FormData();
  // Extract file extension from mime type (e.g. audio/mp4 -> mp4)
  const extension = audioBlob.type.split('/')[1]?.split(';')[0] || 'webm';
  formData.append('audio', audioBlob, `audio.${extension}`);
  formData.append('mimeType', audioBlob.type || 'audio/webm');
  
  const response = await apiClient.post('/ai/speech-to-text', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.data;
};
