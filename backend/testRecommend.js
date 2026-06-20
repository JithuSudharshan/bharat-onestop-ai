require('dotenv').config({ path: './.env' });
const connectDB = require('./src/utils/db');
const { recommend } = require('./src/ai/agents/SchemeRecommendationAgent');

const test = async () => {
  await connectDB();
  const profile = {
      name: "Ramesh Kumar",
      age: 45,
      state: "Kerala",
      district: "Palakkad",
      occupation: "Farmer",
      education: "secondary",
      income: {
        annualIncome: 50000,
        currency: "INR"
      },
      familyDetails: {
        totalMembers: 4,
        members: []
      },
      preferredLanguage: "ml",
      requirements: [
        "Financial support for crops",
        "Healthcare for family"
      ]
  };

  try {
    const result = await recommend(profile);
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
};

test();
