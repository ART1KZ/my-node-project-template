# Node.js TypeScript Template

Minimal backend template for Node.js (ESM) with TypeScript, ESLint, Prettier, Zod env validation, and CI.

## Requirements

- Node.js 24+
- npm 11+

## Quick start

```bash
npm run setup
npm run dev
```

## Scripts

- `npm run setup` - first command for a new project. Installs by lockfile (`npm ci`), creates `.env` from `.env.example` (if missing), runs full checks.
- `npm run setup:latest` - updates dependencies to latest (`ncu`), installs them, then ensures `.env` exists.
- `npm run env:sync` - creates `.env` from `.env.example` only when `.env` is missing.
- `npm run deps:patch` - updates dependencies within current semver ranges (`npm update`), then runs checks and tests.
- `npm run deps:update` - updates dependencies to latest (including major), installs, then runs checks and tests.
- `npm run dev` - runs app in watch mode with `tsx`.
- `npm run build` - compiles TypeScript to `dist/`.
- `npm start` - runs compiled app from `dist/`.
- `npm run typecheck` - TypeScript checks without emit.
- `npm run lint` - ESLint validation (fails on warnings).
- `npm run lint:fix` - ESLint with autofix.
- `npm run format` - Prettier write mode.
- `npm run format:check` - Prettier check mode.
- `npm run check` - full local CI chain: format check, lint, typecheck, build.
- `npm test` - Node built-in test runner (`node --test`).

## Project layout

```text
src/
  config.ts   # env schema and parsed config
  index.ts    # app bootstrap
```

## Notes

- Runtime config is validated via `zod` in `src/config.ts`.
- `GET /` returns a simple JSON health response.
