// The detail pages behind each dashboard card.
import type { Automation, Content } from '../../lib/types';
import { VIDEO, VIDEO_POSTER } from '../../lib/media';
import { useNav } from '../../lib/nav';
import { Chips, Tags, ViewHead, Zoomable } from '../ui';

const num = (i: number) => String(i + 1).padStart(2, '0');

export function IntroView() {
  const go = useNav();
  return (
    <>
      <ViewHead eyebrow="Meet May Anne" title="Intro Video" lede="A two-minute introduction to who I am, how I work and the platforms I build on. Press play and turn the sound on." />
      <div className="intro">
        <div className="vid"><video src={VIDEO} poster={VIDEO_POSTER} controls playsInline preload="metadata" aria-label="Introduction video from May Anne Guevarra" /></div>
        <article className="panel">
          <h3>Hi, I'm May Anne</h3>
          <p className="role-line">AI Automation Specialist for digital marketing businesses</p>
          <p>I help you create a simpler working system for your business. I connect the tools you already use, from GoHighLevel to HubSpot, Salesforce and many more, so leads, follow-up and reporting run on their own instead of through a pile of manual steps.</p>
          <div className="list">
            <div className="li">Based in<small>Metro Manila, PH</small></div>
            <div className="li">Tools<small>GHL · HubSpot · Salesforce · more</small></div>
            <div className="li">Available for<small>Full-time &amp; contract</small></div>
          </div>
          <div className="btnrow"><button className="btn dark" onClick={() => go('work')}>See my work</button><button className="btn ghost" onClick={() => go('contact')}>Get in touch</button></div>
        </article>
      </div>
    </>
  );
}

export function WorkView({ c }: { c: Content }) {
  return (
    <>
      <ViewHead eyebrow="Recent builds" title="Selected Work" lede="Client builds across GoHighLevel, custom-coded pages and automation, with the stack used on each." />
      <div className="grid2">{c.work.map(w => (
        <article className="panel" key={w.name}>
          <p className="meta">{w.typeLabel}</p><h3>{w.name}</h3>
          <p className="meta" style={{ textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--f-body)', fontSize: 13 }}>{w.sector}</p>
          <p style={{ color: 'var(--ink)', fontWeight: 600 }}>{w.headline}</p><p>{w.description}</p><Tags items={w.tags} />
          {w.liveUrl && <a className="link" href={w.liveUrl} target="_blank" rel="noopener">Visit the live site ↗</a>}
        </article>
      ))}</div>
    </>
  );
}

function AutomationCards({ items }: { items: Automation[] }) {
  return (
    <div className="grid2">{items.map((a, i) => (
      <article className="panel" key={a.title}>
        <Zoomable imageNo={a.imageNo} caption={a.title} />
        {a.extraImageNo && <Zoomable imageNo={a.extraImageNo} caption={`${a.title} (continued)`} />}
        <span className="num">{num(i)}</span><h3>{a.title}</h3><p>{a.description}</p><Tags items={a.tags} />
      </article>
    ))}</div>
  );
}

export function WorkflowsView({ c }: { c: Content }) {
  return (
    <>
      <ViewHead eyebrow="Production workflows · GoHighLevel" title="Custom Automations" lede="Live automations I've built: call routing, follow-up cadences, lead routing and cross-platform notifications. Click any screenshot to enlarge it." />
      <AutomationCards items={c.ghlFlows} />
    </>
  );
}

export function ZapierView({ c }: { c: Content }) {
  return (
    <>
      <ViewHead eyebrow="Production Zaps · Built for a TutorEasily sub-account" title="Zapier Automations" lede="The Zapier layer that connects payments, forms, community sign-ups and bookings back to GHL, Slack, Google Sheets and Kit, so every sale and lead lands in the right place." />
      <AutomationCards items={c.zaps} />
    </>
  );
}

export function LovableView({ c }: { c: Content }) {
  return (
    <>
      <ViewHead eyebrow="Built in Lovable · 33 builds" title="Lovable Website Library" lede="Sales funnels, webinar and registration pages, pitch decks, live-training presenters, member hubs, audit tools and e-commerce stores for coaches, athletes, barbers, real estate, retail and food businesses." />
      <div className="lib">{c.library.map(l => <Zoomable key={l.imageNo} imageNo={l.imageNo} caption={l.caption} />)}</div>
      <h2 className="sec">Builds in the library</h2>
      <Chips items={c.lovableBuilds} />
    </>
  );
}

export function FunnelsView({ c }: { c: Content }) {
  return (
    <>
      <ViewHead eyebrow="Live builds" title="Sample Funnels & Landing Pages" lede="Websites, funnels and landing pages I've built and launched. Each one opens the live site in a new tab." />
      <div className="grid3">{c.sites.map(s => (
        <a className="site" key={s.url} href={s.url} target="_blank" rel="noopener">
          <span className="av">{s.name[0]}</span>
          <span style={{ minWidth: 0 }}><b>{s.name}</b><small>{s.category}</small></span>
          <span className="arr">↗</span>
        </a>
      ))}</div>
    </>
  );
}

export function ExperienceView({ c }: { c: Content }) {
  const detailed = c.experience.filter(e => e.summary);
  const earlier = c.experience.filter(e => !e.summary);
  return (
    <>
      <ViewHead eyebrow="Where I've worked" title="Experience" lede="GoHighLevel, funnels and paid acquisition work since 2022. Open a case study for the full build." />
      <div className="grid2">{detailed.map(e => (
        <article className="panel" key={e.company}>
          <p className={`meta ${e.isCurrent ? 'now' : ''}`}>{e.period}</p><h3>{e.company}</h3>
          <p style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 13.5 }}>{e.role}</p><p>{e.summary}</p><Tags items={e.tags} />
          <div className="btnrow">
            {e.caseStudyUrl && <a className="link" href={e.caseStudyUrl} target="_blank" rel="noopener">See my case study →</a>}
            {e.liveUrl && <a className="link" href={e.liveUrl} target="_blank" rel="noopener">Live site ↗</a>}
          </div>
        </article>
      ))}</div>
      <h2 className="sec">Earlier roles</h2>
      <div className="panel"><div className="tl">{earlier.map(e => {
        const [from, to] = e.period.split(' — ');
        return <div key={e.company}><span className="d">{from}<br />{to}</span><b>{e.company}</b><span>{e.role}</span></div>;
      })}</div></div>
      <h2 className="sec">Other case study</h2>
      <article className="panel">
        <p className="meta">Case study</p><h3>Other case study</h3><p>Another client build, written up in full.</p>
        <div className="btnrow"><a className="link" href="https://drive.google.com/file/d/1EnfUswlP_OETKDsfXgoya-Pw2o1JpGsT/view?usp=drive_link" target="_blank" rel="noopener">See my case study →</a></div>
      </article>
    </>
  );
}

export function ServicesView({ c }: { c: Content }) {
  return (
    <>
      <ViewHead eyebrow="What I do" title="Services & Approach" lede="AI automation for digital marketing businesses: one simpler working system across your CRM, funnels, ads and follow-up, whichever tools you run on." />
      <div className="grid3">{c.services.map((s, i) => <article className="panel" key={s.title}><span className="num">0{i + 1}</span><h3>{s.title}</h3><p>{s.description}</p></article>)}</div>
      <h2 className="sec">How I help you scale</h2>
      <div className="grid2">{c.approach.map(a => <article className="panel" key={a.title}><h3>{a.title}</h3><p>{a.description}</p><Tags items={a.tags} /></article>)}</div>
      <h2 className="sec">SEO, Meta Ads &amp; creative</h2>
      <div className="grid3">{c.ads.map(a => <article className="panel" key={a.title}><h3>{a.title}</h3><p>{a.description}</p><Tags items={a.tags} /></article>)}</div>
      <h2 className="sec">Who I build for</h2>
      <Chips items={['Med spas', 'Law firms', 'Real estate', 'Financial consulting', 'Insurance', 'Home services', 'SaaS & agencies', '…and yours']} />
    </>
  );
}

export function ToolkitView({ c }: { c: Content }) {
  return (
    <>
      <ViewHead eyebrow="What I work with" title="Toolkit & Credentials" lede="The platforms, languages and tools I use day to day." />
      <div className="grid3">{c.toolkit.map(g => <article className="panel" key={g.name}><h3>{g.name}</h3><Chips items={g.tools} /></article>)}</div>
      <h2 className="sec">Education &amp; training</h2>
      <div className="grid3">{c.credentials.map(cr => <article className="panel" key={cr.title}><p className="meta">{cr.period}</p><h3>{cr.title}</h3><p>{cr.detail}</p></article>)}</div>
    </>
  );
}

