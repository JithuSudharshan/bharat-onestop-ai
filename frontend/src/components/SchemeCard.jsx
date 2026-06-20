import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';

export const EligibilityScore = ({ score }) => {
  const numScore = parseInt(score.replace('%', ''), 10) || 0;
  
  let color = 'text-green-600 bg-green-50 border-green-200';
  let icon = <CheckCircle size={20} className="text-green-600" />;
  
  if (numScore < 70) {
    color = 'text-yellow-600 bg-yellow-50 border-yellow-200';
    icon = <AlertTriangle size={20} className="text-yellow-600" />;
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${color}`}>
      {icon}
      <span className="font-bold">{score} Match</span>
    </div>
  );
};

export const SchemeCard = ({ scheme }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900 leading-tight">{scheme.name}</h3>
        <EligibilityScore score={scheme.matchScore} />
      </div>
      
      <p className="text-gray-600 mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
        <span className="font-semibold text-blue-800">AI Reasoning:</span> {scheme.reasoning || scheme.reason}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Benefits
          </h4>
          <ul className="space-y-1 text-gray-600 text-sm">
            {scheme.benefits?.map((b, i) => <li key={i}>• {b}</li>)}
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> Required Docs
          </h4>
          <ul className="space-y-1 text-gray-600 text-sm">
            {scheme.requiredDocuments?.map((d, i) => <li key={i}>• {d}</li>)}
          </ul>
        </div>
      </div>

      {scheme.evidence && scheme.evidence.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Verified Source Evidence</p>
          {scheme.evidence.map((ev, i) => (
            <p key={i} className="text-sm text-gray-500 italic">"{ev.relevantText}" - <span className="font-medium">{ev.document}</span></p>
          ))}
        </div>
      )}
      
      <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition">
        Apply Now
      </button>
    </div>
  );
};

export default SchemeCard;
