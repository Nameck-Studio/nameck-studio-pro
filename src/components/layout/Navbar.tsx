import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@lib/utils/cn';
import { NAV_PUBLIC } from '@lib/utils/constants';
import Icon from '@components/ui/Icon';
import Button from '@components/ui/Button';

function Navbar(): React.JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return (
    <nav className="glass sticky top-0 z-50" aria-label="Main navigation">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-accent-lime text-xl font-bold tracking-tight">
          NAMECK STUDIO
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_PUBLIC.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-text-secondary hover:text-text-primary text-sm transition-colors',
                location.pathname === item.path && 'text-accent-lime',
              )}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/pro/login">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>

        <button
          type="button"
          className="text-text-primary cursor-pointer md:hidden"
          onClick={toggleMobile}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <Icon name={mobileOpen ? 'close' : 'menu'} />
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-border-default flex flex-col gap-4 border-t px-6 py-4 md:hidden">
          {NAV_PUBLIC.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-text-secondary text-sm',
                location.pathname === item.path && 'text-accent-lime',
              )}
              onClick={toggleMobile}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/pro/login" onClick={toggleMobile}>
            <Button size="sm" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;
