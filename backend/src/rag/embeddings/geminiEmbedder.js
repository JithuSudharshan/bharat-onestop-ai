const { embedContent } = require('../../ai/geminiClient');

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const embedBatch = async (chunks) => {
  const enrichedChunks = [];

  console.log(`[Embedder] Generating embeddings for ${chunks.length} chunks using Gemini text-embedding-004...`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    try {
      const embedding = await embedContent(chunk.content);
      
      enrichedChunks.push({
        ...chunk,
        embedding,
      });

      await delay(100); 

      if ((i + 1) % 10 === 0) {
        console.log(`[Embedder] Embedded ${i + 1} / ${chunks.length} chunks`);
      }
    } catch (error) {
      console.error(`[ERROR] Failed to embed chunk ${i} (${chunk.metadata.schemeId}):`, error.message);
    }
  }

  return enrichedChunks;
};

module.exports = {
  embedBatch,
};
