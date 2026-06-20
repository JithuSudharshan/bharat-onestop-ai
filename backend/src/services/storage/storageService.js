const localStorageService = require('./localStorageService');
const gcpStorageService = require('./gcpStorageService');

class StorageService {
  constructor() {
    // Dependency Injection logic based on environment
    if (process.env.NODE_ENV === 'production' && process.env.GCP_PROJECT_ID) {
      this.strategy = gcpStorageService;
    } else {
      this.strategy = localStorageService;
    }
  }

  /**
   * Saves the uploaded file using the active storage strategy.
   * @param {Object} file - The file object from Multer
   * @returns {Promise<string>} - The persistent path or URL of the file
   */
  async saveFile(file) {
    if (!file) {
      throw new Error('No file provided for storage.');
    }
    return await this.strategy.saveFile(file);
  }
}

module.exports = new StorageService();
