import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AuthProvider, useAuth } from './useAuth';

function wrapper({ children }: { children: ReactNode }): React.JSX.Element {
  return <AuthProvider>{children}</AuthProvider>;
}

describe('useAuth', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('starts unauthenticated', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('logs in with valid credentials', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login('alex@nameck.studio', 'nameck2024');
    });
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.firstName).toBe('Alex');
  });

  it('rejects invalid credentials', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    let ok: boolean;
    act(() => {
      ok = result.current.login('alex@nameck.studio', 'wrong');
    });
    expect(ok!).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('logs out', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login('alex@nameck.studio', 'nameck2024');
    });
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('restores a cached session after reload', () => {
    const firstRender = renderHook(() => useAuth(), { wrapper });
    act(() => {
      firstRender.result.current.login('alex@nameck.studio', 'nameck2024');
    });
    firstRender.unmount();

    const secondRender = renderHook(() => useAuth(), { wrapper });
    expect(secondRender.result.current.isAuthenticated).toBe(true);
    expect(secondRender.result.current.user?.email).toBe('alex@nameck.studio');
  });

  it('ignores expired cached sessions', () => {
    window.localStorage.setItem(
      'nameck.pro.authSession',
      JSON.stringify({
        user: {
          id: 'user-1',
          email: 'alex@nameck.studio',
          firstName: 'Alex',
          lastName: 'Morgan',
          role: 'admin',
          avatarUrl: '',
        },
        expiresAt: Date.now() - 1000,
      }),
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(false);
    expect(window.localStorage.getItem('nameck.pro.authSession')).toBeNull();
  });

  it('throws outside provider', () => {
    expect(() => {
      renderHook(() => useAuth());
    }).toThrow('useAuth must be used within AuthProvider');
  });
});
