-- Web App Builds section. Already applied to the anne-portfolio project.
-- To add a build: upload its screenshot to the "portfolio" storage bucket (a .jpg plus a .webp with the
-- same name), then insert a row here and link its tags in web_build_tags. No code change needed.

create table if not exists public.web_builds (
  id bigint generated always as identity primary key,
  sort int not null default 0,
  name text not null,
  kind text not null,          -- "Website · React · Supabase"
  headline text not null,
  description text not null,
  cover_image text,            -- file in the portfolio bucket, e.g. 'buildison.jpg' (the .webp twin is served)
  cover_caption text,
  demo text check (demo in ('pulse')),  -- show a built-in interactive demo instead of an image
  live_url text
);

create table if not exists public.web_build_tags (
  web_build_id bigint not null references public.web_builds (id) on delete cascade,
  tag_id bigint not null references public.tags (id) on delete cascade,
  sort int not null default 0,
  primary key (web_build_id, tag_id)
);
create index if not exists web_build_tags_tag_idx on public.web_build_tags (tag_id);

-- Public read-only, like the other content tables
do $$
declare t text;
begin
  foreach t in array array['web_builds', 'web_build_tags']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('drop policy if exists "Public read" on public.%I', t);
    execute format('create policy "Public read" on public.%I for select to anon, authenticated using (true)', t);
  end loop;
end $$;

-- ---------- seed ----------
insert into public.web_builds (sort, name, kind, headline, description, cover_image, cover_caption, demo, live_url)
select * from (values
  (1, 'Buildison', 'Website · React · Supabase', 'Marketing automation site for Buildison Agency',
   'A standalone site for an all-in-one marketing CRM: animated hero and stats, feature sections with live product previews, tiered pricing with an annual/monthly toggle and a chat widget. Code on GitHub, data in Supabase, auto-deployed on Vercel.',
   'buildison.jpg', 'Buildison Agency home page', null, 'https://buildison-react.vercel.app/'),
  (2, 'Pulse', 'Mobile app · Clickable prototype', 'The owner''s app for a service-business website',
   'A companion app that shows a business owner what their website is doing: conversion rate, new leads with one-tap call, text and email, the day''s bookings and Stripe payments. Try it: switch tabs, change the date range, filter and act on leads, pick a booking day, tap the revenue bars. Demo data for a fictional med spa.',
   null, null, 'pulse', null)
) as v(sort, name, kind, headline, description, cover_image, cover_caption, demo, live_url)
where not exists (select 1 from public.web_builds);

insert into public.tags (name)
values ('React'), ('Supabase'), ('GitHub'), ('Vercel'), ('Mobile UI'), ('Leads'), ('Bookings'), ('Stripe payments')
on conflict (name) do nothing;

insert into public.web_build_tags (web_build_id, tag_id, sort)
select b.id, t.id, x.sort
from (values
  ('Buildison', 'React', 1), ('Buildison', 'Supabase', 2), ('Buildison', 'GitHub', 3), ('Buildison', 'Vercel', 4),
  ('Pulse', 'Mobile UI', 1), ('Pulse', 'Leads', 2), ('Pulse', 'Bookings', 3), ('Pulse', 'Stripe payments', 4)
) as x(build, tag, sort)
join public.web_builds b on b.name = x.build
join public.tags t on t.name = x.tag
on conflict do nothing;
