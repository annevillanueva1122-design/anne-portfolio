import type { ServiceItem } from '../types';
import { Tags, ViewHead } from './shared';

const AUDIENCES = ['Med spas', 'Law firms', 'Real estate', 'Financial consulting', 'Insurance', 'Home services', 'SaaS & agencies', '…and yours'];

export function ServicesView({ items }: { items: ServiceItem[] }) {
  const of = (section: ServiceItem['section']) => items.filter((s) => s.section === section);
  return (
    <>
      <ViewHead eyebrow="What I do" title="Services & Approach"
        lede="AI automation for digital marketing businesses: one simpler working system across your CRM, funnels, ads and follow-up, whichever tools you run on." />
      <div className="grid3">{of('service').map((s, i) => (
        <article className="panel" key={s.title}><span className="num">0{i + 1}</span><h3>{s.title}</h3><p>{s.body}</p></article>
      ))}</div>
      <h2 className="sec">How I help you scale</h2>
      <div className="grid2">{of('approach').map((s) => (
        <article className="panel" key={s.title}><h3>{s.title}</h3><p>{s.body}</p><Tags items={s.tags} /></article>
      ))}</div>
      <h2 className="sec">SEO, Meta Ads &amp; creative</h2>
      <div className="grid3">{of('ads').map((s) => (
        <article className="panel" key={s.title}><h3>{s.title}</h3><p>{s.body}</p><Tags items={s.tags} /></article>
      ))}</div>
      <h2 className="sec">Who I build for</h2>
      <div className="chips">{AUDIENCES.map((n) => <span key={n}>{n}</span>)}</div>
    </>
  );
}
