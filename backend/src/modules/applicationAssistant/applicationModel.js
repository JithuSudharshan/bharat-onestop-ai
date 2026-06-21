const mongoose = require('mongoose');

const applicationDraftSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    schemeId: {
      type: String, // Or ObjectId if Scheme is a collection
      required: true,
    },
    schemeName: {
      type: String,
      required: true,
    },
    applicationStatus: {
      type: String,
      enum: ['draft', 'review', 'ready', 'completed'],
      default: 'draft',
    },
    citizenSnapshot: {
      name: String,
      age: Number,
      gender: String,
      location: String,
      income: Number,
      education: String,
      occupation: String,
    },
    formFields: [
      {
        fieldName: String,
        fieldLabel: String,
        value: String,
        source: {
          type: String,
          enum: ['profile', 'document', 'ai_generated', 'user_input'],
          default: 'ai_generated',
        },
        confidence: Number,
        verified: {
          type: Boolean,
          default: false,
        },
      },
    ],
    requiredDocuments: [
      {
        documentName: String,
        status: {
          type: String,
          enum: ['available', 'missing', 'needs_upload'],
          default: 'missing',
        },
        sourceDocument: String,
      },
    ],
    missingInformation: [
      {
        field: String,
        reason: String,
      },
    ],
    applicationChecklist: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        step: Number,
        title: String,
        description: String,
        completed: { type: Boolean, default: false },
      },
    ],
    aiInsights: {
      eligibilityReason: String,
      completionScore: Number,
      recommendations: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ApplicationDraft', applicationDraftSchema);
