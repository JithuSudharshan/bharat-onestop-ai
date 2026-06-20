const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const { authorize } = require('../../middleware/authorize');
const upload = require('../../middleware/fileUpload');

// All routes require authentication
router.use(authorize);

/**
 * @route   POST /api/documents/upload
 * @desc    Upload a document (PDF/Image) for AI extraction
 * @access  Private
 */
router.post('/upload', upload.single('document'), documentController.uploadDocument);

module.exports = router;
