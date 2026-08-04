-- Let the public landing page list published theme titles.
--
-- Only the theme rows themselves become readable without an account. Topics,
-- tools, reflections and everything else stay behind sign in.
--
-- Run in the Supabase SQL Editor. Safe to re-run.

drop policy if exists "Read published themes" on public.themes;
create policy "Read published themes" on public.themes
  for select using (is_published);
