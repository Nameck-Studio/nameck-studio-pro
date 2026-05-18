import { useMemo, useState, useCallback } from 'react';
import type { PlannerEvent, CalendarDay } from '@/types/planner';
import { mockPlannerEvents } from '@lib/mocks/planner';

interface UsePlannerReturn {
  events: PlannerEvent[];
  weekDays: string[];
  calendarDays: CalendarDay[];
  currentMonth: number;
  currentYear: number;
  monthLabel: string;
  nextMonthLabel: string;
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
}

function buildCalendarGrid(
  year: number,
  month: number,
  events: PlannerEvent[],
  todayStr: string,
): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const startDow = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const days: CalendarDay[] = [];

  for (let i = startDow - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const dateStr = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    days.push({
      day,
      isCurrentMonth: false,
      isToday: dateStr === todayStr,
      date: dateStr,
      events: events.filter((e) => e.date === dateStr),
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    days.push({
      day: d,
      isCurrentMonth: true,
      isToday: dateStr === todayStr,
      date: dateStr,
      events: events.filter((e) => e.date === dateStr),
    });
  }

  const remaining = 7 - (days.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      const dateStr = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      days.push({
        day: i,
        isCurrentMonth: false,
        isToday: dateStr === todayStr,
        date: dateStr,
        events: events.filter((e) => e.date === dateStr),
      });
    }
  }

  return days;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function usePlanner(): UsePlannerReturn {
  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2024);

  const weekDays = useMemo(() => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], []);

  const todayStr = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }, []);

  const calendarDays = useMemo(
    () => buildCalendarGrid(currentYear, currentMonth, mockPlannerEvents, todayStr),
    [currentYear, currentMonth, todayStr],
  );

  const monthLabel = `${MONTH_NAMES[currentMonth]} ${currentYear}`;

  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const nextMonthLabel = `${MONTH_NAMES[nextMonth]} ${nextYear}`;

  const goToNextMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const goToPrevMonth = useCallback(() => {
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  return {
    events: mockPlannerEvents,
    weekDays,
    calendarDays,
    currentMonth,
    currentYear,
    monthLabel,
    nextMonthLabel,
    goToNextMonth,
    goToPrevMonth,
  };
}
