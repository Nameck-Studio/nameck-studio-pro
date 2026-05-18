import { render, screen } from '@testing-library/react';
import MetricCard from './MetricCard';

describe('MetricCard', () => {
  it('renders label and value', () => {
    render(<MetricCard label="Total Views" value={1200000} change={24} icon="visibility" />);
    expect(screen.getByText('Total Views')).toBeInTheDocument();
    expect(screen.getByText('1.2M')).toBeInTheDocument();
  });

  it('shows positive change badge', () => {
    render(<MetricCard label="Views" value={100} change={10} icon="visibility" />);
    expect(screen.getByText('+10%')).toBeInTheDocument();
  });

  it('shows negative change badge', () => {
    render(<MetricCard label="Shares" value={42800} change={-2} icon="share" />);
    expect(screen.getByText('-2%')).toBeInTheDocument();
  });

  it('formats percent values', () => {
    render(
      <MetricCard label="Engagement" value={14.5} change={8} icon="favorite" format="percent" />,
    );
    expect(screen.getByText('14.5%')).toBeInTheDocument();
  });

  it('renders icon in badge', () => {
    render(<MetricCard label="Views" value={100} change={5} icon="visibility" />);
    expect(screen.getByText('visibility')).toBeInTheDocument();
  });

  it('renders custom children', () => {
    render(
      <MetricCard label="Test" value={100} change={5} icon="star">
        <span>Custom content</span>
      </MetricCard>,
    );
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('uses custom changeLabel when provided', () => {
    render(
      <MetricCard label="Followers" value={892000} change={12} changeLabel="+12K" icon="group" />,
    );
    expect(screen.getByText('+12K')).toBeInTheDocument();
  });
});
