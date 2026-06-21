const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');

let genAI = null;
let model = null;

const initializeGemini = () => {
  if (!process.env.GEMINI_API_KEY) {
    console.error('FATAL: GEMINI_API_KEY is not defined in environment variables');
    throw new Error('GEMINI_API_KEY is missing');
  }

  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const generationConfig = {
    temperature: 0.7,
    topP: 0.9,
    topK: 50,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-flash-lite-latest',
    generationConfig,
    safetySettings,
  });

  console.log('✅ Gemini API Client Initialized');
};

const getModel = () => {
  if (!model) {
    initializeGemini();
  }
  return model;
};

const generateContent = async (prompt) => {
  const currentModel = getModel();
  const result = await currentModel.generateContent(prompt);
  return result.response.text();
};

const embedContent = async (text) => {
  if (!genAI) initializeGemini();
  const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
};

const startChat = (systemInstruction, history = []) => {
  // Using systemInstruction pattern for Gemini 1.5
  const currentModel = getModel();
  return currentModel.startChat({
    history,
    systemInstruction,
  });
};

module.exports = {
  initializeGemini,
  getModel,
  generateContent,
  embedContent,
  startChat,
};
