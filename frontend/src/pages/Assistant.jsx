import React from 'react';
import { AIAssistant } from '../components/dashboard/AIAssistant';
import { motion } from 'framer-motion';

const Assistant = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">AI Copilot Chat</h1>
        <p className="text-gray-500 mt-2 text-lg">Talk to your personal government advisor in English, Hindi, or Malayalam.</p>
      </div>

      <AIAssistant />
    </motion.div>
  );
};

export default Assistant;
