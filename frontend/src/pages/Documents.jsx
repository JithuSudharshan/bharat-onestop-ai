import React from 'react';
import { DocumentCenter } from '../components/dashboard/DocumentCenter';
import { motion } from 'framer-motion';

const Documents = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Document Intelligence</h1>
        <p className="text-gray-500 mt-2 text-lg">Securely upload government documents. Our AI vision model extracts metadata instantly.</p>
      </div>

      <DocumentCenter />
    </motion.div>
  );
};

export default Documents;
