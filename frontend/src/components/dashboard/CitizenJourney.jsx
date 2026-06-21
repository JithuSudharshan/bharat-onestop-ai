import React, { useEffect, useState } from 'react';
import { AnimatedCard } from '../ui/AnimatedCard';
import { Check, Clock, CircleDashed, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { journeyApi } from '../../api/journeyApi';
import { useNavigate } from 'react-router-dom';

export const CitizenJourney = ({ profile }) => {
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await journeyApi.getCurrentJourney();
        setJourney(res.data);
      } catch (err) {
        console.error('Failed to fetch journey', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJourney();
  }, []);

  if (loading) {
    return (
      <AnimatedCard className="p-6 bg-white h-full flex items-center justify-center">
        <p className="text-gray-400 font-medium">Loading Journey...</p>
      </AnimatedCard>
    );
  }

  if (!journey) {
    return (
      <AnimatedCard className="p-6 bg-white h-full flex flex-col items-center justify-center text-center">
        <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Journey</h3>
        <p className="text-sm text-gray-500 mb-6">Let Bharat AI map your next steps.</p>
        <button 
          onClick={() => navigate('/dashboard/journey')}
          className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2"
        >
          Generate Journey <ArrowRight size={16} />
        </button>
      </AnimatedCard>
    );
  }

  // Extract top 3 actions across all milestones to show in dashboard
  const upcomingActions = [];
  if (journey.milestones) {
    journey.milestones.forEach(milestone => {
      milestone.requiredActions.forEach(action => {
        if (upcomingActions.length < 3) {
          upcomingActions.push({
            _id: action._id || Math.random().toString(),
            title: action.actionText,
            completed: action.completed
          });
        }
      });
    });
  }

  return (
    <AnimatedCard className="p-6 bg-white flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Your Citizen Journey</h3>
        <button 
          onClick={() => navigate('/dashboard/journey')}
          className="text-xs text-blue-600 font-bold hover:underline"
        >
          View Full Plan
        </button>
      </div>
      
      <div className="space-y-0 relative flex-1">
        {/* Connecting line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100 z-0"></div>
        
        {upcomingActions.map((step, i) => {
          let Icon = step.completed ? Check : CircleDashed;
          let iconColor = step.completed ? "text-white" : "text-gray-300";
          let bgColor = step.completed ? "bg-green-500" : "bg-white";
          let textColor = step.completed ? "text-gray-900" : "text-gray-500";
          
          if (!step.completed && i === 0) { // Highlight first incomplete step
            Icon = Clock;
            iconColor = "text-blue-600";
            bgColor = "bg-blue-100";
            textColor = "text-blue-700 font-bold";
          }

          return (
            <motion.div 
              key={step._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 relative z-10 pb-6 last:pb-0"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-white ${bgColor} ${iconColor}`}>
                <Icon size={16} strokeWidth={step.completed ? 3 : 2} />
              </div>
              <div className="flex-1 mt-1">
                <p className={`text-sm ${textColor} line-clamp-2`}>{step.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatedCard>
  );
};
