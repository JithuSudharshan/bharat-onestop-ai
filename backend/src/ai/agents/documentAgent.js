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
Analyze the uploaded document. Extract highly structured citizen intelligence data.
If a field is not present or cannot be determined securely, return null for that field.

[REQUIRED RESPONSE FORMAT]
You MUST respond ONLY with a valid JSON object matching exactly this structure:
{
 "documentType": "String or null",
 "identity": {
    "documentNumber": "String or null",
    "documentCategory": "String or null",
    "issuingAuthority": "String or null",
    "verificationStatus": "String (e.g., 'Verified', 'Unverified')"
 },
 "personal": {
    "name": "String or null",
    "dob": "String (YYYY-MM-DD) or null",
    "age": "Number or null",
    "gender": "String or null"
 },
 "address": {
    "house": "String or null",
    "street": "String or null",
    "village": "String or null",
    "district": "String or null",
    "state": "String or null",
    "pincode": "String or null"
 },
 "income": {
    "annualIncome": "Number or null",
    "incomeCategory": "String or null",
    "certificateDate": "String or null",
    "validity": "String or null",
    "issuingAuthority": "String or null"
 },
 "education": {
    "qualification": "String or null",
    "institution": "String or null",
    "stream": "String or null",
    "passingYear": "Number or null",
    "marks": "Number or null",
    "percentage": "Number or null"
 },
 "employment": {
    "occupation": "String or null",
    "employmentType": "String or null",
    "organization": "String or null"
 },
 "family": {
    "familyMembers": "Number or null",
    "dependents": "Number or null",
    "familyIncome": "Number or null"
 },
 "eligibilitySignals": {
    "student": "Boolean",
    "farmer": "Boolean",
    "seniorCitizen": "Boolean",
    "lowIncome": "Boolean",
    "disability": "Boolean"
 },
 "importantDates": ["Date 1", "Date 2"],
 "missingInformation": ["Suggestion 1", "Suggestion 2"],
 "confidence": {
    "overall": "Number (0-100)",
    "fields": {
       "personal": "Number (0-100)",
       "income": "Number (0-100)",
       "education": "Number (0-100)"
    }
 }
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
