import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

export const AIInsightPanel = ({ journey, profile }) => {
  return (
    <div className="bg-[#0A1128] rounded-3xl p-6 border border-white/10 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[40px] pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/20">
          <BrainCircuit size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white leading-tight">Bharat AI Analysis</h3>
          <p className="text-xs text-blue-300/70 font-medium uppercase tracking-wider">Contextual Understanding</p>
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {/* Profile Synthesis */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-green-400" /> Synthesized Profile
          </h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 rounded-lg p-2 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              {profile?.occupation || 'Citizen'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 rounded-lg p-2 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
              Resident of {profile?.state || 'India'}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 rounded-lg p-2 border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              {profile?.income?.annualIncome ? `Income: ₹${profile.income.annualIncome}` : 'Income Unverified'}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        {journey.currentStage?.aiInsights?.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
              <TrendingUp size={14} className="text-blue-400" /> Key Insights
            </h4>
            <ul className="space-y-3">
              {journey.currentStage.aiInsights.map((insight, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm text-blue-100/80 leading-snug pl-3 border-l-2 border-blue-500/30"
                >
                  {insight}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
