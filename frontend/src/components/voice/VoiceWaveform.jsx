import React from 'react';
import { motion } from 'framer-motion';

export const VoiceWaveform = ({ isListening }) => {
  return (
    <div className="flex items-center justify-center gap-1.5 h-16">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full"
          animate={{
            height: isListening ? ['12px', '32px', '12px'] : '4px',
            backgroundColor: isListening ? ['#60a5fa', '#a78bfa', '#60a5fa'] : '#4b5563'
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};
