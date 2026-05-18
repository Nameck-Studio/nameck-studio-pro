import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders hero', () => {
    render(<AboutPage />);
    expect(screen.getByText(/Empowering World-Class Creators/)).toBeInTheDocument();
  });

  it('renders value cards', () => {
    render(<AboutPage />);
    expect(screen.getByText('Unmatched Speed')).toBeInTheDocument();
    expect(screen.getByText('Focused Power')).toBeInTheDocument();
  });

  it('renders team members', () => {
    render(<AboutPage />);
    expect(screen.getByText('Olivier Demolliens')).toBeInTheDocument();
    expect(screen.getByText('Imran Mentese')).toBeInTheDocument();
  });
});
