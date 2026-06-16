import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import GovernmentHeader from './GovernmentHeader';
import { useAuth } from '../../hooks/useAuth';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-16 md:pb-0">
      <GovernmentHeader />
      <TopNav />
      <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-6">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
