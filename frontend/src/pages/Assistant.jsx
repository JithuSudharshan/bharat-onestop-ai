import React from 'react';
import { AIAssistant } from '../components/dashboard/AIAssistant';
import { motion } from 'framer-motion';

const Assistant = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto h-[calc(100vh-100px)] flex flex-col"
    >
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bharat Sahayak AI</h1>
        <p className="text-gray-500 mt-1 text-sm">Your intelligent copilot for government services</p>
      </div>

      <div className="flex-1 min-h-0">
        <AIAssistant />
      </div>
    </motion.div>
  );
};

export default Assistant;
