import React, { useState } from 'react';
import { updateProfile } from '../api/profileApi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GlassPanel } from '../components/ui/GlassPanel';
import { Loader2 } from 'lucide-react';
import { indiaLocations } from '../utils/indiaLocations';

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
    requirements: []
  });

  const availableSupportOptions = [
    "Financial Support",
    "Education Loan",
    "Farming Subsidy",
    "Healthcare Benefits",
    "Housing Support",
    "Pension",
    "Skill Development",
    "Business Loan"
  ];

  const handleRequirementToggle = (option) => {
    setFormData(prev => {
      const isSelected = prev.requirements.includes(option);
      if (isSelected) {
        return { ...prev, requirements: prev.requirements.filter(r => r !== option) };
      } else {
        if (prev.requirements.length < 5) {
          return { ...prev, requirements: [...prev.requirements, option] };
        }
        return prev; // max 5 reached
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'state') {
        updated.district = ''; // Reset district when state changes
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.requirements.length === 0) {
      alert("Please select at least 1 support option.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age, 10),
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
                <input required type="text" name="name" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Age</label>
                <input required type="number" name="age" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                <select 
                  required 
                  name="state" 
                  value={formData.state}
                  onChange={handleChange} 
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                >
                  <option value="" disabled>Select your state</option>
                  {Object.keys(indiaLocations).sort().map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">District</label>
                <input 
                  required 
                  type="text" 
                  name="district" 
                  list="district-options"
                  value={formData.district}
                  onChange={handleChange} 
                  disabled={!formData.state}
                  placeholder={formData.state ? "Type or select a district..." : "Select a state first"}
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400 disabled:bg-gray-50 disabled:text-gray-400" 
                />
                <datalist id="district-options">
                  {formData.state && indiaLocations[formData.state]?.map(dist => (
                    <option key={dist} value={dist} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Occupation</label>
                <input required type="text" name="occupation" onChange={handleChange} className="w-full px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 placeholder-gray-400" />
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
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">What kind of support are you looking for?</label>
                <span className="text-xs text-gray-500 font-medium">{formData.requirements.length}/5 selected</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableSupportOptions.map((option) => {
                  const isSelected = formData.requirements.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleRequirementToggle(option)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-200 text-blue-700' 
                          : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
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
