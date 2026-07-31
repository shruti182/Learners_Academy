-- ============================================================
-- Learners Academy — "Teach on Learners Academy" applications
-- Run this ONCE in: Supabase dashboard → SQL Editor → New query → Run
-- ============================================================

create table if not exists public.teacher_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  subjects text not null,        -- what they can teach, free text (e.g. "Physics, Maths - Grade 9-12")
  experience_years int,
  message text,                  -- anything else they want to share
  aadhar_number text not null,   -- sensitive — see note below
  status text default 'pending', -- you can change to 'contacted' / 'rejected' / 'onboarded' as you review
  created_at timestamptz default now()
);

alter table public.teacher_applications enable row level security;

-- Applicants can SUBMIT an application...
drop policy if exists "Anyone can submit a teacher application" on public.teacher_applications;
create policy "Anyone can submit a teacher application"
  on public.teacher_applications for insert
  with check (true);

-- ...but nobody (not even other applicants) can READ any application through
-- the website's anon key. On purpose — this is sensitive personal data
-- (including Aadhaar numbers), so no select/update/delete policy is created.
-- You will only ever see these submissions inside Supabase itself:
--   Supabase dashboard → Table Editor → teacher_applications
-- That view uses your admin session, which bypasses RLS.
