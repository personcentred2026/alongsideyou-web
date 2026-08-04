-- AlongsideYou content
--
-- This is the single source of truth for topics and tools. It is safe to run
-- as many times as you like: it clears the existing topics and tools first,
-- then loads everything fresh. Themes themselves are not touched, so any
-- publishing changes you have made in the Table Editor are preserved.
--
-- Run in Supabase SQL Editor after schema.sql and seed.sql.

delete from public.tools;
delete from public.topics;

-- ============================================================
-- The Neighbourhood Shift
-- ============================================================
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

-- ============================================================
-- Navigating Systems and Services
-- ============================================================
with t as (select id from public.themes where slug = 'navigating-systems-and-services')
insert into public.topics (theme_id, title, summary, sort_order)
select t.id, v.title, v.summary, v.sort_order from t, (values
  ('Mapping the route before you set off', 'Understanding a pathway before making promises about it.', 1),
  ('When the person does not fit the criteria', 'What to do when eligibility rules exclude someone who clearly needs support.', 2),
  ('Holding people through the wait', 'Supporting someone well while they are on a waiting list.', 3)
) as v(title, summary, sort_order);

with t as (select id from public.themes where slug = 'navigating-systems-and-services')
insert into public.tools (theme_id, title, summary, sort_order)
select t.id, v.title, v.summary, v.sort_order from t, (values
  ('Referral tracking sheet', 'Keeping oversight of where each referral has got to.', 1),
  ('Escalation script', 'Wording for chasing a stalled referral without burning bridges.', 2)
) as v(title, summary, sort_order);

-- ============================================================
-- Power, Voice and Choice
-- ============================================================
with t as (select id from public.themes where slug = 'power-voice-and-choice')
insert into public.topics (theme_id, title, summary, sort_order)
select t.id, v.title, v.summary, v.sort_order from t, (values
  ('Whose goal is it anyway', 'Noticing when a plan has drifted from what the person actually wants.', 1),
  ('Supporting choice without abandoning people', 'Respecting decisions you would not have made, while staying alongside.', 2),
  ('Advocating inside the MDT', 'Bringing the person''s voice into rooms they are not in.', 3)
) as v(title, summary, sort_order);

with t as (select id from public.themes where slug = 'power-voice-and-choice')
insert into public.tools (theme_id, title, summary, sort_order)
select t.id, v.title, v.summary, v.sort_order from t, (values
  ('What matters to you conversation frame', 'A structure for surfacing goals in the person''s own words.', 1),
  ('Decision summary template', 'Recording a person''s choice and reasoning so it travels with them.', 2)
) as v(title, summary, sort_order);

-- ============================================================
-- When There's No Clear Answer
-- ============================================================
with t as (select id from public.themes where slug = 'when-theres-no-clear-answer')
insert into public.topics (theme_id, title, summary, sort_order)
select t.id, v.title, v.summary, v.sort_order from t, (values
  ('Sitting with not knowing', 'Staying useful when there is no fix to offer.', 1),
  ('Weighing options that all have downsides', 'Thinking through trade-offs with the person rather than for them.', 2),
  ('Knowing when to escalate', 'Judging the line between holding uncertainty and raising a concern.', 3)
) as v(title, summary, sort_order);

with t as (select id from public.themes where slug = 'when-theres-no-clear-answer')
insert into public.tools (theme_id, title, summary, sort_order)
select t.id, v.title, v.summary, v.sort_order from t, (values
  ('Uncertainty check-in', 'Questions to ask yourself when a situation feels stuck.', 1),
  ('Options and trade-offs worksheet', 'A one-page way to lay out choices with the person.', 2)
) as v(title, summary, sort_order);

-- ============================================================
-- When Conversations Feel Charged
-- ============================================================
with t as (select id from public.themes where slug = 'when-conversations-feel-charged')
insert into public.topics (theme_id, title, summary, sort_order)
select t.id, v.title, v.summary, v.sort_order from t, (values
  ('Reading what is underneath the anger', 'Responding to the fear or frustration driving a charged moment.', 1),
  ('Staying steady under pressure', 'Practical grounding when a conversation gets heated.', 2),
  ('Repairing after a difficult exchange', 'Coming back from a conversation that went badly.', 3)
) as v(title, summary, sort_order);

with t as (select id from public.themes where slug = 'when-conversations-feel-charged')
insert into public.tools (theme_id, title, summary, sort_order)
select t.id, v.title, v.summary, v.sort_order from t, (values
  ('De-escalation phrase bank', 'Words that lower the temperature without dismissing the person.', 1),
  ('Post-conversation debrief prompt', 'Five minutes of structured reflection after a hard conversation.', 2)
) as v(title, summary, sort_order);

-- ============================================================
-- Draft themes: placeholder topics only, awaiting content review
-- These themes are unpublished, so nothing here appears in the app until
-- is_published is set to TRUE in the Table Editor.
-- ============================================================
with t as (select id from public.themes where slug = 'starting-well-with-people')
insert into public.topics (theme_id, title, summary, sort_order)
select t.id, 'The first conversation', 'Draft placeholder awaiting content review.', 1 from t;

with t as (select id from public.themes where slug = 'working-with-what-matters')
insert into public.topics (theme_id, title, summary, sort_order)
select t.id, 'From assessment to conversation', 'Draft placeholder awaiting content review.', 1 from t;

with t as (select id from public.themes where slug = 'the-team-around-the-person')
insert into public.topics (theme_id, title, summary, sort_order)
select t.id, 'Making MDTs work for the person', 'Draft placeholder awaiting content review.', 1 from t;

with t as (select id from public.themes where slug = 'looking-after-yourself')
insert into public.topics (theme_id, title, summary, sort_order)
select t.id, 'Noticing your own warning signs', 'Draft placeholder awaiting content review.', 1 from t;

with t as (select id from public.themes where slug = 'endings-and-moving-on')
insert into public.topics (theme_id, title, summary, sort_order)
select t.id, 'Ending support without ending the relationship badly', 'Draft placeholder awaiting content review.', 1 from t;
