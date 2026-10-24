import type { LibraryItem } from '../types';
import { ViewHead, Zoomable } from './shared';

export function LovableView({ library, builds }: { library: LibraryItem[]; builds: string[] }) {
  return (
    <>
      <ViewHead eyebrow={`Built in Lovable · 33 builds`} title="Lovable Website Library"
        lede="Sales funnels, webinar and registration pages, pitch decks, live-training presenters, member hubs, audit tools and e-commerce stores for coaches, athletes, barbers, real estate, retail and food businesses." />
      <div className="lib">{library.map((l) => <Zoomable key={l.image} image={l.image} caption={l.caption} />)}</div>
      <h2 className="sec">Builds in the library</h2>
      <div className="chips">{builds.map((n) => <span key={n}>{n}</span>)}</div>
    </>
  );
}
