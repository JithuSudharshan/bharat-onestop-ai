require('dotenv').config({ path: __dirname + '/../../.env' });
const mongoose = require('mongoose');
const { runIngestion } = require('../rag/pipeline');

const seed = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');
    
    await runIngestion();
    
    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
