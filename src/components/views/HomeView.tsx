import type { Content } from '../../lib/types';
import { img } from '../../lib/media';
import { useNav } from '../../lib/nav';
import { config } from '../../config';
import { CardHead, Tags } from '../ui';

const DAILY_TOOLS: [string, string][] = [
  ['GoHighLevel', '#3b82f6'], ['n8n', '#ea4b71'], ['Make.com', '#8b5cf6'], ['Zapier', '#ff4f00'], ['ManyChat', '#2f9be0'],
  ['Lovable', '#e8578b'], ['Meta Ads', '#1877f2'], ['HubSpot', '#ff7a59'], ['Salesforce', '#00a1e0'], ['Slack', '#4a154b'],
  ['Canva', '#00c4cc'], ['Claude', '#d97757'],
];

export function HomeView({ c }: { c: Content }) {
  const go = useNav();
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
          {[0, 1].map(k => (
            <div className="grp" key={k} aria-hidden={k === 1 || undefined}>
              {DAILY_TOOLS.map(([n, color]) => <span key={n}><i style={{ ['--c' as string]: color }} />{n}</span>)}
            </div>
          ))}
        </div></div>
      </div>

      <div className="kpis">
        {c.kpis.map(k => (
          <div className="kpi" key={k.label}>
            <b data-n={k.value} data-from={k.fromValue ?? undefined} data-suf={k.suffix ?? undefined}>{k.value}{k.suffix}</b>
            <span>{k.label}</span>
          </div>
        ))}
      </div>

      <div className="bento">
        <button className="card span2" onClick={() => go('work')}>
          <CardHead icon="work" title="Selected Work" sub="Five client builds: what I built and the stack behind it." />
          <div className="work">
            <div className="wlist">{c.work.map(w => <div key={w.name}><b>{w.name}</b><span>{w.typeLabel.split(' · ')[0]}</span></div>)}</div>
            <div className="shot" style={{ aspectRatio: '16/10' }}><img src={img(2)} alt="Lovable project library" /></div>
          </div>
        </button>
        <button className="card" onClick={() => go('experience')}>
          <CardHead icon="user" title="About" sub="Who I am and how I work." />
          <div className="about"><img src={img(1)} alt="" /><p><b>AI automation specialist based in Metro Manila.</b> I come from customer support and SaaS onboarding, so I build systems your team can actually run day to day.</p></div>
          <div className="flow"><span>Lead</span><i>→</i><span>Page</span><i>→</i><span>Pipeline</span><i>→</i><span>Follow-up</span><i>→</i><span>Booked</span></div>
        </button>

        <button className="card" onClick={() => go('workflows')}>
          <CardHead icon="flow" title="GHL Workflows" sub="Seven live production automations." />
          <div className="shot" style={{ aspectRatio: '16/9' }}><img src={img(13)} alt="AI Voice Agent workflow" /></div>
          <div className="list">{c.ghlFlows.slice(0, 3).map(f => <div className="li" key={f.title}>{f.title}<small>GHL</small></div>)}</div>
        </button>
        <button className="card" onClick={() => go('services')}>
          <CardHead icon="spark" title="Services" sub="What I build for digital marketing businesses." />
          <div className="list">{c.services.map((s, i) => <div className="li" key={s.title}>{s.title}<small>0{i + 1}</small></div>)}</div>
        </button>
        <button className="card" onClick={() => go('experience')}>
          <CardHead icon="brief" title="Experience" sub="Where I've worked, with case studies." />
          <div className="tl">{c.experience.slice(0, 4).map(e => {
            const [from, to] = e.period.split(' — ');
            return <div key={e.company}><span className="d">{from}<br />{to}</span><b>{e.company}</b><span className={e.isCurrent ? 'now' : ''}>{e.role}</span></div>;
          })}</div>
        </button>

        <button className="card" onClick={() => go('zapier')}>
          <CardHead icon="zap" title="Zapier Builds" sub="Payments, forms and bookings synced to GHL." />
          <div className="shot" style={{ aspectRatio: '16/9' }}><img src={img(14)} alt="Stripe Zap" /></div>
          <Tags items={['Stripe', 'Whop', 'Typeform', 'Skool', 'Kit', 'Slack']} />
        </button>
        <button className="card" onClick={() => go('funnels')}>
          <CardHead icon="globe" title="Live Funnels" sub="Sixteen sites and funnels you can open now." />
          <div className="list">{c.sites.slice(1, 6).map(s => <div className="li" key={s.name}>{s.name}<small>{s.category}</small></div>)}</div>
        </button>
        <button className="card" onClick={() => go('lovable')}>
          <CardHead icon="layers" title="Lovable Library" sub="Funnels, decks, hubs and stores." />
          <div className="shot" style={{ aspectRatio: '16/9' }}><img src={img(6)} alt="Lovable e-commerce and webinar builds" /></div>
          <Tags items={['Sales funnels', 'Pitch decks', 'Member hubs', 'Stores']} />
        </button>

        <button className="card" onClick={() => go('toolkit')}>
          <CardHead icon="award" title="Credentials" sub="Education and training." />
          <div className="cred">{c.credentials.map(cr => <div key={cr.title}><span>{cr.title}<small>{cr.shortLabel}</small></span></div>)}</div>
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
