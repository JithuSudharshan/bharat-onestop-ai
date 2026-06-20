import apiClient from './apiClient';

export const loginUser = async (phone, password) => {
  const response = await apiClient.post('/auth/login', { phone, password });
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  return response.data;
};

export const registerUser = async (phone, password, role = 'citizen') => {
  const response = await apiClient.post('/auth/register', { phone, password, role });
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
