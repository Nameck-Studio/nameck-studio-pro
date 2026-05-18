import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PublicLayout from './PublicLayout';

describe('PublicLayout', () => {
  it('renders navbar, outlet, and footer', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<div>Home content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('NAMECK STUDIO')).toBeInTheDocument();
    expect(screen.getByText('Home content')).toBeInTheDocument();
    expect(screen.getByText('Security')).toBeInTheDocument();
  });
});
