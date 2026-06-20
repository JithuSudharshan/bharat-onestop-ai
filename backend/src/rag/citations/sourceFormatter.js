const formatSourcesForPrompt = (chunks) => {
  return chunks.map((chunk, index) => {
    return `[SOURCE_ID: ${index + 1}]
File: ${chunk.sourceFile}
Section: ${chunk.metadata.chunkType}
Content: ${chunk.content}
`;
  }).join('\n---\n');
};

module.exports = {
  formatSourcesForPrompt,
};
