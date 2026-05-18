import { Link } from 'react-router-dom';

function Footer(): React.JSX.Element {
  return (
    <footer className="border-border-default border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 md:flex-row md:justify-between">
        <span className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} Nameck Studio. All rights reserved.
        </span>
        <div className="flex gap-6">
          <Link
            to="#"
            className="text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            Security
          </Link>
          <Link
            to="/terms-of-service"
            className="text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            Terms
          </Link>
          <Link
            to="/privacy-policy"
            className="text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            Privacy
          </Link>
          <Link
            to="#"
            className="text-text-secondary hover:text-text-primary text-sm transition-colors"
          >
            API Status
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
