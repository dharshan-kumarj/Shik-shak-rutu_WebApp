import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LanguageSelectPage from '../../pages/LanguageSelectPage';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isLanguageModalOpen = searchParams.get('action') === 'language';

  if (isLanguageModalOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
          <button 
            onClick={() => navigate('/profile')}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
          <LanguageSelectPage />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="card text-center py-8">
        <div className="w-24 h-24 bg-orange-100 text-[var(--color-accent)] font-bold text-4xl rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-sm">
          {user?.fullName?.charAt(0) || 'U'}
        </div>
        <h2 className="text-2xl font-bold text-[var(--color-primary)]">{user?.fullName}</h2>
        <p className="text-gray-500">{user?.emailOrPhone}</p>
        
        <div className="mt-6 flex justify-center gap-4">
          <button onClick={() => navigate('/profile?action=language')} className="btn-outline text-sm">
            {t('profile_change_language')}
          </button>
          <button onClick={() => { logout(); navigate('/'); }} className="border border-red-200 text-red-600 hover:bg-red-50 rounded-md px-4 py-2 font-medium text-sm transition-colors">
            {t('profile_logout')}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Professional Details</h3>
          <button className="text-[var(--color-primary)] text-sm font-medium hover:underline">Edit</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          <div>
            <p className="text-xs text-gray-500">State</p>
            <p className="font-medium">{user?.state || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Subject</p>
            <p className="font-medium">{user?.subject || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Grade</p>
            <p className="font-medium">Class {user?.grade || 'N/A'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">School Type</p>
            <p className="font-medium">{user?.schoolType || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="card bg-orange-50 border border-orange-100">
        <h3 className="font-bold text-lg mb-2">My Teaching Journal</h3>
        <p className="text-sm text-gray-600 mb-4">Your auto-generated journal compiling insights from your 30-day journey.</p>
        <button 
          onClick={() => alert('Your journal PDF is generating and will download shortly.')}
          className="btn-primary w-full md:w-auto"
        >
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
