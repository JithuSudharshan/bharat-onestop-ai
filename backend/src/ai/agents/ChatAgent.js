const { startChat } = require('../geminiClient');
const { getSystemPrompt } = require('../promptTemplates/systemPrompt');
const { wrapWithLanguage } = require('../promptTemplates/languageWrapper');

const processRequest = async (profile, message, history = []) => {
  let systemPrompt = getSystemPrompt();
  
  // Provide basic profile context to the general chat agent
  const profileContext = `\n[CITIZEN CONTEXT]\nName: ${profile.name}\nState: ${profile.state}\nLanguage: ${profile.preferredLanguage}`;
  systemPrompt += profileContext;

  // Enforce language
  const finalMessage = wrapWithLanguage(message, profile.preferredLanguage);

  // Start chat session
  const chatSession = startChat(systemPrompt, history);
  
  // Send message
  const result = await chatSession.sendMessage(finalMessage);
  
  // Extract new history
  const updatedHistory = await chatSession.getHistory();

  return {
    intent: 'general_chat',
    response: result.response.text(),
    history: updatedHistory,
  };
};

module.exports = {
  processRequest,
};
