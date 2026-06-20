const { mongoVectorStore } = require('../vectorStore');

const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

const search = async (queryEmbedding, topK = 5, domain = null) => {
  const allChunks = await mongoVectorStore.getAllChunks(domain);
  
  if (allChunks.length === 0) return [];

  const scoredChunks = allChunks.map(chunk => ({
    ...chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scoredChunks.sort((a, b) => b.score - a.score);

  const threshold = 0.3;
  return scoredChunks
    .filter(c => c.score >= threshold)
    .slice(0, topK);
};

module.exports = {
  search,
  cosineSimilarity,
};
