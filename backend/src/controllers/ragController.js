const ragService = require('../rag/ragService');
const profileService = require('../services/profileService');

const queryRag = async (req, res, next) => {
  try {
    const { question, domain } = req.body;

    let profile;
    try {
      profile = await profileService.getProfile(req.user.id);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Please complete your citizen profile to use the document search.',
      });
    }

    if (!profile.isProfileComplete) {
      return res.status(400).json({
        success: false,
        message: 'Please complete the mandatory fields in your citizen profile first.',
      });
    }

    const result = await ragService.query({ question, profile, domain });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  queryRag,
};
