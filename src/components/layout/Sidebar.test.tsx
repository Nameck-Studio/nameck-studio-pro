import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import Sidebar from './Sidebar';

function renderSidebar(route = '/pro/dashboard') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <Sidebar />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('Sidebar', () => {
  it('renders brand name', () => {
    renderSidebar();
    expect(screen.getByText('Nameck Studio PRO')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    renderSidebar();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Content Planner')).toBeInTheDocument();
    expect(screen.getByText('Media Library')).toBeInTheDocument();
  });

  it('renders Create New link', () => {
    renderSidebar();
    const createNew = screen.getByText('Create New').closest('a');
    expect(createNew).toHaveAttribute('href', '/pro/create');
  });

  it('highlights active route', () => {
    renderSidebar('/pro/dashboard');
    const link = screen.getByText('Dashboard').closest('a');
    expect(link).toHaveAttribute('aria-current', 'page');
  });
});
