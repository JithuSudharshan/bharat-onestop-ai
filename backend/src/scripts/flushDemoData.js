require('dotenv').config({ path: __dirname + '/../../.env' });
const mongoose = require('mongoose');

// Import models
const User = require('../models/User');
const CitizenProfile = require('../models/CitizenProfile');
const CitizenJourney = require('../models/CitizenJourney');
const Document = require('../documents/models/Document');
const Application = require('../modules/applicationAssistant/applicationModel');

const flushData = async () => {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected.');

    console.log('🗑️ Flushing User Accounts...');
    await User.deleteMany({});
    
    console.log('🗑️ Flushing Citizen Profiles...');
    await CitizenProfile.deleteMany({});
    
    console.log('🗑️ Flushing Citizen Journeys...');
    await CitizenJourney.deleteMany({});
    
    console.log('🗑️ Flushing Documents...');
    await Document.deleteMany({});
    
    console.log('🗑️ Flushing Generated Applications...');
    await Application.deleteMany({});

    console.log('✨ Demo Data Successfully Flushed! You are ready to record.');
    
    // Note: Deliberately NOT flushing DocumentChunk so your RAG Vector DB remains intact!
    
    process.exit(0);
  } catch (error) {
    console.error('Error flushing data:', error);
    process.exit(1);
  }
};

flushData();
