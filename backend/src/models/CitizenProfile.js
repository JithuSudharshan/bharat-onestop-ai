const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    relation: {
      type: String,
      enum: ['spouse', 'child', 'parent', 'sibling', 'other'],
    },
    age: { type: Number, min: 0, max: 120 },
    occupation: { type: String, trim: true },
  },
  { _id: false }
);

const citizenProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },

    // Personal Information
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [0, 'Age must be a positive number'],
      max: [120, 'Age cannot exceed 120'],
    },
    gender: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: String,
      trim: true,
    },
    caste: {
      type: String,
      trim: true,
    },
    religion: {
      type: String,
      trim: true,
    },
    maritalStatus: {
      type: String,
      trim: true,
    },
    disabilityStatus: {
      type: Boolean,
      default: false,
    },

    // Location
    house: { type: String, trim: true },
    street: { type: String, trim: true },
    village_town: { type: String, trim: true },
    subDistrict: { type: String, trim: true },
    pincode: { type: String, trim: true },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    district: {
      type: String,
      required: [true, 'District is required'],
      trim: true,
    },

    // Socio-economic
    occupation: {
      type: String,
      trim: true,
    },
    education: {
      type: String,
      enum: [
        'no_formal_education',
        'primary',
        'secondary',
        'higher_secondary',
        'diploma',
        'graduate',
        'post_graduate',
        'doctorate',
        'other',
      ],
    },
    educationDetails: {
      institution: { type: String, trim: true },
      stream: { type: String, trim: true },
      passingYear: { type: Number },
      marksPercentage: { type: Number, min: 0, max: 100 },
    },
    income: {
      annualIncome: {
        type: Number,
        min: [0, 'Annual income cannot be negative'],
      },
      currency: {
        type: String,
        default: 'INR',
      },
      certificateId: { type: String, trim: true },
      validUntil: { type: String, trim: true },
    },
    employment: {
      company: { type: String, trim: true },
      role: { type: String, trim: true },
      experienceYears: { type: Number },
    },

    // Family
    familyDetails: {
      totalMembers: {
        type: Number,
        min: [1, 'Family must have at least 1 member'],
        default: 1,
      },
      members: [familyMemberSchema],
    },

    // AI Agent Preferences
    preferredLanguage: {
      type: String,
      enum: [
        'en',
        'hi',
        'ta',
        'te',
        'kn',
        'ml',
        'bn',
        'mr',
        'gu',
        'pa',
        'or',
        'as',
        'ur',
      ],
      default: 'en',
    },

    // What the citizen needs — used by AI agents for context
    requirements: {
      type: [String],
      default: [],
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-compute isProfileComplete before saving
citizenProfileSchema.pre('save', function (next) {
  const requiredFields = [
    this.name,
    this.age,
    this.state,
    this.district,
    this.preferredLanguage,
  ];
  this.isProfileComplete = requiredFields.every((field) => field !== undefined && field !== null);
  next();
});

module.exports = mongoose.model('CitizenProfile', citizenProfileSchema);
