const SchemeRecommendationAgent = require('./SchemeRecommendationAgent');

// Wrapper since the Recommendation Agent internally checks eligibility via RAG context
module.exports = SchemeRecommendationAgent;
