const { getModel } = require('../ai/geminiClient');

const normalizeTranscript = async (rawTranscript) => {
  try {
    const model = getModel();
    const prompt = `
[TASK]
You are an expert transcriber and intent analyzer for the Bharat OneStop AI platform.
The user used browser speech recognition which sometimes produces transliteration errors or phonetic mistakes, especially for Indian languages.
Clean the speech transcript and extract the core intent.

[BHARAT ONESTOP VOCABULARY]
Aadhaar, Income Certificate, Scholarship, PM Kisan, Ration Card, Ayushman Bharat, Pension, Government Scheme, EWS Certificate.

[INPUT]
Raw Transcript: "${rawTranscript}"

[REQUIRED OUTPUT]
Return a JSON object:
{
  "normalized": "The cleaned, phonetically corrected transcript in its native language. Fix vocabulary errors based on the list above.",
  "language": "The language it is written in (e.g. English, Malayalam, Hindi)",
  "intent": {
    "category": "e.g. education, identity, agriculture",
    "request": "A short summary of what they want"
  }
}
`;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    let cleaned = responseText.trim();
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (jsonMatch) {
      cleaned = jsonMatch[1].trim();
    }
    
    return JSON.parse(cleaned);
  } catch (error) {
    console.error('[TranscriptNormalizer] Failed to normalize:', error);
    // Fallback to raw if Gemini fails
    return {
      normalized: rawTranscript,
      language: "Unknown",
      intent: { category: "general", request: rawTranscript }
    };
  }
};

module.exports = {
  normalizeTranscript
};
