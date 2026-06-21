import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, FileText, AlertCircle, Edit2, Check, Sparkles, BrainCircuit, Activity } from 'lucide-react';
import { ProgressRing } from '../ui/ProgressRing';

export const ApplicationHero = ({ application }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-[#0A1128] rounded-3xl p-8 md:p-12 text-white shadow-2xl border border-white/10"
    >
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-600/20 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-600/20 blur-[80px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-2">
              <Sparkles size={12} />
              AI Application Assistant
            </div>
            <div className="px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full border border-green-500/20 text-xs font-bold uppercase tracking-wider text-green-400">
              Draft Status
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">
            Applying for: {application.schemeName}
          </h1>
          <p className="text-blue-200/70 text-lg">
            Bharat AI is mapping your profile and documents to the scheme requirements.
          </p>
        </div>

        <div className="flex flex-col items-center shrink-0">
          <ProgressRing progress={application.aiInsights?.completionScore || 0} size={100} label="AI Match" textColor="text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export const AIExplanationCard = ({ insights }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50/90 to-white/40 backdrop-blur-xl rounded-3xl p-6 border border-blue-100 shadow-xl shadow-blue-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400/10 blur-[50px] pointer-events-none"></div>
      <div className="flex items-center gap-3 mb-4 relative z-10">
        <div className="p-2 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
          <BrainCircuit size={20} />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Bharat AI Understood</h3>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed relative z-10">
        {insights?.eligibilityReason || 'AI has analyzed your profile against the scheme criteria.'}
      </p>
    </div>
  );
};

export const DocumentChecklist = ({ documents }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50/90 to-white/40 backdrop-blur-xl rounded-3xl p-6 border border-indigo-100 shadow-xl shadow-indigo-900/5 h-full relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 h-40 bg-indigo-400/10 blur-[40px] pointer-events-none"></div>
      <h3 className="text-sm font-bold text-indigo-900/70 uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
        <FileText size={16} /> Required Documents
      </h3>
      <div className="space-y-3">
        {documents.map((doc, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 border border-gray-100">
            <span className="text-sm text-gray-700 font-medium">{doc.documentName}</span>
            {doc.status === 'available' ? (
              <span className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase rounded border border-green-200">
                <CheckCircle2 size={12} /> Available
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-2 py-1 bg-red-50 text-red-600 text-xs font-bold uppercase rounded border border-red-200">
                <AlertCircle size={12} /> Missing
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export const MissingInformation = ({ missingFields }) => {
  if (!missingFields || missingFields.length === 0) {
    return (
      <div className="bg-gradient-to-br from-green-50/90 to-white/40 backdrop-blur-xl rounded-3xl p-6 border border-green-200 shadow-xl shadow-green-900/5 h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-green-400/10 blur-[40px] pointer-events-none"></div>
        <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
          <CheckCircle2 size={16} /> Action Required
        </h3>
        <div className="flex items-center justify-center h-32 relative z-10">
          <p className="text-green-700 font-medium">No actions required! All set.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gradient-to-br from-orange-50/90 to-white/40 backdrop-blur-xl rounded-3xl p-6 border border-orange-200 shadow-xl shadow-orange-900/5 h-full relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-orange-400/10 blur-[40px] pointer-events-none"></div>
      <h3 className="text-sm font-bold text-orange-700 uppercase tracking-wider mb-4 flex items-center gap-2 relative z-10">
        <AlertCircle size={16} /> Action Required
      </h3>
      <div className="space-y-3">
        {missingFields.map((field, idx) => (
          <div key={idx} className="flex flex-col p-3 rounded-xl bg-white border border-orange-200">
            <span className="text-sm text-orange-800 font-bold">{field.field}</span>
            <span className="text-xs text-orange-600/80 mt-1">{field.reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AIFormPreview = ({ fields, onUpdateField }) => {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (field) => {
    setEditingId(field._id);
    setEditValue(field.value);
  };

  const handleSave = (fieldId) => {
    onUpdateField(fieldId, editValue);
    setEditingId(null);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50/90 to-white/40 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-blue-100 shadow-xl shadow-blue-900/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 blur-[60px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 blur-[60px] pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-6 border-b border-blue-100/50 pb-4 relative z-10">
        <Activity size={24} className="text-blue-600" />
        <h3 className="text-xl font-bold text-blue-950">AI Generated Application Data</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {fields.map((field) => (
          <motion.div 
            key={field._id} 
            layout
            className={`p-4 rounded-xl border ${field.verified ? 'bg-green-50/50 border-green-200' : 'bg-blue-50/50 border-blue-200'} relative group`}
          >
            <div className="flex justify-between items-start mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">{field.fieldLabel}</label>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${field.source === 'document' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                  {field.source}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${field.confidence > 90 ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-orange-100 text-orange-700 border border-orange-200'}`}>
                  {field.confidence}% Match
                </span>
              </div>
            </div>

            {editingId === field._id ? (
              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="text" 
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 bg-white border border-blue-300 rounded-lg px-3 py-1.5 text-gray-900 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  autoFocus
                />
                <button 
                  onClick={() => handleSave(field._id)}
                  className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Check size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between mt-1">
                <span className={`text-lg font-medium ${field.value ? 'text-gray-900' : 'text-gray-400 italic'}`}>
                  {field.value || 'Not available'}
                </span>
                <button 
                  onClick={() => handleEdit(field)}
                  className="p-1.5 text-gray-400 hover:text-blue-600 bg-white hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
