import { render, screen } from '@testing-library/react';
import TestimonialCard from './TestimonialCard';

describe('TestimonialCard', () => {
  it('renders quote and name', () => {
    render(<TestimonialCard name="John" quote="Amazing service" rating={5} />);
    expect(screen.getByText(/Amazing service/)).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('renders correct number of filled stars', () => {
    const { container } = render(<TestimonialCard name="Jane" quote="Good" rating={4} />);
    const stars = container.querySelectorAll('.material-symbols-outlined.text-accent-lime');
    expect(stars).toHaveLength(4);
  });
});
