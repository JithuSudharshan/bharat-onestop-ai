const documentService = require('../services/documentService');

const uploadDocument = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded. Please upload a valid document.',
      });
    }

    const documentRecord = await documentService.processUploadedDocument(req.user.id, req.file);

    res.status(201).json({
      success: true,
      message: 'Document successfully processed and data extracted.',
      data: {
        document: documentRecord,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadDocument,
};
