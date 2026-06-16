import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AppLayout from './components/layout/AppLayout';

// Pages
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import SignInPage from './pages/SignInPage';
import LanguageSelectPage from './pages/LanguageSelectPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './components/profile/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Toaster position="top-center" />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/language-select" element={<LanguageSelectPage />} />
            </Route>

            <Route element={<AppLayout />}>
              <Route path="/dashboard/*" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
