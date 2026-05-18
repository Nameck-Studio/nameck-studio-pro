import { cn } from '@lib/utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  className?: string;
}

function ProgressBar({
  value,
  max = 100,
  label,
  color = 'bg-accent-lime',
  className,
}: ProgressBarProps): React.JSX.Element {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label ? (
        <div className="text-text-secondary flex justify-between text-xs">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      ) : null}
      <div className="bg-bg-card h-2 overflow-hidden rounded-full" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', color)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
