# Data Model: CineRoulette

## Tables (Supabase/PostgreSQL)

### `movies`
Caches movie metadata to reduce external API calls.
- `id`: UUID (Primary Key)
- `tmdb_id`: Integer (Unique)
- `title`: Text
- `synopsis`: Text
- `poster_url`: Text
- `genres`: Text[]
- `created_at`: Timestamp

### `user_history`
Tracks user interactions and AI decisions.
- `id`: UUID (Primary Key)
- `user_id`: UUID (references `auth.users`)
- `movie_id`: UUID (references `movies.id`, nullable if session ongoing)
- `interaction_type`: Enum ('recommendation_request', 'acceptance', 'rejection')
- `ai_feedback`: Text (user reason for rejection)
- `ai_rationale`: Text (why the AI recommended it)
- `created_at`: Timestamp

## Chat JSON Interface
The Gemini API will be instructed to return:
```json
{
  "recommendation_ready": boolean,
  "next_question": string | null,
  "movie": {
    "title": string,
    "year": number,
    "synopsis": string,
    "rationale": string
  } | null
}
```
