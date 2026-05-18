import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('renders title', () => {
    render(<HeroSection title="Welcome" />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('renders badge when provided', () => {
    render(<HeroSection title="Hello" badge="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<HeroSection title="Hello" subtitle="World" />);
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('renders CTA and handles click', async () => {
    const handleClick = vi.fn();
    render(<HeroSection title="Hello" ctaLabel="Start" onCtaClick={handleClick} />);
    await userEvent.click(screen.getByRole('button', { name: 'Start' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
