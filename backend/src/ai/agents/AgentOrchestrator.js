const SchemeDiscoveryAgent = require('./SchemeDiscoveryAgent');
const EligibilityAgent = require('./EligibilityAgent');
const DocumentAgent = require('./DocumentAgent');
const ChatAgent = require('./ChatAgent');
const { detectLanguage } = require('../language/languageDetector');
const { translateToEnglish, translateToLanguage } = require('../language/translationService');

// Keyword-based intent detection
const detectIntent = (message) => {
  const lower = message.toLowerCase();
  if (/scheme|yojana|benefit|subsidy|help me find/.test(lower)) return 'scheme_search';
  if (/eligible|qualify|am i|can i get/.test(lower)) return 'eligibility';
  if (/document|paper|certificate|proof/.test(lower)) return 'document_guide';
  return 'general_chat';
};

const orchestrate = async ({ profile, message, history = [] }) => {
  // 1. Language Detection & Translation to English
  const detectedLang = await detectLanguage(message);
  const isNativeEnglish = detectedLang === 'en';
  const englishMessage = isNativeEnglish ? message : await translateToEnglish(message);

  // 2. Intent Detection (using English text)
  const intent = detectIntent(englishMessage);

  // 3. Process Request Internally in English
  let result;
  switch (intent) {
    case 'scheme_search':
      result = await SchemeDiscoveryAgent.processRequest(profile, englishMessage);
      break;
    case 'eligibility':
      result = await EligibilityAgent.processRequest(profile, englishMessage);
      break;
    case 'document_guide':
      result = await DocumentAgent.processRequest(profile, englishMessage);
      break;
    case 'general_chat':
    default:
      result = await ChatAgent.processRequest(profile, englishMessage, history);
      break;
  }

  // 4. Translate Response back to native language if needed
  if (!isNativeEnglish && result.response) {
    result.response = await translateToLanguage(result.response, detectedLang);
  }

  // 5. Update History
  if (!result.history) {
    result.history = [
      ...history,
      { role: 'user', parts: [{ text: message }] }, // Store original message
      { role: 'model', parts: [{ text: result.response }] }, // Store translated response
    ];
  }

  return result;
};

module.exports = {
  orchestrate,
  detectIntent, // Exported for testing
};
