import React from 'react';
import { HeroSection } from '../components/dashboard/HeroSection';
import { AIInsightsPanel } from '../components/dashboard/AIInsightsPanel';
import { CitizenJourney } from '../components/dashboard/CitizenJourney';
import { EligibilityCard } from '../components/dashboard/EligibilityCard';
import { QuickActions } from '../components/dashboard/QuickActions';
import { useCitizenProfile } from '../hooks/useCitizenProfile';
import { useSchemes } from '../hooks/useSchemes';
import { AILoader } from '../components/ui/AILoader';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const { profile, loading: profileLoading, error: profileError } = useCitizenProfile();
  const { schemes } = useSchemes();

  if (profileLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AILoader />
        <p className="mt-4 text-gray-500 font-medium">Initializing Citizen Core...</p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="bg-red-50 text-red-500 p-6 rounded-2xl border border-red-100 shadow-sm max-w-md text-center">
          <AlertTriangle size={32} className="mx-auto mb-4 text-red-400" />
          <h3 className="text-lg font-bold mb-2">Error Loading Dashboard</h3>
          <p className="text-sm">{profileError}</p>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto space-y-6"
    >
      {/* Top Section */}
      <HeroSection profile={profile} schemeCount={schemes?.length || 0} />

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column (Main Insights) */}
        <div className="col-span-1 md:col-span-12 lg:col-span-8 space-y-6">
          <EligibilityCard profile={profile} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AIInsightsPanel profile={profile} />
            <CitizenJourney profile={profile} />
          </div>
        </div>

        {/* Right Column (Sidebar Actions) */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4 space-y-6">
          <QuickActions />
        </div>

      </div>
    </motion.div>
  );
};

export default Dashboard;
