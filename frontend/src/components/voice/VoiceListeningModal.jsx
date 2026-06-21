import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Send, X, Loader2 } from 'lucide-react';
import { VoiceWaveform } from './VoiceWaveform';
import { LanguageSelector } from './LanguageSelector';

export const VoiceListeningModal = ({ isOpen, onClose, onSend }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLang, setSelectedLang] = useState('ml-IN'); // Default to Malayalam as requested
  
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      cleanup();
    } else {
      initSpeechRecognition();
    }
    return cleanup;
  }, [isOpen, selectedLang]);

  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please try Chrome.");
      onClose();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLang;

    recognition.onresult = (event) => {
      let fullTranscript = '';
      
      for (let i = 0; i < event.results.length; ++i) {
        fullTranscript += event.results[i][0].transcript;
      }
      
      setTranscript(fullTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  };

  const cleanup = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setIsProcessing(false);
    setTranscript('');
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  };

  const handleSend = () => {
    if (transcript.trim()) {
      onSend(transcript);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-gray-900 border border-white/10 shadow-2xl rounded-[2rem] overflow-hidden p-8 flex flex-col items-center text-white"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>

          <div className="mt-2 mb-4 text-center w-full flex justify-between items-center px-2">
            <div className="text-left">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
                Bharat AI Voice
              </h3>
              <p className="text-gray-400 text-sm mt-0.5">Speak naturally</p>
            </div>
            <LanguageSelector 
              selectedLang={selectedLang} 
              onSelect={(lang) => {
                setSelectedLang(lang);
                if (isListening) {
                  // restart with new lang
                  toggleListen();
                  setTimeout(() => toggleListen(), 100);
                }
              }} 
              disabled={isListening}
            />
          </div>

          <div className="my-8 relative">
            {/* Glowing orb effect */}
            {isListening && (
              <motion.div 
                className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
            
            <button 
              onClick={toggleListen}
              className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
                isListening 
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/40 border border-blue-400/30' 
                  : 'bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-gray-600'
              }`}
            >
              {isListening ? (
                <Mic size={40} className="text-white drop-shadow-md" />
              ) : (
                <MicOff size={40} className="text-gray-400" />
              )}
            </button>
          </div>

          <VoiceWaveform isListening={isListening} />

          {/* Transcript Preview */}
          <div className="w-full mt-8 bg-gray-800/50 rounded-2xl p-4 border border-white/5 min-h-[120px] flex flex-col relative">
            {isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-sm rounded-2xl z-10">
                <div className="flex items-center gap-3 text-blue-400">
                  <Loader2 size={20} className="animate-spin" />
                  <span className="font-medium">Analyzing Audio via Gemini...</span>
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center mb-2 px-1">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Transcript</span>
            </div>
            
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your voice will be translated to text here..."
              className="w-full bg-transparent text-gray-200 text-center resize-none outline-none flex-1 placeholder:text-gray-500 font-medium"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full mt-8">
            <button 
              onClick={onClose}
              className="flex-1 py-3.5 px-4 rounded-xl font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700/50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSend}
              disabled={!transcript.trim() || isListening || isProcessing}
              className="flex-1 py-3.5 px-4 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Send size={18} /> Send to AI
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
