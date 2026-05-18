import { render, screen } from '@testing-library/react';
import LineChart from './LineChart';

const data = [
  { date: '2024-10-01', value: 100 },
  { date: '2024-10-02', value: 200 },
  { date: '2024-10-03', value: 150 },
];

describe('LineChart', () => {
  it('renders svg', () => {
    render(<LineChart data={data} />);
    expect(screen.getByRole('img', { name: 'Line chart' })).toBeInTheDocument();
  });

  it('renders with empty data', () => {
    render(<LineChart data={[]} />);
    expect(screen.getByRole('img', { name: 'Line chart' })).toBeInTheDocument();
  });
});
