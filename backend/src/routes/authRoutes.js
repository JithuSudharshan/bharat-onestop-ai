const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  register,
  login,
  logout,
  refreshToken,
  getMe,
} = require('../controllers/authController');
const {
  registerValidator,
  loginValidator,
} = require('../middleware/validators/authValidators');
const validate = require('../middleware/validate');
const verifyToken = require('../middleware/verifyToken');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again after 15 minutes' },
});

router.post('/register', authLimiter, registerValidator, validate, register);
router.post('/login', authLimiter, loginValidator, validate, login);
router.post('/logout', verifyToken, logout);
router.post('/refresh', refreshToken);
router.get('/me', verifyToken, getMe);

module.exports = router;
