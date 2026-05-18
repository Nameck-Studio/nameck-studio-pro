import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Published</Badge>);
    expect(screen.getByText('Published')).toBeInTheDocument();
  });

  it('renders dot indicator when dot=true', () => {
    const { container } = render(<Badge dot>Active</Badge>);
    expect(container.querySelector('.rounded-full.h-1\\.5')).toBeInTheDocument();
  });

  it('does not render dot when dot=false', () => {
    const { container } = render(<Badge>Draft</Badge>);
    expect(container.querySelector('.rounded-full.h-1\\.5')).not.toBeInTheDocument();
  });

  it.each(['success', 'warning', 'neutral', 'private', 'info'] as const)(
    'applies %s variant',
    (variant) => {
      render(<Badge variant={variant}>{variant}</Badge>);
      expect(screen.getByText(variant)).toBeInTheDocument();
    },
  );
});
