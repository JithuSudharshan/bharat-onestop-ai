const getRecommendationTemplate = (profile, retrievedContext) => {
  return `
[CITIZEN PROFILE]
Name: ${profile.name}
Age: ${profile.age}
State: ${profile.state}
District: ${profile.district}
Occupation: ${profile.occupation || 'Not specified'}
Annual Income: ₹${profile.income?.annualIncome || 'Not specified'}
Family Members: ${profile.familyDetails?.totalMembers || 'Not specified'}
Requirements: ${profile.requirements?.join(', ') || 'Not specified'}

[AVAILABLE SCHEMES CONTEXT]
${retrievedContext}

[TASK]
Act as an expert Indian Government Scheme Advisor.
Analyze the Citizen Profile against the Available Schemes Context.
Identify 1 to 3 schemes the citizen is highly likely to be eligible for.
Generate a matchScore (percentage string) based on how well their profile matches the eligibility.

[CITATION RULES — STRICT]
1. You MUST NOT recommend any scheme that is not explicitly present in the [AVAILABLE SCHEMES CONTEXT].
2. For every recommendation, you MUST provide an "evidence" array.
3. Every evidence object MUST cite the exact [SOURCE_ID], Document, and Section from the context.
4. If the context does not support a recommendation, DO NOT recommend it.

[RESPONSE FORMAT — CRITICAL]
Respond ONLY with a valid JSON object. Do not include any text, explanation, or markdown fences.
{
  "recommendedSchemes": [
    {
      "name": "Scheme Name",
      "matchScore": "85%",
      "reasoning": "Specific reason tailored to their profile.",
      "benefits": ["Benefit 1", "Benefit 2"],
      "requiredDocuments": ["Doc 1", "Doc 2"],
      "evidence": [
        {
          "source": "Source file or URL",
          "document": "Scheme Name Document",
          "section": "Eligibility or Benefits",
          "relevantText": "Exact quote from the context proving eligibility"
        }
      ]
    }
  ],
  "confidenceScore": "0.95"
}
`;
};

module.exports = {
  getRecommendationTemplate,
};
