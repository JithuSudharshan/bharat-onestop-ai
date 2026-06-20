const { getModel } = require('../geminiClient');
const fs = require('fs');

/**
 * Converts a local file into a generative part format for Gemini.
 */
function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString('base64'),
      mimeType,
    },
  };
}

const extractDocumentData = async (filePath, mimeType) => {
  const model = getModel(); // Already configured to gemini-2.5-flash with JSON mode enabled

  const prompt = `
[TASK]
You are an expert Document Intelligence Agent for the Indian Government.
Analyze the uploaded document (which may be an Income Certificate, Marksheet, or Identity Document like Aadhaar/PAN).
Extract the following citizen details accurately if they are present in the document. 
If a field is not present or cannot be determined, return null for that field.

[REQUIRED EXTRACTION FIELDS]
- "name": Full name of the citizen
- "age": Age (number) or calculate age based on Date of Birth if present
- "income": Annual income (number) if it's an income certificate
- "location": State or District mentioned in the address
- "education": Education level (e.g., '10th Pass', 'secondary', 'graduate') if it's a marksheet
- "documentType": Classify the document (e.g., "Aadhaar Card", "Income Certificate", "10th Marksheet")
- "importantDates": Any notable dates (e.g., Date of Issue, Date of Birth, Valid Until)

[RESPONSE FORMAT]
You MUST respond ONLY with a valid JSON object matching this structure:
{
  "name": "String or null",
  "age": 0,
  "income": 0,
  "location": "String or null",
  "education": "String or null",
  "documentType": "String or null",
  "importantDates": ["Date 1", "Date 2"]
}
`;

  try {
    const filePart = fileToGenerativePart(filePath, mimeType);

    const result = await model.generateContent([prompt, filePart]);
    const responseText = result.response.text();

    let cleaned = responseText.trim();
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (jsonMatch) {
      cleaned = jsonMatch[1].trim();
    }

    const extractedJson = JSON.parse(cleaned);
    return extractedJson;
  } catch (error) {
    console.error('[DocumentAgent] Error extracting data:', error);
    throw new Error('Failed to extract data from document using AI.');
  }
};

module.exports = {
  extractDocumentData,
};
