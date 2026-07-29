-- ============================================================
-- Learners Academy — Supabase schema
-- Run this ONCE in: Supabase dashboard → SQL Editor → New query → Run
-- ============================================================

-- 1. Table that stores signup details for every user
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text check (role in ('student', 'professional')),
  grade text,      -- e.g. "10" (only relevant for students)
  track text,      -- e.g. "python", "school" (relevant for professionals / course track)
  intent text,     -- e.g. "demo" — lets you tell who signed up via the demo popup
  created_at timestamptz default now()
);

-- 2. Lock the table down: users can only ever see/edit their own row
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Auto-create a profiles row the moment someone signs up
--    (reads the extra fields we pass in supabase.auth.signUp({ options: { data: {...} } }))
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role, grade, track, intent)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'role',
    new.raw_user_meta_data ->> 'grade',
    new.raw_user_meta_data ->> 'track',
    new.raw_user_meta_data ->> 'intent'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- After running this: Authentication → Providers → make sure "Email" is enabled.
-- (It's on by default. Turn OFF "Confirm email" while testing, in
--  Authentication → Settings, so signups work immediately without an inbox check.)
-- ============================================================
