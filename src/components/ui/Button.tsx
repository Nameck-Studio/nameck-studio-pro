import { useCallback } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-accent-lime text-bg-primary hover:bg-accent-lime-light glow-lime font-semibold',
  secondary:
    'border border-border-default text-text-primary hover:border-border-hover hover:bg-bg-card',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-card',
  danger: 'bg-status-error text-white hover:bg-red-400',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3 text-base',
};

function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  onClick,
  children,
  ...props
}: ButtonProps): React.JSX.Element {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!loading && onClick) {
        onClick(e);
      }
    },
    [loading, onClick],
  );

  return (
    <button
      className={cn(
        'inline-flex cursor-pointer items-center justify-center rounded-lg transition-all duration-200',
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && 'pointer-events-none opacity-50',
        className,
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {loading ? (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
}

export default Button;
