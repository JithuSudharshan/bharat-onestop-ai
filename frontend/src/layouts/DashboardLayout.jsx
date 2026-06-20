import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, User, FileText, Upload, MessageSquare, Bell, Search, LogOut, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { TrustBadge } from '../components/dashboard/TrustBadge';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { logout, user } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: Home },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
    { name: 'Schemes', path: '/dashboard/schemes', icon: FileText },
    { name: 'Documents', path: '/dashboard/documents', icon: Upload },
    { name: 'AI Assistant', path: '/dashboard/assistant', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      {/* Sidebar - Deep Premium Theme */}
      <div className="w-[280px] bg-[#0A1128] text-gray-300 border-r border-gray-800 flex flex-col relative z-20">
        <div className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              B
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Bharat <span className="text-blue-400">OneStop</span>
            </h1>
          </div>
          <div className="mt-6">
            <TrustBadge />
          </div>
        </div>
        
        <div className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Menu
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <div className={`relative z-10 p-1.5 rounded-lg transition-colors ${isActive ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-400 group-hover:text-gray-200'}`}>
                    <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  <span className={`relative z-10 font-medium ${isActive ? 'font-semibold' : ''}`}>{item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="p-4">
          <div className="bg-[#16213E] rounded-2xl p-4 border border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold border-2 border-gray-800 uppercase overflow-hidden">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user?.name ? user.name.substring(0, 2) : 'U'
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">
                  {user?.name || (user?.email ? user.email.split('@')[0] : 'Citizen')}
                </p>
                <p className="text-xs text-gray-400">Citizen Profile</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 rounded-lg transition">
                <Settings size={14} /> Settings
              </button>
              <button onClick={logout} className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-gray-400 rounded-lg transition">
                <LogOut size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Header - Glassmorphism */}
        <header className="h-16 bg-white/70 backdrop-blur-md border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-gray-900">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search schemes, documents..." 
                className="pl-9 pr-4 py-2 bg-gray-100/50 border border-transparent hover:border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-full text-sm outline-none transition-all w-64"
              />
            </div>
            <button className="relative p-2 text-gray-500 hover:text-gray-900 transition">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
