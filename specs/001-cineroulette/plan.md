# Implementation Plan: CineRoulette

**Branch**: `001-cineroulette` | **Date**: 2026-03-12 | **Spec**: [spec.md](spec.md)

## Summary
Build a Nuxt 3 PWA using the Gemini API for a conversational movie recommendation engine and Supabase for interaction logging and user data persistence.

## Technical Context
- **Framework**: Nuxt 3 (SSR enabled by default)
- **Primary Dependencies**: `@nuxtjs/supabase`, `@vite-pwa/nuxt`, `google-generative-ai`, `zod`, `tailwind-css`
- **Storage**: Supabase (PostgreSQL)
- **AI**: Gemini Pro (`google-generative-ai`)
- **Testing**: Vitest for server API, Playwright for the chat flow.

## Constitution Check
- [x] Vue 3 Composition API with `<script setup>`
- [x] Strict TypeScript (no `any`)
- [x] Server-only AI orchestration (`/server/api`)
- [x] PWA compliance

## Project Structure (Target)

```text
.
├── components/          # Vue components (ChatWindow, MovieCard, BaseButton)
├── composables/         # logic (useChat, useSupabase)
├── pages/               # routes (index.vue, history.vue)
├── server/
│   ├── api/             # endpoints (chat.post.ts, history.get.ts)
│   ├── utils/           # AI logic (gemini.ts)
│   └── middleware/      # auth/logging
├── public/              # PWA assets (icons, manifest)
└── spec.md              # Source of truth
```

## Phase 1 Research & Design
- **Gemini Prompt Engineering**: Defining the "Sumiller de Cine" persona to return structured JSON.
- **Supabase Schema**: `movies` (cache) and `user_history` (logs).
- **PWA Config**: Setup `@vite-pwa/nuxt` for installability.
