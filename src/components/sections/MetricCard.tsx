import type { CSSProperties, ReactNode } from 'react';
import Icon from '@components/ui/Icon';
import { cn } from '@lib/utils/cn';
import { formatNumber } from '@lib/utils/formatters';

interface MetricCardProps {
  label: string;
  value: number;
  change: number;
  changeLabel?: string;
  icon: string;
  format?: 'number' | 'percent' | 'raw';
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

function MetricCard({
  label,
  value,
  change,
  changeLabel,
  icon,
  format = 'number',
  className,
  style,
  children,
}: MetricCardProps): React.JSX.Element {
  const formattedValue =
    format === 'percent' ? `${value}%` : format === 'number' ? formatNumber(value) : String(value);

  const isPositive = change >= 0;
  const displayChange = changeLabel ?? `${isPositive ? '+' : ''}${change}${format !== 'raw' ? '%' : ''}`;

  return (
    <div
      className={cn(
        'glass glass-hover flex flex-col justify-between rounded-xl p-6 transition-colors hover:border-accent-lime/30',
        className,
      )}
      style={style}
    >
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-zinc-900 p-2">
          <Icon name={icon} size={24} className="text-accent-lime" />
        </div>
        <span
          className={cn(
            'rounded px-2 py-1 text-xs font-bold',
            isPositive
              ? 'bg-accent-lime/10 text-accent-lime'
              : 'bg-status-error/10 text-status-error',
          )}
        >
          {displayChange}
        </span>
      </div>
      <div className="mt-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">{label}</p>
        <h3 className="mt-1 text-3xl font-black text-white">{formattedValue}</h3>
      </div>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

export default MetricCard;
