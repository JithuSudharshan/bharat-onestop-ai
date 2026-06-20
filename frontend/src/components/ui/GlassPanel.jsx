import React from 'react';
import { cn } from './AnimatedCard';

export const GlassPanel = ({ children, className }) => {
  return (
    <div className={cn(
      "bg-ai-glass backdrop-blur-xl border border-ai-glassBorder shadow-glass rounded-3xl relative overflow-hidden",
      className
    )}>
      {/* Subtle top inner highlight for 3D effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
