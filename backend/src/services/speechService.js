const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Sends audio to Gemini for multilingual transcription
 * @param {Buffer} audioBuffer - The audio file buffer
 * @param {string} mimeType - The mime type of the audio
 * @returns {Promise<{transcript: string, language: string}>}
 */
const transcribeAudio = async (audioBuffer, mimeType = 'audio/webm') => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // We use gemini-flash-lite-latest as it is authorized for this API key and supports audio
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-flash-lite-latest" });

    const prompt = `
      Please carefully listen to the attached audio and provide an exact transcription. 
      The audio may be in English, Hindi, Malayalam, Tamil, Telugu, or Kannada.
      Return the result as a strict JSON object with two fields:
      - "transcript": The exact transcribed text.
      - "language": The language code of the spoken language (e.g., "en-IN", "hi-IN", "ml-IN").
      Do not include any markdown formatting or extra text.
    `;

    const audioPart = {
      inlineData: {
        data: audioBuffer.toString("base64"),
        mimeType: mimeType
      }
    };

    const result = await model.generateContent([prompt, audioPart]);
    const responseText = result.response.text().trim();
    
    // Clean up potential markdown blocks if Gemini includes them
    const cleanJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return { 
      transcript: parsed.transcript || '', 
      language: parsed.language || 'unknown' 
    };
  } catch (error) {
    console.error('[SpeechService] Exception:', error);
    if (error.status === 429 || error.message.includes('429')) {
      throw new Error('Google AI Quota Exceeded. Please wait a moment and try again.');
    }
    throw new Error(error.message || 'Speech-to-text processing failed.');
  }
};

module.exports = {
  transcribeAudio
};
