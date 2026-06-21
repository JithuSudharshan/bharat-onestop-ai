import React from 'react';
import { AnimatedCard } from '../ui/AnimatedCard';
import { Check, Clock, CircleDashed } from 'lucide-react';
import { motion } from 'framer-motion';

export const CitizenJourney = ({ profile }) => {
  const isDocVerified = !!profile?.income?.certificateId || !!profile?.educationDetails?.institution;

  const steps = [
    { title: "Profile Creation", status: "completed", date: "Done" },
    { title: "AI Analysis", status: profile?.isProfileComplete ? "completed" : "current", date: profile?.isProfileComplete ? "Done" : "Pending" },
    { title: "Scheme Discovery", status: profile?.isProfileComplete ? "completed" : "upcoming", date: profile?.isProfileComplete ? "Done" : "" },
    { title: "Document Verification", status: isDocVerified ? "completed" : (profile?.isProfileComplete ? "current" : "upcoming"), date: isDocVerified ? "Done" : "" },
    { title: "Application Submit", status: "upcoming", date: "" }
  ];

  return (
    <AnimatedCard className="p-6 bg-white">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Your Citizen Journey</h3>
      
      <div className="space-y-0 relative">
        {/* Connecting line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100 z-0"></div>
        
        {steps.map((step, i) => {
          let Icon = CircleDashed;
          let iconColor = "text-gray-300";
          let bgColor = "bg-white";
          let textColor = "text-gray-500";
          
          if (step.status === "completed") {
            Icon = Check;
            iconColor = "text-white";
            bgColor = "bg-green-500";
            textColor = "text-gray-900";
          } else if (step.status === "current") {
            Icon = Clock;
            iconColor = "text-blue-600";
            bgColor = "bg-blue-100";
            textColor = "text-blue-700 font-bold";
          }

          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 relative z-10 pb-6 last:pb-0"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-white ${bgColor} ${iconColor}`}>
                <Icon size={16} strokeWidth={step.status === 'completed' ? 3 : 2} />
              </div>
              <div className="flex-1">
                <p className={`text-sm ${textColor}`}>{step.title}</p>
                {step.date && <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatedCard>
  );
};
