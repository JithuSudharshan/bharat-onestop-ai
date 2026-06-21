const CitizenJourney = require('../../models/CitizenJourney');
const profileService = require('../../services/profileService');
const Document = require('../../documents/models/Document');
const { recommend } = require('../../ai/agents/SchemeRecommendationAgent');
const { generateCitizenJourney } = require('./journeyAgent');

const getActiveJourney = async (userId) => {
  return await CitizenJourney.findOne({ userId, status: 'active' }).sort({ createdAt: -1 });
};

const generateJourney = async (userId) => {
  // 1. Fetch citizen profile
  const profile = await profileService.getProfile(userId);
  if (!profile) {
    throw new Error('Citizen profile not found');
  }

  // 2. Fetch extracted document intelligence
  const documents = await Document.find({ user: userId, status: 'processed' }).select('documentType extractedData');

  // 3. Fetch eligible schemes using existing RAG agent
  let schemes = [];
  try {
    const recommendationRaw = await recommend({
      age: profile.age,
      state: profile.state,
      income: profile.income?.annualIncome,
      occupation: profile.occupation,
      category: profile.caste,
    });
    // Attempt to extract schemes from the markdown response
    // For simplicity in context passing, we'll pass the text or parse if it's JSON
    schemes = recommendationRaw;
  } catch (error) {
    console.warn('[JourneyService] Failed to fetch scheme recommendations:', error);
  }

  // 4. Send combined context to Gemini
  const profileContext = {
    profile: profile.toObject(),
    documents,
    schemes,
  };

  const aiData = await generateCitizenJourney(profileContext);

  // 5. Store journey
  // First, mark previous active journeys as completed
  await CitizenJourney.updateMany(
    { userId, status: 'active' },
    { $set: { status: 'completed' } }
  );

  const journey = new CitizenJourney({
    userId,
    profileSnapshot: {
      age: profile.age,
      location: profile.state,
      income: profile.income?.annualIncome,
      education: profile.education,
      occupation: profile.occupation,
    },
    journeyTitle: aiData.title,
    summary: aiData.summary,
    currentStage: {
      lifeStage: aiData.lifeStage,
      citizenCategory: profile.occupation || 'General',
      aiInsights: aiData.insights || [],
    },
    milestones: aiData.milestones.map((m) => ({
      timeframe: m.timeframe,
      title: m.title,
      description: m.description,
      reasoning: m.reasoning,
      priority: m.priority,
      category: m.category,
      requiredActions: m.actions.map((act) => ({
        actionText: act,
        completed: false,
      })),
      missingDocuments: m.documentsRequired || [],
    })),
    aiConfidence: aiData.confidence || 80,
    status: 'active',
  });

  await journey.save();
  return journey;
};

const markActionCompleted = async (userId, journeyId, actionId) => {
  const journey = await CitizenJourney.findOne({ _id: journeyId, userId });
  if (!journey) {
    throw new Error('Journey not found');
  }

  let actionFound = false;
  journey.milestones.forEach((milestone) => {
    milestone.requiredActions.forEach((action) => {
      if (action._id.toString() === actionId) {
        action.completed = true;
        actionFound = true;
      }
    });
  });

  if (!actionFound) {
    throw new Error('Action not found');
  }

  await journey.save();
  return journey;
};

module.exports = {
  generateJourney,
  getActiveJourney,
  markActionCompleted,
};
