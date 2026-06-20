const authService = require('../services/authService');
const User = require('../models/User');

// Helper to set cookie
const sendTokenResponse = async (user, statusCode, res) => {
  const { accessToken, refreshToken } = authService.generateTokens(user._id, user.role);

  // Save refresh token to DB
  await authService.saveRefreshToken(user._id, refreshToken);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  res
    .status(statusCode)
    .cookie('refreshToken', refreshToken, options)
    .json({
      success: true,
      message: statusCode === 201 ? 'User registered successfully' : 'Login successful',
      data: {
        user,
        accessToken,
      },
    });
};

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await authService.registerUser(name, email, password);
    await sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.loginUser(email, password);
    await sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.revokeRefreshToken(req.user.id);
    
    res.cookie('refreshToken', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.refreshToken;
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No refresh token provided',
      });
    }

    const user = await authService.verifyRefreshToken(token);
    
    // Generate new access and refresh tokens (rotation)
    const { accessToken, refreshToken: newRefreshToken } = authService.generateTokens(user._id, user.role);

    // Save new refresh token to DB
    await authService.saveRefreshToken(user._id, newRefreshToken);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res
      .status(200)
      .cookie('refreshToken', newRefreshToken, options)
      .json({
        success: true,
        message: 'Token refreshed',
        data: { accessToken },
      });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('name email role isVerified createdAt');
    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  getMe,
};
