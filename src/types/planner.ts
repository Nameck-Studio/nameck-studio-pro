import type { Platform } from '@lib/utils/constants';

export interface PlannerEvent {
  id: string;
  title: string;
  type: 'video' | 'photo' | 'carousel' | 'story';
  color: string;
  date: string;
  time: string;
  platform: Platform;
  icon: string;
  status: 'planned' | 'in-progress' | 'completed';
}

export interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  date: string;
  events: PlannerEvent[];
}
