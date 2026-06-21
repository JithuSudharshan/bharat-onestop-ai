const { orchestrate } = require('../ai/agents/AgentOrchestrator');
const CitizenUnderstandingAgent = require('../ai/agents/CitizenUnderstandingAgent');
const SchemeRecommendationAgent = require('../ai/agents/SchemeRecommendationAgent');
const profileService = require('../services/profileService');
const { transcribeAudio } = require('../services/speechService');

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

const recommendSchemes = async (req, res, next) => {
  try {
    let profile;
    try {
      profile = await profileService.getProfile(req.user.id);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Please complete your citizen profile before getting recommendations.',
      });
    }

    if (!profile.isProfileComplete) {
      return res.status(400).json({
        success: false,
        message: 'Please complete the mandatory fields in your citizen profile first.',
      });
    }

    const result = await SchemeRecommendationAgent.recommend(profile);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const processAudio = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Audio file is required.' });
    }

    // Call our new Speech Service which interacts with Google Cloud Speech REST API
    const { transcript, language } = await transcribeAudio(req.file.buffer);

    res.status(200).json({
      success: true,
      data: {
        transcript,
        language
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chat,
  analyzeProfile,
  recommendSchemes,
  processAudio,
};
