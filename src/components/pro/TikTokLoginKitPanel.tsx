import { useCallback, useMemo, useState } from 'react';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import Icon from '@components/ui/Icon';
import {
  TIKTOK_AUTH_URL,
  TIKTOK_CALLBACK_KEY,
  TIKTOK_CONFIG_KEY,
  TIKTOK_CONNECTION_KEY,
  TIKTOK_STATE_KEY,
  createTikTokState,
  exchangeTikTokCode,
  getDefaultTikTokRedirectUri,
  readJsonStorage,
  writeJsonStorage,
} from '@lib/tiktokLoginKit';
import type {
  TikTokCallbackResult,
  TikTokConnection,
  TikTokLoginKitConfig,
} from '@lib/tiktokLoginKit';

const DEFAULT_SCOPES = 'user.info.basic';

function cleanCredential(value: string): string {
  return value
    .trim()
    .replace(/^client[_\s-]*(key|secret)\s*[:=]\s*/i, '')
    .trim();
}

function maskSecret(secret: string): string {
  if (!secret) {
    return 'Not set';
  }

  return `${secret.slice(0, 4)}...${secret.slice(-4)}`;
}

function TikTokLoginKitPanel(): React.JSX.Element {
  const storedConfig = readJsonStorage<TikTokLoginKitConfig>(TIKTOK_CONFIG_KEY);
  const [clientKey, setClientKey] = useState(storedConfig?.clientKey ?? '');
  const [clientSecret, setClientSecret] = useState(storedConfig?.clientSecret ?? '');
  const [redirectUri, setRedirectUri] = useState(
    storedConfig?.redirectUri ?? getDefaultTikTokRedirectUri(),
  );
  const [scopes, setScopes] = useState(storedConfig?.scopes ?? DEFAULT_SCOPES);
  const [disableAutoAuth, setDisableAutoAuth] = useState(storedConfig?.disableAutoAuth ?? false);
  const [callbackResult, setCallbackResult] = useState(
    readJsonStorage<TikTokCallbackResult>(TIKTOK_CALLBACK_KEY),
  );
  const [connection, setConnection] = useState(
    readJsonStorage<TikTokConnection>(TIKTOK_CONNECTION_KEY),
  );
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const config = useMemo<TikTokLoginKitConfig>(
    () => ({
      clientKey: cleanCredential(clientKey),
      clientSecret: cleanCredential(clientSecret),
      redirectUri: redirectUri.trim(),
      scopes: scopes.trim(),
      disableAutoAuth,
    }),
    [clientKey, clientSecret, redirectUri, scopes, disableAutoAuth],
  );

  const authUrl = useMemo(() => {
    if (!config.clientKey || !config.redirectUri || !config.scopes) {
      return '';
    }

    const params = new URLSearchParams({
      client_key: config.clientKey,
      response_type: 'code',
      scope: config.scopes,
      redirect_uri: config.redirectUri,
      state: 'GENERATED_ON_CONNECT',
    });

    if (config.disableAutoAuth) {
      params.set('disable_auto_auth', '1');
    }

    return `${TIKTOK_AUTH_URL}?${params.toString()}`;
  }, [config]);

  const hasSuspiciousClientKey = useMemo(() => {
    const key = config.clientKey.toLowerCase();
    return key.includes('client_secret') || key.includes('client secret') || key.includes(' ');
  }, [config.clientKey]);

  const handleStartLogin = useCallback(() => {
    setError('');
    if (!config.clientKey || !config.redirectUri || !config.scopes) {
      setError('Client key, redirect URI, and scope are required before starting Login Kit.');
      return;
    }
    if (hasSuspiciousClientKey) {
      setError(
        'TikTok is likely to reject this client key. Paste only the raw Client key value from the TikTok developer portal, not the label or client secret.',
      );
      return;
    }

    const csrfState = createTikTokState();
    writeJsonStorage(TIKTOK_CONFIG_KEY, config);
    window.sessionStorage.setItem(TIKTOK_STATE_KEY, csrfState);

    const params = new URLSearchParams({
      client_key: config.clientKey,
      response_type: 'code',
      scope: config.scopes,
      redirect_uri: config.redirectUri,
      state: csrfState,
    });

    if (config.disableAutoAuth) {
      params.set('disable_auto_auth', '1');
    }

    window.location.assign(`${TIKTOK_AUTH_URL}?${params.toString()}`);
  }, [config, hasSuspiciousClientKey]);

  const handleExchangeCode = useCallback(async () => {
    setError('');
    setStatus('');
    if (!callbackResult?.code) {
      setError('No TikTok authorization code is available yet.');
      return;
    }
    if (!config.clientKey || !config.clientSecret || !config.redirectUri) {
      setError('Client key, client secret, and redirect URI are required for the token exchange.');
      return;
    }

    setLoading(true);
    try {
      writeJsonStorage(TIKTOK_CONFIG_KEY, config);
      const nextConnection = await exchangeTikTokCode(config, callbackResult.code);
      writeJsonStorage(TIKTOK_CONNECTION_KEY, nextConnection);
      setConnection(nextConnection);
      setStatus('TikTok account connected and user.info.basic was read successfully.');
    } catch (exchangeError) {
      setError(
        exchangeError instanceof Error ? exchangeError.message : 'TikTok connection failed.',
      );
    } finally {
      setLoading(false);
    }
  }, [callbackResult, config]);

  const handleRefreshCallback = useCallback(() => {
    setCallbackResult(readJsonStorage<TikTokCallbackResult>(TIKTOK_CALLBACK_KEY));
    setConnection(readJsonStorage<TikTokConnection>(TIKTOK_CONNECTION_KEY));
  }, []);

  return (
    <section className="animate-fade-in-up glass rounded-2xl border border-zinc-800/50 p-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <span className="text-accent-lime mb-2 block text-xs font-semibold tracking-widest uppercase">
            TikTok Login Kit
          </span>
          <h3 className="text-2xl font-semibold text-white">Account connection review demo</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">
            Connect a TikTok sandbox or reviewer account with Login Kit, request user.info.basic,
            and display the returned profile data after authorization.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs text-zinc-400">
          <Icon name={connection ? 'verified' : 'key'} size={18} className="text-accent-lime" />
          <span>{connection ? 'Connected' : `Secret ${maskSecret(clientSecret)}`}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Input
          label="TikTok client key"
          value={clientKey}
          onChange={(event) => setClientKey(event.target.value)}
          placeholder="Paste the raw Client key from Manage apps"
          error={
            hasSuspiciousClientKey
              ? 'Use the Client key value, not Client secret or a copied label.'
              : undefined
          }
        />
        <Input
          label="TikTok client secret"
          type="password"
          value={clientSecret}
          onChange={(event) => setClientSecret(event.target.value)}
          placeholder="Keep this server-side in production"
        />
        <Input
          label="Redirect URI for Web"
          value={redirectUri}
          onChange={(event) => setRedirectUri(event.target.value)}
          placeholder="https://example.com/tiktok/oauth/callback"
        />
        <Input
          label="Scopes"
          value={scopes}
          onChange={(event) => setScopes(event.target.value)}
          placeholder={DEFAULT_SCOPES}
        />
      </div>

      <label className="mt-4 flex items-center gap-3 text-sm text-zinc-400">
        <input
          type="checkbox"
          checked={disableAutoAuth}
          onChange={(event) => setDisableAutoAuth(event.target.checked)}
          className="accent-accent-lime h-4 w-4 rounded border-zinc-700 bg-zinc-900"
        />
        Always show TikTok authorization screen
      </label>

      <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm leading-6 text-zinc-400">
        <p className="font-semibold text-white">If TikTok shows a client_key error:</p>
        <p className="mt-1">
          Use the app&apos;s Client key from TikTok Developer Portal → Manage apps. Do not use the
          Client secret, app ID, display name, or a copied string like client_key=...
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button type="button" onClick={handleStartLogin} className="gap-2">
          <Icon name="login" size={18} />
          Continue with TikTok
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={handleExchangeCode}
          loading={loading}
          className="gap-2"
        >
          <Icon name="sync" size={18} />
          Complete token exchange
        </Button>
        <Button type="button" variant="ghost" onClick={handleRefreshCallback} className="gap-2">
          <Icon name="refresh" size={18} />
          Refresh result
        </Button>
      </div>

      {authUrl ? (
        <div className="mt-5 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-xs font-semibold tracking-widest text-zinc-500 uppercase">
            Authorization URL preview
          </p>
          <p className="mt-2 text-xs break-all text-zinc-400">{authUrl}</p>
        </div>
      ) : null}

      {callbackResult ? (
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-xs tracking-widest text-zinc-500 uppercase">Authorization code</p>
            <p className="mt-2 text-sm font-semibold break-all text-white">
              {callbackResult.code || 'No code returned'}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-xs tracking-widest text-zinc-500 uppercase">Granted scopes</p>
            <p className="mt-2 text-sm font-semibold text-white">
              {callbackResult.scopes || config.scopes}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-xs tracking-widest text-zinc-500 uppercase">State check</p>
            <p
              className={
                callbackResult.stateVerified
                  ? 'text-accent-lime mt-2 text-sm font-semibold'
                  : 'text-status-warning mt-2 text-sm font-semibold'
              }
            >
              {callbackResult.stateVerified ? 'Verified' : 'Needs review'}
            </p>
          </div>
        </div>
      ) : null}

      {connection ? (
        <div className="border-accent-lime/40 bg-accent-lime/5 mt-5 flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center">
          {connection.profile?.avatar_url ? (
            <img
              src={connection.profile.avatar_url}
              alt=""
              className="border-accent-lime/40 h-16 w-16 rounded-full border object-cover"
            />
          ) : (
            <div className="border-accent-lime/40 flex h-16 w-16 items-center justify-center rounded-full border bg-zinc-900">
              <Icon name="person" size={28} className="text-accent-lime" />
            </div>
          )}
          <div>
            <p className="text-lg font-bold text-white">
              {connection.profile?.display_name || 'TikTok account connected'}
            </p>
            <p className="mt-1 text-sm break-all text-zinc-400">Open ID: {connection.openId}</p>
            <p className="mt-1 text-sm text-zinc-400">Scope: {connection.scope}</p>
          </div>
        </div>
      ) : null}

      {status ? <p className="text-accent-lime mt-4 text-sm">{status}</p> : null}
      {error ? <p className="text-status-error mt-4 text-sm">{error}</p> : null}
    </section>
  );
}

export default TikTokLoginKitPanel;
