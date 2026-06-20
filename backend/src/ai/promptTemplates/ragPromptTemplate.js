const getRagPromptTemplate = (retrievedChunks, profile, query) => {
  const contextString = retrievedChunks.map((chunk, index) => {
    return `--- Source ${index + 1}: ${chunk.sourceFile} (Relevance: ${chunk.score.toFixed(2)}) ---\n${chunk.content}\n`;
  }).join('\n');

  return `
[RETRIEVED GOVERNMENT DOCUMENTS]
${contextString}

[CITIZEN PROFILE]
Name: ${profile.name}
State: ${profile.state}
District: ${profile.district}
Age: ${profile.age}
Income: ₹${profile.income?.annualIncome || 'Not specified'}
Occupation: ${profile.occupation || 'Not specified'}

[USER QUESTION]
${query}

[INSTRUCTIONS]
You are a knowledgeable assistant for the Government of India.
Answer the citizen's question using ONLY the provided retrieved documents.
1. Be helpful and clear.
2. If the answer is not in the documents, say "I don't have specific official information on this right now. Please visit the official scheme website or nearest CSC center."
3. Do NOT make up information or hallucinate.
4. When you state a fact from the documents, always cite the source file (e.g., "According to [PM_KISAN_Guidelines.pdf]...").
5. Consider the citizen's profile to make your answer relevant to their specific situation if applicable.`;
};

module.exports = {
  getRagPromptTemplate,
};
