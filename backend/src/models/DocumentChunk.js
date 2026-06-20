const mongoose = require('mongoose');

const documentChunkSchema = new mongoose.Schema(
  {
    sourceFile: {
      type: String,
      required: true,
      index: true,
    },
    pageNumber: {
      type: Number, // Can be null for txt files
      default: null,
    },
    chunkIndex: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number], // 768-dimensional float array
      required: true,
    },
    metadata: {
      domain: String,
      ministry: String,
      year: Number,
      chunkType: String,
      schemeId: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('DocumentChunk', documentChunkSchema);
