const SchemeDiscoveryAgent = require('./SchemeDiscoveryAgent');
const EligibilityAgent = require('./EligibilityAgent');
const DocumentAgent = require('./DocumentAgent');
const ChatAgent = require('./ChatAgent');
const { detectLanguage } = require('../language/languageDetector');
const { translateToEnglish, translateToLanguage } = require('../language/translationService');

const { coordinate } = require('./orchestrator/agentCoordinator');

// Keyword-based intent detection (Deprecated, replaced by AI planner but kept for backwards compatibility)
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

  // 2. Delegate to the AI Agent Coordinator (Phase 16)
  let result = await coordinate(profile, englishMessage);

  // 3. Translate Response back to native language if needed
  if (!isNativeEnglish && result.finalResponse) {
    result.finalResponse = await translateToLanguage(result.finalResponse, detectedLang);
  }

  // 4. Update History
  if (!result.history) {
    result.history = [
      ...history,
      { role: 'user', parts: [{ text: message }] }, // Store original message
      { role: 'model', parts: [{ text: result.finalResponse }] }, // Store translated response
    ];
  }

  return result;
};

module.exports = {
  orchestrate,
  detectIntent, // Exported for testing
};
