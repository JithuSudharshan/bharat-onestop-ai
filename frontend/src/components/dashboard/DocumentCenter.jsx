import React, { useState, useRef } from 'react';
import { AnimatedCard } from '../ui/AnimatedCard';
import { ProcessingAnimation } from '../ui/ProcessingAnimation';
import { useDocuments } from '../../hooks/useDocuments';
import { UploadCloud, File, CheckCircle, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DocumentCenter = () => {
  const { processDocument, loading, result, resetDocument } = useDocuments();
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processDocument(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await processDocument(e.target.files[0]);
    }
  };

  return (
    <AnimatedCard className="bg-white p-6 md:p-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Document Intelligence</h3>
          <p className="text-sm text-gray-500 mt-1">Upload government IDs for automatic AI verification.</p>
        </div>
        {result && (
          <button onClick={resetDocument} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition">
            <X size={20} />
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="border border-indigo-100 bg-indigo-50/50 rounded-2xl py-12">
              <ProcessingAnimation message="Analyzing Document via Gemini Vision..." />
            </div>
          </motion.div>
        ) : result ? (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-100 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-500 text-white rounded-xl shadow-lg shadow-green-500/30">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-green-900">{result.documentType} Verified</h4>
                  <p className="text-sm text-green-700">Information successfully extracted.</p>
                </div>
              </div>
              
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white space-y-2">
                {Object.entries(result.extractedData || {}).map(([key, val]) => {
                  if (key === 'confidence' || key === 'missingInformation') return null; // Skip noisy metadata
                  
                  return (
                    <div key={key} className="flex flex-col py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-500 capitalize mb-1">{key}</span>
                      {typeof val === 'object' && val !== null ? (
                        <div className="flex flex-col gap-1 pl-2 border-l-2 border-blue-100">
                          {Object.entries(val).map(([subKey, subVal]) => (
                            subVal !== null && subVal !== '' && (
                              <div key={subKey} className="flex justify-between items-center">
                                <span className="text-xs text-gray-400 capitalize">{subKey}</span>
                                <span className="text-xs font-bold text-gray-900">{String(subVal)}</span>
                              </div>
                            )
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{val !== null ? String(val) : 'N/A'}</span>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-green-700 uppercase tracking-wider">
                <CheckCircle size={14} /> Profile Auto-Updated
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div 
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <input ref={inputRef} type="file" className="hidden" onChange={handleChange} accept=".pdf,.png,.jpg,.jpeg" />
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${dragActive ? 'bg-blue-100 text-blue-600' : 'bg-white text-gray-400 shadow-sm'}`}>
                <UploadCloud size={32} />
              </div>
              <p className="text-base font-bold text-gray-900 mb-1">Click to upload or drag & drop</p>
              <p className="text-sm text-gray-500 text-center max-w-xs">Supports Aadhaar, PAN, Income Certificate, Marksheets (PDF, JPG, PNG)</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
};
