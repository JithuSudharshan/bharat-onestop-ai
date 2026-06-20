const getSchemeSearchTemplate = (profile, query) => {
  return `
[CITIZEN CONTEXT]
Name: ${profile.name}
Age: ${profile.age}
State: ${profile.state}
District: ${profile.district}
Occupation: ${profile.occupation || 'Not specified'}
Education: ${profile.education || 'Not specified'}
Annual Income: ₹${profile.income?.annualIncome || 'Not specified'}
Family Members: ${profile.familyDetails?.totalMembers || 1}
Requirements: ${profile.requirements?.join(', ') || 'General assistance'}

[USER QUERY]
${query}

[TASK]
Based on the citizen profile above and their query, identify the top 3 to 5 most relevant central and state government schemes they might be eligible for. 
For each scheme provide exactly this structure:
1. **Scheme Name**: 
2. **Ministry/Department**: 
3. **Benefit**: (one sentence summary)
4. **Why you qualify**: (explain based on their age, income, state, etc.)
5. **How to apply**: (brief steps or online/offline mention)
6. **Official URL**: (if known)

Do not include schemes they are clearly ineligible for. If no schemes match, explain why and offer general advice.`;
};

module.exports = {
  getSchemeSearchTemplate,
};
