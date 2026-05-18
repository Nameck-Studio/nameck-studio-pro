import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import TopBar from './TopBar';

function renderTopBar(route = '/pro/dashboard') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <TopBar />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('TopBar', () => {
  it('renders page title from route', () => {
    renderTopBar('/pro/dashboard');
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderTopBar();
    expect(screen.getByPlaceholderText('Search scheduled reels...')).toBeInTheDocument();
  });

  it('renders notification and settings buttons', () => {
    renderTopBar();
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Settings')).toBeInTheDocument();
  });
});
