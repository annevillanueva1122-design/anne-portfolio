import type { Site } from '../types';
import { ViewHead } from './shared';

export function FunnelsView({ sites }: { sites: Site[] }) {
  return (
    <>
      <ViewHead eyebrow="Live builds" title="Sample Funnels & Landing Pages"
        lede="Websites, funnels and landing pages I've built and launched. Each one opens the live site in a new tab." />
      <div className="grid3">
        {sites.map((s) => (
          <a className="site" key={s.url} href={s.url} target="_blank" rel="noopener">
            <span className="av">{s.name[0]}</span>
            <span style={{ minWidth: 0 }}><b>{s.name}</b><small>{s.category}</small></span>
            <span className="arr">↗</span>
          </a>
        ))}
      </div>
    </>
  );
}
