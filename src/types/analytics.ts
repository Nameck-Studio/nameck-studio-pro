export interface AnalyticsOverview {
  totalViews: number;
  viewsChange: number;
  engagementRate: number;
  engagementChange: number;
  totalShares: number;
  sharesChange: number;
  newFollowers: number;
  followersChange: number;
}

export interface GrowthPoint {
  date: string;
  value: number;
}

export interface PlatformData {
  platform: string;
  percentage: number;
}
