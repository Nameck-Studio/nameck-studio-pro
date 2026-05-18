import { render, screen } from '@testing-library/react';
import BarChart from './BarChart';

const data = [
  { label: 'Mon', value: 100 },
  { label: 'Tue', value: 200 },
  { label: 'Wed', value: 150 },
];

describe('BarChart', () => {
  it('renders bars for each data point', () => {
    render(<BarChart data={data} />);
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
  });

  it('has aria label', () => {
    render(<BarChart data={data} />);
    expect(screen.getByRole('img', { name: 'Bar chart' })).toBeInTheDocument();
  });
});
