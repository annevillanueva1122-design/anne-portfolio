import type { Experience } from '../types';
import { config } from '../config';
import { ExternalLink, Tags, ViewHead } from './shared';

export function ExperienceView({ items }: { items: Experience[] }) {
  const featured = items.filter((e) => e.summary);
  const earlier = items.filter((e) => !e.summary);
  return (
    <>
      <ViewHead eyebrow="Where I've worked" title="Experience"
        lede="GoHighLevel, funnels and paid acquisition work since 2022. Open a case study for the full build." />
      <div className="grid2">
        {featured.map((e) => (
          <article className="panel" key={e.company}>
            <p className={`meta ${e.isCurrent ? 'now' : ''}`}>{e.period}</p>
            <h3>{e.company}</h3>
            <p style={{ color: 'var(--ink)', fontWeight: 600, fontSize: 13.5 }}>{e.role}</p>
            <p>{e.summary}</p>
            <Tags items={e.tags} />
            <div className="btnrow">
              {e.caseStudyUrl && <ExternalLink className="link" href={e.caseStudyUrl}>See my case study →</ExternalLink>}
              {e.liveUrl && <ExternalLink className="link" href={e.liveUrl}>Live site ↗</ExternalLink>}
            </div>
          </article>
        ))}
      </div>
      <h2 className="sec">Earlier roles</h2>
      <div className="panel"><div className="tl">
        {earlier.map((e) => {
          const [from, to] = e.period.split(' — ');
          return <div key={e.company}><span className="d">{from}<br />{to}</span><b>{e.company}</b><span>{e.role}</span></div>;
        })}
      </div></div>
      <h2 className="sec">Other case study</h2>
      <article className="panel">
        <p className="meta">Case study</p>
        <h3>Other case study</h3>
        <p>Another client build, written up in full.</p>
        <div className="btnrow"><ExternalLink className="link" href={config.otherCaseStudyUrl}>See my case study →</ExternalLink></div>
      </article>
    </>
  );
}
