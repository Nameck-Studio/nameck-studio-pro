import { render } from '@testing-library/react';
import Icon from './Icon';

describe('Icon', () => {
  it('renders icon name', () => {
    const { container } = render(<Icon name="dashboard" />);
    expect(container.querySelector('.material-symbols-outlined')).toHaveTextContent('dashboard');
  });

  it('applies custom size', () => {
    const { container } = render(<Icon name="edit" size={32} />);
    expect(container.firstChild).toHaveStyle({ fontSize: '32px' });
  });

  it('is aria-hidden', () => {
    const { container } = render(<Icon name="home" />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
