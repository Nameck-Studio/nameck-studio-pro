import { useMedia } from '@/hooks/useMedia';
import { Link } from 'react-router-dom';
import Card from '@components/ui/Card';
import Input from '@components/ui/Input';
import Badge from '@components/ui/Badge';
import Icon from '@components/ui/Icon';
import { MEDIA_STATUSES } from '@lib/utils/constants';
import { formatDuration } from '@lib/utils/formatters';

function MediaLibraryPage(): React.JSX.Element {
  const { filteredMedia, filter, setFilter, search, setSearch } = useMedia();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-text-primary text-2xl font-bold">Media Library</h1>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="w-64">
          <Input
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {['all', ...MEDIA_STATUSES].map((s) => (
            <button
              key={s}
              type="button"
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                filter === s
                  ? 'bg-accent-lime text-bg-primary font-semibold'
                  : 'bg-bg-card text-text-secondary hover:text-text-primary'
              }`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredMedia.map((item) => (
          <Card key={item.id} variant="glass" className="group overflow-hidden">
            <div className="bg-bg-card relative aspect-video">
              {item.thumbnailUrl ? (
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-text-muted text-sm">No preview</span>
                </div>
              )}
              {item.duration != null ? (
                <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs text-white">
                  {formatDuration(item.duration)}
                </span>
              ) : null}
              <Link
                to="/pro/editor"
                className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/50 group-hover:opacity-100"
                aria-label={`Edit ${item.title}`}
              >
                <span className="bg-accent-lime text-bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold">
                  <Icon name="edit_square" size={18} />
                  Edit
                </span>
              </Link>
            </div>
            <div className="flex items-center justify-between p-4">
              <div>
                <h3 className="text-text-primary text-sm font-medium">{item.title}</h3>
                <p className="text-text-muted text-xs">
                  {item.views?.toLocaleString() ?? 0} views
                </p>
              </div>
              <Badge
                variant={
                  item.status === 'published'
                    ? 'success'
                    : item.status === 'scheduled'
                      ? 'warning'
                      : 'neutral'
                }
              >
                {item.status}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MediaLibraryPage;
