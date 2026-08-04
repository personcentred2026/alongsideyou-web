-- AlongsideYou content seed
-- Run AFTER schema.sql. Inserts the ten Companion Themes.
-- The five confirmed themes are published; the five drafts are unpublished
-- pending Natalie's content review.

insert into public.themes (slug, title, strapline, sort_order, is_published) values
  ('the-neighbourhood-shift', 'The Neighbourhood Shift', 'Making sense of neighbourhood and place-based working, and your role within an Integrated Neighbourhood Team.', 1, true),
  ('navigating-systems-and-services', 'Navigating Systems and Services', 'Finding a way through referral routes, eligibility criteria, and waiting lists with and for the people you support.', 2, true),
  ('power-voice-and-choice', 'Power, Voice and Choice', 'Keeping the person''s own voice and choices at the centre, especially when systems and professionals speak loudly.', 3, true),
  ('when-theres-no-clear-answer', 'When There''s No Clear Answer', 'Working with uncertainty, complexity, and situations where every option has a cost.', 4, true),
  ('when-conversations-feel-charged', 'When Conversations Feel Charged', 'Handling conversations carrying anger, distress, or high stakes, and looking after yourself afterwards.', 5, true),
  ('starting-well-with-people', 'Starting Well with People', 'First conversations, building trust, and setting expectations early.', 6, false),
  ('working-with-what-matters', 'Working with What Matters', 'Personalised care and support planning built around the person''s own priorities.', 7, false),
  ('the-team-around-the-person', 'The Team Around the Person', 'Working well with colleagues, MDTs, and the wider neighbourhood team.', 8, false),
  ('looking-after-yourself', 'Looking After Yourself', 'Sustaining yourself in emotionally demanding work.', 9, false),
  ('endings-and-moving-on', 'Endings and Moving On', 'Closing support well, handing over, and helping people move forward.', 10, false)
on conflict (slug) do nothing;

-- Topics and tools for The Neighbourhood Shift
with t as (select id from public.themes where slug = 'the-neighbourhood-shift')
insert into public.topics (theme_id, title, summary, sort_order)
select t.id, v.title, v.summary, v.sort_order from t, (values
  ('What neighbourhood health actually means', 'Cutting through the policy language to what changes day to day for you and the people you support.', 1),
  ('Your place in the team around the person', 'How personalised care roles fit alongside clinical and community colleagues in an INT.', 2),
  ('Working across organisational boundaries', 'Practical ways to collaborate when colleagues sit in different organisations with different systems.', 3),
  ('Knowing your neighbourhood', 'Building and keeping a live picture of local assets, groups, and support beyond services.', 4),
  ('When the system is still catching up', 'Holding your ground when structures, data sharing, or referral routes have not caught up with the model.', 5)
) as v(title, summary, sort_order);

with t as (select id from public.themes where slug = 'the-neighbourhood-shift')
insert into public.tools (theme_id, title, summary, sort_order)
select t.id, v.title, v.summary, v.sort_order from t, (values
  ('Neighbourhood asset map starter', 'A simple structure for capturing what exists locally and who to contact.', 1),
  ('Role clarity conversation guide', 'Prompts for agreeing who does what within the team around the person.', 2),
  ('MDT preparation checklist', 'Getting the most from multidisciplinary team discussions.', 3),
  ('Boundary-spanning email templates', 'Ready-to-adapt wording for reaching colleagues in other organisations.', 4)
) as v(title, summary, sort_order);
