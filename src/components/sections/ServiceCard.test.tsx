import { render, screen } from '@testing-library/react';
import ServiceCard from './ServiceCard';

describe('ServiceCard', () => {
  it('renders title and description', () => {
    render(<ServiceCard icon="brush" title="Design" description="We design" />);
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('We design')).toBeInTheDocument();
  });

  it('renders tags', () => {
    render(<ServiceCard icon="brush" title="Design" description="d" tags={['UI', 'UX']} />);
    expect(screen.getByText('UI')).toBeInTheDocument();
    expect(screen.getByText('UX')).toBeInTheDocument();
  });
});
