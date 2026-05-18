export const TIKTOK_AUTH_URL = 'https://www.tiktok.com/v2/auth/authorize/';
export const TIKTOK_TOKEN_URL = 'https://open.tiktokapis.com/v2/oauth/token/';
export const TIKTOK_USER_INFO_URL = 'https://open.tiktokapis.com/v2/user/info/';

export const TIKTOK_CONFIG_KEY = 'nameck.tiktokLoginKit.config';
export const TIKTOK_CALLBACK_KEY = 'nameck.tiktokLoginKit.callback';
export const TIKTOK_CONNECTION_KEY = 'nameck.tiktokLoginKit.connection';
export const TIKTOK_STATE_KEY = 'nameck.tiktokLoginKit.state';

export interface TikTokLoginKitConfig {
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string;
  disableAutoAuth: boolean;
}

export interface TikTokCallbackResult {
  code: string;
  scopes: string;
  state: string;
  error: string;
  errorDescription: string;
  receivedAt: string;
  stateVerified: boolean;
}

export interface TikTokUserProfile {
  open_id?: string;
  union_id?: string;
  avatar_url?: string;
  avatar_url_100?: string;
  avatar_large_url?: string;
  display_name?: string;
}

export interface TikTokConnection {
  openId: string;
  scope: string;
  tokenType: string;
  expiresIn: number;
  refreshExpiresIn: number;
  connectedAt: string;
  profile: TikTokUserProfile | null;
}

interface TikTokTokenResponse {
  access_token?: string;
  expires_in?: number;
  open_id?: string;
  refresh_expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
}

interface TikTokUserInfoResponse {
  data?: {
    user?: TikTokUserProfile;
  };
  error?: {
    code?: string;
    message?: string;
  };
}

export function getDefaultTikTokRedirectUri(): string {
  if (typeof window === 'undefined') {
    return '/tiktok/oauth/callback';
  }

  const baseUrl =
    import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${window.location.origin}${baseUrl}/tiktok/oauth/callback`;
}

export function createTikTokState(): string {
  if (typeof window !== 'undefined' && window.crypto) {
    const bytes = new Uint8Array(30);
    window.crypto.getRandomValues(bytes);
    return Array.from(bytes, (byte) => byte.toString(36).padStart(2, '0')).join('');
  }

  return Math.random().toString(36).slice(2);
}

export function readJsonStorage<T>(key: string): T | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.sessionStorage.getItem(key);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeJsonStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(key, JSON.stringify(value));
}

export async function exchangeTikTokCode(
  config: TikTokLoginKitConfig,
  code: string,
): Promise<TikTokConnection> {
  const tokenBody = new URLSearchParams({
    client_key: config.clientKey,
    client_secret: config.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUri,
  });

  const tokenResponse = await fetch(TIKTOK_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache',
    },
    body: tokenBody,
  });
  const token = (await tokenResponse.json()) as TikTokTokenResponse;

  if (!tokenResponse.ok || token.error || !token.access_token) {
    throw new Error(token.error_description || token.error || 'TikTok token exchange failed.');
  }

  const fields = 'open_id,union_id,avatar_url,avatar_url_100,avatar_large_url,display_name';
  const userResponse = await fetch(`${TIKTOK_USER_INFO_URL}?fields=${fields}`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
  });
  const userInfo = (await userResponse.json()) as TikTokUserInfoResponse;

  if (!userResponse.ok || userInfo.error?.code) {
    throw new Error(
      userInfo.error?.message || userInfo.error?.code || 'TikTok user lookup failed.',
    );
  }

  return {
    openId: token.open_id ?? userInfo.data?.user?.open_id ?? '',
    scope: token.scope ?? config.scopes,
    tokenType: token.token_type ?? 'Bearer',
    expiresIn: token.expires_in ?? 0,
    refreshExpiresIn: token.refresh_expires_in ?? 0,
    connectedAt: new Date().toISOString(),
    profile: userInfo.data?.user ?? null,
  };
}
