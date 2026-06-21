import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { applicationApi } from '../api/applicationApi';
import { AILoader } from '../components/ui/AILoader';
import { Sparkles, Download, ArrowLeft } from 'lucide-react';
import { 
  ApplicationHero, 
  AIExplanationCard, 
  DocumentChecklist, 
  MissingInformation, 
  AIFormPreview 
} from '../components/application/ApplicationComponents';

const ApplicationAssistant = () => {
  const { schemeId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (schemeId) {
      generateOrFetchDraft();
    }
  }, [schemeId]);

  const generateOrFetchDraft = async () => {
    try {
      setLoading(true);
      setError(null);
      // Attempt to create a new application draft for this scheme
      const res = await applicationApi.createApplication(schemeId);
      setApplication(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to generate application draft. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateField = async (fieldId, value) => {
    try {
      const res = await applicationApi.updateField(application._id, fieldId, value);
      setApplication(res.data);
    } catch (err) {
      console.error('Failed to update field', err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-[50px] opacity-20 rounded-full animate-pulse"></div>
          <Sparkles size={64} className="text-blue-400 animate-bounce relative z-10" />
        </div>
        <p className="mt-8 text-gray-900 font-extrabold text-xl">Gemini is preparing your application...</p>
        <p className="mt-2 text-gray-500 font-medium text-sm">Matching profile data, documents, and scheme requirements.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <p className="text-red-500 font-bold text-lg mb-4">{error}</p>
        <button onClick={() => navigate(-1)} className="text-blue-500 underline">Go Back</button>
      </div>
    );
  }

  if (!application) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24">
      {/* Back Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-semibold text-sm"
      >
        <ArrowLeft size={16} /> Back to Schemes
      </button>

      {/* Hero Section */}
      <ApplicationHero application={application} />

      <AIExplanationCard insights={application.aiInsights} />

      <div className="space-y-8">
        <AIFormPreview fields={application.formFields} onUpdateField={handleUpdateField} />

        {/* 50/50 Split for Action Required and Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <MissingInformation missingFields={application.missingInformation} />
          <DocumentChecklist documents={application.requiredDocuments} />
        </div>
        
        {application.applicationStatus === 'ready' || application.aiInsights?.completionScore > 90 ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-green-600 mb-2">Application Ready</h3>
            <p className="text-green-700/70 mb-6">Bharat AI has successfully mapped all requirements.</p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transition-colors">
              <Download size={20} /> Download Application Summary
            </button>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};

export default ApplicationAssistant;
