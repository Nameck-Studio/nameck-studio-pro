import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@lib/utils/cn';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  blur?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

const blurMap: Record<string, string> = {
  sm: 'backdrop-blur-sm',
  md: 'backdrop-blur-md',
  lg: 'backdrop-blur-lg',
};

function GlassPanel({
  blur = 'md',
  className,
  children,
  ...props
}: GlassPanelProps): React.JSX.Element {
  return (
    <div
      className={cn(
        'bg-bg-glass border-border-default rounded-xl border',
        blurMap[blur],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassPanel;
