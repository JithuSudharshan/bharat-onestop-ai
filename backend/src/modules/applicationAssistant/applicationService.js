const ApplicationDraft = require('./applicationModel');
const profileService = require('../../services/profileService');
const Document = require('../../documents/models/Document');
const { embedContent } = require('../../ai/geminiClient');
const { getEvidenceContext } = require('../../rag/citations/citationService');
const { formatSourcesForPrompt } = require('../../rag/citations/sourceFormatter');
const { generateApplicationDraft } = require('./applicationAgent');

const createApplication = async (userId, schemeId) => {
  // 1. Retrieve citizen information
  const profile = await profileService.getProfile(userId);
  if (!profile) {
    throw new Error('Citizen profile not found');
  }

  // 2. Retrieve verified documents
  const documents = await Document.find({ user: userId, status: 'processed' }).select('documentType extractedData');

  // 3. Fetch scheme context from RAG
  let schemeContextText = schemeId; // Fallback to just the ID/Name
  try {
    const queryEmbedding = await embedContent(`Details and requirements for scheme: ${schemeId}`);
    const chunks = await getEvidenceContext(queryEmbedding, 10);
    if (chunks && chunks.length > 0) {
      schemeContextText = formatSourcesForPrompt(chunks);
    }
  } catch (err) {
    console.warn('[ApplicationService] Failed to retrieve scheme context from RAG:', err);
  }

  // 4. Send context to Gemini
  const context = {
    scheme: schemeContextText,
    profile: profile.toObject(),
    documents,
  };

  const aiData = await generateApplicationDraft(context);

  // 5. Save ApplicationDraft
  const draft = new ApplicationDraft({
    userId,
    schemeId,
    schemeName: aiData.schemeName || schemeId,
    applicationStatus: 'draft',
    citizenSnapshot: {
      name: profile.name || (profile.user ? profile.user.name : ''),
      age: profile.age,
      gender: profile.gender,
      location: profile.state,
      income: profile.income?.annualIncome,
      education: profile.education,
      occupation: profile.occupation,
    },
    formFields: aiData.formFields.map(f => ({
      fieldName: f.fieldName,
      fieldLabel: f.fieldLabel,
      value: f.value,
      source: f.source || 'ai_generated',
      confidence: f.confidence || 0,
      verified: f.confidence >= 90,
    })),
    requiredDocuments: aiData.requiredDocuments.map(d => ({
      documentName: d.documentName,
      status: d.status || 'missing',
    })),
    missingInformation: aiData.missingInformation || [],
    applicationChecklist: aiData.checklist.map((c, i) => ({
      step: i + 1,
      title: c.title,
      description: c.description,
      completed: c.completed || false,
    })),
    aiInsights: {
      eligibilityReason: aiData.aiExplanation,
      completionScore: aiData.completionScore || 0,
      recommendations: [],
    },
  });

  await draft.save();
  return draft;
};

const getApplication = async (userId, applicationId) => {
  const draft = await ApplicationDraft.findOne({ _id: applicationId, userId });
  if (!draft) {
    throw new Error('Application draft not found');
  }
  return draft;
};

const updateChecklistStep = async (userId, applicationId, stepId) => {
  const draft = await ApplicationDraft.findOne({ _id: applicationId, userId });
  if (!draft) {
    throw new Error('Application draft not found');
  }

  const step = draft.applicationChecklist.id(stepId);
  if (!step) {
    throw new Error('Checklist step not found');
  }

  step.completed = !step.completed; // Toggle completion
  await draft.save();
  return draft;
};

const updateField = async (userId, applicationId, fieldId, newValue) => {
  const draft = await ApplicationDraft.findOne({ _id: applicationId, userId });
  if (!draft) {
    throw new Error('Application draft not found');
  }

  const field = draft.formFields.id(fieldId);
  if (!field) {
    throw new Error('Form field not found');
  }

  field.value = newValue;
  field.source = 'user_input';
  field.verified = true;
  await draft.save();
  return draft;
};

module.exports = {
  createApplication,
  getApplication,
  updateChecklistStep,
  updateField,
};
