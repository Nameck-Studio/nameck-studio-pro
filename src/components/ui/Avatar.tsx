import type { ImgHTMLAttributes } from 'react';
import { cn } from '@lib/utils/cn';

interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt'> {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles: Record<string, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function Avatar({ name, src, size = 'md', className, ...props }: AvatarProps): React.JSX.Element {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn('rounded-full object-cover', sizeStyles[size], className)}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        'bg-accent-lime/20 text-accent-lime inline-flex items-center justify-center rounded-full font-semibold',
        sizeStyles[size],
        className,
      )}
      role="img"
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}

export default Avatar;
