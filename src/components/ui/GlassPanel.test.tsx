import { render, screen } from '@testing-library/react';
import GlassPanel from './GlassPanel';

describe('GlassPanel', () => {
  it('renders children', () => {
    render(<GlassPanel>Panel content</GlassPanel>);
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('applies default md blur', () => {
    const { container } = render(<GlassPanel>Content</GlassPanel>);
    expect(container.firstChild).toHaveClass('backdrop-blur-md');
  });

  it('applies custom blur', () => {
    const { container } = render(<GlassPanel blur="lg">Content</GlassPanel>);
    expect(container.firstChild).toHaveClass('backdrop-blur-lg');
  });
});
