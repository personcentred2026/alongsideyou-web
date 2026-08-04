-- AlongsideYou database schema
-- Run this in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query)
-- on a fresh project. Safe to re-run: uses "if not exists" throughout.

-- ============================================================
-- Organisations (PCNs, ICBs, training hubs buying access)
-- ============================================================
create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text check (type in ('PCN', 'ICB', 'ICS', 'Training Hub', 'Other')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- Profiles (one per auth user, created automatically on signup)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text check (
    role in (
      'Care Coordinator',
      'Social Prescriber',
      'Health and Wellbeing Coach',
      'Other'
    )
  ),
  organisation_id uuid references public.organisations (id),
  is_org_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- Create a profile row automatically when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Content: Companion Themes -> Topics + Tools
-- ============================================================
create table if not exists public.themes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  strapline text,
  sort_order int not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  theme_id uuid not null references public.themes (id) on delete cascade,
  title text not null,
  summary text,
  body text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  theme_id uuid not null references public.themes (id) on delete cascade,
  title text not null,
  summary text,
  body text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table public.organisations enable row level security;
alter table public.profiles enable row level security;
alter table public.themes enable row level security;
alter table public.topics enable row level security;
alter table public.tools enable row level security;

-- Profiles: users can read and update their own profile
drop policy if exists "Read own profile" on public.profiles;
create policy "Read own profile" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "Update own profile" on public.profiles;
create policy "Update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Organisations: readable by signed-in users
drop policy if exists "Read organisations" on public.organisations;
create policy "Read organisations" on public.organisations
  for select using (auth.role() = 'authenticated');

-- Content: published content readable by signed-in users
drop policy if exists "Read published themes" on public.themes;
create policy "Read published themes" on public.themes
  for select using (auth.role() = 'authenticated' and is_published);

drop policy if exists "Read topics of published themes" on public.topics;
create policy "Read topics of published themes" on public.topics
  for select using (
    auth.role() = 'authenticated'
    and exists (
      select 1 from public.themes t
      where t.id = topics.theme_id and t.is_published
    )
  );

drop policy if exists "Read tools of published themes" on public.tools;
create policy "Read tools of published themes" on public.tools
  for select using (
    auth.role() = 'authenticated'
    and exists (
      select 1 from public.themes t
      where t.id = tools.theme_id and t.is_published
    )
  );

-- Writing content is done via the Supabase dashboard or the service role key
-- (the future CMS) — no insert/update policies for regular users on content.
