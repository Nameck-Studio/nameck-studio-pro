import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MediaLibraryPage from './MediaLibraryPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <MediaLibraryPage />
    </MemoryRouter>,
  );
}

describe('MediaLibraryPage', () => {
  it('renders title', () => {
    renderPage();
    expect(screen.getByText('Media Library')).toBeInTheDocument();
  });

  it('renders filter buttons', () => {
    renderPage();
    const allButton = screen.getByRole('button', { name: 'all' });
    expect(allButton).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'published' })).toBeInTheDocument();
  });

  it('renders media items', () => {
    renderPage();
    expect(screen.getByText('Cyberpunk Street POV')).toBeInTheDocument();
  });
});
