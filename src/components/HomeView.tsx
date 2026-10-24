import { useRef } from 'react';
import type { Content, Kpi } from '../types';
import { config, media } from '../config';
import { CardHead, Tags, useActions } from './shared';

const DAILY_TOOLS: [string, string][] = [
  ['GoHighLevel', '#3b82f6'], ['n8n', '#ea4b71'], ['Make.com', '#8b5cf6'], ['Zapier', '#ff4f00'],
  ['ManyChat', '#2f9be0'], ['Lovable', '#e8578b'], ['Meta Ads', '#1877f2'], ['HubSpot', '#ff7a59'],
  ['Salesforce', '#00a1e0'], ['Slack', '#4a154b'], ['Canva', '#00c4cc'], ['Claude', '#d97757'],
];

/** Stat tiles that count up each time the pointer enters the row */
function Kpis({ items }: { items: Kpi[] }) {
  const row = useRef<HTMLDivElement>(null);
  const roll = () => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches || !row.current) return;
    row.current.querySelectorAll<HTMLElement>('b[data-n]').forEach((el) => {
      const to = Number(el.dataset.n), from = Number(el.dataset.from ?? 0), suf = el.dataset.suf ?? '';
      const t0 = performance.now(), dur = 1100;
      const step = (now: number) => {
        const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(from + (to - from) * e) + suf;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  };
  return (
    <div className="kpis" ref={row} onMouseEnter={roll}>
      {items.map((k) => (
        <div className="kpi" key={k.label}>
          <b data-n={k.value} data-from={k.from} data-suf={k.suffix}>{k.value}{k.suffix}</b>
          <span>{k.label}</span>
        </div>
      ))}
    </div>
  );
}

export function HomeView({ c }: { c: Content }) {
  const { go } = useActions();
  const ghl = c.automations.filter((a) => a.platform === 'ghl');
  return (
    <>
      <div className="top">
        <div>
          <h1>Build it once. <em>Let it run.</em></h1>
          <p className="lede">I'm an AI Automation Specialist for digital marketing businesses. I connect GoHighLevel, HubSpot, Salesforce and the rest of your stack into one simpler working system, so leads stop falling through the gaps between tools.</p>
        </div>
        <div className="btnrow">
          <button className="btn ghost" onClick={() => go('intro')}>▶ Watch my intro</button>
          <a className="btn ghost" href={config.cvUrl} target="_blank" rel="noopener">Check my CV</a>
          <button className="btn dark" onClick={() => go('contact')}>Get in touch</button>
        </div>
      </div>

      <div className="tools">
        <div className="lbl">Daily drivers<b>Tools I work with</b></div>
        <div className="marquee"><div className="track">
          {[0, 1].map((k) => (
            <div className="grp" key={k} aria-hidden={k ? true : undefined}>
              {DAILY_TOOLS.map(([n, col]) => <span key={n}><i style={{ ['--c' as string]: col }} />{n}</span>)}
            </div>
          ))}
        </div></div>
      </div>

      <Kpis items={c.kpis} />

      <div className="bento">
        <button className="card span2" onClick={() => go('work')}>
          <CardHead icon="work" title="Selected Work" sub="Five client builds: what I built and the stack behind it." />
          <div className="work">
            <div className="wlist">{c.work.map((w) => <div key={w.client}><b>{w.client}</b><span>{w.category.split(' · ')[0]}</span></div>)}</div>
            <div className="shot" style={{ aspectRatio: '16/10' }}><img src={media('img-02.jpg')} alt="Lovable project library" /></div>
          </div>
        </button>
        <button className="card" onClick={() => go('experience')}>
          <CardHead icon="user" title="About" sub="Who I am and how I work." />
          <div className="about"><img src={media('img-01.jpg')} alt="" /><p><b>AI automation specialist based in Metro Manila.</b> I come from customer support and SaaS onboarding, so I build systems your team can actually run day to day.</p></div>
          <div className="flow"><span>Lead</span><i>→</i><span>Page</span><i>→</i><span>Pipeline</span><i>→</i><span>Follow-up</span><i>→</i><span>Booked</span></div>
        </button>

        <button className="card" onClick={() => go('workflows')}>
          <CardHead icon="flow" title="GHL Workflows" sub={`${ghl.length === 7 ? 'Seven' : ghl.length} live production automations.`} />
          <div className="shot" style={{ aspectRatio: '16/9' }}><img src={media('img-13.jpg')} alt="AI Voice Agent workflow" /></div>
          <div className="list">{ghl.slice(0, 3).map((f) => <div className="li" key={f.title}>{f.title}<small>GHL</small></div>)}</div>
        </button>
        <button className="card" onClick={() => go('services')}>
          <CardHead icon="spark" title="Services" sub="What I build for digital marketing businesses." />
          <div className="list">{c.services.filter((s) => s.section === 'service').map((s, i) => <div className="li" key={s.title}>{s.title}<small>0{i + 1}</small></div>)}</div>
        </button>
        <button className="card" onClick={() => go('experience')}>
          <CardHead icon="brief" title="Experience" sub="Where I've worked, with case studies." />
          <div className="tl">{c.experiences.slice(0, 4).map((e) => {
            const [from, to] = e.period.split(' — ');
            return <div key={e.company}><span className="d">{from}<br />{to}</span><b>{e.company}</b><span className={e.isCurrent ? 'now' : ''}>{e.role}</span></div>;
          })}</div>
        </button>

        <button className="card" onClick={() => go('zapier')}>
          <CardHead icon="zap" title="Zapier Builds" sub="Payments, forms and bookings synced to GHL." />
          <div className="shot" style={{ aspectRatio: '16/9' }}><img src={media('img-14.jpg')} alt="Stripe Zap" /></div>
          <Tags items={['Stripe', 'Whop', 'Typeform', 'Skool', 'Kit', 'Slack']} />
        </button>
        <button className="card" onClick={() => go('funnels')}>
          <CardHead icon="globe" title="Live Funnels" sub="Sixteen sites and funnels you can open now." />
          <div className="list">{c.sites.slice(1, 6).map((s) => <div className="li" key={s.name}>{s.name}<small>{s.category}</small></div>)}</div>
        </button>
        <button className="card" onClick={() => go('lovable')}>
          <CardHead icon="layers" title="Lovable Library" sub="Funnels, decks, hubs and stores." />
          <div className="shot" style={{ aspectRatio: '16/9' }}><img src={media('img-06.jpg')} alt="Lovable e-commerce and webinar builds" /></div>
          <Tags items={['Sales funnels', 'Pitch decks', 'Member hubs', 'Stores']} />
        </button>

        <button className="card" onClick={() => go('toolkit')}>
          <CardHead icon="award" title="Credentials" sub="Education and training." />
          <div className="cred">{c.credentials.map((cr) => <div key={cr.title}><span>{cr.title}<small>{cr.shortLabel}</small></span></div>)}</div>
        </button>
        <button className="card contact span2" onClick={() => go('contact')}>
          <CardHead icon="mail" title="Let's work together" sub="Open to full-time and contract work." />
          <p className="big">Send over what you're working on and I'll tell you honestly whether I'm the right fit.</p>
          <div className="btnrow"><span className="btn" style={{ background: 'var(--accent)', color: '#fff' }}>Get in touch →</span></div>
        </button>
      </div>
    </>
  );
}
