import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { journeyApi } from '../api/journeyApi';
import { useCitizenProfile } from '../hooks/useCitizenProfile';
import { AILoader } from '../components/ui/AILoader';
import { JourneyHero } from '../components/journey/JourneyHero';
import { AIInsightPanel } from '../components/journey/AIInsightPanel';
import { Timeline } from '../components/journey/Timeline';
import { Sparkles, Route } from 'lucide-react';

const Journey = () => {
  const { profile, loading: profileLoading } = useCitizenProfile();
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJourney();
  }, []);

  const fetchJourney = async () => {
    try {
      setLoading(true);
      const res = await journeyApi.getCurrentJourney();
      if (res.data) {
        setJourney(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError(null);
      const res = await journeyApi.generateJourney();
      setJourney(res.data);
    } catch (err) {
      setError('Failed to generate journey. Please ensure your profile is complete.');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const handleActionComplete = async (actionId) => {
    try {
      const res = await journeyApi.markActionCompleted(journey._id, actionId);
      setJourney(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (profileLoading || loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <AILoader />
        <p className="mt-4 text-gray-400 font-medium tracking-widest uppercase text-sm">Initializing Journey Map...</p>
      </div>
    );
  }

  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-[50px] opacity-20 rounded-full animate-pulse"></div>
          <Sparkles size={64} className="text-blue-400 animate-bounce relative z-10" />
        </div>
        <p className="mt-8 text-[#0B132B] font-extrabold text-xl">Bharat OneStop AI is analyzing your profile...</p>
        <p className="mt-2 text-gray-500 font-medium text-sm">Synthesizing documents, eligible schemes, and life stage.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Dynamic Header */}
      {!journey && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#0B132B] to-[#1C2541] rounded-3xl p-12 text-center border border-white/5 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-500/10 blur-[100px] pointer-events-none"></div>
          
          <Route size={48} className="mx-auto text-blue-400 mb-6" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">AI Citizen Journey Planner</h1>
          <p className="text-lg text-blue-100/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Let Bharat AI generate a personalized, step-by-step roadmap tailored to your life stage, income, and career goals.
          </p>
          
          <button 
            onClick={handleGenerate}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0B132B] font-bold rounded-full overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Sparkles size={20} className="relative z-10" />
            <span className="relative z-10">Generate My Roadmap</span>
          </button>

          {error && <p className="text-red-400 mt-6 text-sm">{error}</p>}
        </motion.div>
      )}

      {journey && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-12"
        >
          {/* Hero Section */}
          <JourneyHero journey={journey} profile={profile} onRegenerate={handleGenerate} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* AI Insights Sidebar */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              <div className="sticky top-24">
                <AIInsightPanel journey={journey} profile={profile} />
              </div>
            </div>

            {/* Main Timeline */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <Timeline journey={journey} onActionComplete={handleActionComplete} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Journey;
