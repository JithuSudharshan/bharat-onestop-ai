require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const { runIngestion } = require('../src/rag/pipeline');

const run = async () => {
  try {
    // Connect DB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bharat-onestop');
    console.log('✅ Connected to MongoDB');

    // Run pipeline
    await runIngestion();
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Pipeline execution failed:', error);
    process.exit(1);
  }
};

run();
