require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');
const { recommend } = require('./src/ai/agents/SchemeRecommendationAgent');
const CitizenProfile = require('./src/models/CitizenProfile');

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB.");
    
    // Get first citizen profile
    const profile = await CitizenProfile.findOne({});
    if (!profile) {
      console.log("No profile found.");
      process.exit(0);
    }
    
    console.log("Found profile:", profile._id);
    const recommendations = await recommend(profile);
    console.log("Recommendations generated successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Error in recommendSchemes:", err);
    process.exit(1);
  }
}

test();
