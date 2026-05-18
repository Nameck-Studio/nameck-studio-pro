import Card from '@components/ui/Card';
import Icon from '@components/ui/Icon';
import { cn } from '@lib/utils/cn';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  tags?: string[];
  span?: 'default' | 'wide';
  className?: string;
}

function ServiceCard({
  icon,
  title,
  description,
  tags,
  span = 'default',
  className,
}: ServiceCardProps): React.JSX.Element {
  return (
    <Card
      variant="glass"
      className={cn(
        'group cursor-pointer p-6 transition-all hover:border-accent-lime/30',
        span === 'wide' && 'md:col-span-2',
        className,
      )}
    >
      <div className="bg-accent-lime/10 text-accent-lime mb-4 inline-flex rounded-lg p-3">
        <Icon name={icon} size={28} />
      </div>
      <h3 className="text-text-primary mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      {tags && tags.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-bg-card text-text-muted rounded-full px-3 py-1 text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </Card>
  );
}

export default ServiceCard;
