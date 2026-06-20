const fs = require('fs');
const path = require('path');

const SCHEMES_DIR = path.join(__dirname, '../../../../knowledge-base/schemes');

const loadAllSchemes = () => {
  if (!fs.existsSync(SCHEMES_DIR)) {
    console.warn(`[WARN] Knowledge base directory not found at ${SCHEMES_DIR}`);
    return [];
  }

  const files = fs.readdirSync(SCHEMES_DIR).filter(file => file.endsWith('.json'));
  let allSchemes = [];

  for (const file of files) {
    const filePath = path.join(SCHEMES_DIR, file);
    try {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const schemes = JSON.parse(rawData);
      
      // Inject source file name for metadata tracking
      const enrichedSchemes = schemes.map(scheme => ({
        ...scheme,
        _sourceFile: file
      }));
      
      allSchemes = allSchemes.concat(enrichedSchemes);
    } catch (error) {
      console.error(`[ERROR] Failed to load JSON from ${file}:`, error.message);
    }
  }

  return allSchemes;
};

module.exports = {
  loadAllSchemes,
};
