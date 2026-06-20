const { OAuth2Client } = require('google-auth-library');

// We use the GOOGLE_CLIENT_ID from environment variables
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verifies a Google ID token and returns the user payload.
 * @param {string} token - The Google Identity token from the frontend
 * @returns {Promise<Object>} - The verified Google user payload
 */
const verifyGoogleToken = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    return payload; // Contains email, name, picture, sub (googleId), etc.
  } catch (error) {
    console.error('[GoogleStrategy] Token verification failed:', error.message);
    throw new Error('Invalid Google identity token');
  }
};

module.exports = {
  verifyGoogleToken,
};
