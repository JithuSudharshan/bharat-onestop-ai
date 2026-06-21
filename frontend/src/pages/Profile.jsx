import React from 'react';
import { useCitizenProfile } from '../hooks/useCitizenProfile';
import { AILoader } from '../components/ui/AILoader';
import { GlassPanel } from '../components/ui/GlassPanel';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { User, MapPin, Briefcase, GraduationCap, ShieldCheck, Zap, AlertTriangle, Fingerprint, Award, CreditCard, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const ConfidenceRing = ({ score }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  let colorClass = "text-red-500";
  if (score >= 90) colorClass = "text-green-500";
  else if (score >= 70) colorClass = "text-yellow-500";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-12 h-12 transform -rotate-90">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
        <circle 
          cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="4" fill="transparent" 
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round" className={colorClass} 
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-white">{score}%</span>
    </div>
  );
};

const VerificationBadge = ({ label, verified }) => (
  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${verified ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-white/5 border-white/10 text-gray-400'}`}>
    {verified && <ShieldCheck size={12} />}
    {label}
  </div>
);

const IntelligenceSection = ({ icon: Icon, title, children, score }) => (
  <AnimatedCard className="h-full flex flex-col p-0">
    <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/5">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-ai-blue/20 to-ai-purple/20 text-ai-blue rounded-lg border border-ai-blue/20">
          <Icon size={18} />
        </div>
        <h3 className="font-semibold text-white tracking-wide">{title}</h3>
      </div>
      {score !== undefined && <ConfidenceRing score={score} />}
    </div>
    <div className="p-5 flex-1 flex flex-col justify-center space-y-4">
      {children}
    </div>
  </AnimatedCard>
);

const Profile = () => {
  const { profile, loading } = useCitizenProfile();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AILoader />
        <p className="mt-4 text-gray-500 font-medium">Synthesizing AI Citizen Intelligence...</p>
      </div>
    );
  }

  // Mock confidence scores for the UI demo based on profile completeness
  const overallScore = profile?.isProfileComplete ? 92 : 45;
  const personalScore = profile?.name && profile?.age ? 98 : 30;
  const financialScore = profile?.income?.annualIncome ? 95 : 20;
  const educationScore = profile?.education ? 88 : 15;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* 1. AI Profile Header */}
      <GlassPanel className="p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-ai-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-tr from-ai-blue to-ai-purple rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-glow-blue border border-white/20 transform rotate-3">
              {profile?.name?.charAt(0) || 'U'}
            </div>
            <div className="absolute -bottom-3 -right-3 bg-gray-900 border border-white/10 p-2 rounded-xl text-ai-blue">
              <Fingerprint size={20} />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">{profile?.name || 'Unknown Citizen'}</h1>
              <div className="flex items-center justify-center gap-2">
                <VerificationBadge label="AI Validated" verified={true} />
                <VerificationBadge label="Kyc Active" verified={profile?.isProfileComplete} />
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-xl">
              Bharat AI Core maintains a live intelligence graph of your identity, optimizing scheme matching in real-time.
            </p>
          </div>

          <div className="flex flex-col items-center bg-black/40 border border-white/10 px-6 py-4 rounded-2xl">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">AI Match Confidence</span>
            <div className="flex items-end gap-1">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                {overallScore}%
              </span>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 2. Personal Intelligence */}
        <div className="col-span-1 md:col-span-6 lg:col-span-4">
          <IntelligenceSection icon={User} title="Identity Graph" score={personalScore}>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Age & Demographics</p>
                <p className="text-gray-200 font-medium">{profile?.age ? `${profile.age} Years Old` : 'Awaiting Extraction'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Primary Location</p>
                <p className="text-gray-200 font-medium">{profile?.district}, {profile?.state}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Occupation</p>
                <p className="text-gray-200 font-medium">{profile?.occupation || 'Not Specified'}</p>
              </div>
            </div>
          </IntelligenceSection>
        </div>

        {/* 3. Financial Intelligence */}
        <div className="col-span-1 md:col-span-6 lg:col-span-4">
          <IntelligenceSection icon={CreditCard} title="Financial Profile" score={financialScore}>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Annual Income</p>
                <p className="text-gray-200 font-medium text-xl">
                  {profile?.income?.annualIncome ? `₹${profile.income.annualIncome.toLocaleString()}` : 'Awaiting Extraction'}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Income Category</p>
                <p className="text-gray-200 font-medium">
                  {profile?.income?.annualIncome < 250000 ? 'EWS (Economically Weaker Section)' : 'Standard'}
                </p>
              </div>
              <div className="pt-2">
                <VerificationBadge label={profile?.income?.annualIncome ? "Extracted from Doc" : "Self-Declared"} verified={!!profile?.income?.annualIncome} />
              </div>
            </div>
          </IntelligenceSection>
        </div>

        {/* 4. Education Intelligence */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4">
          <IntelligenceSection icon={GraduationCap} title="Academic Status" score={educationScore}>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Highest Qualification</p>
                <p className="text-gray-200 font-medium capitalize">{profile?.education ? profile.education.replace('_', ' ') : 'Awaiting Extraction'}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Status</p>
                <p className="text-gray-200 font-medium">Verified by AI Agent</p>
              </div>
            </div>
          </IntelligenceSection>
        </div>

        {/* 5. AI Eligibility Signals */}
        <div className="col-span-1 md:col-span-6 lg:col-span-8">
          <AnimatedCard className="h-full bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border-indigo-500/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-yellow-400" size={20} />
              <h3 className="font-bold text-white">Active AI Eligibility Signals</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile?.age < 25 && <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl text-sm font-medium">🎓 Student Match Potential</span>}
              {profile?.income?.annualIncome < 250000 && <span className="px-4 py-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-xl text-sm font-medium">💰 Low Income Grants</span>}
              {profile?.occupation?.toLowerCase().includes('farm') && <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm font-medium">🌾 Farmer Subsidies</span>}
              {profile?.age > 60 && <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl text-sm font-medium">👴 Senior Citizen Benefits</span>}
              
              {(!profile?.age || !profile?.income?.annualIncome) && (
                <span className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-sm font-medium flex items-center gap-2">
                  <Activity size={14} /> AI requires more data to generate signals
                </span>
              )}
            </div>
          </AnimatedCard>
        </div>

        {/* 7. Missing Information / Next Steps */}
        <div className="col-span-1 md:col-span-6 lg:col-span-4">
          <AnimatedCard className="h-full bg-red-900/10 border-red-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-400" size={20} />
              <h3 className="font-bold text-white">Missing Intelligence</h3>
            </div>
            <ul className="space-y-3">
              {!profile?.income?.annualIncome && (
                <li className="flex gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <p>Upload <span className="text-white font-bold">Income Certificate</span> to unlock EWS schemes.</p>
                </li>
              )}
              {(!profile?.education || profile.education === 'no_formal_education') && (
                <li className="flex gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <p>Upload latest <span className="text-white font-bold">Marksheet</span> to verify academic eligibility.</p>
                </li>
              )}
              {profile?.income?.annualIncome && profile?.education && profile.education !== 'no_formal_education' && (
                <li className="flex gap-3 text-sm text-green-400">
                  <ShieldCheck size={16} />
                  <p>Profile intelligence is highly optimized.</p>
                </li>
              )}
            </ul>
          </AnimatedCard>
        </div>

      </div>
    </motion.div>
  );
};

export default Profile;
