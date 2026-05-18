import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders hero title', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Elevate Your Creator Brand/)).toBeInTheDocument();
  });

  it('renders 3 service cards', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Custom Content Creation')).toBeInTheDocument();
    expect(screen.getByText('Social Media Strategy')).toBeInTheDocument();
    expect(screen.getByText('Brand Management')).toBeInTheDocument();
  });

  it('renders testimonials', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Sarah Chen')).toBeInTheDocument();
  });

  it('renders PRO section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByText('Nameck Studio PRO')).toBeInTheDocument();
  });
});
