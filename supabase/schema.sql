-- Run this first in Supabase > SQL Editor, then run seed.sql.

-- 1) Portfolio content: one row per section (WORK, FLOWS, ZAPS, SITES, LIB,
--    EXP, SERVICES, APPROACH, ADS, TOOLKIT, KPIS, LOVABLE_BUILDS, CREDENTIALS). Edit the "data" JSON in the
--    Table Editor and the live site picks it up on the next page load.
create table if not exists public.portfolio_content (
  key        text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;

drop policy if exists "Public can read portfolio content" on public.portfolio_content;
create policy "Public can read portfolio content"
  on public.portfolio_content for select
  to anon, authenticated
  using (true);

-- 2) Contact form messages: visitors can insert, nobody can read them
--    through the public key. You read them in the Supabase dashboard.
create table if not exists public.messages (
  id         bigint generated always as identity primary key,
  name       text not null check (char_length(name) between 1 and 120),
  email      text not null check (char_length(email) between 3 and 200),
  company    text check (char_length(company) <= 160),
  message    text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

drop policy if exists "Public can send messages" on public.messages;
create policy "Public can send messages"
  on public.messages for insert
  to anon, authenticated
  with check (true);

-- 3) Media storage: public bucket for the images and intro video.
--    Upload the files from the repo's assets/ folder into this bucket
--    (Storage > portfolio > Upload), keeping the same file names.
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;
