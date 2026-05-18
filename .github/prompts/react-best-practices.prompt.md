# React Best Practices — Performance Optimization

> Adapted from [Vercel React Best Practices](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/react-best-practices) (MIT License)

Comprehensive performance optimization guide for React applications. Contains 45 rules across 8 categories, prioritized by impact.

## When to Use

Reference these guidelines when:
- Writing new React components
- Implementing data fetching (client or server-side)
- Reviewing code for performance issues
- Refactoring existing React code
- Optimizing bundle size or load times

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Eliminating Waterfalls | CRITICAL | `async-` |
| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |
| 3 | Server-Side Performance | HIGH | `server-` |
| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |
| 5 | Re-render Optimization | MEDIUM | `rerender-` |
| 6 | Rendering Performance | MEDIUM | `rendering-` |
| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |
| 8 | Advanced Patterns | LOW | `advanced-` |

## 1. Eliminating Waterfalls (CRITICAL)

- **async-defer-await** — Move `await` into branches where actually used
- **async-parallel** — Use `Promise.all()` for independent operations
- **async-dependencies** — Use partial dependency patterns for related fetches
- **async-api-routes** — Start promises early, await late in API routes
- **async-suspense-boundaries** — Use `Suspense` to stream content progressively

```tsx
// ❌ Sequential (waterfall)
const users = await fetchUsers();
const posts = await fetchPosts();

// ✅ Parallel
const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);
```

## 2. Bundle Size Optimization (CRITICAL)

- **bundle-barrel-imports** — Import directly from source, avoid barrel files (`index.ts` re-exports)
- **bundle-dynamic-imports** — Use `React.lazy()` for heavy components
- **bundle-defer-third-party** — Load analytics/logging after hydration
- **bundle-conditional** — Load modules only when feature is activated
- **bundle-preload** — Preload on hover/focus for perceived speed

```tsx
// ❌ Barrel import pulls in everything
import { Button } from '@/components';

// ✅ Direct import — tree-shakeable
import { Button } from '@/components/ui/Button';
```

## 3. Re-render Optimization (MEDIUM)

- **rerender-defer-reads** — Don't subscribe to state only used in callbacks
- **rerender-memo** — Extract expensive work into memoized components
- **rerender-dependencies** — Use primitive dependencies in effects
- **rerender-derived-state** — Subscribe to derived booleans, not raw values
- **rerender-functional-setstate** — Use functional `setState` for stable callbacks
- **rerender-lazy-state-init** — Pass function to `useState` for expensive values
- **rerender-transitions** — Use `startTransition` for non-urgent updates

```tsx
// ❌ Expensive computation every render
const sorted = items.sort((a, b) => a.date - b.date);

// ✅ Memoized
const sorted = useMemo(() => items.sort((a, b) => a.date - b.date), [items]);
```

## 4. Rendering Performance (MEDIUM)

- **rendering-content-visibility** — Use `content-visibility` for long lists
- **rendering-hoist-jsx** — Extract static JSX outside components
- **rendering-hydration-no-flicker** — Use inline script for client-only data
- **rendering-conditional-render** — Use ternary, not `&&` for conditionals

```tsx
// ❌ Can render 0 or false
{count && <Badge count={count} />}

// ✅ Explicit boolean
{count > 0 ? <Badge count={count} /> : null}
```

## 5. JavaScript Performance (LOW-MEDIUM)

- **js-batch-dom-css** — Group CSS changes via classes or `cssText`
- **js-index-maps** — Build `Map` for repeated lookups
- **js-cache-property-access** — Cache object properties in loops
- **js-combine-iterations** — Combine multiple `filter`/`map` into one loop
- **js-early-exit** — Return early from functions
- **js-set-map-lookups** — Use `Set`/`Map` for O(1) lookups

```tsx
// ❌ O(n) lookup on every render
const isSelected = selectedItems.includes(item.id);

// ✅ O(1) with Set
const selectedSet = useMemo(() => new Set(selectedItems), [selectedItems]);
const isSelected = selectedSet.has(item.id);
```

## 6. Advanced Patterns (LOW)

- **advanced-event-handler-refs** — Store event handlers in refs for stable references
- **advanced-use-latest** — `useLatest` for stable callback refs without deps

## Project-Specific Rules

For this Nameck Studio project:
- Use `React.lazy()` for all page-level components in routes
- Wrap lazy routes in `<Suspense fallback={...}>`
- Use `useCallback` for all handlers passed as props to child components
- Use `useMemo` for derived dashboard metrics and chart data
- Import components directly — no barrel files
- Debounce search inputs (300-500ms)

## Limitations

- Use this skill only when working on React component code.
- These are guidelines, not absolute rules — apply judgment for edge cases.
- Performance optimization should not compromise code readability without measurement.
