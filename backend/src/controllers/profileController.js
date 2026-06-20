const profileService = require('../services/profileService');

/**
 * POST /api/profile
 * Create a new citizen profile for the authenticated user.
 */
const createProfile = async (req, res, next) => {
  try {
    const profile = await profileService.createProfile(req.user.id, req.body);
    res.status(201).json({
      success: true,
      message: 'Citizen profile created successfully',
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/profile
 * Get the citizen profile for the authenticated user.
 */
const getProfile = async (req, res, next) => {
  try {
    const profile = await profileService.getProfile(req.user.id);
    res.status(200).json({
      success: true,
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/profile
 * Update the citizen profile for the authenticated user.
 */
const updateProfile = async (req, res, next) => {
  try {
    const profile = await profileService.updateProfile(req.user.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Citizen profile updated successfully',
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
};
