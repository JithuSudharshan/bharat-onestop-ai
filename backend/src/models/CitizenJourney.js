const mongoose = require('mongoose');

const citizenJourneySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    profileSnapshot: {
      age: Number,
      location: String,
      income: Number,
      education: String,
      occupation: String,
    },
    journeyTitle: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    currentStage: {
      lifeStage: String,
      citizenCategory: String,
      aiInsights: [String],
    },
    milestones: [
      {
        timeframe: {
          type: String,
        },
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        reasoning: {
          type: String,
        },
        priority: {
          type: String,
          enum: ['high', 'medium', 'low'],
          default: 'medium',
        },
        category: {
          type: String,
          enum: ['education', 'employment', 'finance', 'healthcare', 'business', 'other'],
          default: 'other',
        },
        relatedSchemeIds: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scheme',
          },
        ],
        requiredActions: [
          {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            actionText: String,
            completed: { type: Boolean, default: false },
          },
        ],
        missingDocuments: [String],
      },
    ],
    aiConfidence: {
      type: Number,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CitizenJourney', citizenJourneySchema);
