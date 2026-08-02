-- ============================================================
-- Learners Academy — editable course pricing
-- Run this ONCE in: Supabase dashboard → SQL Editor → New query → Run
-- After this, change any price anytime in:
--   Supabase dashboard → Table Editor → courses → edit price_now / price_old → save
-- The website will pick up the new price automatically on next page load.
-- No code changes, no redeploy needed.
-- ============================================================

create table if not exists public.courses (
  id text primary key,          -- matches data-course-id on each course card
  name text,                    -- just for your reference in the table editor
  price_now numeric,            -- current selling price (in Rupees, no symbol)
  price_old numeric,            -- original / strikethrough price (leave blank if none)
  is_free boolean default false,
  updated_at timestamptz default now()
);

-- Anyone visiting the site can READ prices (needed for the site to display them)
alter table public.courses enable row level security;

drop policy if exists "Anyone can view course prices" on public.courses;
create policy "Anyone can view course prices"
  on public.courses for select
  using (true);

-- No public write policy is created on purpose — this means prices can ONLY
-- be changed from inside the Supabase dashboard (Table Editor), not from the
-- website itself. That's what keeps pricing safe from being tampered with
-- by a visitor.

-- ============================================================
-- Pre-fill with your current live prices, so nothing changes on the site
-- until you actually edit a row.
-- ============================================================
insert into public.courses (id, name, price_now, price_old, is_free) values
  ('math-grade-10',            'Mathematics Masterclass — Grade 10',        999,  2999, false),
  ('science-grade-9',          'Science Explorer — Grade 9',                799,  2499, false),
  ('english-grade-12',         'English Literature & Grammar — Grade 12',   699,  1999, false),
  ('social-studies-grade-8',   'Social Studies Made Fun — Grade 8',         null, null, true),
  ('physics-grade-11',         'Physics Mastery — Grade 11',                1299, 3499, false),
  ('math-grade-6',             'Mathematics Foundations — Grade 6',         499,  1499, false),
  ('science-grade-7',          'Science Explorer — Grade 7',                599,  1799, false),
  ('jee-foundation-math',      'JEE Foundation — Mathematics',              2199, 5999, false),
  ('tableau-dashboard-pro',    'Tableau — Zero to Dashboard Pro',           1999, 5999, false),
  ('powerbi-bootcamp',         'Power BI — Business Intelligence Bootcamp', 2499, 6999, false),
  ('sql-mastery',              'SQL — Complete Database Mastery',           1499, 4499, false),
  ('python-data-science',      'Python for Data Science & Automation',      1799, 4999, false),
  ('excel-sheets-bootcamp',    'Excel & Google Sheets — Power User Bootcamp', 999, 2999, false),
  ('data-analytics-career',    'Data Analytics — Complete Career Path',     3999, 9999, false),
  ('ml-ai-fundamentals',       'Machine Learning & AI Fundamentals',        2999, 7999, false)
on conflict (id) do nothing;
