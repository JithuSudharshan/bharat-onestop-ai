import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 w-full overflow-hidden relative">
      {/* Shimmer Effect */}
      <motion.div 
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent z-10"
        animate={{ translateX: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex gap-2 mb-4">
            <div className="w-24 h-6 bg-indigo-50/80 rounded-full animate-pulse"></div>
            <div className="w-28 h-6 bg-green-50/80 rounded-full animate-pulse"></div>
          </div>
          
          <div className="w-3/4 h-8 bg-gray-100 rounded-lg animate-pulse mb-4"></div>
          
          <div className="space-y-2 mb-2">
            <div className="w-full h-4 bg-gray-50 rounded animate-pulse"></div>
            <div className="w-5/6 h-4 bg-gray-50 rounded animate-pulse"></div>
            <div className="w-4/6 h-4 bg-gray-50 rounded animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex-shrink-0 flex items-center justify-center bg-gray-50/50 rounded-2xl w-32 h-32 border border-gray-100 animate-pulse">
          <div className="w-20 h-20 rounded-full border-4 border-gray-100"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-50">
        <div>
          <div className="w-32 h-5 bg-gray-100 rounded animate-pulse mb-4"></div>
          <div className="space-y-3">
            <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-gray-200 mt-1.5" /><div className="w-full h-4 bg-gray-50 rounded animate-pulse" /></div>
            <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-gray-200 mt-1.5" /><div className="w-4/5 h-4 bg-gray-50 rounded animate-pulse" /></div>
          </div>
        </div>
        <div>
          <div className="w-36 h-5 bg-gray-100 rounded animate-pulse mb-4"></div>
          <div className="space-y-3">
            <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-gray-200 mt-1.5" /><div className="w-full h-4 bg-gray-50 rounded animate-pulse" /></div>
            <div className="flex gap-3"><div className="w-2 h-2 rounded-full bg-gray-200 mt-1.5" /><div className="w-3/4 h-4 bg-gray-50 rounded animate-pulse" /></div>
          </div>
        </div>
      </div>
    </div>
  );
};
