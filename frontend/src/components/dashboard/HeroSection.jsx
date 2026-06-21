import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TrustBadge } from './TrustBadge';

export const HeroSection = ({ profile, schemeCount }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0A1128] to-[#16213E] rounded-3xl p-8 md:p-12 text-white shadow-xl">
      {/* Decorative blurred background elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl"></div>
      
      <div className="relative z-10 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6"
        >
          <TrustBadge />
          <span className="text-sm font-medium text-blue-200/80 flex items-center gap-1.5">
            <Sparkles size={14} className="text-blue-300" /> AI Systems Active
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
        >
          Good morning, {profile?.name.split(' ')[0]} <span className="inline-block animate-waving-hand origin-bottom-right">👋</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-blue-100/90 leading-relaxed mb-8"
        >
          {profile?.isProfileComplete 
            ? "Based on your profile intelligence, Bharat OneStop has identified active government benefits you may qualify for today." 
            : "Complete your profile intelligence to let Bharat AI discover government benefits you automatically qualify for."}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <button className="px-6 py-3 bg-white text-[#0A1128] font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-lg shadow-white/10 flex items-center gap-2">
            View My Benefits <ArrowRight size={18} />
          </button>
          <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-colors">
            Update Profile
          </button>
        </motion.div>
      </div>
    </div>
  );
};
