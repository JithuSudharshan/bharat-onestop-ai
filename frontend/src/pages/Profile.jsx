import React from 'react';
import { useCitizenProfile } from '../hooks/useCitizenProfile';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { AILoader } from '../components/ui/AILoader';
import { User, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { profile, loading } = useCitizenProfile();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AILoader />
        <p className="mt-4 text-gray-500 font-medium">Loading Citizen Data...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Citizen Profile</h1>
        <p className="text-gray-500 mt-2 text-lg">Manage your secure government identity. Keep this updated for precise AI matches.</p>
      </div>

      <AnimatedCard className="p-8 bg-white">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-indigo-500/30">
            {profile?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{profile?.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-200">
                Verified
              </span>
              <span className="text-gray-500 text-sm">Profile Complete</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="p-3 bg-white rounded-xl shadow-sm text-blue-600"><User size={24} /></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="text-lg font-bold text-gray-900">{profile?.age} Years</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600"><MapPin size={24} /></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Location</p>
              <p className="text-lg font-bold text-gray-900">{profile?.district}, {profile?.state}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="p-3 bg-white rounded-xl shadow-sm text-purple-600"><Briefcase size={24} /></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Occupation</p>
              <p className="text-lg font-bold text-gray-900">{profile?.occupation}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-600"><GraduationCap size={24} /></div>
            <div>
              <p className="text-sm font-medium text-gray-500">Education</p>
              <p className="text-lg font-bold text-gray-900 capitalize">{profile?.education}</p>
            </div>
          </div>
        </div>
      </AnimatedCard>
    </motion.div>
  );
};

export default Profile;
