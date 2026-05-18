import type { MediaStatus, Platform } from '@lib/utils/constants';

export interface MediaItem {
  id: string;
  title: string;
  type: 'video' | 'image' | 'audio';
  url: string;
  thumbnailUrl: string;
  duration: number;
  status: MediaStatus;
  views: number;
  resolution?: string;
  createdAt: string;
}

export interface Post {
  id: string;
  mediaId: string;
  caption: string;
  hashtags: string[];
  platform: Platform;
  scheduledAt: string | null;
  publishedAt: string | null;
  status: 'draft' | 'scheduled' | 'published';
}
