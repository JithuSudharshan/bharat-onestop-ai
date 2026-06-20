const { embedContent, generateContent } = require('../geminiClient');
const { similaritySearch } = require('../../rag/retriever');
const { getRecommendationTemplate } = require('../promptTemplates/schemeRecommendationTemplate');

const recommend = async (profile) => {
  // 1. Generate a search query based on profile
  const searchQuery = `Government schemes for ${profile.occupation || 'citizen'} in ${profile.state} with income ${profile.income?.annualIncome || 0}. Needs: ${profile.requirements?.join(' ')}`;
  
  // 2. Embed and retrieve chunks
  const queryEmbedding = await embedContent(searchQuery);
  const chunks = await similaritySearch.search(queryEmbedding, 8); // Get top 8 chunks
  
  if (chunks.length === 0) {
    return { recommendedSchemes: [] };
  }

  // 3. Format chunks for prompt
  const contextString = chunks.map(c => `[${c.sourceFile} - ${c.metadata.chunkType}]\n${c.content}\n`).join('\n---\n');

  // 4. Generate Prompt
  const prompt = getRecommendationTemplate(profile, contextString);

  // 5. Call Gemini
  const responseText = await generateContent(prompt);

  // 6. Parse and Validate JSON
  const cleaned = responseText.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
  
  let result;
  try {
    result = JSON.parse(cleaned);
  } catch (error) {
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
