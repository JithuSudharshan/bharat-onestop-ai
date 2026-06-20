const getEligibilityTemplate = (profile, schemeName) => {
  return `
[CITIZEN PROFILE]
Name: ${profile.name}
Age: ${profile.age}
State: ${profile.state}
District: ${profile.district}
Occupation: ${profile.occupation || 'Not specified'}
Education: ${profile.education || 'Not specified'}
Annual Income: ₹${profile.income?.annualIncome || 'Not specified'}
Family Members: ${profile.familyDetails?.totalMembers || 1}

[SCHEME TO CHECK]
${schemeName}

[TASK]
Perform a detailed eligibility analysis for this specific scheme based ONLY on the provided citizen profile.
Provide your response in this exact structure:

1. **Verdict**: [ELIGIBLE / INELIGIBLE / NEED MORE INFO]
2. **Criteria Met**: 
   - (list each specific criteria of the scheme and state why the citizen meets it)
3. **Criteria Not Met / Blockers**: 
   - (list criteria the citizen fails, or write "None" if fully eligible)
4. **Missing Information**: 
   - (what else do you need to know to make a final decision?)
5. **Next Steps**: 
   - (how to apply or how to become eligible)`;
};

module.exports = {
  getEligibilityTemplate,
};
