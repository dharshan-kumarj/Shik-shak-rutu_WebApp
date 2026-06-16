import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useAuth } from '../../hooks/useAuth';
import { Activity, BookOpen, Layers, MessageCircle, Users, User } from 'lucide-react';

const TopNav = () => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { name: t('nav_timeline'), path: '/dashboard/timeline', icon: Activity },
    { name: t('nav_journal'), path: '/dashboard/journal', icon: BookOpen },
    { name: t('nav_resources'), path: '/dashboard/resources', icon: Layers },
    { name: t('nav_chat'), path: '/dashboard/chat', icon: MessageCircle },
    { name: t('nav_groups'), path: '/dashboard/groups', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        {/* Logo & Tagline */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
            {/* Ashoka Chakra mock */}
            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-[var(--color-primary)] text-lg leading-tight">Shiksha Saathi</h1>
            <p className="text-xs text-gray-500">30 Days. Real Growth.</p>
          </div>
        </div>

        {/* Desktop Tabs */}
        <nav className="hidden md:flex h-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname.includes(tab.path);
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex items-center gap-2 px-4 h-full border-b-2 transition-colors ${
                  isActive 
                  ? 'border-[var(--color-accent)] text-[var(--color-primary)] font-medium' 
                  : 'border-transparent text-gray-600 hover:text-[var(--color-primary)] hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{tab.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-[var(--color-accent)] font-bold text-lg hover:ring-2 ring-[var(--color-primary)] transition-all"
          >
            {user?.fullName?.charAt(0) || 'U'}
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{user?.emailOrPhone}</p>
              </div>
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                View Profile
              </Link>
              <button 
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/profile?action=language');
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {t('profile_change_language')}
              </button>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                {t('profile_logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;
