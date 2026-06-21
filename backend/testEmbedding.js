require('dotenv').config({ path: __dirname + '/.env' });
const { embedContent } = require('./src/ai/geminiClient');

async function test() {
  try {
    console.log("Testing text-embedding-004...");
    const embedding = await embedContent("Hello, world!");
    console.log("Success! Embedding length:", embedding.length);
  } catch (error) {
    console.error("Embedding Error:", error);
  }
}

test();
