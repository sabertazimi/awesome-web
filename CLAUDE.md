# CLAUDE.md

## Repository Overview

Awesome Web is a monorepo containing web development prototypes and experimental projects built with modern JavaScript frameworks.
It uses a Lerna-based architecture with pnpm workspaces for managing multiple packages.

**Web development prototype monorepo** with React, Vue, and experimental projects:

- **Type**: Monorepo | **Size**: ~9 packages, ~150+ components, ~50+ libs
- **Languages**: TypeScript (90%), Vue (5%), JavaScript (5%)
- **Stack**: React Router v7, Vite, Vue 3, TypeScript, Tailwind CSS, Shadcn UI, Zustand, React Router
- **Testing**: Vitest (unit), Playwright (E2E: Chrome/Firefox/Safari)
- **Package Manager**: **pnpm only** (never npm/yarn) | **Node**: LTS

## Essential Commands (Always use pnpm)

```bash
pnpm install              # ~20-30s. Always run first or when deps change
pnpm build                # ~60-90s. Build all packages, outputs dist/
pnpm lint                 # ~10-15s. ESLint + Stylelint + TypeScript
pnpm lint:fix             # Auto-fix linting issues
pnpm test                 # Run unit tests across all packages
```

**Key Notes**:

- Build outputs go to `./dist/` (not `.next/` or `build/`)
- E2E tests run on Chrome/Firefox/Safari, retry 2x on CI
- Each package has its own dev server - check package.json for ports
- Always lint before committing

## Project Structure

**Key Directories**:

- `packages/` - Individual projects (awesome-web, m-league-reviewer, mortal-ui, vue-trello, etc.)
- `packages/awesome-web/` - Main portfolio website (React Router v7 + Shadcn)
- `packages/m-league-reviewer/` - Mahjong league review system (React Router v7 + Shadcn)
- `packages/mortal-ui/` - Vue 3 component library for mahjong games
- `packages/vue-trello/` - Vue 3 Trello clone with drag-and-drop
- `packages/vue-design/` - Vue 3 design system showcase
- `packages/react-renderer/` - Custom React reconciler implementation
- `packages/vue-challenges/` - Vue.js coding challenges and solutions
- `packages/echarts-dashboard/` - ECharts dashboard prototypes

**Config Files**:

- `tsconfig.json` - Project references, strict mode, path aliases (`@/*`)
- `eslint.config.mjs` - Flat Config with @dg-scripts/eslint-config
- `.prettierrc.json` - Tailwind plugin, printWidth 80, no semicolons
- `pnpm-workspace.yaml` - Workspace configuration
- `lerna.json` - Release management configuration

## CI/CD Pipeline (GitHub Actions)

**.github/workflows/ci.yml** - 4 jobs must pass:

1. **lint** (~10s): ESLint, Stylelint, TypeScript
2. **test** (~30s): Tests with coverage → Codecov
3. **build** (~60s): Production build → uploads dist artifact
4. **deploy** (~30s): Deploy to GitHub Pages (main branch only)

**.github/workflows/codeql-analysis.yml** - Security scanning (JavaScript)

**CI Requirements**: Node LTS, pnpm via `pnpm/action-setup@v3`, `fetch-depth: 1` for most jobs

## Common Patterns

**Shadcn UI Components**: Use `pnpm dlx shadcn@latest add [component]` in package directory. Components auto-install to `src/components/ui/`. Never modify these files directly.

**State Management**: Zustand stores in `src/stores/` (m-league-reviewer), Vue 3 Composition API with Pinia in `src/store/` (vue-trello).

**Routing**: React Router v7 (awesome-web, m-league-reviewer), Vue Router 4 (vue-trello), React Router v6 (react-renderer).

**Styling**: Tailwind CSS with custom design tokens. Use `class-variance-authority` + `clsx` + `tailwind-merge` for conditional styling.

**Testing**: Vitest with jsdom, coverage enabled. Test files: `*.test.ts`, `*.spec.ts`.

**File Structure**: `src/components/` (UI), `src/lib/` (utilities), `src/hooks/` (React hooks), `src/composables/` (Vue composables).

## Troubleshooting

- **"pnpm not found"**: `npm install -g pnpm`
- **Build errors**: Check if package dependencies are installed (`pnpm install`)
- **TypeScript errors**: `pnpm lint` or `pnpm lint:typecheck` in specific package
- **Port conflicts**: Each dev server uses different ports - check package.json scripts
- **Hot reload not working**: Restart dev server, check browser console
- **Missing modules**: `pnpm install` or `pnpm install --frozen-lockfile`
- **Workspace issues**: Run commands from monorepo root, not package directory

## Critical Constraints

1. **Only pnpm** (never npm/yarn)
2. **Don't modify** `src/components/ui/` (Shadcn components)
3. **TypeScript strict mode** - all code properly typed
4. **File naming**: kebab-case (files), PascalCase (components)
5. **Workspace structure**: Run commands from monorepo root, not package directories
6. **Package isolation**: Each package manages its own dependencies and scripts
7. **Don't commit** `dist/`, `node_modules/`, `coverage/`, `playwright-report/`
8. **Use workspace references**: Import between packages via `workspace:*` in package.json

## Commit & PR Guidelines

**All commits and PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/) style:**

```md
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types**: feat, fix, chore, docs, refactor, perf, test, build, ci, style, revert etc.

**Examples**:

- `feat(m.league-state): implement state management for league`
- `fix(mortal-layout): adjust layout for mortal battle`
- `chore(deps): update dependencies for security patch`

## Pre-PR Validation

- ✓ `pnpm install`.
- ✓ `pnpm lint`.
- ✓ `pnpm test`.
- ✓ `pnpm build`.
- ✓ Both locales work (if applicable).
- ✓ No security issues.
- ✓ Conventional commits style.

## Quick Reference

**Package Scripts**: `pnpm start:[package-name]` for dev servers | `pnpm build` for all packages

**Root Configs**: package.json (workspaces), pnpm-workspace.yaml, tsconfig.json (path aliases: `@/*`), eslint.config.mjs, .prettierrc.json, .stylelintrc.json

**Package Entry Points**:

- awesome-web: `packages/awesome-web/src/root.tsx`
- m-league-reviewer: `packages/m-league-reviewer/src/root.tsx`
- mortal-ui: `packages/mortal-ui/src/main.ts`
- vue-trello: `packages/vue-trello/src/main.ts`
- vue-design: `packages/vue-design/src/main.ts`

**Dev Servers**:

- awesome-web: localhost:5173 (default)
- mortal-ui: localhost:5173
- react-renderer: localhost:3000
- vue-design: localhost:5173
- vue-trello: localhost:5173

---

**Trust these instructions.** Only search if incomplete/incorrect or unexpected behavior occurs.
