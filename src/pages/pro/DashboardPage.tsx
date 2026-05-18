import { useAnalytics } from '@/hooks/useAnalytics';
import { useAuth } from '@/hooks/useAuth';
import MetricCard from '@components/sections/MetricCard';
import LineChart from '@components/charts/LineChart';
import Icon from '@components/ui/Icon';
import Button from '@components/ui/Button';
import TikTokLoginKitPanel from '@components/pro/TikTokLoginKitPanel';

const RECENT_CONTENT = [
  { title: 'Cyberpunk Aesthetic Breakdown', views: '2.4k views', time: '2h ago' },
  { title: 'Studio Setup v4.0', views: '12k views', time: '5h ago' },
  { title: 'Motion Graphics Tutorial', views: '8.5k views', time: '1d ago' },
] as const;

const SPARKLINE_HEIGHTS = ['30%', '50%', '40%', '80%', '60%', '90%'] as const;

function DashboardPage(): React.JSX.Element {
  const { overview, growth, period, setPeriod } = useAnalytics();
  const { user } = useAuth();
  const firstName = user?.firstName ?? 'User';

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      {/* Welcome Header */}
      <section className="animate-fade-in-up flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-accent-lime mb-2 block text-xs font-semibold tracking-widest uppercase">
            System Online
          </span>
          <h2 className="text-5xl leading-tight font-bold text-white">Welcome Back, {firstName}</h2>
          <p className="mt-1 text-zinc-500">Your creative performance is up 12% this week.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2">
            <span className="bg-accent-lime h-2 w-2 animate-pulse rounded-full" />
            <span className="text-accent-lime text-xs font-semibold">LIVE SYNCING</span>
          </div>
        </div>
      </section>

      <TikTokLoginKitPanel />

      {/* Bento Grid Metrics */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Views"
          value={overview.totalViews}
          change={overview.viewsChange}
          icon="visibility"
          className="animate-fade-in-up"
          style={{ animationDelay: '100ms' }}
        >
          <div className="flex h-12 items-end gap-1">
            {SPARKLINE_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className={`animate-grow-bar w-full rounded-t-sm ${i === 3 ? 'bg-accent-lime' : 'bg-zinc-800'}`}
                style={{ height: h, animationDelay: `${400 + i * 100}ms` }}
              />
            ))}
          </div>
        </MetricCard>

        <MetricCard
          label="Engagement Rate"
          value={overview.engagementRate}
          change={overview.engagementChange}
          icon="bolt"
          format="percent"
          className="animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="animate-fill-progress bg-accent-lime h-full w-[72%]"
              style={{ animationDelay: '600ms' }}
            />
          </div>
        </MetricCard>

        <MetricCard
          label="Total Shares"
          value={overview.totalShares}
          change={overview.sharesChange}
          icon="share"
          className="animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>Target</span>
              <span>50K</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
              <div
                className="animate-fill-progress bg-status-error/60 h-full w-[85%]"
                style={{ animationDelay: '700ms' }}
              />
            </div>
          </div>
        </MetricCard>

        <MetricCard
          label="New Followers"
          value={overview.newFollowers}
          change={overview.followersChange}
          changeLabel="+12K"
          icon="group"
          className="animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 w-6 rounded-full border-2 border-zinc-950 bg-zinc-700" />
            ))}
            <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-800 text-[8px] font-bold">
              +12k
            </div>
          </div>
        </MetricCard>
      </section>

      {/* Main Content: Chart + Recent Activity */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Audience Growth Chart */}
        <div
          className="animate-fade-in-up glass overflow-hidden rounded-2xl border border-zinc-800/50 lg:col-span-2"
          style={{ animationDelay: '500ms' }}
        >
          <div className="flex items-center justify-between border-b border-zinc-800/50 p-6">
            <h3 className="text-2xl font-semibold text-white">Audience Growth</h3>
            <div className="flex gap-2">
              <Button
                variant={period === 'week' ? 'ghost' : 'ghost'}
                size="sm"
                onClick={() => setPeriod('week')}
                className={
                  period === 'week' ? 'bg-zinc-900 text-zinc-400' : 'bg-zinc-900 text-zinc-400'
                }
              >
                WEEK
              </Button>
              <Button
                variant={period === 'month' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setPeriod('month')}
                className={period === 'month' ? '' : 'bg-zinc-900 text-zinc-400'}
              >
                MONTH
              </Button>
            </div>
          </div>
          <div className="p-8">
            <LineChart data={growth} className="h-52" />
          </div>
        </div>

        {/* Recent Content Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          <div
            className="animate-fade-in-up flex items-center justify-between"
            style={{ animationDelay: '600ms' }}
          >
            <h3 className="text-2xl font-semibold text-white">Recent Content</h3>
            <button type="button" className="text-accent-lime text-sm font-bold hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {RECENT_CONTENT.map((item, index) => (
              <div
                key={item.title}
                className="animate-fade-in-up group flex cursor-pointer items-center gap-4 rounded-xl p-3 transition-all hover:bg-zinc-900"
                style={{ animationDelay: `${700 + index * 100}ms` }}
              >
                <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  <div className="flex h-full w-full items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                    <Icon name="play_arrow" size={24} className="text-white" />
                  </div>
                </div>
                <div className="overflow-hidden">
                  <h4 className="truncate text-sm font-bold text-white">{item.title}</h4>
                  <p className="mt-1 text-xs text-zinc-500">
                    {item.views} • {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* System Health Panel */}
          <div
            className="animate-fade-in-up glass border-l-accent-lime rounded-2xl border-l-4 p-6"
            style={{ animationDelay: '1000ms' }}
          >
            <div className="mb-3 flex items-center gap-3">
              <Icon name="auto_awesome" size={20} className="text-accent-lime" />
              <h4 className="text-sm font-bold text-white">System Health</h4>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              All rendering engines are operational. Storage at 64% capacity. Global CDN
              synchronization complete.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] tracking-tighter text-zinc-500 uppercase">GPU LOAD</p>
                <p className="text-accent-lime text-lg font-bold">42%</p>
              </div>
              <div>
                <p className="text-[10px] tracking-tighter text-zinc-500 uppercase">RENDER TIME</p>
                <p className="text-accent-lime text-lg font-bold">1.4s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
