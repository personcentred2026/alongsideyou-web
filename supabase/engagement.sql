-- AlongsideYou engagement tables
--
-- Everything a practitioner does with content: saving, marking as read, and
-- private reflections. Plus the weekly prompt content.
--
-- Run in the Supabase SQL Editor after schema.sql, seed.sql and content.sql.
-- Safe to re-run.

-- ============================================================
-- Per-practitioner state against a topic
-- One row per person per topic, holding save, read, and reflection together.
-- ============================================================
create table if not exists public.user_topic_state (
  user_id uuid not null references auth.users (id) on delete cascade,
  topic_id uuid not null references public.topics (id) on delete cascade,
  is_saved boolean not null default false,
  is_read boolean not null default false,
  reflection text,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

-- ============================================================
-- Saved tools
-- ============================================================
create table if not exists public.user_tool_state (
  user_id uuid not null references auth.users (id) on delete cascade,
  tool_id uuid not null references public.tools (id) on delete cascade,
  is_saved boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, tool_id)
);

-- ============================================================
-- Theme activity, so the dashboard can say "continue where you left off"
-- ============================================================
create table if not exists public.user_theme_activity (
  user_id uuid not null references auth.users (id) on delete cascade,
  theme_id uuid not null references public.themes (id) on delete cascade,
  last_viewed_at timestamptz not null default now(),
  view_count integer not null default 1,
  primary key (user_id, theme_id)
);

-- ============================================================
-- Weekly prompts
-- One is shown on the dashboard each week, rotating automatically.
-- Natalie can write these straight into the Table Editor.
-- ============================================================
create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  body text not null,
  context text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- Each practitioner sees only their own rows. Reflections in particular are
-- private and must never be readable by anyone else, including org admins.
-- ============================================================
alter table public.user_topic_state enable row level security;
alter table public.user_tool_state enable row level security;
alter table public.user_theme_activity enable row level security;
alter table public.prompts enable row level security;

drop policy if exists "Own topic state" on public.user_topic_state;
create policy "Own topic state" on public.user_topic_state
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Own tool state" on public.user_tool_state;
create policy "Own tool state" on public.user_tool_state
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Own theme activity" on public.user_theme_activity;
create policy "Own theme activity" on public.user_theme_activity
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Read active prompts" on public.prompts;
create policy "Read active prompts" on public.prompts
  for select using (auth.role() = 'authenticated' and is_active);

-- ============================================================
-- Starter prompts
-- Placeholders in the right tone. Replace or add to these freely.
-- The unique index keeps this file safe to re-run without creating duplicates.
-- ============================================================
create unique index if not exists prompts_body_key on public.prompts (body);

insert into public.prompts (body, context, sort_order) values
  ('Think of a conversation this week that stayed with you. What was the person actually asking for, underneath what they said?', 'Noticing what sits beneath the surface of a conversation.', 1),
  ('Where did you say yes this week when you meant no, or maybe? What made that hard?', 'Boundaries and honesty in the work.', 2),
  ('Name one thing you know about your neighbourhood that a colleague in another organisation would not know.', 'The local knowledge that makes personalised care work.', 3),
  ('Whose goal were you working towards this week, the person''s or the system''s?', 'Keeping the person''s own priorities in view.', 4),
  ('When did you last sit with someone without trying to fix anything? How did it feel?', 'The value of staying alongside rather than solving.', 5),
  ('What did you not have an answer for this week? Who could you think it through with?', 'Working with uncertainty rather than around it.', 6)
on conflict do nothing;
