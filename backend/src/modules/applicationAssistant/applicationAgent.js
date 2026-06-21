const { generateContent } = require('../../ai/geminiClient');
const { APPLICATION_SYSTEM_PROMPT } = require('./applicationPrompt');

const generateApplicationDraft = async (context) => {
  const prompt = `
Context Information:
Selected Scheme: ${JSON.stringify(context.scheme, null, 2)}
Citizen Profile: ${JSON.stringify(context.profile, null, 2)}
Verified Documents: ${JSON.stringify(context.documents, null, 2)}

Based on the context provided above, generate the personalized application preparation plan according to the system rules and schema.
`;

  const finalPrompt = `${APPLICATION_SYSTEM_PROMPT}\n\n${prompt}`;

  try {
    const rawResponse = await generateContent(finalPrompt);

    // Clean markdown if present
    let cleanedResponse = rawResponse.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const applicationData = JSON.parse(cleanedResponse);
    return applicationData;
  } catch (error) {
    console.error('[ApplicationAgent] Failed to generate or parse application draft:', error);
    throw new Error('Failed to generate AI Application Draft');
  }
};

module.exports = {
  generateApplicationDraft,
};
