require('dotenv').config({ path: './.env' });
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const listModels = async () => {
  try {
    const models = await genAI.getModels();
    console.log("Available models:");
    models.forEach(model => console.log(model.name));
  } catch (error) {
    console.error("Failed to list models:", error.message);
  }
};

listModels();
