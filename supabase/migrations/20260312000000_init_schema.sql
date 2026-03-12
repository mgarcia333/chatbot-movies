-- Migrations for CineRoulette

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: movies (metadata cache)
create table if not exists public.movies (
  id uuid primary key default uuid_generate_v4(),
  tmdb_id bigint unique,
  title text not null,
  synopsis text,
  poster_url text,
  genres text[],
  created_at timestamp with time zone default now()
);

-- Table: user_history (interaction logs)
create table if not exists public.user_history (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  movie_id uuid references public.movies(id),
  interaction_type text check (interaction_type in ('recommendation_request', 'acceptance', 'rejection')),
  ai_feedback text,
  ai_rationale text,
  created_at timestamp with time zone default now()
);

-- RLS (Row Level Security) - Simplified for demo
alter table public.movies enable row level security;
alter table public.user_history enable row level security;

create policy "Allow public read for movies" on public.movies for select using (true);
create policy "Allow auth users to manage their history" on public.user_history using (auth.uid() = user_id);
