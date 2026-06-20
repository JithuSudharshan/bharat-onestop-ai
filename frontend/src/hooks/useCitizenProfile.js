import { useState, useEffect } from 'react';
import { fetchProfile, updateProfile } from '../api/profileApi';

export const useCitizenProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message);
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
