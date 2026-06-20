const LANGUAGE_MAP = {
  en: 'English',
  hi: 'Hindi (हिंदी)',
  ta: 'Tamil (தமிழ்)',
  te: 'Telugu (తెలుగు)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)',
  bn: 'Bengali (বাংলা)',
  mr: 'Marathi (मराठी)',
  gu: 'Gujarati (ગુજરાતી)',
  pa: 'Punjabi (ਪੰਜਾਬੀ)',
  or: 'Odia (ଓଡ଼ିଆ)',
  as: 'Assamese (অসমীয়া)',
  ur: 'Urdu (اردو)',
};

const wrapWithLanguage = (prompt, langCode = 'en') => {
  const targetLanguage = LANGUAGE_MAP[langCode] || 'English';
  return `${prompt}\n\nIMPORTANT INSTRUCTION: You must respond entirely in ${targetLanguage}. Do not use any other language. If the question is in English, still translate your answer to ${targetLanguage}.`;
};

module.exports = {
  wrapWithLanguage,
  LANGUAGE_MAP,
};
