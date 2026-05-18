import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types/user';
import { mockCredentials } from '@lib/mocks/users';

const AUTH_SESSION_KEY = 'nameck.pro.authSession';
const AUTH_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

interface StoredAuthSession {
  user: User;
  expiresAt: number;
}

const AuthContext = createContext<AuthState | null>(null);

function isUser(value: unknown): value is User {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<User>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.firstName === 'string' &&
    typeof candidate.lastName === 'string' &&
    (candidate.role === 'admin' || candidate.role === 'user') &&
    typeof candidate.avatarUrl === 'string'
  );
}

function readStoredSession(): User | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawSession = window.localStorage.getItem(AUTH_SESSION_KEY);
  if (!rawSession) {
    return null;
  }

  try {
    const session = JSON.parse(rawSession) as Partial<StoredAuthSession>;
    if (!isUser(session.user) || typeof session.expiresAt !== 'number') {
      window.localStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }

    if (Date.now() > session.expiresAt) {
      window.localStorage.removeItem(AUTH_SESSION_KEY);
      return null;
    }

    return session.user;
  } catch {
    window.localStorage.removeItem(AUTH_SESSION_KEY);
    return null;
  }
}

function writeStoredSession(user: User): void {
  if (typeof window === 'undefined') {
    return;
  }

  const session: StoredAuthSession = {
    user,
    expiresAt: Date.now() + AUTH_SESSION_TTL_MS,
  };
  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

function clearStoredSession(): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(AUTH_SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const [user, setUser] = useState<User | null>(() => readStoredSession());

  const login = useCallback((email: string, password: string): boolean => {
    const match = mockCredentials.find((c) => c.user.email === email && c.password === password);
    if (match) {
      setUser(match.user);
      writeStoredSession(match.user);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback((): void => {
    setUser(null);
    clearStoredSession();
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated: user !== null, login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
