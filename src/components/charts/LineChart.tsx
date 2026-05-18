import { useMemo, useRef, useEffect, useState } from 'react';
import { cn } from '@lib/utils/cn';
import type { GrowthPoint } from '@/types/analytics';

interface LineChartProps {
  data: GrowthPoint[];
  className?: string;
}

function LineChart({ data, className }: LineChartProps): React.JSX.Element {
  const pathRef = useRef<SVGPathElement>(null);
  const [lineLength, setLineLength] = useState(1000);

  const { path, area, points, viewBox } = useMemo(() => {
    if (data.length === 0) return { path: '', area: '', points: [], viewBox: '0 0 100 100' };

    const w = 400;
    const h = 150;
    const padding = 10;
    const values = data.map((d) => d.value);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;

    const pts = data.map((d, i) => ({
      x: padding + (i / (data.length - 1)) * (w - 2 * padding),
      y: h - padding - ((d.value - minVal) / range) * (h - 2 * padding),
      value: d.value,
      date: d.date,
    }));

    const pathStr = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaStr = `${pathStr} L ${pts[pts.length - 1]!.x} ${h} L ${pts[0]!.x} ${h} Z`;

    return { path: pathStr, area: areaStr, points: pts, viewBox: `0 0 ${w} ${h}` };
  }, [data]);

  useEffect(() => {
    if (pathRef.current && typeof pathRef.current.getTotalLength === 'function') {
      setLineLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  return (
    <div className={cn('w-full', className)} role="img" aria-label="Line chart">
      <svg viewBox={viewBox} className="h-40 w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-lime)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-accent-lime)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {area ? (
          <path d={area} fill="url(#lineGradient)" className="animate-fill-area" />
        ) : null}
        {path ? (
          <path
            ref={pathRef}
            d={path}
            fill="none"
            stroke="var(--color-accent-lime)"
            strokeWidth="2"
            className="animate-draw-line"
            style={{
              strokeDasharray: lineLength,
              '--line-length': lineLength,
            } as React.CSSProperties}
          />
        ) : null}
        {points.map((p) => (
          <circle
            key={p.date}
            cx={p.x}
            cy={p.y}
            r="3"
            fill="var(--color-accent-lime)"
            className="opacity-0 hover:opacity-100"
          >
            <title>{`${p.date}: ${p.value}`}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
}

export default LineChart;
