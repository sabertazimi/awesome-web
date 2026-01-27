# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lab is a polyglot monorepo with Web apps and Rust crates.

**Stack**: pnpm workspaces + Cargo | React + Vite + TypeScript + Tailwind | Vue 3 | Ant Design | Shadcn UI
**Packages**: 9+ web packages, 3+ Rust crates

## Common Commands

```bash
# Web
pnpm install          # Install dependencies
pnpm web:build        # Build all to dist/
pnpm web:lint         # ESLint + Stylelint + TypeScript
pnpm web:dev          # Start portfolio (default)
pnpm web:dev:dblp     # DBLP search
pnpm web:dev:m-league-reviewer  # M.League reviewer

# Rust
pnpm rust:build       # Cargo build --release
pnpm rust:lint        # rustfmt + clippy
pnpm rust:test        # cargo test
pnpm rust:start       # rustlings (default)
pnpm rust:docs        # mdBook + API docs
```

## Architecture

**Web (packages/)**: `dblp` (React + Ant Design + Redux), `m-league-reviewer`, `react-renderer`, `mortal-ui`, `vue-design`, `vue-trello`, `echarts-dashboard`, `vue-challenges`, `portfolio`

**Rust (crates/)**: `basis` (fundamentals), `rustlings`, `exercism/*`

## Common Patterns

- **Shadcn UI**: `pnpm dlx shadcn@latest add [component]` - Never modify `src/components/ui/`
- **State**: Zustand (`src/stores/`), Redux (`src/store/`), Pinia (`src/store/`)
- **Styling**: Tailwind CSS + `class-variance-authority` + `clsx` + `tailwind-merge`
- **Testing**: Vitest + Playwright | `*.test.ts`, `*.spec.ts`

## Key Files

- `pnpm-workspace.yaml` - pnpm workspace config
- `Cargo.toml` - Cargo workspace config
- `lerna.json` - Lerna versioning
- `tsconfig.json` - TypeScript strict mode, `@/*` aliases
- `eslint.config.mjs` - Flat config
- `.prettierrc.json` - Tailwind plugin, 80 cols, no semicolons

## Constraints

**Web**: pnpm only | Don't modify `src/components/ui/` | TypeScript strict | kebab-case files, PascalCase components | Don't commit `dist/`, `node_modules/`, `coverage/`

**Rust**: cargo workspaces | Don't commit `target/`, Cargo.lock | rustfmt + clippy required

## Commit Style

[Conventional Commits](https://www.conventionalcommits.org/): `<type>(<scope>): <description>`

Types: feat, fix, chore, docs, refactor, perf, test, build, ci, style

## Footer

DO NOT add Claude co-authorship footer to commits
