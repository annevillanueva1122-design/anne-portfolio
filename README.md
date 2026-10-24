# May Anne Guevarra · Portfolio

Static site (plain HTML/CSS/JS, no build step), hosted on Vercel, with Supabase for content, contact messages and media.

```
index.html          the site
config.js           Supabase URL, anon key, media location
supabase/schema.sql tables, security rules, storage bucket
supabase/seed.sql   current portfolio content
```

## 1. GitHub
Create a new repo, then upload everything in this folder (or `git init`, commit, push).

## 2. Supabase
1. New project. In **SQL Editor**, run `supabase/schema.sql`, then `supabase/seed.sql`.
2. **Storage > portfolio**: holds the images (img-01..20.jpg) and intro video (video-01.mp4). To change one, upload a file with the same name.
3. **Project Settings > API**: copy the Project URL and the `anon` public key into `config.js`.
4. In `config.js`, set `mediaBase` to `https://YOUR-PROJECT.supabase.co/storage/v1/object/public/portfolio`.

## 3. Vercel
**Add New > Project**, import the GitHub repo, Framework Preset **Other**, no build command. Deploy. Every push to `main` redeploys.

## Editing content
**Table Editor > portfolio_content**: each row is one section (WORK, FLOWS, ZAPS, SITES, LIB, EXP, SERVICES, APPROACH, ADS, TOOLKIT, KPIS, LOVABLE_BUILDS, CREDENTIALS). Edit the `data` JSON and refresh the site. No redeploy needed.
If the database is unreachable, the site falls back to the content built into `index.html`.

## Contact messages
**Table Editor > messages**. Visitors can only insert; the public key can't read them.
Each message is also emailed to `notifyEmail` in `config.js` (via FormSubmit). The very first one sends an activation email; click its link once.

## Discovery call booking
Google Calendar appointment schedule "Discovery Call with May Anne" (45 min, Google Meet, Mon–Fri 8–11:45 AM Eastern Time), opened in a popup from the "Book your discovery call with me" button on the Contact page, via `bookingUrl` in `config.js`. Change hours or duration in Google Calendar; the site updates on its own.
