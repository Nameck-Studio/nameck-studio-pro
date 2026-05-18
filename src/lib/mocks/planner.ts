import type { PlannerEvent } from '@/types/planner';

export const mockPlannerEvents: PlannerEvent[] = [
  { id: 'ev-1', title: 'Morning Routine', type: 'video', color: '#c3f400', date: '2024-10-01', time: '09:00', platform: 'tiktok', icon: 'video_camera_back', status: 'completed' },
  { id: 'ev-2', title: 'Studio Tour', type: 'video', color: '#60a5fa', date: '2024-10-03', time: '14:00', platform: 'instagram', icon: 'social_leaderboard', status: 'completed' },
  { id: 'ev-3', title: 'IG Carousel', type: 'carousel', color: '#f472b6', date: '2024-10-03', time: '10:00', platform: 'instagram', icon: 'photo_camera', status: 'completed' },
  { id: 'ev-4', title: 'Desk Setup V2', type: 'photo', color: '#a3a3a3', date: '2024-10-07', time: '12:00', platform: 'instagram', icon: 'image', status: 'in-progress' },
  { id: 'ev-5', title: 'POV: Coding', type: 'video', color: '#a3a3a3', date: '2024-10-07', time: '15:00', platform: 'tiktok', icon: 'youtube_activity', status: 'planned' },
  { id: 'ev-6', title: 'Launch Reel', type: 'video', color: '#c3f400', date: '2024-10-09', time: '08:00', platform: 'tiktok', icon: 'bolt', status: 'planned' },
  { id: 'ev-7', title: 'Tech Review', type: 'video', color: '#60a5fa', date: '2024-10-15', time: '15:00', platform: 'facebook', icon: 'video_camera_back', status: 'planned' },
  { id: 'ev-8', title: 'BTS Story', type: 'story', color: '#f472b6', date: '2024-10-18', time: '18:00', platform: 'instagram', icon: 'photo_camera', status: 'planned' },
  { id: 'ev-9', title: 'Product Showcase', type: 'video', color: '#c3f400', date: '2024-10-22', time: '10:00', platform: 'tiktok', icon: 'video_camera_back', status: 'planned' },
  { id: 'ev-10', title: 'Weekly Recap', type: 'video', color: '#60a5fa', date: '2024-10-25', time: '14:00', platform: 'facebook', icon: 'social_leaderboard', status: 'planned' },
  { id: 'ev-11', title: 'Creative Process', type: 'carousel', color: '#f472b6', date: '2024-10-27', time: '11:00', platform: 'instagram', icon: 'photo_camera', status: 'planned' },
  { id: 'ev-12', title: 'Q4 Strategy', type: 'video', color: '#c3f400', date: '2024-10-30', time: '09:00', platform: 'tiktok', icon: 'bolt', status: 'planned' },
];
