import React from 'react';
import { User, MapPin, Briefcase, GraduationCap } from 'lucide-react';

const ProfileSummary = ({ profile }) => {
  if (!profile) return <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">Loading profile...</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
          {profile.name?.charAt(0) || 'U'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
          <p className="text-blue-600 font-medium">Citizen Profile Complete</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="bg-white p-2 rounded-lg shadow-sm text-gray-500"><User size={20} /></div>
          <div>
            <p className="text-xs text-gray-500">Age</p>
            <p className="font-semibold text-gray-800">{profile.age} Years</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="bg-white p-2 rounded-lg shadow-sm text-gray-500"><MapPin size={20} /></div>
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="font-semibold text-gray-800">{profile.district}, {profile.state}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="bg-white p-2 rounded-lg shadow-sm text-gray-500"><Briefcase size={20} /></div>
          <div>
            <p className="text-xs text-gray-500">Occupation</p>
            <p className="font-semibold text-gray-800">{profile.occupation}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="bg-white p-2 rounded-lg shadow-sm text-gray-500"><GraduationCap size={20} /></div>
          <div>
            <p className="text-xs text-gray-500">Education</p>
            <p className="font-semibold text-gray-800 capitalize">{profile.education}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
