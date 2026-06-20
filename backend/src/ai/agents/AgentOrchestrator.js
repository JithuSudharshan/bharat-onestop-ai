const SchemeDiscoveryAgent = require('./SchemeDiscoveryAgent');
const EligibilityAgent = require('./EligibilityAgent');
const DocumentAgent = require('./DocumentAgent');
const ChatAgent = require('./ChatAgent');

// Keyword-based intent detection
const detectIntent = (message) => {
  const lower = message.toLowerCase();
  if (/scheme|yojana|benefit|subsidy|help me find/.test(lower)) return 'scheme_search';
  if (/eligible|qualify|am i|can i get/.test(lower)) return 'eligibility';
  if (/document|paper|certificate|proof/.test(lower)) return 'document_guide';
  return 'general_chat';
};

const orchestrate = async ({ profile, message, history = [] }) => {
  const intent = detectIntent(message);

  let result;
  switch (intent) {
    case 'scheme_search':
      result = await SchemeDiscoveryAgent.processRequest(profile, message);
      break;
    case 'eligibility':
      result = await EligibilityAgent.processRequest(profile, message);
      break;
    case 'document_guide':
      result = await DocumentAgent.processRequest(profile, message);
      break;
    case 'general_chat':
    default:
      result = await ChatAgent.processRequest(profile, message, history);
      break;
  }

  // The chat agent returns updated history, others are single-turn but we can pass history back
  if (!result.history) {
    result.history = [
      ...history,
      { role: 'user', parts: [{ text: message }] },
      { role: 'model', parts: [{ text: result.response }] },
    ];
  }

  return result;
};

module.exports = {
  orchestrate,
  detectIntent, // Exported for testing
};
