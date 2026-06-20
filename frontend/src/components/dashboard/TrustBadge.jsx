import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const TrustBadge = () => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50/50 border border-blue-100 text-blue-700 text-xs font-medium">
      <ShieldCheck size={14} />
      <span>Gov-AI Verified</span>
    </div>
  );
};
