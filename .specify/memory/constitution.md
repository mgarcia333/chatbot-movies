<!-- Sync Impact Report
  Version change: 1.0.0 → 1.1.0
  Added sections: Supabase Integration, AI (Gemini) Standards, PWA Compliance
  Modified: Technology Standards updated with CineRoulette stack
  Follow-up TODOs: Ensure Gemini API keys are handled via .env only
-->

# CineRoulette Project Constitution

## Core Principles

### I. Vue 3 Composition API First (NON-NEGOTIABLE)
All components and composables MUST be written using the Vue 3 Composition API with `<script setup>` syntax.
Components MUST be single-responsibility and visual (not containing heavy business logic).

### II. TypeScript Strict Mode
All source files MUST use TypeScript. `strict: true` MUST be enabled. No `any` types allowed.
API responses from Gemini and Supabase MUST be typed using interfaces/types.

### III. SDD - Specification-Driven Development (STRICT)
The developer AI MUST NOT invent architectural patterns or feature creep.
Implementation MUST strictly follow `spec.md`. Any change to logic or endpoints REQUIRES a spec update first.

### IV. Backend-Only AI Orchestration
All calls to Gemini API (or movie metadata providers) MUST be executed from the Nuxt server backend (`/server/api`).
Never expose API keys or perform heavy AI processing on the client.

### V. PWA & Mobile-First Design
The UI MUST be responsive and follow PWA best practices (Service Workers, manifest, offline-ready shell).
Lighthouse Performance & PWA scores MUST be ≥ 90.

## Technology Standards

- **Frontend**: Nuxt 3, Vue 3, Tailwind CSS
- **PWA**: `@vite-pwa/nuxt`
- **Database**: Supabase (PostgreSQL) + `@nuxtjs/supabase`
- **AI**: Gemini Pro API (via server routes)
- **Validation**: Zod for all API input/output validation
- **Formatting**: Prettier + ESLint

## Development Workflow

1. Update `spec.md` with every logic/entity change.
2. Run `/speckit.plan` to update technical documents.
3. Implementation MUST be task-by-task as defined in `tasks.md`.
4. Testing: Vitest for server logic, Playwright for the Chatbot flow.

**Version**: 1.1.0 | **Ratified**: 2026-03-12 | **Last Amended**: 2026-03-12
