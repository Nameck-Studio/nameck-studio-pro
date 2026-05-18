# Lint and Validate

> Adapted from [lint-and-validate](https://github.com/sickn33/antigravity-awesome-skills/tree/main/skills/lint-and-validate) (MIT License)

Validate code changes against project lint rules and quality standards before committing.

## When to Use

- After making code changes
- Before committing or pushing
- When reviewing code quality
- When fixing lint warnings or errors

## Validation Steps

### 1. TypeScript Type Check

```bash
npx tsc --noEmit
```

Zero errors required. No `@ts-ignore`, no `any` type.

### 2. ESLint

```bash
npx eslint .
```

Zero errors required. Warnings should be addressed.

**Key rules (error level):**
- `no-explicit-any` — No `any` type
- `no-unused-vars` — No unused variables
- `react-hooks/exhaustive-deps` — Complete effect dependencies

### 3. Prettier Formatting

```bash
npx prettier --check .
```

All files must be formatted. Run `npx prettier --write .` to auto-fix.

**Config:**
- Single quotes
- Trailing commas (all)
- Print width: 100
- Tailwind class sorting (via prettier-plugin-tailwindcss)

### 4. Tests

```bash
npx vitest run
```

All tests pass. No skipped tests (`it.skip`, `describe.skip`).

### 5. Build Check

```bash
npm run build
```

Zero errors, zero warnings.

## Pre-Commit Checklist

```
[ ] TypeScript: npx tsc --noEmit → 0 errors
[ ] ESLint: npx eslint . → 0 errors
[ ] Prettier: npx prettier --check . → all formatted
[ ] Tests: npx vitest run → all pass, none skipped
[ ] Build: npm run build → 0 errors, 0 warnings
[ ] No console.log in production code
[ ] No commented-out code
[ ] No TODO without a linked issue
```

## Common Issues

### TypeScript Errors
| Error | Fix |
|---|---|
| Type 'any' | Add proper type annotation |
| Missing property | Update interface or provide property |
| Type mismatch | Fix the type or add proper assertion |
| Unused import | Remove it or use `import type` |

### ESLint Errors
| Rule | Fix |
|---|---|
| `react-hooks/exhaustive-deps` | Add missing deps or refactor |
| `no-unused-vars` | Remove or prefix with `_` |
| `no-explicit-any` | Replace with proper type |

### Prettier Issues
Run `npx prettier --write .` to auto-fix all formatting issues.

## SonarQube Quality Gate

When SonarQube is configured:
- Zero bugs
- Zero vulnerabilities
- Zero code smells (or documented exceptions)
- Coverage ≥ 80%
- No duplicated blocks

## Limitations

- Run all checks locally before pushing.
- CI will catch failures, but fix locally first.
- When rules conflict with code correctness, fix the code, not the rules.
