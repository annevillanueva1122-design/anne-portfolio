import type { WorkItem } from '../types';
import { ExternalLink, Tags, ViewHead } from './shared';

export function WorkView({ items }: { items: WorkItem[] }) {
  return (
    <>
      <ViewHead eyebrow="Recent builds" title="Selected Work"
        lede="Client builds across GoHighLevel, custom-coded pages and automation, with the stack used on each." />
      <div className="grid2">
        {items.map((w) => (
          <article className="panel" key={w.client}>
            <p className="meta">{w.category}</p>
            <h3>{w.client}</h3>
            <p className="meta" style={{ textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--f-body)', fontSize: 13 }}>{w.subtitle}</p>
            <p style={{ color: 'var(--ink)', fontWeight: 600 }}>{w.headline}</p>
            <p>{w.description}</p>
            <Tags items={w.tags} />
            {w.liveUrl && <ExternalLink className="link" href={w.liveUrl}>Visit the live site ↗</ExternalLink>}
          </article>
        ))}
      </div>
    </>
  );
}
