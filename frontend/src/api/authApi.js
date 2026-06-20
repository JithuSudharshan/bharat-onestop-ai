import apiClient from './apiClient';

export const loginUser = async (phone, password) => {
  const response = await apiClient.post('/auth/login', { phone, password });
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  return response.data;
};

export const registerUser = async (email, password, role = 'citizen') => {
  const response = await apiClient.post('/auth/register', { email, password, role });
  if (response.data.success) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data.user));
  }
  return response.data;
};

export const googleLogin = async (credential) => {
  const response = await apiClient.post('/auth/google', { credential });
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
