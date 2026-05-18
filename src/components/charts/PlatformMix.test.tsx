import { render, screen } from '@testing-library/react';
import PlatformMix from './PlatformMix';

const data = [
  { platform: 'TikTok', percentage: 45 },
  { platform: 'Instagram', percentage: 35 },
  { platform: 'Facebook', percentage: 20 },
];

describe('PlatformMix', () => {
  it('renders all platforms', () => {
    render(<PlatformMix data={data} />);
    expect(screen.getByText('TikTok')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
  });

  it('renders percentages', () => {
    render(<PlatformMix data={data} />);
    expect(screen.getByText('45%')).toBeInTheDocument();
    expect(screen.getByText('35%')).toBeInTheDocument();
  });
});
