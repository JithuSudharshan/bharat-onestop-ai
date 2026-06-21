const express = require('express');
const router = express.Router();
const applicationController = require('./applicationController');
const verifyToken = require('../../middleware/verifyToken');

// All application routes should be protected
router.use(verifyToken);

// POST /api/application/create
router.post('/create', applicationController.createApplication);

// GET /api/application/:id
router.get('/:id', applicationController.getApplication);

// PATCH /api/application/:id/checklist/:stepId
router.patch('/:id/checklist/:stepId', applicationController.updateChecklistStep);

// PATCH /api/application/:id/update-field
router.patch('/:id/update-field', applicationController.updateField);

module.exports = router;
