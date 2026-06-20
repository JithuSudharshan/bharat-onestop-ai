const express = require('express');
const { createProfile, getProfile, updateProfile } = require('../controllers/profileController');
const {
  createProfileValidator,
  updateProfileValidator,
} = require('../middleware/validators/profileValidators');
const validate = require('../middleware/validate');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

// All profile routes require authentication
router.use(verifyToken);

router.post('/', createProfileValidator, validate, createProfile);
router.get('/', getProfile);
router.put('/', updateProfileValidator, validate, updateProfile);

module.exports = router;
