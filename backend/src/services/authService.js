const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (name, email, password) => {
  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error('User already exists with this email');
    error.statusCode = 400;
    throw error;
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Return user without password
  user.password = undefined;
  return user;
};

const loginUser = async (email, password) => {
  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  // Return user without password
  user.password = undefined;
  return user;
};

const generateTokens = (userId, role) => {
  if (!process.env.JWT_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('FATAL: JWT secrets are not defined in environment variables');
  }

  const accessToken = jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );

  return { accessToken, refreshToken };
};

const saveRefreshToken = async (userId, token) => {
  const salt = await bcrypt.genSalt(10);
  const hashedToken = await bcrypt.hash(token, salt);
  
  await User.findByIdAndUpdate(userId, { refreshToken: hashedToken });
};

const verifyRefreshToken = async (token) => {
  try {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error('FATAL: JWT_REFRESH_SECRET is not defined');
    }
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    
    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || !user.refreshToken) {
      throw new Error('Invalid refresh token');
    }

    const isMatch = await bcrypt.compare(token, user.refreshToken);
    if (!isMatch) {
      throw new Error('Invalid refresh token');
    }

    return user;
  } catch (error) {
    const err = new Error('Not authorized, token failed');
    err.statusCode = 401;
    throw err;
  }
};

const revokeRefreshToken = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

module.exports = {
  registerUser,
  loginUser,
  generateTokens,
  saveRefreshToken,
  verifyRefreshToken,
  revokeRefreshToken,
};
