const journeyService = require('./journeyService');

const generateJourney = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const journey = await journeyService.generateJourney(userId);
    res.status(201).json({
      success: true,
      data: journey,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentJourney = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const journey = await journeyService.getActiveJourney(userId);
    res.status(200).json({
      success: true,
      data: journey,
    });
  } catch (error) {
    next(error);
  }
};

const markActionCompleted = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { id: journeyId, actionId } = req.params;
    const journey = await journeyService.markActionCompleted(userId, journeyId, actionId);
    res.status(200).json({
      success: true,
      data: journey,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateJourney,
  getCurrentJourney,
  markActionCompleted,
};
