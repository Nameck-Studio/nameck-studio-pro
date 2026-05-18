# Frontend API Integration Patterns

> Adapted from [frontend-api-integration-patterns](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/frontend-api-integration-patterns) (MIT License)

Production-ready patterns for integrating frontend applications with backend APIs. Focuses on correctness, resilience, and user experience.

## When to Use

- Connecting React frontend to the Express backend
- Handling asynchronous data in UI
- Fixing stale data, flickering UI, or duplicate requests
- Designing the frontend API layer

## Core Patterns

### 1. API Layer (Separation of Concerns)

Centralize API logic and normalize errors.

```ts
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public payload: unknown = null,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    let payload = null;
    try {
      payload = await res.json();
    } catch {
      // empty response body
    }
    throw new ApiError(payload?.message || 'Request failed', res.status, payload);
  }

  if (res.status === 204) return null as T;

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (null as T);
};
```

### 2. Race-Safe State Management

Prevent stale responses from overwriting fresh data.

```ts
useEffect(() => {
  let cancelled = false;

  const load = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const result = await getUser();
      if (!cancelled) setData(result);
    } catch (err) {
      if (!cancelled) setError((err as Error).message);
    } finally {
      if (!cancelled) setLoading(false);
    }
  };

  load();
  return () => { cancelled = true; };
}, []);
```

### 3. Request Cancellation (AbortController)

Cancel in-flight requests to avoid memory leaks and stale updates.

```ts
useEffect(() => {
  const controller = new AbortController();

  const load = async (): Promise<void> => {
    try {
      const data = await getUser({ signal: controller.signal });
      setData(data);
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setError((err as Error).message);
    }
  };

  load();
  return () => controller.abort();
}, [userId]);
```

### 4. Retry with Exponential Backoff

Retry only transient failures (5xx or network errors).

```ts
const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

const fetchWithBackoff = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 300,
): Promise<T> => {
  try {
    return await fn();
  } catch (err) {
    const isAbort = (err as Error).name === 'AbortError';
    const isHttpError = typeof (err as ApiError).status === 'number';
    const isRetryable = !isAbort && (!isHttpError || (err as ApiError).status >= 500);

    if (retries <= 0 || !isRetryable) throw err;

    const nextDelay = delay * 2 + Math.random() * 100;
    await sleep(nextDelay);
    return fetchWithBackoff(fn, retries - 1, nextDelay);
  }
};
```

### 5. Debounced API Calls

Avoid excessive API calls (e.g., search inputs).

```ts
const useDebounce = <T>(value: T, delay = 400): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
};
```

### 6. Optimistic UI Updates

```ts
const deleteItem = async (id: string): Promise<void> => {
  const previous = items;
  setItems((curr) => curr.filter((item) => item.id !== id));

  try {
    await apiClient(`/api/items/${id}`, { method: 'DELETE' });
  } catch {
    setItems(previous);
    setError('Delete failed. Please try again.');
  }
};
```

## Best Practices

- ✅ Centralize API logic in a dedicated layer (`@lib/utils/api.ts`)
- ✅ Normalize errors using a custom error class
- ✅ Always handle loading, error, and success states
- ✅ Use AbortController for request cancellation
- ✅ Retry only transient failures (5xx)
- ✅ Use debouncing for input-driven APIs
- ✅ Deduplicate identical requests

## Anti-Patterns

- ❌ Retrying 4xx errors
- ❌ No request cancellation (memory leaks)
- ❌ Race-condition-prone state updates
- ❌ Swallowing errors silently
- ❌ Global loading/error state for multiple requests
- ❌ Calling APIs directly inside components repeatedly

## Limitations

- Adapt patterns to your framework's data-fetching library when applicable.
- Do not retry non-idempotent mutations unless the backend provides idempotency keys.
- Do not expose privileged API keys in frontend code.
