# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Awesome Web is a monorepo for web development prototypes containing multiple React and Vue applications.
It uses pnpm workspaces with Lerna for managing multiple packages and unified build system.

**Type**: Monorepo | **Size**: ~8 packages, ~150+ components, ~50+ libs
**Languages**: TypeScript (90%), Vue (5%), JavaScript (5%)
**Stack**: React Router, Vite, Vue 3, TypeScript, Tailwind CSS, Shadcn UI, Zustand
**Testing**: Vitest (unit), Playwright (E2E: Chrome/Firefox/Safari)
**Package Manager**: **pnpm only** (never npm/yarn) | **Node**: LTS

## Common Commands

```bash
# Install dependencies (always run first)
pnpm install

# Build all packages (outputs to dist/)
pnpm build

# Lint all packages
pnpm lint

# Fix linting issues across all packages
pnpm lint:fix

# Run tests across all packages
pnpm test

# Start individual packages (check package.json for ports)
pnpm start:react-renderer  # localhost:3000
pnpm start:vue-design      # localhost:5173
pnpm start:vue-trello      # localhost:5173
pnpm start:mortal-ui       # localhost:5173

# Release management (uses Lerna)
pnpm release
```

## Architecture Overview

### Monorepo Structure

This is a **pnpm workspace** monorepo with the following packages:

**React Applications**:

- `m-league-reviewer` - M.League daily games reviewer (React Router + Shadcn)
- `react-renderer` - Custom React renderer prototype

**Vue Applications**:

- `mortal-ui` - GUI for Mortal Mahjong AI reviewer
- `vue-design` - Vue built-in reactive system demo
- `vue-trello` - Trello clone with drag-and-drop
- `echarts-dashboard` - Dashboard with Echarts

**Other**:

- `vue-challenges` - Vue.js coding challenges and solutions
- `awesome-web` - Main package

### Technology Stack

- **Package Manager**: pnpm with workspaces
- **Build System**: Lerna for versioning and publishing
- **Linting**: ESLint with `@dg-scripts/eslint-config`
- **Style Linting**: Stylelint with `@dg-scripts/stylelint-config`
- **TypeScript**: Shared TypeScript configuration with strict mode
- **Code Formatting**: Prettier with Tailwind CSS plugin

### Development Workflow

1. **Package Management**: Use `pnpm` exclusively - never npm or yarn
2. **Workspace Commands**: Use `pnpm -r` to run commands across all packages
3. **Selective Builds**: Use `pnpm --filter <package-name>` to target specific packages
4. **Build Process**:
   - `build:prepare` cleans and creates dist directory
   - Individual packages handle their own build processes
   - Final outputs go to `./dist/` directory

### Key Files

- `pnpm-workspace.yaml` - Workspace configuration
- `package.json` - Root package with shared dependencies and scripts
- `lerna.json` - Lerna configuration for versioning
- `tsconfig.json` - Project references, strict mode, path aliases (`@/*`)
- `eslint.config.mjs` - Flat Config with @dg-scripts/eslint-config
- `.prettierrc.json` - Tailwind plugin, printWidth 80, no semicolons

## Common Patterns

**Shadcn UI Components**: Use `pnpm dlx shadcn@latest add [component]` in package directory. Components auto-install to `src/components/ui/`. Never modify these files directly.

**State Management**:

- Zustand stores in `src/stores/` (m-league-reviewer)
- Vue Composition API with Pinia in `src/store/` (vue-trello)

**Routing**: React Router (m-league-reviewer), Vue Router (vue-trello).

**Styling**: Tailwind CSS with custom design tokens. Use `class-variance-authority` + `clsx` + `tailwind-merge` for conditional styling.

**Testing**: Vitest with jsdom, coverage enabled. Test files: `*.test.ts`, `*.spec.ts`.

**File Structure**: `src/components/` (UI), `src/lib/` (utilities), `src/hooks/` (React hooks), `src/composables/` (Vue composables).

## CI/CD Pipeline

The repository uses GitHub Actions with the following workflow:

**.github/workflows/ci.yml** - 4 jobs must pass:

1. **lint**: ESLint, Stylelint, TypeScript
2. **test**: Tests with coverage → Codecov
3. **build**: Production build → uploads dist artifact
4. **deploy**: Deploy to GitHub Pages (main branch only)

**Deployment**:

- **GitHub Pages**: Automatic deployment from `main` branch
- **Release Process**: Tagged releases trigger GitHub release creation
- **Artifacts**: Build outputs stored in `dist/` directory

## Critical Constraints

1. **Only pnpm** (never npm/yarn)
2. **Don't modify** `src/components/ui/` (Shadcn components)
3. **TypeScript strict mode** - all code properly typed
4. **File naming**: kebab-case (files), PascalCase (components)
5. **Workspace structure**: Run commands from monorepo root, not package directories
6. **Package isolation**: Each package manages its own dependencies and scripts
7. **Don't commit** `dist/`, `node_modules/`, `coverage/`, `playwright-report/`
8. **Use workspace references**: Import between packages via `workspace:*` in package.json

## Troubleshooting

- **"pnpm not found"**: `npm install -g pnpm`
- **Build errors**: Check if package dependencies are installed (`pnpm install`)
- **TypeScript errors**: `pnpm lint` or `pnpm lint:typecheck` in specific package
- **Port conflicts**: Each dev server uses different ports - check package.json scripts
- **Hot reload not working**: Restart dev server, check browser console
- **Missing modules**: `pnpm install` or `pnpm install --frozen-lockfile`
- **Workspace issues**: Run commands from monorepo root, not package directory

## Commit and Pull Request Guidelines

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
