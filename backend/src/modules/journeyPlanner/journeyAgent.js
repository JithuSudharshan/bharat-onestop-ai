const { generateContent } = require('../../ai/geminiClient');
const { JOURNEY_PLANNER_SYSTEM_PROMPT } = require('./journeyPrompt');

const generateCitizenJourney = async (profileContext) => {
  const prompt = `
Context Information:
Citizen Profile: ${JSON.stringify(profileContext.profile, null, 2)}
Verified Documents: ${JSON.stringify(profileContext.documents, null, 2)}
Recommended Schemes: ${JSON.stringify(profileContext.schemes, null, 2)}

Based on the context provided above, generate the personalized citizen roadmap according to the system rules and schema.
`;

  const finalPrompt = `${JOURNEY_PLANNER_SYSTEM_PROMPT}\n\n${prompt}`;

  try {
    const rawResponse = await generateContent(finalPrompt);

    // Clean markdown if present
    let cleanedResponse = rawResponse.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const journeyData = JSON.parse(cleanedResponse);
    return journeyData;
  } catch (error) {
    console.error('[JourneyAgent] Failed to generate or parse journey:', error);
    throw new Error('Failed to generate AI Citizen Journey');
  }
};

module.exports = {
  generateCitizenJourney,
};
