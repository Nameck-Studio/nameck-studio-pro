import Avatar from '@components/ui/Avatar';
import Icon from '@components/ui/Icon';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';
import { NAV_PRO } from '@lib/utils/constants';
import type { ReactNode } from 'react';

interface TopBarProps {
  children?: ReactNode;
}

function TopBar({ children }: TopBarProps): React.JSX.Element {
  const { user } = useAuth();
  const location = useLocation();

  const currentNav = NAV_PRO.find((item) => location.pathname.startsWith(item.path));
  const pageTitle =
    currentNav?.label ??
    (location.pathname.startsWith('/pro/create')
      ? 'Create New'
      : location.pathname.startsWith('/pro/editor')
        ? 'Post Editor'
        : 'Overview');

  return (
    <header className="bg-bg-primary border-border-default/50 sticky top-0 z-50 flex items-center justify-between border-b px-6 py-4 md:ml-72">
      <div className="flex items-center gap-8">
        <h1 className="text-accent-lime text-xl font-black tracking-tighter">{pageTitle}</h1>
        {children}
      </div>
      <div className="flex items-center gap-6">
        <div className="bg-bg-secondary/50 border-border-default hidden items-center gap-3 rounded-lg border px-4 py-2 transition-colors focus-within:border-accent-lime/50 sm:flex">
          <Icon name="search" size={18} className="text-text-muted" />
          <input
            className="text-text-secondary placeholder:text-text-muted w-48 border-none bg-transparent text-sm focus:outline-none focus:ring-0 lg:w-64"
            placeholder="Search scheduled reels..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-text-muted hover:bg-bg-secondary hover:text-accent-lime flex h-10 w-10 items-center justify-center rounded-lg transition-all active:scale-95"
            aria-label="Notifications"
          >
            <Icon name="notifications" size={22} />
          </button>
          <button
            type="button"
            className="text-text-muted hover:bg-bg-secondary hover:text-accent-lime flex h-10 w-10 items-center justify-center rounded-lg transition-all active:scale-95"
            aria-label="Settings"
          >
            <Icon name="settings" size={22} />
          </button>
          <div className="bg-border-default mx-1 h-8 w-px" />
          {user ? (
            <button
              type="button"
              className="border-border-default hover:border-border-hover flex items-center gap-2 rounded-full border p-1 pr-3 transition-all hover:bg-bg-secondary"
            >
              <Avatar
                name={`${user.firstName} ${user.lastName}`}
                src={user.avatarUrl}
                size="sm"
              />
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default TopBar;
