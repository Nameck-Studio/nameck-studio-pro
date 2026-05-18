import type { InputHTMLAttributes } from 'react';
import { cn } from '@lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'underline';
}

function Input({
  label,
  error,
  variant = 'default',
  className,
  id,
  ...props
}: InputProps): React.JSX.Element {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-text-secondary text-sm font-medium">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'bg-bg-card text-text-primary placeholder:text-text-muted w-full rounded-lg px-4 py-2.5 text-sm transition-colors outline-none',
          variant === 'default' && 'border-border-default focus:border-accent-lime border',
          variant === 'underline' &&
            'border-border-default focus:border-accent-lime rounded-none border-0 border-b bg-transparent px-0',
          error && 'border-status-error',
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={inputId ? `${inputId}-error` : undefined} className="text-status-error text-xs" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default Input;
