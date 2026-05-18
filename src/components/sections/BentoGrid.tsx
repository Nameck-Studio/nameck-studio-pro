import type { ReactNode } from 'react';
import { cn } from '@lib/utils/cn';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

function BentoGrid({ children, className }: BentoGridProps): React.JSX.Element {
  return (
    <div className={cn('grid grid-cols-4 gap-4 md:grid-cols-8 lg:grid-cols-12', className)}>
      {children}
    </div>
  );
}

interface BentoItemProps {
  children: ReactNode;
  span?: number;
  className?: string;
}

function BentoItem({ children, span = 4, className }: BentoItemProps): React.JSX.Element {
  const colSpanClass = `col-span-${span}` as string;

  return (
    <div
      className={cn(colSpanClass, className)}
      style={{ gridColumn: `span ${span} / span ${span}` }}
    >
      {children}
    </div>
  );
}

export { BentoGrid, BentoItem };
