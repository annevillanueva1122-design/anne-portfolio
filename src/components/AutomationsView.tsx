import type { Automation, Platform } from '../types';
import { Tags, ViewHead, Zoomable } from './shared';

const HEADS: Record<Platform, { eyebrow: string; title: string; lede: string }> = {
  ghl: {
    eyebrow: 'Production workflows · GoHighLevel',
    title: 'Custom Automations',
    lede: "Live automations I've built: call routing, follow-up cadences, lead routing and cross-platform notifications. Click any screenshot to enlarge it.",
  },
  zapier: {
    eyebrow: 'Production Zaps · Built for a TutorEasily sub-account',
    title: 'Zapier Automations',
    lede: 'The Zapier layer that connects payments, forms, community sign-ups and bookings back to GHL, Slack, Google Sheets and Kit, so every sale and lead lands in the right place.',
  },
};

/** One view for both GHL workflows and Zapier builds, filtered by platform */
export function AutomationsView({ items, platform }: { items: Automation[]; platform: Platform }) {
  const list = items.filter((a) => a.platform === platform);
  return (
    <>
      <ViewHead {...HEADS[platform]} />
      <div className="grid2">
        {list.map((a, i) => (
          <article className="panel" key={a.title}>
            <Zoomable image={a.image} caption={a.title} />
            {a.extraImage && <Zoomable image={a.extraImage} caption={`${a.title} (continued)`} />}
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <Tags items={a.tags} />
          </article>
        ))}
      </div>
    </>
  );
}
