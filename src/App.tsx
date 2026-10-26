import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Content, ViewKey } from './types';
import { fallbackContent } from './data/fallback';
import { loadContent, withFallback } from './lib/content';
import { supabase } from './lib/supabase';
import { ActionsContext, type AppActions } from './components/shared';
import { NAV, Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { IntroView } from './components/IntroView';
import { WorkView } from './components/WorkView';
import { AutomationsView } from './components/AutomationsView';
import { LovableView } from './components/LovableView';
import { FunnelsView } from './components/FunnelsView';
import { ExperienceView } from './components/ExperienceView';
import { ServicesView } from './components/ServicesView';
import { ToolkitView } from './components/ToolkitView';
import { ContactView } from './components/ContactView';
import { WebAppsView } from './components/WebAppsView';
import { N8nView } from './components/N8nView';
import { BookingModal, Lightbox, type Zoom } from './components/Overlays';
import { Confetti, useTapSound } from './components/Effects';
import { AuroraBackdrop } from './components/AuroraBackdrop';

const VIEWS = new Set<ViewKey>(NAV.map(([k]) => k));
const viewFromHash = (): ViewKey => {
  const k = location.hash.slice(1) as ViewKey;
  return VIEWS.has(k) ? k : 'home';
};

export function App() {
  const [view, setView] = useState<ViewKey>(viewFromHash);
  const [content, setContent] = useState<Content>(fallbackContent);
  const [source, setSource] = useState<'fallback' | 'supabase'>('fallback');
  const [zoom, setZoom] = useState<Zoom | null>(null);
  const [booking, setBooking] = useState(false);
  useTapSound();

  // Content: show the built-in copy at once, then swap in Supabase data when it arrives
  useEffect(() => {
    let alive = true;
    loadContent(supabase)
      .then((c) => { if (alive) { setContent(withFallback(c, fallbackContent)); setSource('supabase'); } })
      .catch((e) => console.warn('Supabase content not loaded, using built-in content.', e));
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const onHash = () => setView(viewFromHash());
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setZoom(null); setBooking(false); } };
    addEventListener('hashchange', onHash);
    addEventListener('keydown', onKey);
    return () => { removeEventListener('hashchange', onHash); removeEventListener('keydown', onKey); };
  }, []);

  const go = useCallback((k: ViewKey) => {
    setView(k);
    history.replaceState(null, '', k === 'home' ? location.pathname : `#${k}`);
    scrollTo({ top: 0 });
  }, []);

  const actions = useMemo<AppActions>(() => ({
    go,
    zoom: (src, caption) => setZoom({ src, caption }),
    openBooking: () => setBooking(true),
  }), [go]);

  const page = (() => {
    switch (view) {
      case 'home': return <HomeView c={content} />;
      case 'intro': return <IntroView />;
      case 'work': return <WorkView items={content.work} />;
      case 'workflows': return <AutomationsView items={content.automations} platform="ghl" />;
      case 'zapier': return <AutomationsView items={content.automations} platform="zapier" />;
      case 'lovable': return <LovableView library={content.library} builds={content.lovableBuilds} />;
      case 'funnels': return <FunnelsView sites={content.sites} />;
      case 'experience': return <ExperienceView items={content.experiences} />;
      case 'services': return <ServicesView items={content.services} />;
      case 'toolkit': return <ToolkitView toolkit={content.toolkit} credentials={content.credentials} />;
      case 'contact': return <ContactView />;
      case 'webapps': return <WebAppsView items={content.webBuilds} />;
      case 'n8n': return <N8nView />;
    }
  })();

  return (
    <ActionsContext.Provider value={actions}>
      <AuroraBackdrop />
      <div className="app">
        <Sidebar current={view} />
        <main id="main" data-content-source={source}><div className="view" key={view}>{page}</div></main>
      </div>
      <Lightbox zoom={zoom} onClose={() => setZoom(null)} />
      <BookingModal open={booking} onClose={() => setBooking(false)} />
      <Confetti />
    </ActionsContext.Provider>
  );
}
