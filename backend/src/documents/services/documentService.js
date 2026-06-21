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
        
        // Personal
        if (extractedData.personal?.name && !existingProfile.name) updates.name = extractedData.personal.name;
        if (extractedData.personal?.age && !existingProfile.age) updates.age = extractedData.personal.age;
        
        // Address
        if (extractedData.address?.state && !existingProfile.state) updates.state = extractedData.address.state;
        if (extractedData.address?.district && !existingProfile.district) updates.district = extractedData.address.district;

        // Income
        if (extractedData.income?.annualIncome && (!existingProfile.income || !existingProfile.income.annualIncome)) {
          updates.income = existingProfile.income || {};
          updates.income.annualIncome = extractedData.income.annualIncome;
        }

        // Employment
        if (extractedData.employment?.occupation && !existingProfile.occupation) {
          updates.occupation = extractedData.employment.occupation;
        }

        // Education (We rely on validation, if it fails, the update will throw but we catch it)
        // For production, a mapping from raw text to the enum would be needed here.
        if (extractedData.education?.qualification && !existingProfile.education) {
          // Attempt basic mapping
          const qual = extractedData.education.qualification.toLowerCase();
          if (qual.includes('graduate') && !qual.includes('post')) updates.education = 'graduate';
          else if (qual.includes('post graduate')) updates.education = 'post_graduate';
          else if (qual.includes('secondary')) updates.education = 'higher_secondary';
          else if (qual.includes('diploma')) updates.education = 'diploma';
          else if (qual.includes('doctorate')) updates.education = 'doctorate';
          else updates.education = 'other';
        }
        
        // Update logic can be made more sophisticated based on document confidence
        if (Object.keys(updates).length > 0 && extractedData.confidence?.overall >= 70) {
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
