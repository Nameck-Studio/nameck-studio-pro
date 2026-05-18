import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies default variant', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('bg-bg-card');
  });

  it('applies glass variant', () => {
    const { container } = render(<Card variant="glass">Glass</Card>);
    expect(container.firstChild).toHaveClass('glass');
  });

  it('applies elevated variant', () => {
    const { container } = render(<Card variant="elevated">Elevated</Card>);
    expect(container.firstChild).toHaveClass('shadow-lg');
  });

  it('accepts custom className', () => {
    const { container } = render(<Card className="mt-4">Custom</Card>);
    expect(container.firstChild).toHaveClass('mt-4');
  });
});
