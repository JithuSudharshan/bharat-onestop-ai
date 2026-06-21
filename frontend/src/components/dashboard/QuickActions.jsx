import React from 'react';
import { ArrowRight, Search, FileText, Upload } from 'lucide-react';
import { AnimatedCard } from '../ui/AnimatedCard';
import { Link } from 'react-router-dom';

export const QuickActions = () => {
  const actions = [
    { title: "Find Schemes", icon: Search, color: "text-blue-600", bg: "bg-blue-50", link: "/dashboard/schemes" },
    { title: "Upload Docs", icon: Upload, color: "text-indigo-600", bg: "bg-indigo-50", link: "/dashboard/documents" },
    { title: "Update Profile", icon: FileText, color: "text-purple-600", bg: "bg-purple-50", link: "/dashboard/profile" },
  ];

  return (
    <AnimatedCard className="p-6 bg-white flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          {actions.map((action, i) => (
            <Link key={i} to={action.link} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${action.bg} ${action.color}`}>
                  <action.icon size={18} />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900">{action.title}</span>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
};
