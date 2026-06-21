const applicationService = require('./applicationService');

const createApplication = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { schemeId } = req.body;
    
    if (!schemeId) {
      return res.status(400).json({ success: false, message: 'schemeId is required' });
    }

    const application = await applicationService.createApplication(userId, schemeId);
    
    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

const getApplication = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: applicationId } = req.params;
    
    const application = await applicationService.getApplication(userId, applicationId);
    
    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

const updateChecklistStep = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: applicationId, stepId } = req.params;
    
    const application = await applicationService.updateChecklistStep(userId, applicationId, stepId);
    
    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

const updateField = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: applicationId } = req.params;
    const { fieldId, value } = req.body;
    
    if (!fieldId || value === undefined) {
      return res.status(400).json({ success: false, message: 'fieldId and value are required' });
    }

    const application = await applicationService.updateField(userId, applicationId, fieldId, value);
    
    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createApplication,
  getApplication,
  updateChecklistStep,
  updateField,
};
