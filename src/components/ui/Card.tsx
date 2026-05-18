import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@lib/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated';
  children: ReactNode;
}

const variantStyles: Record<string, string> = {
  default: 'bg-bg-card border border-border-default',
  glass: 'glass glass-hover',
  elevated: 'bg-bg-card border border-border-default shadow-lg',
};

function Card({ variant = 'default', className, children, ...props }: CardProps): React.JSX.Element {
  return (
    <div className={cn('rounded-xl p-5', variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
