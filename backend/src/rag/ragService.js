const { embedContent, generateContent } = require('../ai/geminiClient');
const { similaritySearch: retriever } = require('./retriever');
const { getRagPromptTemplate } = require('../ai/promptTemplates/ragPromptTemplate');
const { wrapWithLanguage } = require('../ai/promptTemplates/languageWrapper');

const query = async ({ question, profile, domain = null }) => {
  // 1. Embed the query
  let queryEmbedding;
  try {
    queryEmbedding = await embedContent(question);
  } catch (error) {
    throw new Error(`Failed to embed query: ${error.message}`);
  }

  // 2. Retrieve top 5 relevant chunks
  const relevantChunks = await retriever.search(queryEmbedding, 5, domain);

  if (relevantChunks.length === 0) {
    return { 
      answer: 'I could not find any relevant government documents to answer your question.', 
      sources: [] 
    };
  }

  // 3. Build RAG prompt
  let prompt = getRagPromptTemplate(relevantChunks, profile, question);
  
  // 4. Enforce language
  prompt = wrapWithLanguage(prompt, profile.preferredLanguage);

  // 5. Generate answer with Gemini
  let answer;
  try {
    answer = await generateContent(prompt);
  } catch (error) {
    throw new Error(`Failed to generate answer: ${error.message}`);
  }

  // 6. Return answer + sources for citation
  return {
    answer,
    sources: relevantChunks.map(c => ({
      file: c.sourceFile,
      page: c.pageNumber,
      relevanceScore: c.score.toFixed(3),
    })),
  };
};

module.exports = {
  query,
};
