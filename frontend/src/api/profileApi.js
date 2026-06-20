import apiClient from './apiClient';

export const fetchProfile = async () => {
  const response = await apiClient.get('/profile');
  return response.data.data.profile;
};

export const updateProfile = async (data) => {
  const response = await apiClient.post('/profile', data);
  return response.data;
};
