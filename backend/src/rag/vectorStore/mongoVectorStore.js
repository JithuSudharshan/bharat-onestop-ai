const DocumentChunk = require('../../models/DocumentChunk');

const saveChunks = async (enrichedChunks) => {
  if (!enrichedChunks || enrichedChunks.length === 0) return 0;
  
  // Clear existing chunks for the schemes being ingested to prevent duplicates
  const uniqueFiles = [...new Set(enrichedChunks.map(c => c.sourceFile))];
  await DocumentChunk.deleteMany({ sourceFile: { $in: uniqueFiles } });

  const result = await DocumentChunk.insertMany(enrichedChunks);
  return result.length;
};

const getAllChunks = async (domain = null) => {
  const query = domain ? { 'metadata.domain': domain } : {};
  return await DocumentChunk.find(query).lean();
};

module.exports = {
  saveChunks,
  getAllChunks,
};
