import { cn } from '@lib/utils/cn';

interface BarChartProps {
  data: { label: string; value: number }[];
  maxValue?: number;
  className?: string;
}

function BarChart({ data, maxValue, className }: BarChartProps): React.JSX.Element {
  const max = maxValue ?? Math.max(...data.map((d) => d.value));

  return (
    <div className={cn('flex items-end gap-2', className)} role="img" aria-label="Bar chart">
      {data.map((item) => {
        const height = max > 0 ? (item.value / max) * 100 : 0;
        return (
          <div key={item.label} className="flex flex-1 flex-col items-center gap-1">
            <div className="relative w-full" style={{ height: '120px' }}>
              <div
                className="bg-accent-lime/60 hover:bg-accent-lime absolute bottom-0 w-full rounded-t transition-colors"
                style={{ height: `${height}%` }}
                title={`${item.label}: ${item.value}`}
              />
            </div>
            <span className="text-text-muted text-[10px]">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default BarChart;
