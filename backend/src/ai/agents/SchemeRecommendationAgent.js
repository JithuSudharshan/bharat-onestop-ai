const { embedContent, generateContent } = require('../geminiClient');
const { getRecommendationTemplate } = require('../promptTemplates/schemeRecommendationTemplate');
const { getEvidenceContext } = require('../../rag/citations/citationService');
const { formatSourcesForPrompt } = require('../../rag/citations/sourceFormatter');

const recommend = async (profile) => {
  // 1. Generate a search query based on profile
  const searchQuery = `Government schemes for ${profile.occupation || 'citizen'} in ${profile.state} with income ${profile.income?.annualIncome || 0}. Needs: ${profile.requirements?.join(' ')}`;
  
  // 2. Embed and retrieve chunks
  const queryEmbedding = await embedContent(searchQuery);
  const chunks = await getEvidenceContext(queryEmbedding, 20); // Increased to top 20 chunks to evaluate all possible schemes
  
  if (chunks.length === 0) {
    return { recommendedSchemes: [] };
  }

  // 3. Format chunks for prompt with strict Evidence/Citation layout
  const contextString = formatSourcesForPrompt(chunks);

  // 4. Generate Prompt
  const prompt = getRecommendationTemplate(profile, contextString);

  // 5. Call Gemini
  const responseText = await generateContent(prompt);

  // 6. Parse and Validate JSON
  let cleaned = responseText.trim();
  const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (jsonMatch) {
    cleaned = jsonMatch[1].trim();
  }
  
  let result;
  try {
    result = JSON.parse(cleaned);
  } catch (error) {
    console.error('Raw AI Response:', responseText);
    const err = new Error('AI recommendation failed to return structured data');
    err.statusCode = 502;
    throw err;
  }

  if (!result.recommendedSchemes || !Array.isArray(result.recommendedSchemes)) {
    const err = new Error('Invalid AI response format: missing recommendedSchemes array');
    err.statusCode = 502;
    throw err;
  }

  return result;
};

module.exports = {
  recommend,
};
