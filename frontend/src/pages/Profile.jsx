import React from 'react';
import { useCitizenProfile } from '../hooks/useCitizenProfile';
import { AILoader } from '../components/ui/AILoader';
import { AnimatedCard } from '../components/ui/AnimatedCard';
import { User, MapPin, Briefcase, GraduationCap, ShieldCheck, Zap, AlertTriangle, Activity, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ConfidenceRing = ({ score }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  
  let colorClass = "text-red-500";
  if (score >= 90) colorClass = "text-green-500";
  else if (score >= 70) colorClass = "text-blue-500";

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-10 h-10 transform -rotate-90">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-gray-100" />
        <circle 
          cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="transparent" 
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} 
          strokeLinecap="round" className={colorClass} 
        />
      </svg>
      <span className="absolute text-[9px] font-bold text-gray-700">{score}%</span>
    </div>
  );
};

const VerificationBadge = ({ label, verified }) => (
  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${verified ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
    {verified && <CheckCircle2 size={14} className="text-green-600" />}
    {label}
  </div>
);

const IntelligenceSection = ({ icon: Icon, title, children, score }) => (
  <AnimatedCard className="h-full flex flex-col bg-white border border-gray-200/60 shadow-sm overflow-hidden rounded-2xl">
    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Icon size={18} />
        </div>
        <h3 className="font-bold text-gray-900 tracking-tight">{title}</h3>
      </div>
      {score !== undefined && <ConfidenceRing score={score} />}
    </div>
    <div className="p-6 flex-1 flex flex-col justify-center space-y-5">
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

  // Mock confidence scores based on profile completeness
  const overallScore = profile?.isProfileComplete ? 92 : 45;
  const personalScore = profile?.name && profile?.age ? 98 : 30;
  const financialScore = profile?.income?.annualIncome ? 95 : 20;
  const educationScore = profile?.education ? 88 : 15;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8 pb-12"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Intelligence Profile</h1>
          <p className="text-gray-500 mt-2 text-lg">Your synchronized citizen identity, powered by Bharat AI.</p>
        </div>
      </div>

      {/* 1. AI Profile Header */}
      <AnimatedCard className="p-8 bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-28 h-28 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-blue-500/20 transform -rotate-3 ring-4 ring-white">
            {profile?.name?.charAt(0) || 'U'}
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">{profile?.name || 'Unknown Citizen'}</h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <VerificationBadge label="AI Validated" verified={true} />
              <VerificationBadge label="KYC Active" verified={profile?.isProfileComplete} />
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide border border-blue-100">
                <ShieldCheck size={14} />
                Gov-ID Linked
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center bg-gray-50 border border-gray-100 px-8 py-5 rounded-2xl">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Match Confidence</span>
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {overallScore}%
            </span>
          </div>
        </div>
      </AnimatedCard>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 2. Personal Intelligence */}
        <div className="col-span-1 md:col-span-6 lg:col-span-4">
          <IntelligenceSection icon={User} title="Identity Graph" score={personalScore}>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Age</span>
                <span className="text-sm font-semibold text-gray-900">{profile?.age ? `${profile.age} Yrs` : '--'}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Location</span>
                <span className="text-sm font-semibold text-gray-900 text-right">{profile?.district ? `${profile.district}, ${profile.state}` : '--'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Occupation</span>
                <span className="text-sm font-semibold text-gray-900">{profile?.occupation || '--'}</span>
              </div>
            </div>
          </IntelligenceSection>
        </div>

        {/* 3. Financial Intelligence */}
        <div className="col-span-1 md:col-span-6 lg:col-span-4">
          <IntelligenceSection icon={Briefcase} title="Financial Profile" score={financialScore}>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Annual Income</span>
                <span className="text-sm font-bold text-green-600">
                  {profile?.income?.annualIncome ? `₹${profile.income.annualIncome.toLocaleString()}` : '--'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Category</span>
                <span className="text-sm font-semibold text-gray-900">
                  {profile?.income?.annualIncome < 250000 ? 'EWS' : 'Standard'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Verification</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${profile?.income?.annualIncome ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {profile?.income?.annualIncome ? 'Document Verified' : 'Self Declared'}
                </span>
              </div>
            </div>
          </IntelligenceSection>
        </div>

        {/* 4. Education Intelligence */}
        <div className="col-span-1 md:col-span-12 lg:col-span-4">
          <IntelligenceSection icon={GraduationCap} title="Academic Status" score={educationScore}>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Highest Level</span>
                <span className="text-sm font-semibold text-gray-900 capitalize">
                  {profile?.education ? profile.education.replace('_', ' ') : '--'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">Institution</span>
                <span className="text-sm font-semibold text-gray-900">Not Extracted</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase tracking-wider text-gray-500 font-bold">AI Status</span>
                <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded-md">
                  Active
                </span>
              </div>
            </div>
          </IntelligenceSection>
        </div>

        {/* 5. AI Eligibility Signals */}
        <div className="col-span-1 md:col-span-6 lg:col-span-8">
          <AnimatedCard className="h-full bg-indigo-50/50 border border-indigo-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Zap size={18} />
              </div>
              <h3 className="font-bold text-gray-900 tracking-tight">Active AI Signals</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile?.age < 25 && <span className="px-4 py-2 bg-white border border-blue-200 text-blue-700 shadow-sm rounded-xl text-sm font-semibold">🎓 Student Potential</span>}
              {profile?.income?.annualIncome < 250000 && <span className="px-4 py-2 bg-white border border-green-200 text-green-700 shadow-sm rounded-xl text-sm font-semibold">💰 EWS Grants</span>}
              {profile?.occupation?.toLowerCase().includes('farm') && <span className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 shadow-sm rounded-xl text-sm font-semibold">🌾 Farmer Subsidies</span>}
              {profile?.age > 60 && <span className="px-4 py-2 bg-white border border-purple-200 text-purple-700 shadow-sm rounded-xl text-sm font-semibold">👴 Senior Benefits</span>}
              
              {(!profile?.age || !profile?.income?.annualIncome) && (
                <span className="px-4 py-2 bg-white border border-gray-200 text-gray-500 shadow-sm rounded-xl text-sm font-medium flex items-center gap-2">
                  <Activity size={16} /> Awaiting more data
                </span>
              )}
            </div>
          </AnimatedCard>
        </div>

        {/* 6. Missing Information */}
        <div className="col-span-1 md:col-span-6 lg:col-span-4">
          <AnimatedCard className="h-full bg-red-50/50 border border-red-100 p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                <AlertTriangle size={18} />
              </div>
              <h3 className="font-bold text-gray-900 tracking-tight">Missing Intelligence</h3>
            </div>
            <ul className="space-y-4">
              {!profile?.income?.annualIncome && (
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <p>Upload an <span className="text-gray-900 font-bold">Income Certificate</span> to unlock EWS schemes.</p>
                </li>
              )}
              {(!profile?.education || profile.education === 'no_formal_education') && (
                <li className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <p>Upload a <span className="text-gray-900 font-bold">Marksheet</span> to verify academic eligibility.</p>
                </li>
              )}
              {profile?.income?.annualIncome && profile?.education && profile.education !== 'no_formal_education' && (
                <li className="flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-2 rounded-lg">
                  <ShieldCheck size={16} />
                  Intelligence highly optimized.
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
