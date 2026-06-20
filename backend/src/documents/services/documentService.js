const Document = require('../models/Document');
const { extractDocumentData } = require('../../ai/agents/documentAgent');
const profileService = require('../../services/profileService');
const storageService = require('../../services/storage/storageService');

const processUploadedDocument = async (userId, file) => {
  // 1. Save document record to DB (Status: processing)
  const docRecord = await Document.create({
    user: userId,
    originalName: file.originalname,
    mimeType: file.mimetype,
    fileSize: file.size,
    filePath: file.path,
    status: 'processing',
  });

  try {
    // 2. Extract Data using Gemini Vision (using the local file)
    const extractedData = await extractDocumentData(file.path, file.mimetype);

    // 3. Persist the file using the abstracted Storage Service
    const persistentPath = await storageService.saveFile(file);

    // 4. Update Document Record
    docRecord.status = 'processed';
    docRecord.filePath = persistentPath; // Update with persistent GCS URI or local path
    docRecord.documentType = extractedData.documentType;
    docRecord.extractedData = extractedData;
    await docRecord.save();

    // 5. Opportunistically update Citizen Profile
    try {
      const existingProfile = await profileService.getProfile(userId);
      const updates = {};
      
      if (extractedData.name && !existingProfile.name) updates.name = extractedData.name;
      if (extractedData.age && !existingProfile.age) updates.age = extractedData.age;
      
      if (extractedData.income) {
        updates.income = existingProfile.income || {};
        updates.income.annualIncome = extractedData.income;
      }
      
      // Update logic can be made more sophisticated based on document confidence
      if (Object.keys(updates).length > 0) {
        await profileService.updateProfile(userId, updates);
      }
    } catch (profileErr) {
      console.warn('[DocumentService] Citizen Profile not found or could not be updated auto-magically.');
    }

    return docRecord;
  } catch (error) {
    docRecord.status = 'failed';
    docRecord.errorMessage = error.message;
    await docRecord.save();
    throw error;
  }
};

module.exports = {
  processUploadedDocument,
};
