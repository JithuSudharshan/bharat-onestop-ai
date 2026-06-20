const admin = require('firebase-admin');

let db;

// Initialize Firebase Admin SDK for Firestore if in production or testing sync
if (process.env.NODE_ENV === 'production' && process.env.FIREBASE_PROJECT_ID) {
  try {
    // Cloud Run automatically provides the credential when running inside GCP
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    
    db = admin.firestore();
    console.log('[Firestore] Connected successfully for real-time syncing.');
  } catch (error) {
    console.error('[Firestore] Failed to initialize Firebase Admin:', error);
  }
} else {
  console.log('[Firestore] Running in local mode. Skipping Firestore initialization.');
}

module.exports = db;
