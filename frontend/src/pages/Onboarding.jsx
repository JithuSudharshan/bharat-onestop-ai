import React, { useState } from 'react';
import { updateProfile } from '../api/profileApi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Loader2 } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    state: '',
    district: '',
    occupation: '',
    education: 'no_formal_education',
    preferredLanguage: 'en',
    requirements: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age, 10),
        requirements: formData.requirements.split(',').map(r => r.trim()),
        isProfileComplete: true
      };
      await updateProfile(payload);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-500">Bharat OneStop AI needs these details to find the best schemes for you.</p>
        </div>

        <GlassPanel className="p-8 bg-white border border-gray-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input required type="text" name="name" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                <input required type="number" name="age" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                <input required type="text" name="state" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">District</label>
                <input required type="text" name="district" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Occupation</label>
                <input required type="text" name="occupation" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Education</label>
                <select name="education" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900">
                  <option value="no_formal_education">None / No Formal Education</option>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="graduate">Graduate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">What kind of support are you looking for?</label>
              <input required type="text" name="requirements" placeholder="e.g. Financial support, Education loan, Farming subsidy (comma separated)" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition flex justify-center items-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Save Profile & Continue"}
            </button>
          </form>
        </GlassPanel>
      </motion.div>
    </div>
  );
};

export default Onboarding;
