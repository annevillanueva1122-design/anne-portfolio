import { createContext, useContext } from 'react';
import type { ViewKey } from '../types';
import { media } from '../config';
import { Icon, type IconName } from './Icon';

/** App-wide actions any section can trigger */
export interface AppActions {
  go: (view: ViewKey) => void;
  zoom: (src: string, caption: string) => void;
  openBooking: () => void;
}

export const ActionsContext = createContext<AppActions | null>(null);

export function useActions(): AppActions {
  const ctx = useContext(ActionsContext);
  if (!ctx) throw new Error('useActions must be used inside ActionsContext');
  return ctx;
}

export function Tags({ items }: { items: string[] }) {
  if (!items.length) return null;
  return <div className="tags">{items.map((t) => <span key={t} className="tag">{t}</span>)}</div>;
}

/** Header row of a dashboard card */
export function CardHead({ icon, title, sub, arrow = true }: { icon: IconName; title: string; sub: string; arrow?: boolean }) {
  return (
    <div className="ch">
      <div className="ic"><Icon name={icon} /></div>
      <div><h2>{title}</h2><p>{sub}</p></div>
      {arrow && <span className="go"><Icon name="arrow" /></span>}
    </div>
  );
}

/** Top of every detail view: back button, eyebrow, title, lede */
export function ViewHead({ eyebrow, title, lede }: { eyebrow: string; title: string; lede: string }) {
  const { go } = useActions();
  return (
    <>
      <div className="view-head">
        <button className="back" onClick={() => go('home')}><Icon name="left" /> Dashboard</button>
      </div>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="lede">{lede}</p>
    </>
  );
}

/** Screenshot that opens in the lightbox */
export function Zoomable({ image, caption }: { image: string; caption: string }) {
  const { zoom } = useActions();
  const src = media(image);
  return (
    <div className="shot" role="button" tabIndex={0} aria-label={`Enlarge: ${caption}`}
      onClick={() => zoom(src, caption)}
      onKeyDown={(e) => { if (e.key === 'Enter') zoom(src, caption); }}>
      <img src={src} alt={caption} loading="lazy" />
    </div>
  );
}

export const ExternalLink = ({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) => (
  <a className={className} href={href} target="_blank" rel="noopener">{children}</a>
);
