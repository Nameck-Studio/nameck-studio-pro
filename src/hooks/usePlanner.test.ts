import { renderHook, act } from '@testing-library/react';
import { usePlanner } from './usePlanner';

describe('usePlanner', () => {
  it('returns events', () => {
    const { result } = renderHook(() => usePlanner());
    expect(result.current.events.length).toBeGreaterThan(0);
  });

  it('returns week days starting with Sun', () => {
    const { result } = renderHook(() => usePlanner());
    expect(result.current.weekDays).toHaveLength(7);
    expect(result.current.weekDays[0]).toBe('Sun');
  });

  it('returns calendar days for the month', () => {
    const { result } = renderHook(() => usePlanner());
    expect(result.current.calendarDays.length).toBeGreaterThan(0);
    expect(result.current.calendarDays.length % 7).toBe(0);
  });

  it('returns month label', () => {
    const { result } = renderHook(() => usePlanner());
    expect(result.current.monthLabel).toBe('October 2024');
  });

  it('navigates to next month', () => {
    const { result } = renderHook(() => usePlanner());
    act(() => {
      result.current.goToNextMonth();
    });
    expect(result.current.monthLabel).toBe('November 2024');
  });

  it('navigates to previous month', () => {
    const { result } = renderHook(() => usePlanner());
    act(() => {
      result.current.goToPrevMonth();
    });
    expect(result.current.monthLabel).toBe('September 2024');
  });
});
