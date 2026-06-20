const { Storage } = require('@google-cloud/storage');
const path = require('path');

let storage;
let bucketName;

if (process.env.NODE_ENV === 'production') {
  // In Cloud Run, it automatically uses the attached Service Account.
  // No need for explicit key filename if running on GCP.
  storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
  });
  bucketName = process.env.GCP_STORAGE_BUCKET;
  
  console.log(`[GCP Storage] Initialized for production bucket: ${bucketName}`);
} else {
  // Local mock or explicit credentials for local dev testing GCP
  console.log('[GCP Storage] Running in local/dev mode. Storage will use local disk.');
}

const uploadToCloudStorage = async (fileBuffer, originalName, mimeType) => {
  if (!storage || !bucketName) {
    throw new Error('GCP Storage is not configured.');
  }

  const bucket = storage.bucket(bucketName);
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const fileName = `documents/${uniqueSuffix}-${originalName}`;
  const file = bucket.file(fileName);

  await file.save(fileBuffer, {
    metadata: {
      contentType: mimeType,
    },
    resumable: false,
  });

  return `gs://${bucketName}/${fileName}`;
};

module.exports = {
  storage,
  uploadToCloudStorage,
};
