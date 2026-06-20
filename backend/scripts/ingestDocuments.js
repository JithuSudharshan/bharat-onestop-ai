require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { processDocument } = require('../src/rag/documentProcessor');
const { splitText } = require('../src/rag/textSplitter');
const { embedChunks } = require('../src/rag/embeddingService');
const { saveChunks } = require('../src/rag/vectorStore');

const docsDir = path.join(__dirname, '../data/documents');

const run = async () => {
  console.log('🚀 Starting Document Ingestion Pipeline...');

  // Connect DB
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bharat-onestop');
  console.log('✅ Connected to MongoDB');

  if (!fs.existsSync(docsDir)) {
    console.log(`Directory not found: ${docsDir}. Creating it...`);
    fs.mkdirSync(docsDir, { recursive: true });
    console.log('Please add PDF or TXT files to data/documents/ and run again.');
    process.exit(0);
  }

  const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.pdf') || f.endsWith('.txt'));

  if (files.length === 0) {
    console.log('⚠️ No documents found in data/documents/');
    process.exit(0);
  }

  let totalChunksSaved = 0;

  for (const file of files) {
    console.log(`\n📄 Processing ${file}...`);
    const filePath = path.join(docsDir, file);
    
    try {
      // 1. Parse
      const { rawText } = await processDocument(filePath);
      console.log(`   Parsed ${rawText.length} characters of text.`);

      // 2. Chunk
      const textChunks = splitText(rawText, 500, 50);
      console.log(`   Split into ${textChunks.length} chunks.`);

      const chunkObjects = textChunks.map((content, i) => ({
        sourceFile: file,
        chunkIndex: i,
        content,
        // Basic metadata extraction from filename if possible
        metadata: {
          domain: file.toLowerCase().includes('agri') ? 'agriculture' : 'general',
        }
      }));

      // 3. Embed
      const enrichedChunks = await embedChunks(chunkObjects);

      // 4. Save
      const savedCount = await saveChunks(enrichedChunks);
      console.log(`✅ Saved ${savedCount} chunks to MongoDB for ${file}`);
      totalChunksSaved += savedCount;

    } catch (err) {
      console.error(`❌ Failed to process ${file}:`, err.message);
    }
  }

  console.log(`\n🎉 Ingestion Complete! Total chunks saved: ${totalChunksSaved}`);
  process.exit(0);
};

run();
