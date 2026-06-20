class LocalStorageService {
  async saveFile(file) {
    // Multer disk storage already saved the file to local disk
    // We just return its path as the persistent location
    return file.path;
  }
}

module.exports = new LocalStorageService();
