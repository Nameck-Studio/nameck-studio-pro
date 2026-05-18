import type { ReactNode } from 'react';
import Button from '@components/ui/Button';

interface HeroSectionProps {
  badge?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  children?: ReactNode;
}

function HeroSection({
  badge,
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
  children,
}: HeroSectionProps): React.JSX.Element {
  return (
    <section className="relative px-6 py-24 text-center md:py-32">
      {badge ? (
        <span className="bg-accent-lime/10 text-accent-lime mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest">
          {badge}
        </span>
      ) : null}
      <h1 className="text-text-primary mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="text-text-secondary mx-auto mt-6 max-w-2xl text-lg">{subtitle}</p>
      ) : null}
      {ctaLabel ? (
        <div className="mt-10">
          <Button size="lg" onClick={onCtaClick}>
            {ctaLabel}
          </Button>
        </div>
      ) : null}
      {children}
    </section>
  );
}

export default HeroSection;
