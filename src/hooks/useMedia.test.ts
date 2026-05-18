import { renderHook, act } from '@testing-library/react';
import { useMedia } from './useMedia';

describe('useMedia', () => {
  it('returns all media by default', () => {
    const { result } = renderHook(() => useMedia());
    expect(result.current.media.length).toBeGreaterThan(0);
    expect(result.current.filteredMedia.length).toBe(result.current.media.length);
  });

  it('filters by status', () => {
    const { result } = renderHook(() => useMedia());
    act(() => result.current.setFilter('published'));
    expect(result.current.filteredMedia.every((m) => m.status === 'published')).toBe(true);
  });

  it('filters by search', () => {
    const { result } = renderHook(() => useMedia());
    act(() => result.current.setSearch('cyberpunk'));
    expect(result.current.filteredMedia.every((m) => m.title.toLowerCase().includes('cyberpunk'))).toBe(true);
  });
});
