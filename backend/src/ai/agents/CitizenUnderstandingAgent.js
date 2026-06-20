const { generateContent } = require('../geminiClient');
const { getCitizenUnderstandingTemplate } = require('../promptTemplates/citizenUnderstandingTemplate');

const extractJSON = (rawText) => {
  // Strip markdown code fences if present
  const cleaned = rawText.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned);
};

const analyze = async (profile) => {
  const prompt = getCitizenUnderstandingTemplate(profile);
  
  const responseText = await generateContent(prompt);
  
  let parsedData;
  try {
    parsedData = extractJSON(responseText);
  } catch (error) {
    const err = new Error('AI analysis failed to return structured data');
    err.statusCode = 502;
    throw err;
  }

  const REQUIRED_KEYS = ['userCategory', 'detectedNeeds', 'recommendedDomains', 'confidenceScore'];
  for (const key of REQUIRED_KEYS) {
    if (!(key in parsedData)) {
      const err = new Error(`AI analysis missing required key: ${key}`);
      err.statusCode = 502;
      throw err;
    }
  }

  return parsedData;
};

module.exports = {
  analyze,
};
