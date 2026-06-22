import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import api from '../api/client';
import toast from 'react-hot-toast';

const LanguageSelectPage = () => {
  const { setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isModal = new URLSearchParams(location.search).get('modal') === 'true';

  const languages = [
    { code: 'en', script: 'English', native: 'English' },
    { code: 'hi', script: 'हिंदी', native: 'Hindi' },
    { code: 'ta', script: 'தமிழ்', native: 'Tamil' },
    { code: 'te', script: 'తెలుగు', native: 'Telugu' },
    { code: 'kn', script: 'ಕನ್ನಡ', native: 'Kannada' },
    { code: 'ml', script: 'മലയാളം', native: 'Malayalam' },
    { code: 'mr', script: 'मराठी', native: 'Marathi' },
    { code: 'bn', script: 'বাংলা', native: 'Bengali' },
    { code: 'gu', script: 'ગુજરાતી', native: 'Gujarati' },
    { code: 'pa', script: 'ਪੰਜਾਬੀ', native: 'Punjabi' },
    { code: 'or', script: 'ଓଡ଼ିଆ', native: 'Odia' },
    { code: 'as', script: 'অসমীয়া', native: 'Assamese' },
    { code: 'ur', script: 'اردو', native: 'Urdu' },
  ];

  const handleSelect = async (code: string) => {
    try {
      setLanguage(code);
      localStorage.setItem('shiksha_language_selected', 'true');
      toast.success("Language preference saved!");
      
      if (isModal) {
        navigate(-1);
      } else {
        navigate('/register');
      }
    } catch (err) {
      toast.error("Failed to save language. Please try again.");
    }
  };

  return (
    <div className={`min-h-[calc(100vh-140px)] flex flex-col items-center justify-center p-4 ${isModal ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-4xl w-full text-center mb-10">
        <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-2">Choose Your Language</h2>
        <h3 className="text-xl text-gray-600 font-medium">अपनी भाषा चुनें | உங்கள் மொழியை தேர்வு செய்யுங்கள்</h3>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className="card hover:shadow-md hover:border-[var(--color-accent)] border border-transparent transition-all flex flex-col items-center justify-center p-6 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          >
            <span className="text-2xl font-bold text-[var(--color-primary)] mb-2">{lang.script}</span>
            <span className="text-sm text-gray-500">{lang.native}</span>
          </button>
        ))}
      </div>
      
      <p className="mt-12 text-sm text-gray-500">You can change this anytime from your profile.</p>
    </div>
  );
};

export default LanguageSelectPage;
