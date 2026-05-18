# Frontend Development Guidelines

> Adapted from [frontend-dev-guidelines](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/frontend-dev-guidelines) (MIT License)

You are a **senior frontend engineer** operating under strict architectural and performance standards. Build scalable, predictable, and maintainable React applications.

## When to Use

- Creating components or pages
- Adding new features
- Fetching or mutating data
- Setting up routing
- Styling with TailwindCSS
- Addressing performance issues
- Reviewing or refactoring frontend code

## Core Architectural Doctrine (Non-Negotiable)

### 1. Lazy Load Anything Heavy
- Routes and page components
- Data grids, charts, editors
- Large dialogs or modals

### 2. Feature-Based Organization
- Domain logic lives in feature directories
- Reusable primitives live in `components/ui/`
- Cross-feature coupling is forbidden

### 3. TypeScript Is Strict
- No `any`
- Explicit return types on exports
- `import type` always for type-only imports
- Types are first-class design artifacts

## Component Standards

### Required Structure Order
1. Types / Props interface
2. Hooks
3. Derived values (`useMemo`)
4. Handlers (`useCallback`)
5. Render
6. Export (default)

### Canonical Component Template

```tsx
import { useState, useCallback, useMemo } from 'react';
import type { FC } from 'react';

interface MyComponentProps {
  id: number;
  onAction?: () => void;
}

const MyComponent: FC<MyComponentProps> = ({ id, onAction }) => {
  const [state, setState] = useState('');

  const derived = useMemo(() => {
    return computeExpensive(state);
  }, [state]);

  const handleAction = useCallback(() => {
    setState('updated');
    onAction?.();
  }, [onAction]);

  return (
    <div className="rounded-lg border border-white/10 bg-zinc-900 p-4">
      {/* Content */}
    </div>
  );
};

export default MyComponent;
```

### New Component Checklist
- [ ] Explicit props interface
- [ ] Lazy loaded if non-trivial
- [ ] Wrapped in `<Suspense>` if lazy
- [ ] Handlers wrapped in `useCallback`
- [ ] Default export at bottom

### New Feature Checklist
- [ ] Create appropriate directory structure
- [ ] API layer isolated
- [ ] Public exports via `index.ts`
- [ ] Feature entry lazy loaded
- [ ] Suspense boundary at feature level

## Import Aliases (Required)

| Alias | Path |
|---|---|
| `@/` | `src/` |
| `@components/` | `src/components/` |
| `@pages/` | `src/pages/` |
| `@lib/` | `src/lib/` |

Aliases must be used consistently. Relative imports beyond one level are discouraged.

## Data Fetching Doctrine

### Required Patterns
- Centralized API layer in `@lib/utils/api.ts`
- Typed responses
- Error handling at the API layer

### Forbidden Patterns
❌ Inline fetch calls inside components  
❌ API calls without error handling  
❌ Untyped responses  

## Styling Standards (TailwindCSS v4)

- Use Tailwind utility classes
- Extract repeated patterns to component-level styles
- Use `cn()` helper (clsx + tailwind-merge) for conditional classes
- Theme access via CSS variables (Cyber-Luxe Dark tokens)

## Performance Defaults

- `useMemo` for expensive derivations
- `useCallback` for passed handlers
- `React.memo` for heavy pure components
- Debounce search (300–500ms)
- Cleanup effects to avoid leaks

**Performance regressions are bugs.**

## Anti-Patterns (Immediate Rejection)

❌ Feature logic in `components/ui/`  
❌ Shared state via prop drilling instead of hooks  
❌ Inline API calls  
❌ Untyped responses  
❌ Multiple responsibilities in one component  

## Operator Validation Checklist

Before finalizing code:
- [ ] Feature boundaries respected
- [ ] Types explicit and correct
- [ ] Lazy loading applied where appropriate
- [ ] Performance safe
- [ ] No early returns for loading states (use Suspense)

## Limitations

- Use this skill only for frontend React/TypeScript code.
- Adapt patterns to project conventions (this project uses react-router-dom, not TanStack Router).
- Not all rules apply to every component — use judgment.
