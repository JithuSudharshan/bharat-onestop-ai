import React from 'react';
import { cn } from './AnimatedCard';

export const GlassPanel = ({ children, className }) => {
  return (
    <div className={cn(
      "bg-white/70 backdrop-blur-md border border-white/40 shadow-sm rounded-2xl",
      className
    )}>
      {children}
    </div>
  );
};
