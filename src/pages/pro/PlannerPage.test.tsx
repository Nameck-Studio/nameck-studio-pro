import { render, screen } from '@testing-library/react';
import PlannerPage from './PlannerPage';

describe('PlannerPage', () => {
  it('renders month label', () => {
    render(<PlannerPage />);
    expect(screen.getByText('October 2024')).toBeInTheDocument();
  });

  it('renders week day headers', () => {
    render(<PlannerPage />);
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
  });

  it('renders calendar events', () => {
    render(<PlannerPage />);
    expect(screen.getByText('Morning Routine')).toBeInTheDocument();
    expect(screen.getByText('Studio Tour')).toBeInTheDocument();
  });

  it('renders footer stats', () => {
    render(<PlannerPage />);
    expect(screen.getByText('Projected Reach')).toBeInTheDocument();
    expect(screen.getByText('1.2M')).toBeInTheDocument();
    expect(screen.getByText('Scheduled Posts')).toBeInTheDocument();
    expect(screen.getByText('Platform Mix')).toBeInTheDocument();
  });
});
