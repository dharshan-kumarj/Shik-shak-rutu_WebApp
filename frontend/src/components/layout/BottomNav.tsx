import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Activity, BookOpen, Layers, MessageCircle, Users, ClipboardList, Smartphone } from 'lucide-react';

const BottomNav = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const tabs = [
    { name: t('nav_timeline'), path: '/dashboard/timeline', icon: Activity },
    { name: t('nav_planner'), path: '/dashboard/planner', icon: ClipboardList },
    { name: t('nav_simulation'), path: '/dashboard/simulation', icon: Smartphone },
    { name: t('nav_journal'), path: '/dashboard/journal', icon: BookOpen },
    { name: t('nav_resources'), path: '/dashboard/resources', icon: Layers },
    { name: t('nav_chat'), path: '/dashboard/chat', icon: MessageCircle },
    { name: t('nav_groups'), path: '/dashboard/groups', icon: Users },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-2 pb-safe">
      <div className="flex justify-between items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname.includes(tab.path);
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-[var(--color-primary)]' : 'text-gray-500'
              }`}
            >
              <Icon size={20} className={isActive ? 'stroke-2' : 'stroke-[1.5]'} />
              <span className="text-[10px] font-medium text-center leading-tight">
                {tab.name.split(' ')[0]} {/* Short name for mobile */}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
