const { generateContent } = require('../geminiClient');

/**
 * Detects the language of the given text using Gemini.
 * Returns language code: 'en', 'hi', or 'ml'. Defaults to 'en' if unsure.
 */
const detectLanguage = async (text) => {
  const prompt = `
[TASK]
Detect the language of the following user query.
Supported languages: 'en' (English), 'hi' (Hindi), 'ml' (Malayalam).
If the language is none of the above, or you are unsure, default to 'en'.

[RESPONSE FORMAT]
Respond ONLY with a valid JSON object:
{
  "languageCode": "en" | "hi" | "ml"
}

[QUERY]
"${text}"
`;

  try {
    const responseText = await generateContent(prompt);
    
    let cleaned = responseText.trim();
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (jsonMatch) {
      cleaned = jsonMatch[1].trim();
    }
    
    const result = JSON.parse(cleaned);
    return result.languageCode || 'en';
  } catch (error) {
    console.error('[LanguageDetector] Error detecting language, defaulting to en:', error.message);
    return 'en';
  }
};

module.exports = {
  detectLanguage,
};
