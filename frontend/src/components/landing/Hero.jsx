import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { BharatAICore } from '../ui/BharatAICore';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-glass border border-ai-glassBorder shadow-glass">
            <span className="w-2 h-2 rounded-full bg-ai-success animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300 tracking-wide uppercase">Bharat AI 2.0 is Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
            Your AI-powered gateway to <span className="text-gradient">India's opportunities.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-xl font-light leading-relaxed">
            Discover benefits. Understand eligibility. Access services effortlessly. 
            An intelligent digital companion that helps every citizen navigate government infrastructure.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <Link 
              to="/register"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-ai-blue to-ai-purple text-white font-semibold shadow-glow-blue hover:shadow-glow-purple transition-all hover:scale-105 active:scale-95"
            >
              Experience Bharat AI
            </Link>
            <button className="px-8 py-4 rounded-xl bg-ai-glass border border-ai-glassBorder hover:bg-white/10 text-white font-medium flex items-center gap-2 transition-all">
              <Play size={18} /> Watch Demo
            </button>
          </div>

          <div className="pt-8 flex items-center gap-6 border-t border-white/10">
            <div className="text-sm text-gray-500 font-medium">Powered by</div>
            <div className="flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
              <span className="font-bold text-gray-300">Google Cloud</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span className="font-bold text-gray-300">Gemini AI</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative h-[600px] flex items-center justify-center lg:justify-end"
        >
          <BharatAICore className="w-full h-full max-w-[500px]" />
          
          {/* Floating Glass Panels */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 -left-12 px-6 py-4 bg-ai-glass backdrop-blur-xl border border-ai-glassBorder rounded-2xl shadow-glass flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-ai-success/20 flex items-center justify-center text-ai-success text-lg">✓</div>
            <div>
              <p className="text-white font-semibold text-sm">Income Verified</p>
              <p className="text-gray-400 text-xs">High Eligibility</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-0 px-6 py-4 bg-ai-glass backdrop-blur-xl border border-ai-glassBorder rounded-2xl shadow-glass flex flex-col gap-2"
          >
            <p className="text-gray-300 text-xs font-medium uppercase tracking-wider">AI Reasoning</p>
            <p className="text-white font-semibold text-sm max-w-[180px]">Citizen matches exactly 4 criteria for PM KISAN.</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};
