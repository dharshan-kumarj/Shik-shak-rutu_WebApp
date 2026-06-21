import { Outlet } from 'react-router-dom';
import GovernmentHeader from './GovernmentHeader';
import GovernmentFooter from './GovernmentFooter';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <GovernmentHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <GovernmentFooter />
    </div>
  );
};

export default MainLayout;
