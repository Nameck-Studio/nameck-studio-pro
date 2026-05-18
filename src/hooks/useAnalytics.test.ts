import { renderHook, act } from '@testing-library/react';
import { useAnalytics } from './useAnalytics';

describe('useAnalytics', () => {
  it('returns overview data', () => {
    const { result } = renderHook(() => useAnalytics());
    expect(result.current.overview.totalViews).toBe(1_200_000);
  });

  it('defaults to week period', () => {
    const { result } = renderHook(() => useAnalytics());
    expect(result.current.period).toBe('week');
    expect(result.current.growth.length).toBe(7);
  });

  it('switches to month', () => {
    const { result } = renderHook(() => useAnalytics());
    act(() => result.current.setPeriod('month'));
    expect(result.current.growth.length).toBe(30);
  });
});
