const getCitizenUnderstandingTemplate = (profile) => {
  return `
[CITIZEN PROFILE DATA]
Name: ${profile.name}
Age: ${profile.age}
State: ${profile.state}
District: ${profile.district}
Occupation: ${profile.occupation || 'Not specified'}
Education: ${profile.education || 'Not specified'}
Annual Income: ₹${profile.income?.annualIncome || 'Not specified'}
Family Members: ${profile.familyDetails?.totalMembers || 1}
Self-declared Requirements: ${profile.requirements?.join(', ') || 'Not specified'}

[ANALYSIS TASK]
Analyze this citizen profile and determine:
1. What social/economic category this citizen belongs to.
2. What are their most pressing needs based on income, occupation, age, and requirements.
3. Which government service domains (agriculture, health, education, etc.) are most relevant.
4. How confident you are in this assessment.

[RESPONSE FORMAT — CRITICAL]
Respond ONLY with a valid JSON object. Do not include any text, explanation, or 
markdown code fences before or after the JSON. The response must be parseable 
by JSON.parse() directly.

{
  "userCategory": "string (e.g., Rural Farmer, Urban Student, BPL Household)",
  "detectedNeeds": ["array", "of", "specific", "needs"],
  "recommendedDomains": ["agriculture", "education", "health", "social welfare"],
  "confidenceScore": "decimal string between 0.00 and 1.00"
}`;
};

module.exports = {
  getCitizenUnderstandingTemplate,
};
