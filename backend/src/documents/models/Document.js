const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    filePath: {
      type: String,
      required: true, // For local MVP. Phase 18 will move to GCP Cloud Storage
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'processed', 'failed'],
      default: 'pending',
    },
    documentType: {
      type: String, // e.g. "Income Certificate", "Marksheet", "Aadhaar"
    },
    extractedData: {
      type: mongoose.Schema.Types.Mixed, // The JSON payload extracted by Gemini
    },
    errorMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Document', documentSchema);
