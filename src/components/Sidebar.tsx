import type { ViewKey } from '../types';
import { media } from '../config';
import { Icon, type IconName } from './Icon';
import { useActions } from './shared';

export const NAV: [ViewKey, string, IconName][] = [
  ['home', 'Home', 'home'], ['intro', 'Intro Video', 'play'], ['work', 'Selected Work', 'work'],
  ['workflows', 'GHL Workflows', 'flow'], ['zapier', 'Zapier Builds', 'zap'], ['lovable', 'Lovable Library', 'layers'],
  ['funnels', 'Live Funnels', 'globe'], ['experience', 'Experience', 'brief'], ['services', 'Services', 'spark'],
  ['toolkit', 'Toolkit', 'tools'], ['contact', 'Contact', 'mail'],
];

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/may-guevarra-b3787a165/',
    icon: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.6 8.65 22 11.2 22 14.4V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.5-2.25 3.1V21h-4z" /> },
  { label: 'Instagram', href: 'https://www.instagram.com/mrs.yham.gab/',
    icon: <><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.3" /></> },
  { label: 'Facebook', href: 'https://www.facebook.com/mhaye.guevarra/',
    icon: <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v7h4v-7H17l.6-4h-4.1V8.9c0-.6.3-.9 1-.9z" /> },
  { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~018aaba6a874ea4546',
    icon: <path d="M18.56 13.16c-1.1 0-2.13-.47-3.07-1.23l.23-1.08.01-.04c.2-1.14.85-3.06 2.84-3.06a2.7 2.7 0 0 1 0 5.41zm0-8.14c-2.54 0-4.51 1.65-5.31 4.37-1.22-1.84-2.15-4.04-2.69-5.9H7.83v7.11a2.55 2.55 0 0 1-5.1 0V3.49H0v7.11a5.29 5.29 0 0 0 5.28 5.3 5.29 5.29 0 0 0 5.28-5.3v-1.19c.53 1.11 1.18 2.23 1.98 3.22l-1.68 7.88h2.8l1.21-5.71c1.06.68 2.29 1.11 3.69 1.11a5.45 5.45 0 0 0 0-10.89z" /> },
];

export function Sidebar({ current }: { current: ViewKey }) {
  const { go } = useActions();
  return (
    <aside className="side">
      <div className="me">
        <span className="glow"><img src={media('img-01.jpg')} alt="May Anne Guevarra" /></span>
        <div>
          <div className="name">May Anne Guevarra{' '}
            <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Verified"><path fill="var(--accent)" d="M12 1l2.6 2.2 3.4-.4 1 3.3 3 1.6-1.2 3.3 1.2 3.3-3 1.6-1 3.3-3.4-.4L12 23l-2.6-2.2-3.4.4-1-3.3-3-1.6L3.2 11 2 7.7l3-1.6 1-3.3 3.4.4z" /><path d="M8 12.2l2.6 2.6L16.2 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="role">AI Automation Specialist for digital marketing businesses</div>
        </div>
        <span className="avail">Open to new projects</span>
        <div className="socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{s.icon}</svg>
            </a>
          ))}
        </div>
      </div>
      <nav className="menu" aria-label="Sections">
        {NAV.map(([key, label, icon]) => (
          <button key={key} aria-current={key === current} onClick={() => go(key)}>
            <Icon name={icon} />{label}
          </button>
        ))}
      </nav>
      <div className="foot">Metro Manila, PH · Working worldwide</div>
    </aside>
  );
}
