const { Storage } = require('@google-cloud/storage');
const path = require('path');

let storage;
let bucketName;

const initializeCloudStorage = () => {
  // If running in GCP, it automatically uses default credentials
  // If running locally, you must provide GOOGLE_APPLICATION_CREDENTIALS in env
  
  storage = new Storage();
  bucketName = process.env.GCS_BUCKET_NAME;

  if (!bucketName) {
    console.warn('⚠️ GCS_BUCKET_NAME is not set. Cloud Storage uploads will fail.');
  } else {
    console.log(`☁️ Google Cloud Storage initialized for bucket: ${bucketName}`);
  }
};

const getBucket = () => {
  if (!storage || !bucketName) {
    throw new Error('Cloud Storage is not configured properly.');
  }
  return storage.bucket(bucketName);
};

module.exports = {
  initializeCloudStorage,
  getBucket,
  storage
};
