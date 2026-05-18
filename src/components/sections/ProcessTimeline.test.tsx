import { render, screen } from '@testing-library/react';
import ProcessTimeline from './ProcessTimeline';

const steps = [
  { number: '01', title: 'Consultation', description: 'We listen' },
  { number: '02', title: 'Execution', description: 'We build' },
];

describe('ProcessTimeline', () => {
  it('renders all steps', () => {
    render(<ProcessTimeline steps={steps} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('Consultation')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('Execution')).toBeInTheDocument();
  });
});
