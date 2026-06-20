import React from 'react';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { Hero } from '../components/landing/Hero';
import { FeatureShowcase } from '../components/landing/FeatureShowcase';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen text-white relative">
      <AnimatedBackground />
      
      {/* Top Navigation */}
      <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-ai-blue to-ai-purple flex items-center justify-center font-bold shadow-glow-blue">
            B
          </div>
          <span className="text-xl font-bold tracking-tight">Bharat OneStop</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-gray-300 hover:text-white font-medium transition">Log in</Link>
          <Link to="/register" className="px-5 py-2.5 rounded-full bg-white text-ai-core font-semibold hover:bg-gray-200 transition">Get Started</Link>
        </div>
      </nav>

      <Hero />
      <FeatureShowcase />
      
      {/* CTA Section */}
      <section className="py-32 relative z-10 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Every citizen deserves to know what they qualify for.
          </h2>
          <p className="text-xl text-gray-400 font-light">
            Join the digital public infrastructure revolution today.
          </p>
          <Link 
            to="/register"
            className="inline-block px-10 py-5 rounded-full bg-white text-ai-core font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform"
          >
            Start with Bharat AI
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;
