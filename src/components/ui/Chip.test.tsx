import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chip from './Chip';

describe('Chip', () => {
  it('renders label', () => {
    render(<Chip label="#creative" />);
    expect(screen.getByText('#creative')).toBeInTheDocument();
  });

  it('calls onDelete when remove clicked', async () => {
    const handleDelete = vi.fn();
    render(<Chip label="#vfx" onDelete={handleDelete} />);
    await userEvent.click(screen.getByLabelText('Remove #vfx'));
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });

  it('does not show delete button without onDelete', () => {
    render(<Chip label="#tag" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders add variant as button', () => {
    render(<Chip label="Add tag" variant="add" />);
    expect(screen.getByRole('button', { name: /Add tag/i })).toBeInTheDocument();
  });
});
