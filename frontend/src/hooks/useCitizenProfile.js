import { useState, useEffect } from 'react';
import { fetchProfile, updateProfile } from '../api/profileApi';
import { useNavigate } from 'react-router-dom';

export const useCitizenProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchProfile();
        setProfile(data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          navigate('/onboarding');
        } else {
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const mutateProfile = async (updates) => {
    const res = await updateProfile(updates);
    if (res.success) {
      setProfile(prev => ({ ...prev, ...updates }));
    }
  };

  return { profile, loading, error, mutateProfile };
};
