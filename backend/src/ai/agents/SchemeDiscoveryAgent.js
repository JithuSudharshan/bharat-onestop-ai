const { generateContent } = require('../geminiClient');
const { getSystemPrompt } = require('../promptTemplates/systemPrompt');
const { getSchemeSearchTemplate } = require('../promptTemplates/schemeSearchTemplate');
const { wrapWithLanguage } = require('../promptTemplates/languageWrapper');

const processRequest = async (profile, query) => {
  const systemPrompt = getSystemPrompt();
  const rawPrompt = getSchemeSearchTemplate(profile, query);
  
  // Combine system prompt and user prompt
  let fullPrompt = `${systemPrompt}\n\n${rawPrompt}`;
  
  // Enforce language
  fullPrompt = wrapWithLanguage(fullPrompt, profile.preferredLanguage);

  const responseText = await generateContent(fullPrompt);

  return {
    intent: 'scheme_search',
    response: responseText,
  };
};

module.exports = {
  processRequest,
};
