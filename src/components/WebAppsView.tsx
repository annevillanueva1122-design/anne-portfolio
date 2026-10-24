import { ExternalLink, Tags, ViewHead, useActions } from './shared';

interface Screen {
  src: string;
  caption: string;
}

interface WebBuild {
  name: string;
  kind: string;
  headline: string;
  description: string;
  tags: string[];
  cover: Screen;
  screens?: Screen[];
  liveUrl?: string;
}

// Images live in public/samples, so they ship with the site
const BUILDS: WebBuild[] = [
  {
    name: 'Buildison',
    kind: 'Website · React · Supabase',
    headline: 'Marketing automation site for Buildison Agency',
    description:
      'A standalone site for an all-in-one marketing CRM: animated hero and stats, feature sections with live product previews, tiered pricing with an annual/monthly toggle and a chat widget. Code on GitHub, data in Supabase, auto-deployed on Vercel.',
    tags: ['React', 'Supabase', 'GitHub', 'Vercel'],
    cover: { src: '/samples/buildison.jpg', caption: 'Buildison Agency home page' },
    liveUrl: 'https://buildison-react.vercel.app/',
  },
  {
    name: 'Pulse',
    kind: 'Mobile app · Product mockup',
    headline: "The owner's app for a service-business website",
    description:
      "A companion app that shows a business owner what their website is doing: conversion rate, new leads with one-tap call, text and email, the day's bookings and Stripe payments. Shown with demo data for a fictional med spa.",
    tags: ['Mobile UI', 'Leads', 'Bookings', 'Stripe payments'],
    cover: { src: '/samples/pulse-cover.jpg', caption: 'Pulse app: Today, Leads, Bookings and Payments screens' },
    screens: [
      { src: '/samples/pulse-main.jpg', caption: 'Pulse · Today' },
      { src: '/samples/pulse-leads.jpg', caption: 'Pulse · Leads' },
      { src: '/samples/pulse-bookings.jpg', caption: 'Pulse · Bookings' },
      { src: '/samples/pulse-payments.jpg', caption: 'Pulse · Payments' },
    ],
  },
];

/** Image that opens in the lightbox */
function Shot({ src, caption, ratio }: Screen & { ratio: string }) {
  const { zoom } = useActions();
  return (
    <div className="shot" role="button" tabIndex={0} aria-label={`Enlarge: ${caption}`} style={{ aspectRatio: ratio }}
      onClick={() => zoom(src, caption)}
      onKeyDown={(e) => { if (e.key === 'Enter') zoom(src, caption); }}>
      <img src={src} alt={caption} loading="lazy" />
    </div>
  );
}

export function WebAppsView() {
  return (
    <>
      <ViewHead eyebrow="Front-end & product builds" title="Web App Builds"
        lede="Standalone builds outside the CRM: a coded website and a mobile app concept. Click any image to enlarge it." />
      <div className="grid2">
        {BUILDS.map((b) => (
          <article className="panel" key={b.name}>
            <Shot {...b.cover} ratio="16 / 9" />
            {b.screens && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 8 }}>
                {b.screens.map((s) => <Shot key={s.src} {...s} ratio="390 / 844" />)}
              </div>
            )}
            <p className="meta">{b.kind}</p>
            <h3>{b.name}</h3>
            <p style={{ color: 'var(--ink)', fontWeight: 600 }}>{b.headline}</p>
            <p>{b.description}</p>
            <Tags items={b.tags} />
            {b.liveUrl && <ExternalLink className="link" href={b.liveUrl}>Visit the live site ↗</ExternalLink>}
          </article>
        ))}
      </div>
    </>
  );
}
