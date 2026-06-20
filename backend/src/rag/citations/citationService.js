const { similaritySearch } = require('../retriever');

/**
 * Service to handle retrieving documents and preparing them for evidence citation.
 */
const getEvidenceContext = async (queryEmbedding, limit = 8) => {
  const chunks = await similaritySearch.search(queryEmbedding, limit);
  return chunks;
};

module.exports = {
  getEvidenceContext,
};
