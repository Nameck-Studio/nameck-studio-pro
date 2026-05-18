# Copilot Instructions — Nameck Studio React Website

## Project Overview
This is a React 19 + TypeScript + Vite + TailwindCSS v4 website for **Nameck Studio**:
- **Public site** (vitrine): Landing page, About, Services, Case Studies, Contact
- **Nameck Studio PRO** (SaaS): Dashboard, Media Library, Post Editor, Planner
- **Local backend**: Express + SQLite (better-sqlite3) + Drizzle ORM

## Tech Stack
- **Framework**: React 19 with TypeScript (strict mode)
- **Build**: Vite
- **Styling**: TailwindCSS v4 with Cyber-Luxe Dark design system
- **Routing**: react-router-dom
- **Database**: SQLite via better-sqlite3 + Drizzle ORM
- **Testing**: Vitest + @testing-library/react + @testing-library/jest-dom
- **Linting**: ESLint (flat config) + Prettier + prettier-plugin-tailwindcss
- **Quality**: SonarQube

## Architecture Rules

### File Organization
```
src/
├── components/ui/         # Reusable UI primitives (Button, Input, Card...)
├── components/layout/     # Layout components (Navbar, Sidebar, Footer...)
├── components/sections/   # Page sections (HeroSection, ServiceCard...)
├── components/charts/     # Chart components (BarChart, LineChart...)
├── pages/public/          # Public pages (HomePage, AboutPage...)
├── pages/pro/             # PRO pages (DashboardPage, MediaLibraryPage...)
├── hooks/                 # Custom hooks (useAuth, useMedia, useAnalytics...)
├── lib/db/                # Database (schema, client, seed, migrations)
├── lib/api/               # Express API (server, routes, middleware)
├── lib/utils/             # Utilities (cn, formatters, constants)
├── types/                 # TypeScript type definitions
└── test/                  # Test setup
```

### Import Aliases
- `@/` → `src/`
- `@components/` → `src/components/`
- `@pages/` → `src/pages/`
- `@lib/` → `src/lib/`

### TypeScript Standards
- Strict mode enabled — no `any`, no `// @ts-ignore`
- Explicit return types on exported functions
- Use `import type` for type-only imports
- Interfaces for component props, types for unions/primitives

### Component Standards
1. Functional components with explicit Props interface
2. Structure: Types → Hooks → Derived values → Handlers → Render → Export
3. Use `React.lazy()` + `Suspense` for route-level code splitting
4. Use `useCallback` for handlers passed as props
5. Use `useMemo` for expensive derivations

### Design System — Cyber-Luxe Dark
- Dark backgrounds (#0a0a0a, #1a1a1a)
- Lime accent (#a3e635) for primary actions
- Glass morphism effects (blur + translucent borders)
- Subtle glow effects on interactive elements
- Material Symbols for icons

### Testing Rules
- Every component has a co-located `.test.tsx` file
- Use Testing Library (screen, render, userEvent) — not enzyme
- Test behavior, not implementation
- Target ≥ 80% code coverage
- No `it.skip` or `describe.skip`

### Security
- Never expose API keys in frontend code
- Validate all inputs server-side
- Use parameterized queries (Drizzle ORM handles this)
- Set proper CORS configuration
- Hash passwords with bcrypt (never store plaintext)

### Code Quality
- ESLint: no-explicit-any (error), no-unused-vars (error), react-hooks/exhaustive-deps (error)
- Prettier: singleQuote, trailingComma: "all", printWidth: 100
- No console.log in production code (warn)
- All commits must pass lint + format check

## Skills Reference
See `.github/prompts/` for detailed skill playbooks:
- `react-best-practices.prompt.md` — React/Next.js performance optimization (45 rules)
- `frontend-design.prompt.md` — Distinctive, production-grade UI design
- `frontend-dev-guidelines.prompt.md` — Senior frontend engineering standards
- `frontend-api-integration.prompt.md` — API integration patterns (race conditions, retries, cancellation)
- `test-driven-development.prompt.md` — TDD workflow (RED → GREEN → REFACTOR)
- `javascript-mastery.prompt.md` — Core JS concepts reference
- `security-auditor.prompt.md` — Security audit checklist
- `debugging-strategies.prompt.md` — Systematic debugging approach
- `lint-and-validate.prompt.md` — Code quality validation
- `accessibility.prompt.md` — WCAG compliance guidelines
