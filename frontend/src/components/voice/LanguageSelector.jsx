import React from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SUPPORTED_LANGUAGES = [
  { code: 'en-IN', name: 'English', native: 'English' },
  { code: 'hi-IN', name: 'Hindi', native: 'हिंदी' },
  { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te-IN', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ' }
];

export const LanguageSelector = ({ selectedLang, onSelect, disabled }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const selected = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
          disabled 
            ? 'opacity-50 cursor-not-allowed border-gray-700 bg-gray-800 text-gray-500' 
            : 'border-white/10 bg-gray-800/50 hover:bg-gray-700 text-gray-300'
        }`}
      >
        <Globe size={14} className="text-blue-400" />
        <span className="text-xs font-medium">{selected.native}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-40 bg-gray-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-1"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelect(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-between ${
                    selectedLang === lang.code 
                      ? 'bg-blue-600/20 text-blue-400 font-medium' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span>{lang.native}</span>
                  <span className="text-[10px] text-gray-500">{lang.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
