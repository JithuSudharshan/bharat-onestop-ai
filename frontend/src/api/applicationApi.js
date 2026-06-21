import apiClient from './apiClient';

export const applicationApi = {
  createApplication: async (schemeId) => {
    const response = await apiClient.post('/application/create', { schemeId });
    return response.data;
  },

  getApplication: async (applicationId) => {
    const response = await apiClient.get(`/application/${applicationId}`);
    return response.data;
  },

  updateChecklistStep: async (applicationId, stepId) => {
    const response = await apiClient.patch(`/application/${applicationId}/checklist/${stepId}`);
    return response.data;
  },

  updateField: async (applicationId, fieldId, value) => {
    const response = await apiClient.patch(`/application/${applicationId}/update-field`, { fieldId, value });
    return response.data;
  }
};
