import { useState, useMemo } from 'react';
import type { AnalyticsOverview, GrowthPoint, PlatformData } from '@/types/analytics';
import { mockOverview, mockGrowthWeek, mockGrowthMonth, mockPlatforms } from '@lib/mocks/analytics';

interface UseAnalyticsReturn {
  overview: AnalyticsOverview;
  growth: GrowthPoint[];
  platforms: PlatformData[];
  period: 'week' | 'month';
  setPeriod: (p: 'week' | 'month') => void;
}

export function useAnalytics(): UseAnalyticsReturn {
  const [period, setPeriod] = useState<'week' | 'month'>('week');

  const growth = useMemo(
    () => (period === 'week' ? mockGrowthWeek : mockGrowthMonth),
    [period],
  );

  return {
    overview: mockOverview,
    growth,
    platforms: mockPlatforms,
    period,
    setPeriod,
  };
}
