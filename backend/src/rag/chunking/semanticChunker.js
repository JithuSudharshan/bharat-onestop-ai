/**
 * Converts structured JSON scheme data into highly contextual string chunks.
 * We split each scheme into logical chunks (Core, Eligibility, Benefits, Process)
 * so the vector retriever can match specific intent accurately.
 */
const chunkSchemes = (schemes) => {
  const allChunks = [];

  schemes.forEach((scheme) => {
    const baseMetadata = {
      domain: scheme.category,
      ministry: scheme.sourceInformation?.ministry || 'Unknown',
      sourceFile: scheme._sourceFile || 'unknown.json',
      schemeId: scheme.schemeId,
    };

    // Chunk 1: Core Description
    if (scheme.description) {
      allChunks.push({
        sourceFile: baseMetadata.sourceFile,
        chunkIndex: 0,
        content: `Scheme Name: ${scheme.schemeName}\nCategory: ${scheme.category}\nDescription: ${scheme.description}`,
        metadata: { ...baseMetadata, chunkType: 'core' },
      });
    }

    // Chunk 2: Eligibility Criteria
    if (scheme.eligibilityCriteria && scheme.eligibilityCriteria.length > 0) {
      allChunks.push({
        sourceFile: baseMetadata.sourceFile,
        chunkIndex: 1,
        content: `Scheme Name: ${scheme.schemeName}\nEligibility Criteria:\n- ${scheme.eligibilityCriteria.join('\n- ')}`,
        metadata: { ...baseMetadata, chunkType: 'eligibility' },
      });
    }

    // Chunk 3: Benefits
    if (scheme.benefits && scheme.benefits.length > 0) {
      allChunks.push({
        sourceFile: baseMetadata.sourceFile,
        chunkIndex: 2,
        content: `Scheme Name: ${scheme.schemeName}\nBenefits:\n- ${scheme.benefits.join('\n- ')}`,
        metadata: { ...baseMetadata, chunkType: 'benefits' },
      });
    }

    // Chunk 4: Documents and Process
    let processText = `Scheme Name: ${scheme.schemeName}\n`;
    if (scheme.requiredDocuments && scheme.requiredDocuments.length > 0) {
      processText += `Required Documents:\n- ${scheme.requiredDocuments.join('\n- ')}\n`;
    }
    if (scheme.applicationProcess && scheme.applicationProcess.length > 0) {
      processText += `Application Process:\n- ${scheme.applicationProcess.join('\n- ')}\n`;
    }
    
    if (scheme.requiredDocuments?.length > 0 || scheme.applicationProcess?.length > 0) {
      allChunks.push({
        sourceFile: baseMetadata.sourceFile,
        chunkIndex: 3,
        content: processText.trim(),
        metadata: { ...baseMetadata, chunkType: 'process' },
      });
    }
  });

  return allChunks;
};

module.exports = {
  chunkSchemes,
};
