import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import ProLayout from './ProLayout';

function renderWithAuth(route: string, _children: ReactNode) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <Routes>
          <Route path="/pro/login" element={<div>Login Page</div>} />
          <Route element={<ProLayout />}>
            <Route path="/pro/dashboard" element={<div>Dashboard</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>,
  );
}

describe('ProLayout', () => {
  it('redirects to login when not authenticated', () => {
    renderWithAuth('/pro/dashboard', null);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
