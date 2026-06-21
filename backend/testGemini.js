require('dotenv').config({ path: __dirname + '/../../.env' });
const { generateContent } = require('./src/ai/geminiClient');

async function test() {
  try {
    console.log("Testing Gemini API...");
    const response = await generateContent("Hello, are you working?");
    console.log("Gemini Response:", response);
  } catch (error) {
    console.error("Gemini Error:", error.message);
  }
}

test();
