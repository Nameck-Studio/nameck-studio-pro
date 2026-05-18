import { render, screen } from '@testing-library/react';
import CaseStudiesPage from './CaseStudiesPage';

describe('CaseStudiesPage', () => {
  it('renders hero', () => {
    render(<CaseStudiesPage />);
    expect(screen.getByText(/Neural Curation/)).toBeInTheDocument();
  });

  it('renders projects', () => {
    render(<CaseStudiesPage />);
    expect(screen.getByText('AI Video Synthesis')).toBeInTheDocument();
    expect(screen.getByText('Neural Enhancement')).toBeInTheDocument();
  });
});
