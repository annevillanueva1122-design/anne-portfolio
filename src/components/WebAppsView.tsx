import type { WebBuild } from '../types';
import { media } from '../config';
import { ExternalLink, Tags, ViewHead, useActions } from './shared';
import { PulseDemo } from './PulseDemo';

// Built-in interactive demos a build can show instead of a screenshot (web_builds.demo)
const DEMOS = { pulse: PulseDemo } as const;

/** Image that opens in the lightbox */
function Cover({ image, caption }: { image: string; caption: string }) {
  const { zoom } = useActions();
  const src = media(image);
  return (
    <div className="shot" role="button" tabIndex={0} aria-label={`Enlarge: ${caption}`} style={{ aspectRatio: '16 / 9' }}
      onClick={() => zoom(src, caption)}
      onKeyDown={(e) => { if (e.key === 'Enter') zoom(src, caption); }}>
      <img src={src} alt={caption} loading="lazy" />
    </div>
  );
}

export function WebAppsView({ items }: { items: WebBuild[] }) {
  return (
    <>
      <ViewHead eyebrow="Front-end & product builds" title="Web App Builds"
        lede="Standalone builds outside the CRM: a coded website and a clickable mobile app concept." />
      <div className="grid2">
        {items.map((b) => {
          const Demo = b.demo ? DEMOS[b.demo] : undefined;
          return (
            <article className="panel" key={b.name}>
              {Demo ? <Demo /> : b.coverImage && <Cover image={b.coverImage} caption={b.coverCaption ?? b.name} />}
              <p className="meta">{b.kind}</p>
              <h3>{b.name}</h3>
              <p style={{ color: 'var(--ink)', fontWeight: 600 }}>{b.headline}</p>
              <p>{b.description}</p>
              <Tags items={b.tags} />
              {b.liveUrl && <ExternalLink className="link" href={b.liveUrl}>Visit the live site ↗</ExternalLink>}
            </article>
          );
        })}
      </div>
    </>
  );
}
