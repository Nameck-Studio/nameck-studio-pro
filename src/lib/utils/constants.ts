export const COLORS = {
  bgPrimary: '#0a0a0a',
  bgSecondary: '#121414',
  bgCard: '#1e2020',
  accentLime: '#c3f400',
  accentLimeLight: '#d4f94d',
  textPrimary: '#e2e2e2',
  textSecondary: '#a3a3a3',
  textMuted: '#6b6b6b',
  statusSuccess: '#4ade80',
  statusWarning: '#facc15',
  statusError: '#f87171',
  statusInfo: '#60a5fa',
} as const;

export const PLATFORMS = ['tiktok', 'instagram', 'facebook', 'youtube'] as const;
export type Platform = (typeof PLATFORMS)[number];

export const MEDIA_STATUSES = ['draft', 'scheduled', 'published', 'private'] as const;
export type MediaStatus = (typeof MEDIA_STATUSES)[number];

export const NAV_PUBLIC = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Contact', path: '/contact' },
] as const;

export const NAV_PRO = [
  { label: 'Dashboard', path: '/pro/dashboard', icon: 'dashboard' },
  { label: 'Content Planner', path: '/pro/planner', icon: 'calendar_month' },
  { label: 'Media Library', path: '/pro/media', icon: 'photo_library' },
] as const;
