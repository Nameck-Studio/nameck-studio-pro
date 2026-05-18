import type { HTMLAttributes } from 'react';
import { cn } from '@lib/utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'neutral' | 'private' | 'info';
  dot?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  success: 'bg-status-success/15 text-status-success',
  warning: 'bg-status-warning/15 text-status-warning',
  neutral: 'bg-text-muted/15 text-text-secondary',
  private: 'bg-status-error/15 text-status-error',
  info: 'bg-status-info/15 text-status-info',
};

function Badge({
  variant = 'neutral',
  dot = false,
  className,
  children,
  ...props
}: BadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {dot ? <span className="bg-current h-1.5 w-1.5 rounded-full" /> : null}
      {children}
    </span>
  );
}

export default Badge;
