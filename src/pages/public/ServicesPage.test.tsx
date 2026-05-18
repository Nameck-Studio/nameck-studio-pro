import { render, screen } from '@testing-library/react';
import ServicesPage from './ServicesPage';

describe('ServicesPage', () => {
  it('renders hero', () => {
    render(<ServicesPage />);
    expect(screen.getByText(/Digital Dominance/)).toBeInTheDocument();
  });

  it('renders service cards', () => {
    render(<ServicesPage />);
    expect(screen.getByText('Custom Content Creation')).toBeInTheDocument();
    expect(screen.getByText('Social Media Strategy')).toBeInTheDocument();
  });

  it('renders process timeline', () => {
    render(<ServicesPage />);
    expect(screen.getByText('Consultation')).toBeInTheDocument();
    expect(screen.getByText('Scaling')).toBeInTheDocument();
  });
});
