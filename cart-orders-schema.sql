-- ============================================================
-- Learners Academy — Cart & Orders (dashboard: cart total + purchase history)
-- Run this ONCE in: Supabase dashboard → SQL Editor → New query → Run
-- Assumes the "courses" table already exists (from courses-price-table.sql).
-- ============================================================

-- 1. CART — one row per (user, course) they've added
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id text references public.courses(id) on delete cascade not null,
  added_at timestamptz default now(),
  unique(user_id, course_id)
);

alter table public.cart_items enable row level security;

drop policy if exists "Users manage their own cart" on public.cart_items;
create policy "Users manage their own cart"
  on public.cart_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 2. ORDERS — created when a user checks out. status starts "pending" —
--    you update it manually (e.g. to "paid") in Table Editor once payment
--    is confirmed separately, since payment itself isn't wired up here.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  status text default 'pending', -- pending -> paid -> (you manage this manually for now)
  total_amount numeric not null,
  created_at timestamptz default now()
);

alter table public.orders enable row level security;

drop policy if exists "Users view their own orders" on public.orders;
create policy "Users view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

drop policy if exists "Users create their own orders" on public.orders;
create policy "Users create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- 3. ORDER ITEMS — the individual courses inside each order, with the
--    price captured at time of purchase (so later price changes don't
--    rewrite someone's past receipt).
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  course_id text references public.courses(id) not null,
  price numeric not null
);

alter table public.order_items enable row level security;

drop policy if exists "Users view items in their own orders" on public.order_items;
create policy "Users view items in their own orders"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = auth.uid()
    )
  );

drop policy if exists "Users insert items into their own orders" on public.order_items;
create policy "Users insert items into their own orders"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.user_id = auth.uid()
    )
  );
