import { Link, useLocation } from 'react-router-dom';
import { cn } from '@lib/utils/cn';
import { NAV_PRO } from '@lib/utils/constants';
import Icon from '@components/ui/Icon';

function Sidebar(): React.JSX.Element {
  const location = useLocation();

  return (
    <aside
      className="bg-bg-primary border-border-default fixed left-0 top-0 hidden h-full w-72 shrink-0 flex-col border-r py-8 text-sm font-medium md:flex"
      aria-label="PRO navigation"
    >
      <div className="text-accent-lime mb-8 px-6 text-lg font-black tracking-tighter">
        Nameck Studio PRO
      </div>

      <div className="mb-6 px-4">
        <Link
          to="/pro/create"
          className="bg-accent-lime text-bg-primary glow-lime flex w-full items-center justify-center gap-2 rounded-lg py-3 text-center font-bold leading-none transition-transform active:scale-95"
        >
          <Icon name="add" size={20} />
          <span>Create New</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1" aria-label="Main navigation">
        {NAV_PRO.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-6 py-4 transition-all duration-200 active:opacity-80',
                isActive
                  ? 'bg-bg-secondary text-accent-lime border-accent-lime border-l-4'
                  : 'text-text-muted hover:bg-bg-secondary/50 hover:text-text-primary',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon name={item.icon} size={20} filled={isActive} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
