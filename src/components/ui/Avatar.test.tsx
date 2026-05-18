import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders image when src provided', () => {
    render(<Avatar name="Alex Demo" src="/avatar.jpg" />);
    const img = screen.getByAltText('Alex Demo');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/avatar.jpg');
  });

  it('renders initials when no src', () => {
    render(<Avatar name="Alex Demo" />);
    expect(screen.getByLabelText('Alex Demo')).toHaveTextContent('AD');
  });

  it('applies size class', () => {
    render(<Avatar name="Alex" size="lg" />);
    expect(screen.getByLabelText('Alex')).toHaveClass('h-14');
  });

  it('handles single name', () => {
    render(<Avatar name="Alex" />);
    expect(screen.getByLabelText('Alex')).toHaveTextContent('A');
  });
});
