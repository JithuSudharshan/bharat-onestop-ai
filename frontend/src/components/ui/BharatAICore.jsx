import React from 'react';
import { motion } from 'framer-motion';

export const BharatAICore = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Orbit 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-ai-blue/20 border-t-ai-blue/60"
      />
      
      {/* Outer Orbit 2 */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 rounded-full border border-ai-purple/20 border-b-ai-purple/60"
      />

      {/* Outer Glow */}
      <div className="absolute inset-10 rounded-full bg-ai-blue/20 blur-2xl animate-pulse-slow"></div>
      
      {/* Inner Core */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-ai-blue to-ai-purple shadow-glow-blue flex items-center justify-center overflow-hidden"
      >
        {/* Core highlight */}
        <div className="absolute top-0 right-0 w-full h-1/2 bg-white/20 blur-md rounded-full transform -translate-y-1/2 translate-x-1/4"></div>
        <span className="text-white font-bold text-2xl tracking-tighter mix-blend-overlay">B</span>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-white/60 blur-[1px]"
          animate={{
            y: [-20, 20, -20],
            x: Math.sin(i) * 30,
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5
          }}
          style={{
            top: `${50 + Math.cos(i * 60) * 40}%`,
            left: `${50 + Math.sin(i * 60) * 40}%`
          }}
        />
      ))}
    </div>
  );
};
