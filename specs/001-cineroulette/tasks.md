# Tasks: CineRoulette Implementation

## Phase 0: Project Initialization
- [ ] Initialize Nuxt 3 project (`npx nuxi@latest init .`)
- [ ] Install dependencies: `@nuxtjs/supabase`, `@vite-pwa/nuxt`, `google-generative-ai`, `zod`, `tailwindcss`
- [ ] Configure `nuxt.config.ts` (PWA, Supabase, Tailwind)
- [ ] Setup `.env` template for Gemini and Supabase keys

## Phase 1: Database & AI Backend
- [ ] Create Supabase migrations for `movies` and `user_history` tables
- [ ] Implement Gemini AI utility in `server/utils/ai.ts` (Prompt engineering)
- [ ] Create API Endpoint `/server/api/chat.post.ts`
- [ ] Test AI endpoint with mock user input (vía terminal or Postman)

## Phase 2: Frontend & Chat Interface
- [ ] Implement `useChat` composable (state management for chat history)
- [ ] Build `ChatMessage` component (supports text and markdown)
- [ ] Build `MovieCard` component (visual rendering of JSON movie data)
- [ ] Implement Chat page layout with responsive scrolling

## Phase 3: PWA & Polish
- [ ] Configure Manifest and Icons
- [ ] Implement "Accept/Reject" logic linking to Supabase
- [ ] Add loading animations (skeleton for Movie Card)
- [ ] Final Lighthouse audit and PWA verification

## Testing Plan
- **Unit**: Verify AI response parser with different Gemini outputs.
- **Integration**: Verify Supabase insertion on "Accept" action.
- **E2E**: Complete a full "Entrevista Dinámica" from landing to recommendation.
