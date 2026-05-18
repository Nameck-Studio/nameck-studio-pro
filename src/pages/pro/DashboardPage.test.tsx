import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import DashboardPage from './DashboardPage';

function renderDashboard() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <DashboardPage />
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('DashboardPage', () => {
  it('renders welcome header', () => {
    renderDashboard();
    expect(screen.getByText('System Online')).toBeInTheDocument();
    expect(screen.getByText(/Welcome Back/)).toBeInTheDocument();
  });

  it('renders metric cards', () => {
    renderDashboard();
    expect(screen.getByText('Total Views')).toBeInTheDocument();
    expect(screen.getByText('Engagement Rate')).toBeInTheDocument();
    expect(screen.getByText('Total Shares')).toBeInTheDocument();
    expect(screen.getByText('New Followers')).toBeInTheDocument();
  });

  it('renders audience growth section', () => {
    renderDashboard();
    expect(screen.getByText('Audience Growth')).toBeInTheDocument();
  });

  it('renders period toggles', () => {
    renderDashboard();
    expect(screen.getByRole('button', { name: 'WEEK' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'MONTH' })).toBeInTheDocument();
  });

  it('renders recent content section', () => {
    renderDashboard();
    expect(screen.getByText('Recent Content')).toBeInTheDocument();
    expect(screen.getByText('Cyberpunk Aesthetic Breakdown')).toBeInTheDocument();
  });

  it('renders system health panel', () => {
    renderDashboard();
    expect(screen.getByText('System Health')).toBeInTheDocument();
    expect(screen.getByText('42%')).toBeInTheDocument();
  });

  it('renders live syncing badge', () => {
    renderDashboard();
    expect(screen.getByText('LIVE SYNCING')).toBeInTheDocument();
  });
});
