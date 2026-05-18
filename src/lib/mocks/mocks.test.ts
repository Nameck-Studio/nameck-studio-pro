import { mockUsers, currentUser } from './users';
import { mockMedia } from './media';
import { mockPosts } from './posts';
import { mockOverview, mockGrowthWeek, mockGrowthMonth, mockPlatforms } from './analytics';
import { mockPlannerEvents } from './planner';

describe('Mock data integrity', () => {
  it('has users', () => {
    expect(mockUsers).toHaveLength(2);
    expect(currentUser.email).toBeTruthy();
  });

  it('has media items with valid statuses', () => {
    expect(mockMedia.length).toBeGreaterThanOrEqual(5);
    for (const item of mockMedia) {
      expect(['draft', 'scheduled', 'published', 'private']).toContain(item.status);
    }
  });

  it('has posts referencing valid media', () => {
    const mediaIds = new Set(mockMedia.map((m) => m.id));
    expect(mockPosts.length).toBeGreaterThanOrEqual(8);
    for (const post of mockPosts) {
      expect(mediaIds).toContain(post.mediaId);
    }
  });

  it('has analytics data', () => {
    expect(mockOverview.totalViews).toBeGreaterThan(0);
    expect(mockGrowthWeek).toHaveLength(7);
    expect(mockGrowthMonth).toHaveLength(30);
    expect(mockPlatforms.length).toBeGreaterThanOrEqual(3);
  });

  it('platform percentages sum to 100', () => {
    const sum = mockPlatforms.reduce((acc, p) => acc + p.percentage, 0);
    expect(sum).toBe(100);
  });

  it('has planner events', () => {
    expect(mockPlannerEvents.length).toBeGreaterThanOrEqual(12);
    for (const event of mockPlannerEvents) {
      expect(['tiktok', 'instagram', 'facebook']).toContain(event.platform);
    }
  });
});
