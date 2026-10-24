# May Anne Guevarra · Portfolio

Live: https://anne-portfolio-ten.vercel.app

React 19 + TypeScript, built with Vite and hosted on Vercel. Content, contact messages and media live in Supabase. Unit tests (Vitest) and end-to-end tests (Playwright) run on every push and pull request through GitHub Actions.

## Run it locally

```bash
npm ci
npm run dev          # http://localhost:5173
npm run typecheck    # TypeScript
npm test             # Vitest unit tests
npm run test:e2e     # Playwright (builds, serves, tests desktop + mobile)
```

## Structure

```
src/
  App.tsx              view switching (#hash), loads content, overlays
  config.ts            Supabase URL + publishable key, media URL, email, booking URL
  types.ts             the shapes the components render
  lib/
    content.ts         Supabase queries -> typed content (pure mappers are unit tested)
    supabase.ts        Supabase client + contact form submit
    format.ts          dates and validation helpers
  data/fallback.ts     built-in copy of the content, used if Supabase is down
  components/          one component per section: HomeView, WorkView, AutomationsView,
                       ExperienceView, ServicesView, ToolkitView, LovableView, FunnelsView,
                       IntroView, ContactView + ContactForm, Sidebar, Overlays, Effects
supabase/
  migrations/          relational tables, foreign keys, indexes, Row Level Security
  seed.sql             current content (safe to re-run)
tests/                 Playwright: contact form, booking popup, content loading
.github/workflows/     CI: typecheck, unit tests, e2e tests
```

## Database

One table per kind of content, each with a `sort` column: `kpis`, `work_items`, `automations` (platform `ghl` | `zapier`), `sites`, `library_shots`, `lovable_builds`, `experiences`, `offerings` (kind `service` | `approach` | `ads`), `toolkit_groups` → `tools` (foreign key), `credentials`. Images are referenced by number (`image_no` 7 = `img-07.jpg` in the `portfolio` storage bucket).

Tags are stored once in `tags` and linked through join tables: `work_item_tags`, `automation_tags`, `experience_tags`, `offering_tags`.

Row Level Security: the public key can read content and insert into `messages`, nothing else.

Setup on a new project: Supabase SQL Editor → run the file in `supabase/migrations/`, then `supabase/seed.sql`.

## Editing content

Supabase → Table Editor → the table for that section. Changes show on the next page load; no redeploy. Any section left empty in the database falls back to the built-in copy.

## Contact form and booking

The form saves to `messages`, then emails a copy through FormSubmit (reply-to = the visitor). The "Book your discovery call with me" button opens the Google Calendar booking page in a popup (45 min, Google Meet, Mon–Fri 8–11:45 AM Eastern).
