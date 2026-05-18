import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { NAV_PRO } from '@lib/utils/constants';
import Icon from '@components/ui/Icon';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

function ProLayout(): React.JSX.Element {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/pro/login" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />
      <TopBar />
      <main className="min-h-screen px-6 pb-24 pt-6 md:ml-72 md:pb-12">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-zinc-800 bg-zinc-950/90 px-6 py-4 backdrop-blur-xl md:hidden"
        aria-label="Mobile navigation"
      >
        {NAV_PRO.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 ${isActive ? 'text-accent-lime' : 'text-zinc-500'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon name={item.icon} size={24} filled={isActive} />
              <span className="text-[10px] font-bold uppercase">
                {item.label.split(' ')[0]}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-24 right-6 md:hidden">
        <Link
          to="/pro/create"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-lime shadow-2xl transition-transform active:scale-90"
          aria-label="Create new"
        >
          <Icon name="add" size={30} filled className="text-bg-primary" />
        </Link>
      </div>
    </div>
  );
}

export default ProLayout;
