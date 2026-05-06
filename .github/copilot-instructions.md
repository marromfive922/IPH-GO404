# GitHub Copilot Instructions

## Project overview

This repository is a TypeScript full-stack web application built with:
- `pnpm` package manager
- Vite + React frontend in `client/`
- Express + tRPC backend in `server/`
- Shared types and constants in `shared/`
- Drizzle ORM for database schema/migrations in `drizzle/`

There is no top-level `README.md` or existing GitHub agent instructions. Use the source files, package scripts, and architecture layout as the authoritative guide.

## Key files and directories

- `package.json` — project scripts and dependency list
- `vite.config.ts` — frontend dev server config, alias map, and a Manus debug collector plugin
- `tsconfig.json` — TypeScript settings, strict mode, and path aliases
- `client/` — React application code, pages, components, hooks, and UI utilities
- `server/` — backend API and server runtime
  - `server/_core/` — runtime helpers, Express + Vite integration, auth, storage proxy, tRPC context
  - `server/routers.ts` — root tRPC router definition
- `shared/` — shared types and constants used by both frontend and backend
- `drizzle/` — database schema, migrations, and metadata

## Build and dev commands

Use `pnpm` for all workspace commands.

- `pnpm install` — install dependencies
- `pnpm dev` — run development server with HMR
- `pnpm build` — build frontend and bundle backend
- `pnpm build:ghpages` — build a static frontend into `docs/` for GitHub Pages
- `pnpm start` — run production server from `dist`
- `pnpm check` — type-check with `tsc`
- `pnpm test` — run tests with `vitest`
- `pnpm format` — format files with `prettier`
- `pnpm db:push` — generate Drizzle files and run migrations

## Architecture and conventions

- Frontend and backend run in the same repository, but the frontend source is rooted at `client/`.
- The backend is Express-based and mounts tRPC at `/api/trpc`.
- Vite is configured with alias paths:
  - `@/*` → `client/src/*`
  - `@shared/*` → `shared/*`
- The codebase uses ESM modules and `type: module` in `package.json`.
- Keep edits consistent with existing TypeScript strictness and React + tRPC patterns.

## What to prioritize for changes

- Prefer updating existing project files and scripts instead of adding duplicate documentation.
- Use `package.json` scripts when recommending commands.
- Keep feature work aligned with the existing structure: frontend in `client/`, backend in `server/`, shared logic in `shared/`.
- Avoid assumptions not supported by source files; the repo has no centralized docs beyond the code.

## When a request is about testing or deployment

- Use `vitest` for tests.
- Use `pnpm build` and `pnpm start` for production verification.
- There is no explicit deployment config in the repository.

## Example assistant prompts

- "Add a new tRPC query to return the current user from `server/routers.ts` and consume it in `client/src/App.tsx`."
- "Fix the frontend build error caused by a path alias in `client/src`."
- "Update the Express request body parsing settings in `server/_core/index.ts` to support a larger JSON payload."

## Suggested next customizations

- Create a workspace-specific `AGENTS.md` or `/.github/copilot-instructions.md` variant for frontend-only tasks if this repo grows larger.
- Add a `create-instruction` prompt that explains the `client/` and `server/` boundaries for new contributors.
- Add a `create-skill` customization for the tRPC + React query pattern if frequent backend/frontend integration changes are expected.
