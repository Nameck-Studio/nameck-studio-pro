import { useCallback } from 'react';
import { cn } from '@lib/utils/cn';
import Icon from './Icon';

interface ChipProps {
  label: string;
  onDelete?: () => void;
  variant?: 'default' | 'add';
  className?: string;
}

function Chip({ label, onDelete, variant = 'default', className }: ChipProps): React.JSX.Element {
  const handleDelete = useCallback(() => {
    onDelete?.();
  }, [onDelete]);

  if (variant === 'add') {
    return (
      <button
        type="button"
        className={cn(
          'border-border-default text-text-secondary hover:border-accent-lime hover:text-accent-lime inline-flex cursor-pointer items-center gap-1 rounded-full border border-dashed px-3 py-1 text-xs transition-colors',
          className,
        )}
        onClick={handleDelete}
      >
        <Icon name="add" size={14} />
        {label}
      </button>
    );
  }

  return (
    <span
      className={cn(
        'bg-bg-card border-border-default inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs',
        className,
      )}
    >
      {label}
      {onDelete ? (
        <button
          type="button"
          className="text-text-muted hover:text-text-primary cursor-pointer transition-colors"
          onClick={handleDelete}
          aria-label={`Remove ${label}`}
        >
          <Icon name="close" size={14} />
        </button>
      ) : null}
    </span>
  );
}

export default Chip;
