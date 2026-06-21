import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';

export const JourneyHero = ({ journey, profile, onRegenerate }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-[#0A1128] rounded-3xl p-8 md:p-12 text-white shadow-2xl border border-white/10"
    >
      {/* AI Glow Effects */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-600/20 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-600/20 blur-[80px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-2">
              <Sparkles size={12} />
              Bharat AI Generated
            </div>
            <div className="px-3 py-1 bg-green-500/20 backdrop-blur-md rounded-full border border-green-500/20 text-xs font-bold uppercase tracking-wider text-green-400">
              {journey.aiConfidence}% Confidence
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
            {journey.journeyTitle}
          </h1>
          
          <p className="text-lg text-blue-100/70 leading-relaxed">
            {journey.summary}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
          <div className="text-left md:text-right">
            <p className="text-xs text-blue-200/50 uppercase tracking-wider font-bold mb-1">Detected Life Stage</p>
            <p className="text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {journey.currentStage?.lifeStage || 'Citizen'}
            </p>
          </div>
          
          <button 
            onClick={onRegenerate}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-xl text-sm font-medium transition-colors"
          >
            <RefreshCw size={14} /> Update Roadmap
          </button>
        </div>
      </div>
    </motion.div>
  );
};
