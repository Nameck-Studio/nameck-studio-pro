import { cn } from '@lib/utils/cn';

interface StatusIndicatorProps {
  status: 'live' | 'syncing' | 'offline';
  label?: string;
  className?: string;
}

const statusConfig: Record<string, { color: string; pulse: boolean; text: string }> = {
  live: { color: 'bg-status-success', pulse: true, text: 'Live' },
  syncing: { color: 'bg-accent-lime', pulse: true, text: 'Syncing' },
  offline: { color: 'bg-text-muted', pulse: false, text: 'Offline' },
};

function StatusIndicator({
  status,
  label,
  className,
}: StatusIndicatorProps): React.JSX.Element {
  const config = statusConfig[status];

  return (
    <span className={cn('inline-flex items-center gap-2 text-xs', className)}>
      <span
        className={cn('h-2 w-2 rounded-full', config?.color, config?.pulse && 'animate-pulse-dot')}
      />
      <span className="text-text-secondary">{label ?? config?.text}</span>
    </span>
  );
}

export default StatusIndicator;
