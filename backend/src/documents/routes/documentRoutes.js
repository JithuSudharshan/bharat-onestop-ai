const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const verifyToken = require('../../middleware/verifyToken');
const upload = require('../../middleware/fileUpload');

// All routes require authentication
router.use(verifyToken);

/**
 * @route   POST /api/documents/upload
 * @desc    Upload a document (PDF/Image) for AI extraction
 * @access  Private
 */
router.post('/upload', upload.single('document'), documentController.uploadDocument);

module.exports = router;
