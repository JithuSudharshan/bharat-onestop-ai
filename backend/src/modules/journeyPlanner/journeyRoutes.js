const express = require('express');
const router = express.Router();
const journeyController = require('./journeyController');
const verifyToken = require('../../middleware/verifyToken');

// All journey routes should be protected
router.use(verifyToken);

// POST /api/journey/generate
router.post('/generate', journeyController.generateJourney);

// GET /api/journey/current
router.get('/current', journeyController.getCurrentJourney);

// PATCH /api/journey/:id/action/:actionId
router.patch('/:id/action/:actionId', journeyController.markActionCompleted);

module.exports = router;
