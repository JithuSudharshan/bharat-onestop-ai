import { useState } from 'react';
import { uploadDocument } from '../api/documentApi';

export const useDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const processDocument = async (file) => {
    try {
      setLoading(true);
      setError(null);
      const data = await uploadDocument(file);
      setResult(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const resetDocument = () => setResult(null);

  return { processDocument, resetDocument, loading, result, error };
};
