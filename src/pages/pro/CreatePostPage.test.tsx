import { render, screen } from '@testing-library/react';
import CreatePostPage from './CreatePostPage';

describe('CreatePostPage', () => {
  it('renders drag and drop zone instead of video', () => {
    render(<CreatePostPage />);
    expect(screen.getByText('Drag & drop your video')).toBeInTheDocument();
    expect(screen.getByText('Browse Files')).toBeInTheDocument();
    expect(screen.queryByText('HD PREVIEW')).not.toBeInTheDocument();
  });

  it('renders the post editor form', () => {
    render(<CreatePostPage />);
    expect(screen.getByText('Publish Destinations')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Publish Now/i })).toBeInTheDocument();
  });
});
