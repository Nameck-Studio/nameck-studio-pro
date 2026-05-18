import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

function renderNavbar(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
    </MemoryRouter>,
  );
}

describe('Navbar', () => {
  it('renders logo link', () => {
    renderNavbar();
    expect(screen.getByText('NAMECK STUDIO')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderNavbar();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('renders Get Started button', () => {
    renderNavbar();
    expect(screen.getAllByText('Get Started').length).toBeGreaterThanOrEqual(1);
  });

  it('toggles mobile menu', async () => {
    renderNavbar();
    const btn = screen.getByLabelText('Open menu');
    await userEvent.click(btn);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    renderNavbar('/about');
    const aboutLink = screen.getAllByText('About')[0]!;
    expect(aboutLink).toHaveAttribute('aria-current', 'page');
  });
});
