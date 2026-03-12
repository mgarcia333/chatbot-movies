# Feature Specification: CineRoulette (AI-Driven Movie PWA)

**Feature Branch**: `001-cineroulette`  
**Created**: 2026-03-12  
**Status**: Draft  
**Input**: CineRoulette Concept (Nuxt 3, Supabase, Gemini, PWA)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - AI-Guided Movie Discovery (Priority: P1)
As a visitor, I want to interact with a chatbot that asks me 2-3 targeted questions, so that I can receive a personalized movie recommendation without browsing a catalog.

**Why this priority**: It's the "Core Concept" and unique value proposition of CineRoulette.

**Independent Test**: Can be tested by completing a chat session and verifying that a "Movie Card" is rendered with data from the backend.

**Acceptance Scenarios**:
1. **Given** the user is on the Chat page, **When** they answer the bot's questions, **Then** the system returns a JSON recommendation.
2. **Given** a recommendation JSON, **When** the frontend renders it, **Then** the Movie Card displays the title, poster, and rationale ("Por qué te gustará").

---

### User Story 2 - Saving Progress to Supabase (Priority: P1)
As an authenticated/identified user, I want to "Accept" a recommendation, so that it is saved in my "Watched/Accepted" history.

**Why this priority**: Essential for the data persistence requirement using Supabase.

**Independent Test**: Verify that clicking "Accept" creates a new row in the `user_movies` table in Supabase.

**Acceptance Scenarios**:
1. **Given** a recommended movie card, **When** the user clicks "Ver esta", **Then** the movie is stored in Supabase and the session ends.

---

### User Story 3 - Feedback-Driven Iteration (Priority: P2)
As a user, I want to reject a recommendation with a reason (e.g., "already seen"), so that the AI generates a better alternative instantly.

**Why this priority**: Crucial for the "Chatbot Behavior" requirements.

**Acceptance Scenarios**:
1. **Given** a recommended movie card, **When** the user clicks "Otra" and provides feedback, **Then** a new recommendation is processed considering the feedback.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: System MUST be a Nuxt 3 PWA with a valid manifest and service worker.
- **FR-002**: System MUST use Nuxt Server Routes (`/server/api/chat.post.ts`) to securely proxy Gemini API calls.
- **FR-003**: Chat interface MUST render different message types: Text (from bot/user) and Movie Card (structured JSON).
- **FR-004**: System MUST use Supabase for data persistence:
  - `movies` table: Cache movie metadata.
  - `user_history` table: Track user interactions, accepted/rejected movies, and AI feedback.
- **FR-005**: Chatbot MUST start with a boolean/binary question to narrow down the search space.

### Key Entities
- **MovieNode**: Structured movie data (id, title, synopsis, poster_url, rationale).
- **ChatMessage**: Represents a turn in the conversation (role: author/bot, content: string | MovieNode).
- **UserMovieRecord**: Entry in Supabase linking a user to a specific movie and its state (Accepted/Rejected).

## Success Criteria *(mandatory)*
- **SC-001**: Chatbot provides a recommendation in under 3 seconds (Gemini API response time + server processing).
- **SC-002**: Application is "Installable" as a PWA on iOS/Android.
- **SC-003**: 100% of "Accepted" movies are correctly reflected in Supabase within 1 second of action.
- **SC-004**: System handles Gemini API errors gracefully (e.g., fallback to a default recommendation or retry).
