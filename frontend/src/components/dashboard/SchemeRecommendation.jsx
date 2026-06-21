import React from 'react';
import { AnimatedCard } from '../ui/AnimatedCard';
import { ProgressRing } from '../ui/ProgressRing';
import { ShieldCheck, ArrowRight, FileText, CheckCircle2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const SchemeRecommendation = ({ scheme, index }) => {
  const matchNum = parseInt(scheme.matchScore.replace('%', '')) || 0;

  return (
    <AnimatedCard delay={index * 0.1} className="overflow-hidden group">
      {/* Header with Category & Match Score */}
      <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 bg-white relative">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full border border-indigo-100">
              {scheme.category || 'Government Scheme'}
            </span>
            {scheme.evidence && scheme.evidence.length > 0 && (
              <span className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                <ShieldCheck size={14} /> Source Verified
              </span>
            )}
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
            {scheme.name}
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            <span className="font-semibold text-gray-900">AI Analysis:</span> {scheme.reasoning}
          </p>
        </div>
        
        {/* Progress Ring Visualization */}
        <div className="flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100 group-hover:bg-blue-50/50 transition-colors">
          <ProgressRing progress={matchNum} size={100} label="Eligibility" />
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100 border-t border-gray-100 bg-gray-50">
        <div className="p-6 md:p-8">
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-green-500" /> Key Benefits
          </h4>
          <ul className="space-y-3">
            {scheme.benefits?.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="p-6 md:p-8">
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText size={16} className="text-orange-500" /> Required Documents
          </h4>
          <ul className="space-y-3">
            {scheme.requiredDocuments?.map((d, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="text-xs text-gray-500">
          Last updated: Today
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <a 
            href={scheme.applicationUrl || `https://myscheme.gov.in/search?q=${encodeURIComponent(scheme.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
          >
            Official Portal
          </a>
          <Link 
            to={`/dashboard/application/${encodeURIComponent(scheme.name)}`}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm shadow-blue-600/20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <Sparkles size={16} /> Apply with AI <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </AnimatedCard>
  );
};
