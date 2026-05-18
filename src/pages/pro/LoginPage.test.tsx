import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import LoginPage from './LoginPage';

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>,
  );

describe('LoginPage', () => {
  it('renders login form', () => {
    renderLogin();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('logs in with valid credentials', async () => {
    renderLogin();
    await userEvent.type(screen.getByLabelText('Email'), 'alex@nameck.studio');
    await userEvent.type(screen.getByLabelText('Password'), 'nameck2024');
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
  });

  it('shows error on invalid credentials', async () => {
    renderLogin();
    await userEvent.type(screen.getByLabelText('Email'), 'wrong@test.com');
    await userEvent.type(screen.getByLabelText('Password'), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});
