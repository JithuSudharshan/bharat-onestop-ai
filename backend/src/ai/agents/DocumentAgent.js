const { generateContent } = require('../geminiClient');
const { getSystemPrompt } = require('../promptTemplates/systemPrompt');
const { getDocumentGuideTemplate } = require('../promptTemplates/documentGuideTemplate');
const { wrapWithLanguage } = require('../promptTemplates/languageWrapper');

const processRequest = async (profile, purpose) => {
  const systemPrompt = getSystemPrompt();
  const rawPrompt = getDocumentGuideTemplate(profile, purpose);
  
  let fullPrompt = `${systemPrompt}\n\n${rawPrompt}`;
  fullPrompt = wrapWithLanguage(fullPrompt, profile.preferredLanguage);

  const responseText = await generateContent(fullPrompt);

  return {
    intent: 'document_guide',
    response: responseText,
  };
};

module.exports = {
  processRequest,
};
