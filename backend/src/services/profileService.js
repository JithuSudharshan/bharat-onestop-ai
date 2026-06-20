const CitizenProfile = require('../models/CitizenProfile');

/**
 * Create a new citizen profile.
 * One profile per user — enforced by unique index on `user` field.
 */
const createProfile = async (userId, profileData) => {
  const existing = await CitizenProfile.findOne({ user: userId });
  if (existing) {
    const error = new Error('Profile already exists. Use PUT /profile to update it.');
    error.statusCode = 409;
    throw error;
  }

  const profile = await CitizenProfile.create({
    user: userId,
    ...profileData,
  });

  return profile;
};

/**
 * Get the citizen profile for the authenticated user.
 */
const getProfile = async (userId) => {
  const profile = await CitizenProfile.findOne({ user: userId }).populate(
    'user',
    'name email role'
  );

  if (!profile) {
    const error = new Error('Profile not found. Please create your profile first.');
    error.statusCode = 404;
    throw error;
  }

  return profile;
};

/**
 * Update an existing citizen profile.
 * Partial updates are supported — only provided fields are changed.
 */
const updateProfile = async (userId, updateData) => {
  // Prevent overwriting the user reference
  delete updateData.user;

  const profile = await CitizenProfile.findOneAndUpdate(
    { user: userId },
    { $set: updateData },
    {
      new: true,          // Return updated document
      runValidators: true, // Enforce schema validations on update
    }
  );

  if (!profile) {
    const error = new Error('Profile not found. Please create your profile first.');
    error.statusCode = 404;
    throw error;
  }

  return profile;
};

module.exports = {
  createProfile,
  getProfile,
  updateProfile,
};
