const getDocumentGuideTemplate = (profile, purpose) => {
  return `
[CITIZEN PROFILE]
Name: ${profile.name}
State: ${profile.state}
District: ${profile.district}
Occupation: ${profile.occupation || 'Not specified'}
Annual Income: ₹${profile.income?.annualIncome || 'Not specified'}

[PURPOSE]
${purpose}

[TASK]
Generate a complete, practical document checklist for this specific purpose in ${profile.state}.
Provide your response in this exact structure:

1. **Mandatory Documents**:
   - (List each document and briefly explain WHY it is needed)
2. **Optional / Supporting Documents**:
   - (Documents that might speed up the process or serve as alternatives)
3. **Where to obtain them**:
   - (Briefly explain where to get missing documents, e.g., "Income certificate from Tehsildar office")
4. **Common Rejection Reasons**:
   - (What mistakes should they avoid?)`;
};

module.exports = {
  getDocumentGuideTemplate,
};
