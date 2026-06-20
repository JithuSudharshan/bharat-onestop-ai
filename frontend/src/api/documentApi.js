import apiClient from './apiClient';

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('document', file);

  const response = await apiClient.post('/documents/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data.data.document;
};
