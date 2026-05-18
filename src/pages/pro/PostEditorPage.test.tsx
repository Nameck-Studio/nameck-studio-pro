import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostEditorPage from './PostEditorPage';

describe('PostEditorPage', () => {
  it('renders video preview with HD badge', () => {
    render(<PostEditorPage />);
    expect(screen.getByText('HD PREVIEW')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play video' })).toBeInTheDocument();
  });

  it('renders publish destinations including YouTube', () => {
    render(<PostEditorPage />);
    expect(screen.getByText('Publish Destinations')).toBeInTheDocument();
    expect(screen.getByText('TikTok')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('YouTube')).toBeInTheDocument();
  });

  it('toggles platform selection', async () => {
    render(<PostEditorPage />);
    const instagramBtn = screen.getByRole('button', { name: /Instagram/i });
    expect(instagramBtn).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(instagramBtn);
    expect(instagramBtn).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders caption with character count', () => {
    render(<PostEditorPage />);
    expect(screen.getByLabelText('CAPTION')).toBeInTheDocument();
    expect(screen.getByText('0 / 2200')).toBeInTheDocument();
    expect(screen.getByText('AI ASSISTANT ENABLED')).toBeInTheDocument();
  });

  it('updates character count on typing', async () => {
    render(<PostEditorPage />);
    const textarea = screen.getByLabelText('CAPTION');
    await userEvent.type(textarea, 'Hello');
    expect(screen.getByText('5 / 2200')).toBeInTheDocument();
  });

  it('renders default hashtags', () => {
    render(<PostEditorPage />);
    expect(screen.getByText('#creative')).toBeInTheDocument();
    expect(screen.getByText('#motiondesign')).toBeInTheDocument();
    expect(screen.getByText('#vfx')).toBeInTheDocument();
  });

  it('removes a hashtag on click', async () => {
    render(<PostEditorPage />);
    await userEvent.click(screen.getByRole('button', { name: 'Remove #vfx' }));
    expect(screen.queryByText('#vfx')).not.toBeInTheDocument();
  });

  it('renders publish now toggle enabled by default', () => {
    render(<PostEditorPage />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(screen.queryByLabelText('Schedule date')).not.toBeInTheDocument();
  });

  it('shows schedule inputs when publish now is off', async () => {
    render(<PostEditorPage />);
    await userEvent.click(screen.getByRole('switch'));
    expect(screen.getByLabelText('Schedule date')).toBeInTheDocument();
    expect(screen.getByLabelText('Schedule time')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    render(<PostEditorPage />);
    expect(screen.getByRole('button', { name: /Save Draft/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Publish Now/i })).toBeInTheDocument();
  });
});
