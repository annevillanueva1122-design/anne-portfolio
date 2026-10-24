-- Portfolio database v2 (relational). Already applied to the anne-portfolio project. Run in Supabase > SQL Editor, then seed.sql.
-- Every content table has a "sort" column for display order.
-- Tags are shared: one tags table + a join table per thing that has tags (many-to-many).

-- ---------- content ----------
create table if not exists public.tags (
  id   bigint generated always as identity primary key,
  name text not null unique
);

create table if not exists public.work_items (
  id          bigint generated always as identity primary key,
  sort        int  not null default 0,
  name        text not null,
  type_label  text not null,          -- "Website · GHL · Booking"
  sector      text not null,
  headline    text not null,
  description text not null,
  live_url    text
);

create table if not exists public.automations (
  id             bigint generated always as identity primary key,
  sort           int  not null default 0,
  platform       text not null check (platform in ('ghl', 'zapier')),
  image_no       int  not null check (image_no between 1 and 99),  -- img-NN.jpg in storage
  extra_image_no int  check (extra_image_no between 1 and 99),
  title          text not null,
  description    text not null
);

create table if not exists public.experiences (
  id             bigint generated always as identity primary key,
  sort           int  not null default 0,
  period         text not null,        -- "Apr 2026 — Present"
  is_current     boolean not null default false,
  company        text not null,
  role           text not null,
  summary        text,                 -- null = listed under "Earlier roles"
  case_study_url text,
  live_url       text
);

create table if not exists public.offerings (
  id          bigint generated always as identity primary key,
  sort        int  not null default 0,
  kind        text not null check (kind in ('service', 'approach', 'ads')),
  title       text not null,
  description text not null
);

create table if not exists public.sites (
  id       bigint generated always as identity primary key,
  sort     int  not null default 0,
  name     text not null,
  category text not null,
  url      text not null
);

create table if not exists public.library_shots (
  id       bigint generated always as identity primary key,
  sort     int  not null default 0,
  image_no int  not null check (image_no between 1 and 99),
  caption  text not null
);

create table if not exists public.lovable_builds (
  id   bigint generated always as identity primary key,
  sort int  not null default 0,
  name text not null
);

create table if not exists public.toolkit_groups (
  id   bigint generated always as identity primary key,
  sort int  not null default 0,
  name text not null unique
);

create table if not exists public.tools (
  id       bigint generated always as identity primary key,
  sort     int    not null default 0,
  group_id bigint not null references public.toolkit_groups (id) on delete cascade,
  name     text   not null
);
create index if not exists tools_group_id_idx on public.tools (group_id);

create table if not exists public.kpis (
  id         bigint generated always as identity primary key,
  sort       int  not null default 0,
  value      int  not null,
  from_value int,                      -- count-up start (e.g. 2000 for "since 2022")
  suffix     text,                     -- "+"
  label      text not null
);

create table if not exists public.credentials (
  id          bigint generated always as identity primary key,
  sort        int  not null default 0,
  title       text not null,
  short_label text not null,           -- shown on the home card
  period      text not null,
  detail      text not null
);

-- ---------- tag join tables (many-to-many) ----------
create table if not exists public.work_item_tags (
  work_item_id bigint not null references public.work_items (id) on delete cascade,
  tag_id       bigint not null references public.tags (id) on delete cascade,
  sort         int    not null default 0,
  primary key (work_item_id, tag_id)
);
create table if not exists public.automation_tags (
  automation_id bigint not null references public.automations (id) on delete cascade,
  tag_id        bigint not null references public.tags (id) on delete cascade,
  sort          int    not null default 0,
  primary key (automation_id, tag_id)
);
create table if not exists public.experience_tags (
  experience_id bigint not null references public.experiences (id) on delete cascade,
  tag_id        bigint not null references public.tags (id) on delete cascade,
  sort          int    not null default 0,
  primary key (experience_id, tag_id)
);
create table if not exists public.offering_tags (
  offering_id bigint not null references public.offerings (id) on delete cascade,
  tag_id      bigint not null references public.tags (id) on delete cascade,
  sort        int    not null default 0,
  primary key (offering_id, tag_id)
);
create index if not exists work_item_tags_tag_idx  on public.work_item_tags (tag_id);
create index if not exists automation_tags_tag_idx on public.automation_tags (tag_id);
create index if not exists experience_tags_tag_idx on public.experience_tags (tag_id);
create index if not exists offering_tags_tag_idx   on public.offering_tags (tag_id);

-- ---------- security: content is public read-only ----------
do $$
declare t text;
begin
  foreach t in array array['tags','work_items','automations','experiences','offerings','sites','library_shots',
    'lovable_builds','toolkit_groups','tools','kpis','credentials',
    'work_item_tags','automation_tags','experience_tags','offering_tags']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('drop policy if exists "Public read" on public.%I', t);
    execute format('create policy "Public read" on public.%I for select to anon, authenticated using (true)', t);
  end loop;
end $$;

-- ---------- contact form (unchanged from v1) ----------
create table if not exists public.messages (
  id         bigint generated always as identity primary key,
  name       text not null check (char_length(name) between 1 and 120),
  email      text not null check (char_length(email) between 3 and 200),
  company    text check (char_length(company) <= 160),
  message    text not null check (char_length(message) between 1 and 5000),
  created_at timestamptz not null default now()
);
alter table public.messages enable row level security;
grant insert on public.messages to anon, authenticated;
drop policy if exists "Public can send messages" on public.messages;
create policy "Public can send messages" on public.messages
  for insert to anon, authenticated with check (true);

-- ---------- media ----------
insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do update set public = true;
