import React from 'react';
import { AnimatedCard } from '../ui/AnimatedCard';
import { BrainCircuit, CheckCircle2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const AIInsightsPanel = ({ profile }) => {
  return (
    <AnimatedCard className="bg-gradient-to-br from-indigo-50 to-blue-50/50 p-6 border-indigo-100/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-700">
          <BrainCircuit size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 leading-tight">AI Citizen Insights</h3>
          <p className="text-sm text-indigo-600 font-medium">Gemini Intelligence Layer</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/80 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-500" /> Detected Profile Vectors
          </h4>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-white rounded-md text-sm font-medium text-gray-700 shadow-sm border border-gray-100">{profile?.occupation || 'Citizen'}</span>
            <span className="px-2.5 py-1 bg-white rounded-md text-sm font-medium text-gray-700 shadow-sm border border-gray-100">{profile?.state || 'India'} Resident</span>
            <span className="px-2.5 py-1 bg-white rounded-md text-sm font-medium text-gray-700 shadow-sm border border-gray-100">Income: {profile?.income?.currency} {profile?.income?.annualIncome}</span>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/80 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
            <TrendingUp size={14} className="text-blue-500" /> Synthesized Needs
          </h4>
          <ul className="space-y-2">
            {profile?.requirements?.map((req, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                <span className="leading-snug">{req}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </AnimatedCard>
  );
};
