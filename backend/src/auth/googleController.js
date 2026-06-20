const User = require('../models/User');
const { verifyGoogleToken } = require('./googleStrategy');
const jwt = require('jsonwebtoken');

// Generate JWT helper
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body; // The Google ID Token from the frontend

    if (!credential) {
      return res.status(400).json({ success: false, message: 'Google credential is required' });
    }

    // 1. Verify the Google token server-side
    const googlePayload = await verifyGoogleToken(credential);

    const { email, name, picture, sub: googleId } = googlePayload;

    // 2. Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      // If user exists but used email/password previously, link the Google ID optionally
      if (!user.googleId) {
        user.googleId = googleId;
        user.profileImage = user.profileImage || picture;
        await user.save();
      }
    } else {
      // 3. Create a new user if they don't exist
      user = await User.create({
        name,
        email,
        authProvider: 'google',
        googleId,
        profileImage: picture,
        isVerified: true, // Google emails are already verified
      });
    }

    // 4. Generate standard JWT session token
    const token = generateToken(user._id);

    // 5. Return success payload matching our existing auth structure
    res.status(200).json({
      success: true,
      message: 'Google login successful',
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage,
        },
      },
    });
  } catch (error) {
    console.error('[GoogleController] Error during login:', error.message);
    res.status(401).json({ success: false, message: 'Google Authentication Failed' });
  }
};

module.exports = {
  googleLogin,
};
