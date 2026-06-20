const { jsonLoader } = require('./loaders');
const { semanticChunker } = require('./chunking');
const { geminiEmbedder } = require('./embeddings');
const { mongoVectorStore } = require('./vectorStore');

const runIngestion = async () => {
  console.log('🚀 Starting Modular JSON Ingestion Pipeline...');

  // 1. Load
  console.log('[Pipeline] Loading schemes from JSON files...');
  const schemes = jsonLoader.loadAllSchemes();
  if (schemes.length === 0) {
    console.log('⚠️ No schemes found to process. Exiting.');
    return;
  }
  console.log(`[Pipeline] Loaded ${schemes.length} schemes.`);

  // 2. Chunk
  console.log('[Pipeline] Semantically chunking schemes...');
  const chunks = semanticChunker.chunkSchemes(schemes);
  console.log(`[Pipeline] Generated ${chunks.length} semantic chunks.`);

  // 3. Embed
  console.log('[Pipeline] Generating embeddings...');
  const embeddedChunks = await geminiEmbedder.embedBatch(chunks);
  console.log(`[Pipeline] Generated embeddings for ${embeddedChunks.length} chunks.`);

  // 4. Store
  console.log('[Pipeline] Storing chunks in MongoDB...');
  const savedCount = await mongoVectorStore.saveChunks(embeddedChunks);
  
  console.log(`🎉 Ingestion Complete! Successfully stored ${savedCount} chunks in the vector database.`);
};

module.exports = {
  runIngestion,
};
