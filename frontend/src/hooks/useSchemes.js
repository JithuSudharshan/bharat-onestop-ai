import { useState, useEffect } from 'react';
import { fetchRecommendedSchemes } from '../api/schemeApi';

export const useSchemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSchemes = async () => {
      try {
        setLoading(true);
        const data = await fetchRecommendedSchemes();
        setSchemes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadSchemes();
  }, []);

  return { schemes, loading, error };
};
