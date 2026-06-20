const { orchestrate } = require('../ai/agents/AgentOrchestrator');
const CitizenUnderstandingAgent = require('../ai/agents/CitizenUnderstandingAgent');
const profileService = require('../services/profileService');

const chat = async (req, res, next) => {
  try {
    const { message, history = [] } = req.body;

    // Load citizen profile
    let profile;
    try {
      profile = await profileService.getProfile(req.user.id);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Please complete your citizen profile before using Bharat Sahayak AI.',
      });
    }

    if (!profile.isProfileComplete) {
      return res.status(400).json({
        success: false,
        message: 'Please complete the mandatory fields in your citizen profile first.',
      });
    }

    // Call orchestrator
    const result = await orchestrate({ profile, message, history });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const analyzeProfile = async (req, res, next) => {
  try {
    let profile;
    try {
      profile = await profileService.getProfile(req.user.id);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Please complete your citizen profile before analyzing.',
      });
    }

    if (!profile.isProfileComplete) {
      return res.status(400).json({
        success: false,
        message: 'Please complete the mandatory fields in your citizen profile first.',
      });
    }

    const result = await CitizenUnderstandingAgent.analyze(profile);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chat,
  analyzeProfile,
};
