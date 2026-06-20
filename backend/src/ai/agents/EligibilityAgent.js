const { generateContent } = require('../geminiClient');
const { getSystemPrompt } = require('../promptTemplates/systemPrompt');
const { getEligibilityTemplate } = require('../promptTemplates/eligibilityTemplate');
const { wrapWithLanguage } = require('../promptTemplates/languageWrapper');

const processRequest = async (profile, schemeName) => {
  const systemPrompt = getSystemPrompt();
  const rawPrompt = getEligibilityTemplate(profile, schemeName);
  
  let fullPrompt = `${systemPrompt}\n\n${rawPrompt}`;
  fullPrompt = wrapWithLanguage(fullPrompt, profile.preferredLanguage);

  const responseText = await generateContent(fullPrompt);

  return {
    intent: 'eligibility',
    response: responseText,
  };
};

module.exports = {
  processRequest,
};
