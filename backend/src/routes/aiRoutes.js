const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { chat, analyzeProfile } = require('../controllers/aiController');
const validate = require('../middleware/validate');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 AI requests per windowMs
  message: { success: false, message: 'Too many requests to Bharat Sahayak, please try again later' },
});

// All AI routes require authentication
router.use(verifyToken);
router.use(aiLimiter);

const chatValidator = [
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isString()
    .withMessage('Message must be a string')
    .trim(),
  body('history')
    .optional()
    .isArray()
    .withMessage('History must be an array'),
];

router.post('/chat', chatValidator, validate, chat);
router.post('/analyze', analyzeProfile);

module.exports = router;
