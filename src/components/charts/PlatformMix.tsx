import { cn } from '@lib/utils/cn';
import type { PlatformData } from '@/types/analytics';

interface PlatformMixProps {
  data: PlatformData[];
  className?: string;
}

const platformColors: Record<string, string> = {
  TikTok: 'bg-accent-lime',
  Instagram: 'bg-status-info',
  Facebook: 'bg-status-warning',
};

function PlatformMix({ data, className }: PlatformMixProps): React.JSX.Element {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {data.map((item) => (
        <div key={item.platform} className="flex items-center gap-3">
          <span className="text-text-secondary w-20 text-xs">{item.platform}</span>
          <div className="bg-bg-card h-2 flex-1 overflow-hidden rounded-full">
            <div
              className={cn('h-full rounded-full', platformColors[item.platform] ?? 'bg-text-muted')}
              style={{ width: `${item.percentage}%` }}
            />
          </div>
          <span className="text-text-primary w-10 text-right text-xs font-medium">
            {item.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default PlatformMix;
