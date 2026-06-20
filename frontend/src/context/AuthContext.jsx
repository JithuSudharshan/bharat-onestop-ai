import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser as apiLogout } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

    // Listen for global auth expiration events from Axios interceptor
    const handleAuthExpired = () => {
      setUser(null);
      navigate('/login');
    };
    window.addEventListener('auth-expired', handleAuthExpired);
    return () => window.removeEventListener('auth-expired', handleAuthExpired);
  }, [navigate]);

  const login = async (phone, password) => {
    const data = await loginUser(phone, password);
    setUser(data.data.user);
    navigate('/dashboard');
  };

  const register = async (phone, password) => {
    const data = await registerUser(phone, password);
    setUser(data.data.user);
    navigate('/onboarding');
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
