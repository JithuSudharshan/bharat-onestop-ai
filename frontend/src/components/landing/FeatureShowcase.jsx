import React from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from '../ui/GlassPanel';
import { AnimatedCard } from '../ui/AnimatedCard';
import { FileSearch, BrainCircuit, ShieldCheck, Languages } from 'lucide-react';

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Citizen Intelligence',
    description: 'Deep profile understanding. The AI connects your unique context to government knowledge bases instantly.',
    colSpan: 'md:col-span-2'
  },
  {
    icon: FileSearch,
    title: 'Document Extraction',
    description: 'Upload Aadhaar, PAN, or Marksheets. Bharat OneStop AI extracts metadata automatically.',
    colSpan: 'md:col-span-1'
  },
  {
    icon: ShieldCheck,
    title: 'Eligibility Engine',
    description: 'Source-verified reasoning. See exactly why you qualify for a scheme with transparent rule-matching.',
    colSpan: 'md:col-span-1'
  },
  {
    icon: Languages,
    title: 'Multilingual Support',
    description: 'Talk to your Copilot in English, Hindi, or Malayalam seamlessly.',
    colSpan: 'md:col-span-2'
  }
];

export const FeatureShowcase = () => {
  return (
    <section className="py-32 relative z-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:w-2/3">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            An operating system for <span className="text-gradient">citizens.</span>
          </h2>
          <p className="text-xl text-gray-400 font-light">
            We replaced thousands of confusing portals with a single, intelligent interface.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <AnimatedCard 
              key={index} 
              delay={index * 0.1}
              className={`p-8 flex flex-col justify-between ${feature.colSpan} min-h-[250px]`}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ai-blue/20 to-ai-purple/20 flex items-center justify-center text-ai-blue mb-8 border border-ai-blue/20">
                <feature.icon size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">{feature.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};
