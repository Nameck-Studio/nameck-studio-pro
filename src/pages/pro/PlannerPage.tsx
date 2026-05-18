import { usePlanner } from '@/hooks/usePlanner';
import Icon from '@components/ui/Icon';
import GlassPanel from '@components/ui/GlassPanel';
import { cn } from '@lib/utils/cn';
import type { CalendarDay, PlannerEvent } from '@/types/planner';

function EventChip({ event }: { event: PlannerEvent }): React.JSX.Element {
  return (
    <div
      className="flex cursor-pointer items-center gap-2 rounded border p-1.5"
      style={{
        backgroundColor: `${event.color}10`,
        borderColor: `${event.color}33`,
      }}
    >
      <Icon name={event.icon} size={14} style={{ color: event.color }} />
      <span className="truncate text-[10px] font-bold" style={{ color: event.color }}>
        {event.title}
      </span>
    </div>
  );
}

function CalendarCell({ day }: { day: CalendarDay }): React.JSX.Element {
  return (
    <div
      className={cn(
        'min-h-[140px] p-2 transition-colors',
        !day.isCurrentMonth && 'opacity-40',
        day.isCurrentMonth && !day.isToday && 'bg-bg-primary hover:bg-bg-secondary',
        day.isToday && 'border-accent-lime/30 bg-bg-secondary relative border-2',
      )}
    >
      <div
        className={cn(
          'mb-2 text-xs font-bold',
          day.isToday
            ? 'text-accent-lime flex items-center justify-between font-black'
            : 'text-text-muted',
        )}
      >
        {String(day.day).padStart(2, '0')}
        {day.isToday ? (
          <div className="bg-accent-lime animate-pulse-dot h-1.5 w-1.5 rounded-full" />
        ) : null}
      </div>
      {day.events.length > 0 ? (
        <div className="space-y-1">
          {day.events.map((event) => (
            <EventChip key={event.id} event={event} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PlannerPage(): React.JSX.Element {
  const { weekDays, calendarDays, monthLabel, nextMonthLabel, goToNextMonth } = usePlanner();

  return (
    <div className="bg-bg-primary flex flex-1 flex-col overflow-hidden">
      {/* Month tabs */}
      <div className="hidden px-6 pt-2 lg:flex">
        <div className="border-accent-lime text-accent-lime border-b-2 pb-3 text-sm font-medium">
          {monthLabel}
        </div>
        <button
          type="button"
          onClick={goToNextMonth}
          className="text-text-muted hover:text-accent-lime ml-6 cursor-pointer pb-3 text-sm font-medium transition-colors"
        >
          {nextMonthLabel}
        </button>
      </div>

      {/* Calendar */}
      <section className="flex-1 overflow-y-auto p-6">
        {/* Day headers */}
        <div className="border-border-default mb-px grid grid-cols-7 gap-px overflow-hidden rounded-t-xl border bg-border-default">
          {weekDays.map((day) => (
            <div
              key={day}
              className="bg-bg-primary text-text-muted p-4 text-center text-xs font-black uppercase tracking-widest"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="border-border-default grid min-h-[600px] grid-cols-7 gap-px overflow-hidden rounded-b-xl border bg-border-default">
          {calendarDays.map((day) => (
            <CalendarCell key={day.date} day={day} />
          ))}
        </div>
      </section>

      {/* Footer Stats */}
      <footer className="border-border-default/50 bg-bg-primary border-t p-6">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-4">
          {/* Projected Reach */}
          <GlassPanel className="relative overflow-hidden rounded-xl p-4">
            <div className="bg-accent-lime absolute left-0 top-0 h-full w-1" />
            <div className="text-text-muted mb-1 text-[10px] font-black uppercase tracking-widest">
              Projected Reach
            </div>
            <div className="flex items-end gap-2">
              <div className="text-text-primary text-3xl font-bold tracking-tighter">1.2M</div>
              <div className="text-accent-lime mb-1 flex items-center text-xs font-bold">
                <Icon name="trending_up" size={14} /> 14%
              </div>
            </div>
          </GlassPanel>

          {/* Scheduled Posts */}
          <GlassPanel className="relative overflow-hidden rounded-xl p-4">
            <div className="bg-text-muted absolute left-0 top-0 h-full w-1" />
            <div className="text-text-muted mb-1 text-[10px] font-black uppercase tracking-widest">
              Scheduled Posts
            </div>
            <div className="flex items-end gap-2">
              <div className="text-text-primary text-3xl font-bold tracking-tighter">42</div>
              <div className="text-text-muted mb-1 text-xs font-bold uppercase">
                Across 3 Platforms
              </div>
            </div>
          </GlassPanel>

          {/* Engagement Rate */}
          <GlassPanel className="relative overflow-hidden rounded-xl p-4">
            <div className="bg-text-muted absolute left-0 top-0 h-full w-1" />
            <div className="text-text-muted mb-1 text-[10px] font-black uppercase tracking-widest">
              Engagement Rate
            </div>
            <div className="flex items-end gap-2">
              <div className="text-text-primary text-3xl font-bold tracking-tighter">4.8%</div>
              <div className="text-accent-lime mb-1 flex items-center text-xs font-bold">
                <Icon name="arrow_upward" size={14} />
              </div>
            </div>
          </GlassPanel>

          {/* Platform Mix */}
          <GlassPanel className="flex items-center justify-between rounded-xl p-4">
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span className="text-text-muted uppercase">Platform Mix</span>
                <span className="text-accent-lime">Optimized</span>
              </div>
              <div className="bg-bg-card flex h-1.5 w-full overflow-hidden rounded-full">
                <div className="bg-accent-lime w-[45%]" title="TikTok" />
                <div className="w-[35%] bg-pink-500" title="Instagram" />
                <div className="bg-status-info w-[20%]" title="Facebook" />
              </div>
              <div className="text-text-muted flex justify-between gap-2 text-[8px] font-bold">
                <div className="flex items-center gap-1">
                  <span className="bg-accent-lime h-1.5 w-1.5 rounded-full" /> TikTok
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-pink-500" /> IG
                </div>
                <div className="flex items-center gap-1">
                  <span className="bg-status-info h-1.5 w-1.5 rounded-full" /> FB
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </footer>
    </div>
  );
}

export default PlannerPage;
