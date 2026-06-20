const { uploadToCloudStorage } = require('../../config/gcpStorage');
const fs = require('fs');

class GCPStorageService {
  async saveFile(file) {
    // file is provided by multer disk storage
    // Read the temporary local file
    const fileBuffer = fs.readFileSync(file.path);
    
    // Upload it to GCP
    const gcsUri = await uploadToCloudStorage(fileBuffer, file.originalname, file.mimetype);
    
    // Optional: Delete the temporary local file to save space
    try {
      fs.unlinkSync(file.path);
    } catch (err) {
      console.warn('[GCPStorageService] Failed to delete temporary local file:', err.message);
    }

    return gcsUri;
  }
}

module.exports = new GCPStorageService();
