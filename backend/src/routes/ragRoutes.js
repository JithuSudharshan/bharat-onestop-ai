const express = require('express');
const { body } = require('express-validator');
const { queryRag } = require('../controllers/ragController');
const validate = require('../middleware/validate');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

router.use(verifyToken);

router.post(
  '/query',
  [
    body('question').notEmpty().withMessage('Question is required').isString().trim(),
    body('domain').optional().isString().trim(),
  ],
  validate,
  queryRag
);

module.exports = router;
