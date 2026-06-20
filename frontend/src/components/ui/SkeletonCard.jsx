import React from 'react';
import { motion } from 'framer-motion';

export const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 w-full">
      <div className="flex justify-between items-start mb-6">
        <div className="w-2/3 h-6 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="w-16 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="w-full h-20 bg-gray-100 rounded-xl mb-6 animate-pulse"></div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="space-y-2">
            <div className="w-full h-3 bg-gray-100 rounded animate-pulse"></div>
            <div className="w-5/6 h-3 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
        <div>
          <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-3"></div>
          <div className="space-y-2">
            <div className="w-full h-3 bg-gray-100 rounded animate-pulse"></div>
            <div className="w-4/5 h-3 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
