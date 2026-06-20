const { generateContent } = require('../geminiClient');

/**
 * Translates any supported language text to English for internal processing.
 */
const translateToEnglish = async (text) => {
  const prompt = `
[TASK]
Translate the following user query into English. 
Maintain the original intent. Ensure government terms are translated to their closest English equivalent.

[RESPONSE FORMAT]
Respond ONLY with a valid JSON object:
{
  "translatedText": "The English translation here"
}

[QUERY]
"${text}"
`;

  try {
    const responseText = await generateContent(prompt);
    let cleaned = responseText.trim();
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (jsonMatch) cleaned = jsonMatch[1].trim();
    
    const result = JSON.parse(cleaned);
    return result.translatedText || text;
  } catch (error) {
    console.error('[TranslationService] Error translating to English:', error.message);
    return text; // Fallback to original text
  }
};

/**
 * Translates an internal English response to the user's preferred language.
 */
const translateToLanguage = async (text, targetLanguage) => {
  if (targetLanguage === 'en' || !targetLanguage) return text;
  
  const languageMap = {
    'hi': 'Hindi',
    'ml': 'Malayalam',
  };
  
  const targetName = languageMap[targetLanguage] || 'English';
  if (targetName === 'English') return text;

  const prompt = `
[TASK]
Translate the following English response into ${targetName}.
Maintain a professional, helpful tone suitable for a Government Scheme Advisor.
Ensure that official scheme names and government terminology remain accurate (you may keep scheme names in English if appropriate, or transliterate them).

[RESPONSE FORMAT]
Respond ONLY with a valid JSON object:
{
  "translatedText": "The translated response here"
}

[ENGLISH TEXT]
"${text}"
`;

  try {
    const responseText = await generateContent(prompt);
    let cleaned = responseText.trim();
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (jsonMatch) cleaned = jsonMatch[1].trim();
    
    const result = JSON.parse(cleaned);
    return result.translatedText || text;
  } catch (error) {
    console.error(`[TranslationService] Error translating to ${targetLanguage}:`, error.message);
    return text; // Fallback to English
  }
};

module.exports = {
  translateToEnglish,
  translateToLanguage,
};
