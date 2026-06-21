import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, CircleDashed, ChevronDown, FileText, AlertCircle, ArrowRight } from 'lucide-react';

const ActionChecklist = ({ actions, milestoneId, onActionComplete }) => {
  return (
    <div className="space-y-3 mt-4">
      <h5 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Required Actions</h5>
      {actions.map((action, idx) => (
        <motion.div 
          key={action._id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
            action.completed 
              ? 'bg-green-500/10 border-green-500/20 text-green-400' 
              : 'bg-white/5 border-white/10 hover:border-blue-500/30'
          }`}
        >
          <button 
            onClick={() => !action.completed && onActionComplete(action._id)}
            disabled={action.completed}
            className={`mt-0.5 shrink-0 ${action.completed ? 'cursor-default' : 'cursor-pointer hover:scale-110 transition-transform'}`}
          >
            {action.completed ? (
              <CheckCircle2 size={18} className="text-green-400" />
            ) : (
              <CircleDashed size={18} className="text-gray-400" />
            )}
          </button>
          <span className={`text-sm ${action.completed ? 'text-green-200 line-through opacity-70' : 'text-gray-200'}`}>
            {action.actionText}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

const MilestoneCard = ({ milestone, isLast, onActionComplete }) => {
  const [expanded, setExpanded] = useState(false);
  const isCompleted = milestone.requiredActions.length > 0 && milestone.requiredActions.every(a => a.completed);

  return (
    <div className="relative pl-8 md:pl-0">
      {/* Mobile Timeline Line */}
      {!isLast && <div className="absolute left-[15px] top-10 bottom-[-20px] w-0.5 bg-gradient-to-b from-blue-500/50 to-transparent md:hidden"></div>}
      
      <div className="md:grid md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] gap-8 relative">
        {/* Desktop Timeline Left Side */}
        <div className="hidden md:flex flex-col items-end pt-4 pr-8 relative">
          <span className="text-sm font-bold text-blue-400 text-right">{milestone.timeframe}</span>
          <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">{milestone.category}</span>
          
          {/* Node */}
          <div className={`absolute right-[-9px] top-5 w-4 h-4 rounded-full border-2 ${isCompleted ? 'bg-green-400 border-green-500 shadow-[0_0_15px_rgba(74,222,128,0.5)]' : 'bg-[#0A1128] border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]'} z-10`}></div>
          
          {/* Line */}
          {!isLast && <div className="absolute right-[-2px] top-9 bottom-[-40px] w-0.5 bg-gradient-to-b from-blue-500/30 to-blue-500/5 z-0"></div>}
        </div>

        {/* Mobile Timeframe Label */}
        <div className="md:hidden mb-2 flex items-center gap-2">
          <div className={`absolute left-[11px] w-2.5 h-2.5 rounded-full ${isCompleted ? 'bg-green-400' : 'bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`}></div>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{milestone.timeframe}</span>
        </div>

        {/* Card Content */}
        <motion.div 
          layout
          className={`bg-[#0A1128] rounded-2xl p-6 border ${isCompleted ? 'border-green-500/30 shadow-[0_4px_30px_rgba(74,222,128,0.1)]' : 'border-white/10 shadow-xl'} relative overflow-hidden group hover:border-blue-500/30 transition-colors`}
        >
          {isCompleted && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[40px] pointer-events-none"></div>
          )}
          
          <div 
            className="flex items-start justify-between gap-4 cursor-pointer relative z-10"
            onClick={() => setExpanded(!expanded)}
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                {milestone.priority === 'high' && (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider rounded border border-red-500/20">High Priority</span>
                )}
                {isCompleted && (
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded border border-green-500/20 flex items-center gap-1">
                    <CheckCircle2 size={10} /> Completed
                  </span>
                )}
              </div>
              <h3 className={`text-xl font-bold ${isCompleted ? 'text-gray-300' : 'text-white'}`}>{milestone.title}</h3>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">{milestone.description}</p>
            </div>
            
            <button className="p-2 bg-white/5 rounded-full text-gray-400 group-hover:text-white transition-colors shrink-0">
              <motion.div animate={{ rotate: expanded ? 180 : 0 }}>
                <ChevronDown size={20} />
              </motion.div>
            </button>
          </div>

          <AnimatePresence>
            {expanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-white/10 space-y-6 relative z-10">
                  
                  {/* Reasoning */}
                  <div className="bg-blue-500/5 rounded-xl p-4 border border-blue-500/10">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">AI Reasoning</h5>
                    <p className="text-sm text-blue-100/80">{milestone.reasoning}</p>
                  </div>

                  {/* Missing Documents */}
                  {milestone.missingDocuments?.length > 0 && (
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 flex items-center gap-2">
                        <AlertCircle size={14} /> Documents Required
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {milestone.missingDocuments.map((doc, idx) => (
                          <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded-lg text-xs font-medium">
                            <FileText size={12} /> {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  {milestone.requiredActions?.length > 0 && (
                    <ActionChecklist 
                      actions={milestone.requiredActions} 
                      milestoneId={milestone._id} 
                      onActionComplete={onActionComplete}
                    />
                  )}
                  
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export const Timeline = ({ journey, onActionComplete }) => {
  return (
    <div className="space-y-8 md:space-y-12">
      {/* Timeline Start Marker */}
      <div className="hidden md:grid md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] gap-8">
        <div className="flex flex-col items-end pr-8 relative">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]">NOW</span>
          <div className="absolute right-[-2px] top-6 bottom-[-32px] w-0.5 bg-gradient-to-b from-blue-500 to-blue-500/30 z-0"></div>
        </div>
        <div></div>
      </div>

      {journey.milestones.map((milestone, idx) => (
        <MilestoneCard 
          key={milestone._id || idx} 
          milestone={milestone} 
          isLast={idx === journey.milestones.length - 1}
          onActionComplete={onActionComplete}
        />
      ))}
      
      {/* Timeline End Marker */}
      <div className="hidden md:grid md:grid-cols-[140px_1fr] lg:grid-cols-[180px_1fr] gap-8">
        <div className="flex flex-col items-end pr-8 relative">
          <div className="absolute right-[3px] top-0 w-2 h-2 rounded-full bg-blue-500/30"></div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-600 mt-4 mr-[-16px]">Future Goals</span>
        </div>
        <div></div>
      </div>
    </div>
  );
};
