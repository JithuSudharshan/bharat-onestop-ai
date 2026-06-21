import React from 'react';
import { SchemeRecommendation } from '../components/dashboard/SchemeRecommendation';
import { useSchemes } from '../hooks/useSchemes';
import { SkeletonCard } from '../components/ui/SkeletonCard';
import { EmptyState } from '../components/ui/EmptyState';
import { FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Schemes = () => {
  const { schemes, loading, error } = useSchemes();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bharat OneStop Recommended Schemes</h1>
          <p className="text-gray-500 mt-2 text-lg">Personalized benefits curated and verified by Bharat OneStop AI.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-xl border border-indigo-100 font-medium">
          <Sparkles size={18} /> RAG Pipeline Active
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : error ? (
          <div className="text-red-500">Failed to load schemes: {error}</div>
        ) : schemes.length === 0 ? (
          <EmptyState 
            icon={FileText} 
            title="No Schemes Found" 
            description="We couldn't find any schemes matching your current profile. Try updating your profile or uploading more documents."
          />
        ) : (
          schemes.map((scheme, idx) => (
            <SchemeRecommendation key={idx} scheme={scheme} index={idx} />
          ))
        )}
      </div>
    </div>
  );
};

export default Schemes;
