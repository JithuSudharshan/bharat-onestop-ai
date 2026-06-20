import React from 'react';
import { AnimatedCard } from '../ui/AnimatedCard';
import { ProgressRing } from '../ui/ProgressRing';
import { Check, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const EligibilityCard = ({ profile }) => {
  // Mock calculation based on profile completion
  const score = profile?.isProfileComplete ? 96 : 40;
  
  const matched = [
    { label: "Age Verified", valid: true },
    { label: "Income Declared", valid: !!profile?.income },
    { label: "Location Identified", valid: !!profile?.state },
    { label: "Occupation Matched", valid: !!profile?.occupation }
  ];

  const missing = [
    { label: "Income Certificate not uploaded", critical: true },
    { label: "Aadhaar pending verification", critical: false }
  ];

  return (
    <AnimatedCard className="bg-white p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Eligibility Score</h3>
      
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        <div className="shrink-0">
          <ProgressRing progress={score} size={140} label="Average Match" />
        </div>
        
        <div className="flex-1 w-full space-y-6">
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Matched Criteria</h4>
            <div className="grid grid-cols-2 gap-3">
              {matched.map((m, i) => (
                <div key={i} className={`flex items-center gap-2 text-sm ${m.valid ? 'text-gray-700' : 'text-gray-400'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${m.valid ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  {m.label}
                </div>
              ))}
            </div>
          </div>
          
          {score < 100 && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <h4 className="text-sm font-bold text-orange-800 mb-2 flex items-center gap-2">
                <AlertTriangle size={16} /> Action Required
              </h4>
              <ul className="space-y-1">
                {missing.map((m, i) => (
                  <li key={i} className="text-sm text-orange-700 flex items-start gap-2">
                    <span className="mt-1">•</span> {m.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
};
