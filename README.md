# Nameck Studio — React Website

Site de démonstration **Nameck Studio** (vitrine publique) + **Nameck Studio PRO** (produit SaaS).

## Stack

- React 19 + TypeScript (strict) + Vite
- TailwindCSS v4 — Cyber-Luxe Dark design system
- Vitest + Testing Library
- ESLint + Prettier
- Mock data (no backend required)

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check + production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Lint with ESLint |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run typecheck` | TypeScript type check |
| `npm run ci` | Full CI pipeline (typecheck + lint + format + test + build) |

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable primitives (Button, Input, Card...)
│   ├── layout/       # Layout components (Navbar, Sidebar, Footer...)
│   ├── sections/     # Page sections (HeroSection, ServiceCard...)
│   └── charts/       # Chart components
├── pages/
│   ├── public/       # Public website pages
│   └── pro/          # Nameck Studio PRO pages
├── hooks/            # Custom hooks
├── lib/
│   ├── mocks/        # Demo data
│   └── utils/        # Utilities (cn, formatters, constants)
├── types/            # TypeScript type definitions
└── test/             # Test setup
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
