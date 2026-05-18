import type { AnalyticsOverview, GrowthPoint, PlatformData } from '@/types/analytics';

export const mockOverview: AnalyticsOverview = {
  totalViews: 1_200_000,
  viewsChange: 24,
  engagementRate: 14.5,
  engagementChange: 8.2,
  totalShares: 42_800,
  sharesChange: -2,
  newFollowers: 892_000,
  followersChange: 12,
};

export const mockGrowthWeek: GrowthPoint[] = [
  { date: '2024-10-07', value: 15000 },
  { date: '2024-10-08', value: 18200 },
  { date: '2024-10-09', value: 16800 },
  { date: '2024-10-10', value: 22400 },
  { date: '2024-10-11', value: 19600 },
  { date: '2024-10-12', value: 25100 },
  { date: '2024-10-13', value: 23800 },
];

export const mockGrowthMonth: GrowthPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-09-${String(i + 1).padStart(2, '0')}`,
  value: 12000 + Math.round(Math.sin(i * 0.5) * 5000 + i * 400),
}));

export const mockPlatforms: PlatformData[] = [
  { platform: 'TikTok', percentage: 45 },
  { platform: 'Instagram', percentage: 35 },
  { platform: 'Facebook', percentage: 20 },
];
