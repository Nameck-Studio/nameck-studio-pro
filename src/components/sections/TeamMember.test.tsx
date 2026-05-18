import { render, screen } from '@testing-library/react';
import TeamMember from './TeamMember';

describe('TeamMember', () => {
  it('renders name and role', () => {
    render(<TeamMember name="Olivier Demolliens" role="Technical Director" />);
    expect(screen.getByText('Olivier Demolliens')).toBeInTheDocument();
    expect(screen.getByText('Technical Director')).toBeInTheDocument();
  });

  it('renders with image', () => {
    render(<TeamMember name="Imran" role="Creative" imageUrl="/img.jpg" />);
    expect(screen.getByAltText('Imran')).toHaveAttribute('src', '/img.jpg');
  });
});
