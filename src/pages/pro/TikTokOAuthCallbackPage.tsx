import { useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import { TIKTOK_CALLBACK_KEY, TIKTOK_STATE_KEY, writeJsonStorage } from '@lib/tiktokLoginKit';
import type { TikTokCallbackResult } from '@lib/tiktokLoginKit';

function TikTokOAuthCallbackPage(): React.JSX.Element {
  const [searchParams] = useSearchParams();

  const result = useMemo<TikTokCallbackResult>(() => {
    const returnedState = searchParams.get('state') ?? '';
    const expectedState = window.sessionStorage.getItem(TIKTOK_STATE_KEY) ?? '';

    return {
      code: searchParams.get('code') ?? '',
      scopes: searchParams.get('scopes') ?? searchParams.get('scope') ?? '',
      state: returnedState,
      error: searchParams.get('error') ?? '',
      errorDescription: searchParams.get('error_description') ?? '',
      receivedAt: new Date().toISOString(),
      stateVerified: Boolean(returnedState && expectedState && returnedState === expectedState),
    };
  }, [searchParams]);

  useEffect(() => {
    writeJsonStorage(TIKTOK_CALLBACK_KEY, result);
  }, [result]);

  const hasError = Boolean(result.error);

  return (
    <div className="bg-bg-primary flex min-h-screen items-center justify-center px-4 py-10">
      <main className="glass w-full max-w-3xl rounded-2xl border border-zinc-800/50 p-8">
        <div className="flex items-center gap-3">
          <div className="bg-accent-lime text-bg-primary flex h-12 w-12 items-center justify-center rounded-lg">
            <Icon name={hasError ? 'error' : 'check'} size={28} filled />
          </div>
          <div>
            <p className="text-accent-lime text-xs font-semibold tracking-widest uppercase">
              TikTok Login Kit callback
            </p>
            <h1 className="text-3xl font-bold text-white">
              {hasError ? 'Authorization needs attention' : 'Authorization received'}
            </h1>
          </div>
        </div>

        <p className="mt-5 text-sm leading-6 text-zinc-400">
          This redirect URI is reachable and stores the TikTok authorization response for the
          private dashboard connection panel.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-xs tracking-widest text-zinc-500 uppercase">Authorization code</p>
            <p className="mt-2 text-sm font-semibold break-all text-white">
              {result.code || 'No code returned'}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-xs tracking-widest text-zinc-500 uppercase">Granted scopes</p>
            <p className="mt-2 text-sm font-semibold text-white">
              {result.scopes || 'No scopes returned'}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-xs tracking-widest text-zinc-500 uppercase">State check</p>
            <p
              className={
                result.stateVerified
                  ? 'text-accent-lime mt-2 text-sm font-semibold'
                  : 'text-status-warning mt-2 text-sm font-semibold'
              }
            >
              {result.stateVerified ? 'Verified' : 'No matching state in this browser session'}
            </p>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <p className="text-xs tracking-widest text-zinc-500 uppercase">Status</p>
            <p
              className={
                hasError
                  ? 'text-status-error mt-2 text-sm font-semibold'
                  : 'mt-2 text-sm font-semibold text-white'
              }
            >
              {hasError
                ? `${result.error}: ${result.errorDescription}`
                : 'Ready for token exchange'}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/pro/dashboard">
            <Button type="button" className="gap-2">
              <Icon name="dashboard" size={18} />
              Open PRO dashboard
            </Button>
          </Link>
          <Link to="/pro/login">
            <Button type="button" variant="secondary" className="gap-2">
              <Icon name="login" size={18} />
              Sign in to PRO
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default TikTokOAuthCallbackPage;
