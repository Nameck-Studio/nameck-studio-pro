import { render, screen } from '@testing-library/react';
import { BentoGrid, BentoItem } from './BentoGrid';

describe('BentoGrid', () => {
  it('renders children', () => {
    render(
      <BentoGrid>
        <BentoItem>Item 1</BentoItem>
        <BentoItem>Item 2</BentoItem>
      </BentoGrid>,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies span style', () => {
    render(
      <BentoGrid>
        <BentoItem span={8}>Wide</BentoItem>
      </BentoGrid>,
    );
    expect(screen.getByText('Wide')).toHaveStyle({ gridColumn: 'span 8 / span 8' });
  });
});
