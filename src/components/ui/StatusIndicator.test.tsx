import { render, screen } from '@testing-library/react';
import StatusIndicator from './StatusIndicator';

describe('StatusIndicator', () => {
  it('renders default label for live', () => {
    render(<StatusIndicator status="live" />);
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('renders custom label', () => {
    render(<StatusIndicator status="syncing" label="Updating..." />);
    expect(screen.getByText('Updating...')).toBeInTheDocument();
  });

  it('renders offline without pulse', () => {
    const { container } = render(<StatusIndicator status="offline" />);
    expect(container.querySelector('.animate-pulse-dot')).not.toBeInTheDocument();
  });

  it('renders live with pulse', () => {
    const { container } = render(<StatusIndicator status="live" />);
    expect(container.querySelector('.animate-pulse-dot')).toBeInTheDocument();
  });
});
