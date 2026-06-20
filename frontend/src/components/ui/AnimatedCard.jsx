import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const AnimatedCard = ({ children, className, delay = 0, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: [0.23, 1, 0.32, 1] // Apple-like easing
      }}
      whileHover={onClick ? { y: -4, scale: 1.01 } : {}}
      onClick={onClick}
      className={cn(
        "bg-ai-glass backdrop-blur-xl border border-ai-glassBorder rounded-3xl transition-all duration-300 relative overflow-hidden shadow-glass",
        onClick ? "cursor-pointer hover:border-ai-blue/30 hover:shadow-glow-blue hover:bg-white/5" : "",
        className
      )}
    >
      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
