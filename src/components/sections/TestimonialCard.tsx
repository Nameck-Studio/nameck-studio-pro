import Card from '@components/ui/Card';
import Avatar from '@components/ui/Avatar';
import Icon from '@components/ui/Icon';

interface TestimonialCardProps {
  name: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
}

function TestimonialCard({ name, avatarUrl, quote, rating }: TestimonialCardProps): React.JSX.Element {
  return (
    <Card variant="glass" className="p-6">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Icon
            key={i}
            name="star"
            size={16}
            className={i < rating ? 'text-accent-lime' : 'text-text-muted'}
            filled={i < rating}
          />
        ))}
      </div>
      <p className="text-text-secondary mb-4 text-sm leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <Avatar name={name} src={avatarUrl} size="sm" />
        <span className="text-text-primary text-sm font-medium">{name}</span>
      </div>
    </Card>
  );
}

export default TestimonialCard;
