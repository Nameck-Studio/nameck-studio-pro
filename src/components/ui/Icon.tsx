import { cn } from '@lib/utils/cn';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
  filled?: boolean;
}

function Icon({
  name,
  size = 24,
  className,
  style,
  filled = false,
}: IconProps): React.JSX.Element {
  return (
    <span
      className={cn('material-symbols-outlined select-none', className)}
      style={{
        ...style,
        fontSize: size,
        fontVariationSettings: filled ? "'FILL' 1" : undefined,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

export default Icon;
