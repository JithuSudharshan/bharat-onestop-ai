import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const ProcessingAnimation = ({ message = "AI is processing..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30"
      >
        <Sparkles size={24} />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-gray-500 font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
      >
        {message}
      </motion.p>
    </div>
  );
};
