import { useState } from 'react';
import { Tags, ViewHead, useActions } from './shared';

interface CaseStudy {
  challenge: string;
  build: string[];
  outcome: string[];
  stack: string;
}

interface N8nWorkflow {
  slug: string;
  title: string;
  kind: string;
  image: string;
  /** Screenshot width / height, keeps the layout steady while it loads */
  ratio: string;
  summary: string;
  tags: string[];
  caseStudy: CaseStudy;
}

const WORKFLOWS: N8nWorkflow[] = [
  {
    slug: 'portfolio-assistant',
    title: 'Aurora Portfolio Assistant',
    kind: 'AI agent · Portfolio chatbot',
    image: '/n8n/portfolio-assistant.webp',
    ratio: '957 / 440',
    summary:
      'An AI chat agent built for this portfolio. The site sends each visitor message to an n8n webhook, an AI agent with short-term memory answers questions about my work, and the reply goes straight back to the chat bubble.',
    tags: ['n8n AI Agent', 'Webhook', 'OpenAI', 'Vercel', 'Chat memory'],
    caseStudy: {
      challenge:
        'Recruiters and prospects visit at all hours, often from other time zones. They want quick answers on skills, tools and availability before they book a call or send a message.',
      build: [
        'Webhook endpoint that only accepts requests from the portfolio domain (CORS locked).',
        'n8n AI Agent with a system prompt covering my skills, industries, roles I am open to and booking hours.',
        'Window memory keyed by a session ID, so the agent remembers the last 10 messages of each conversation.',
        'Lightweight JavaScript chat widget on the Vercel site, styled to match the portfolio.',
      ],
      outcome: [
        'Visitors get an answer in seconds, in English or Taglish.',
        'The agent only states facts from the prompt and hands anything else (rates, dates) to the contact form or a discovery call.',
        'Swapping the model or updating the bio is a one-node change, with no redeploy of the site.',
      ],
      stack: 'n8n · OpenAI · Webhook · Vercel · JavaScript',
    },
  },
  {
    slug: 'law-firm',
    title: 'Law Firm Lead Intake & Marketing Reporting',
    kind: 'Sample build · Personal injury',
    image: '/n8n/law-firm.webp',
    ratio: '1380 / 1162',
    summary:
      'Every case inquiry from GHL forms and Facebook Lead Ads lands in one Google Sheet, scored by case type and filing window. Hot cases create a GHL opportunity and ping Slack. A 7 AM run pulls GA4, Search Console, AEO, Meta Ads, consultations and competitor reviews into a single KPI email.',
    tags: ['GHL', 'Facebook Lead Ads', 'GA4', 'Search Console', 'AEO', 'Firecrawl', 'Google Sheets'],
    caseStudy: {
      challenge:
        'A PI firm runs intake from several sources (website forms, Facebook ads, calls), so partners never see one clean view of leads, ad spend, rankings and booked consultations. Reporting takes hours each week and good cases sit untouched.',
      build: [
        'Two triggers (GHL form webhook and Facebook Lead Ads) normalized into one lead format.',
        'Scoring code: high-value case types, incidents inside a strong filing window and no current attorney push the score up.',
        'Score 70+ creates a GHL opportunity with an estimated case value and posts a Slack alert.',
        'Daily 7 AM run: GA4 traffic, top 25 Search Console keywords, a Perplexity AEO check ("best PI lawyer in Dallas"), Meta campaign CPL, GHL consultations and Firecrawl-scraped competitor reviews, each to its own Sheets tab.',
        'Merge step builds an HTML KPI email for the partners.',
      ],
      outcome: [
        'One source of truth for intake, marketing and bookings.',
        'Hot cases reach an intake specialist within minutes, not the next day.',
        'Replaces the manual weekly report with a daily snapshot, including whether AI search engines cite the firm.',
      ],
      stack: 'n8n · GoHighLevel API · Meta Graph API · GA4 · Search Console · Perplexity · Firecrawl · Google Sheets · Slack · Gmail',
    },
  },
  {
    slug: 'med-spa',
    title: 'Med Spa Lead Capture & Growth Reporting',
    kind: 'Sample build · Aesthetics clinic',
    image: '/n8n/med-spa.webp',
    ratio: '1380 / 1162',
    summary:
      'Botox, filler and laser inquiries are scored by treatment value and readiness to book, logged to Sheets and routed to the front desk. The daily report adds GA4, SEO, AEO, Meta Ads, show rate and scraped competitor pricing.',
    tags: ['GHL', 'Meta Ads', 'GA4', 'AEO', 'Show rate', 'Firecrawl', 'Google Sheets'],
    caseStudy: {
      challenge:
        'Med spas spend heavily on Meta promos, but the owner cannot easily tell which treatments bring paying clients, how many booked consults actually show up, or how local competitors price the same services.',
      build: [
        'GHL form and Facebook Lead Ads triggers feed one normalized lead record.',
        'Scoring by treatment value (CoolSculpting > laser > filler > Botox > facial), a preferred date and budget.',
        'High-value leads become GHL opportunities and trigger a Slack alert for the front desk.',
        'Daily run pulls GA4, Search Console, an AEO check ("best med spa for Botox in Scottsdale"), Meta campaign CPL and GHL appointments with show rate.',
        'Firecrawl extracts competitor treatment prices and promos into a "Competitor Pricing" tab.',
      ],
      outcome: [
        'Front desk works the highest-value leads first.',
        'The owner sees cost per lead next to show rate, not just clicks.',
        'Pricing and promos can be adjusted against live competitor data.',
      ],
      stack: 'n8n · GoHighLevel API · Meta Graph API · GA4 · Search Console · Perplexity · Firecrawl · Google Sheets · Slack · Gmail',
    },
  },
  {
    slug: 'real-estate',
    title: 'Real Estate Lead Routing & Market Reporting',
    kind: 'Sample build · Agent / brokerage',
    image: '/n8n/real-estate.webp',
    ratio: '1380 / 1162',
    summary:
      'Buyer and seller leads are scored by timeline, pre-approval and price range, with estimated commission attached to the GHL opportunity. Each morning, traffic, ads, AEO, showings and scraped new listings land in Sheets.',
    tags: ['GHL', 'Facebook Lead Ads', 'GA4', 'AEO', 'Listings scraper', 'Google Sheets'],
    caseStudy: {
      challenge:
        'Agents get leads from home-valuation ads and website forms, but a ready seller and a "just browsing" buyer arrive looking the same. Market updates and ad results live in separate tools.',
      build: [
        'GHL form and Facebook "Free Home Valuation" leads normalized into one record.',
        'Scoring: sellers, 0–3 month timelines and pre-approved buyers rank highest. Estimated commission (3%) is calculated from the price range.',
        'Hot leads open a GHL deal and alert the team in Slack.',
        'Daily run: GA4, Search Console, AEO check ("top agent in Austin for first-time buyers"), Meta Ads, GHL showings and listing appointments.',
        'Firecrawl scrapes new listings (price, beds, baths, sqft, days on market) for daily market posts and client updates.',
      ],
      outcome: [
        'Agents call the most motivated sellers and buyers first.',
        'Pipeline value is visible from day one through estimated commission.',
        'Fresh listing data feeds content and client follow-ups without manual searching.',
      ],
      stack: 'n8n · GoHighLevel API · Meta Graph API · GA4 · Search Console · Perplexity · Firecrawl · Google Sheets · Slack · Gmail',
    },
  },
  {
    slug: 'content-engine',
    title: 'YouTube Shorts + FB Reels Content Engine',
    kind: 'Sample build · Short-form content',
    image: '/n8n/content-engine.webp',
    ratio: '1822 / 1254',
    summary:
      'AI plans the week and writes the scripts, videos are rendered from a template or exported from CapCut, and n8n publishes them to YouTube Shorts and Facebook Reels. A daily report tracks views, watch time, CTR, CPC and ROAS across organic and paid.',
    tags: ['OpenAI', 'Creatomate', 'CapCut', 'YouTube API', 'Facebook Reels', 'Meta Ads', 'Google Ads', 'ROAS'],
    caseStudy: {
      challenge:
        'Posting short-form video every day means ideas, scripts, editing, captions and uploading to two platforms, then digging through three dashboards to see what actually worked.',
      build: [
        'Monday 6 AM: OpenAI generates 7 ideas, writes a hook and 30-second script for each, and saves them to a Content Calendar sheet.',
        'Scripts render through a 9:16 Creatomate template and drop into a "Ready to Post" Google Drive folder.',
        'CapCut has no posting API, so edited videos are exported to the same Drive folder. One trigger handles both.',
        'AI writes a Shorts title, description, FB caption and hashtags, then n8n uploads to YouTube and runs the 3-step Facebook Reels publish.',
        'Daily 8 AM: YouTube Analytics, Reels insights, Meta Ads and Google Ads video campaigns go to Sheets, with blended ROAS and the top Short sent to Slack and email.',
      ],
      outcome: [
        'One weekly planning run feeds a full week of posts.',
        'Editing stays in CapCut while uploading, captions and logging are automatic.',
        'Organic and paid results sit side by side, so spend follows the videos that convert.',
      ],
      stack: 'n8n · OpenAI · Creatomate · Google Drive · YouTube Data & Analytics API · Meta Graph API · Google Ads API · Google Sheets · Slack · Gmail',
    },
  },
];

const css = `
.n8n-list{display:flex;flex-direction:column;gap:22px}
.n8n-shot{border:1px solid var(--line);border-radius:14px;overflow:hidden;background:#fbfafc;cursor:zoom-in}
.n8n-shot img{display:block;width:100%;height:100%;object-fit:contain}
.n8n-top{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px;align-items:baseline}
.n8n-toggle{align-self:flex-start;border:1px solid var(--line);background:var(--panel-2);color:var(--indigo);font:inherit;font-weight:600;font-size:14px;padding:8px 14px;border-radius:999px;cursor:pointer}
.n8n-toggle:hover{border-color:var(--accent);color:var(--accent)}
.n8n-case{border-top:1px dashed var(--line);padding-top:14px;display:grid;gap:14px}
.n8n-case h4{font-family:var(--f-display);font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);margin:0 0 6px}
.n8n-case p,.n8n-case li{font-size:14px;line-height:1.55;color:var(--muted)}
.n8n-case ul{margin:0;padding-left:18px;display:grid;gap:4px}
.n8n-case .stack{font-family:var(--f-mono);font-size:12.5px;color:var(--ink)}
@media(min-width:900px){.n8n-case{grid-template-columns:1fr 1fr}.n8n-case .wide{grid-column:1 / -1}}
`;

function WorkflowCard({ w }: { w: N8nWorkflow }) {
  const { zoom } = useActions();
  const [open, setOpen] = useState(false);
  const caption = `${w.title} · n8n workflow`;
  const c = w.caseStudy;
  return (
    <article className="panel" id={`n8n-${w.slug}`}>
      <div className="n8n-shot" role="button" tabIndex={0} aria-label={`Enlarge: ${caption}`} style={{ aspectRatio: w.ratio }}
        onClick={() => zoom(w.image, caption)}
        onKeyDown={(e) => { if (e.key === 'Enter') zoom(w.image, caption); }}>
        <img src={w.image} alt={caption} loading="lazy" />
      </div>
      <div className="n8n-top">
        <h3>{w.title}</h3>
        <p className="meta">{w.kind}</p>
      </div>
      <p>{w.summary}</p>
      <Tags items={w.tags} />
      <button className="n8n-toggle" aria-expanded={open} aria-controls={`case-${w.slug}`} onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide case study' : 'Read the case study'}
      </button>
      {open && (
        <div className="n8n-case" id={`case-${w.slug}`}>
          <div className="wide"><h4>The challenge</h4><p>{c.challenge}</p></div>
          <div><h4>What I built</h4><ul>{c.build.map((b) => <li key={b}>{b}</li>)}</ul></div>
          <div><h4>Outcome</h4><ul>{c.outcome.map((o) => <li key={o}>{o}</li>)}</ul></div>
          <div className="wide"><h4>Stack</h4><p className="stack">{c.stack}</p></div>
        </div>
      )}
    </article>
  );
}

export function N8nView() {
  return (
    <>
      <style>{css}</style>
      <ViewHead eyebrow="Automation builds" title="n8n Workflows"
        lede="End-to-end n8n builds: lead capture, scoring and routing, daily marketing reports (GA4, SEO, AEO, ads, bookings) and AI content publishing. Click any screenshot to zoom in." />
      <div className="n8n-list">
        {WORKFLOWS.map((w) => <WorkflowCard key={w.slug} w={w} />)}
      </div>
    </>
  );
}
