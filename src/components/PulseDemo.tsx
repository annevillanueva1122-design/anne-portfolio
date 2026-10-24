import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';

// Pulse: a clickable demo of the owner's app for a service-business website.
// Everything here is demo data for a fictional med spa.

type Tab = 'today' | 'leads' | 'bookings' | 'payments';
type Range = 'today' | '7d' | '30d';
type LeadStatus = 'new' | 'contacted' | 'won';

interface Lead {
  id: number;
  name: string;
  source: string;
  ago: string;
  status: LeadStatus;
  note?: string;
}

interface Booking {
  time: string;
  name: string;
  detail: string;
  next?: boolean;
}

const C = {
  bg: '#F7F6F3', ink: '#16181D', muted: '#5B6070', line: '#E6E4DF', soft: '#EFEDE9',
  green: '#1F6F5C', greenSoft: '#E2F0EC', orange: '#E8742B', orangeInk: '#A4470E', orangeSoft: '#FDEBDD',
  blueInk: '#2D4BB3', blueSoft: '#E6ECFB', white: '#FFFFFF',
};
const display = 'Manrope, var(--f-display), sans-serif';
const body = 'Inter, var(--f-body), sans-serif';

const STATS: Record<Range, { conv: string; delta: string; visitors: string; leads: string; bookings: string; revenue: string; payments: string }> = {
  today: { conv: '6.8%', delta: '+1.2 pts vs yesterday', visitors: '412', leads: '28', bookings: '9', revenue: '$1,840', payments: '4 payments' },
  '7d': { conv: '5.9%', delta: '+0.4 pts vs last week', visitors: '2,860', leads: '169', bookings: '54', revenue: '$11,420', payments: '31 payments' },
  '30d': { conv: '6.1%', delta: '+0.9 pts vs last month', visitors: '11,940', leads: '728', bookings: '231', revenue: '$24,860', payments: '80 payments' },
};

const START_LEADS: Lead[] = [
  { id: 1, name: 'Jess Tran', source: 'Instagram ad · Laser hair removal page', ago: '31m', status: 'new', note: '"How much is a package of 6 sessions for underarms?"' },
  { id: 2, name: 'Ana Lopez', source: 'Google search · Contact page', ago: '1h', status: 'new', note: '"Do you have Saturday appointments?"' },
  { id: 3, name: 'Kevin Ortiz', source: 'Facebook ad · Glow package', ago: '2h', status: 'new' },
  { id: 4, name: 'Sam Chen', source: 'Referral · Home page', ago: '3h', status: 'new' },
  { id: 5, name: 'Mia Santos', source: 'Instagram DM', ago: '4h', status: 'contacted' },
  { id: 6, name: 'Leah Park', source: 'Google search · Facials page', ago: '5h', status: 'won' },
];

const DAYS = [
  { d: 'Mon', n: 26 }, { d: 'Tue', n: 27 }, { d: 'Wed', n: 28 }, { d: 'Thu', n: 29 },
  { d: 'Fri', n: 30 }, { d: 'Sat', n: 31 }, { d: 'Sun', n: 1 },
];

const BOOKINGS: Record<number, Booking[]> = {
  27: [
    { time: '10:00', name: 'Marco Rossi', detail: 'Laser consult · 30 min · paid deposit' },
    { time: '11:30', name: 'Leah Park', detail: 'Facial · 60 min · returning client' },
    { time: '2:30', name: 'Dana Mitchell', detail: 'Free consult · Google Meet · from Instagram ad', next: true },
  ],
  28: [
    { time: '9:30', name: 'Priya Kumar', detail: 'Glow package · session 1 of 3' },
    { time: '1:00', name: 'Tom Kelly', detail: 'Laser follow-up · 20 min' },
  ],
  29: [{ time: '10:00', name: 'Marco Rossi', detail: 'Laser session · 45 min' }],
  30: [
    { time: '11:00', name: 'Jess Tran', detail: 'Free consult · from Instagram ad' },
    { time: '3:30', name: 'Ana Lopez', detail: 'Facial · 60 min · new client' },
  ],
};

const BARS = [30, 45, 38, 62, 50, 24, 18, 55, 70, 48, 66, 80, 58, 92];
const DAILY = BARS.map((b) => `$${(b * 20).toLocaleString('en-US')}`);

const card: CSSProperties = { background: C.white, border: `1px solid ${C.line}`, borderRadius: 16 };
const h1: CSSProperties = { margin: 0, color: C.ink, fontFamily: display, fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' };
const small: CSSProperties = { fontSize: 12, color: C.muted };
const pill = (on: boolean): CSSProperties => ({
  height: 34, padding: '0 14px', borderRadius: 17, cursor: 'pointer', font: `${on ? 600 : 500} 13px ${body}`,
  border: on ? 0 : `1px solid ${C.line}`, background: on ? C.ink : C.white, color: on ? C.white : C.ink,
});

function Badge({ status }: { status: LeadStatus }) {
  const s = { new: [C.orangeInk, C.orangeSoft, 'New'], contacted: [C.blueInk, C.blueSoft, 'Contacted'], won: [C.green, C.greenSoft, 'Won'] }[status];
  return <span style={{ fontSize: 11, fontWeight: 600, color: s[0], background: s[1], padding: '4px 8px', borderRadius: 10 }}>{s[2]}</span>;
}

function TodayScreen({ leads, go }: { leads: Lead[]; go: (t: Tab) => void }) {
  const [range, setRange] = useState<Range>('today');
  const s = STATS[range];
  const fresh = leads.filter((l) => l.status === 'new').length;
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div><span style={small}>Lumen Skin Studio</span><h1 style={h1}>Today</h1></div>
        <button aria-label={`${fresh} new leads`} onClick={() => go('leads')}
          style={{ width: 44, height: 44, borderRadius: 22, border: `1px solid ${C.line}`, background: C.white, display: 'grid', placeItems: 'center', position: 'relative', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
          {fresh > 0 && <span style={{ position: 'absolute', top: 6, right: 6, minWidth: 16, height: 16, borderRadius: 8, background: C.orange, color: C.white, fontSize: 10, fontWeight: 700, display: 'grid', placeItems: 'center', padding: '0 3px' }}>{fresh}</span>}
        </button>
      </div>
      <div style={{ display: 'flex', gap: 8 }} role="group" aria-label="Date range">
        {(['today', '7d', '30d'] as Range[]).map((r) => (
          <button key={r} aria-pressed={range === r} onClick={() => setRange(r)} style={pill(range === r)}>
            {r === 'today' ? 'Today' : r === '7d' ? '7 days' : '30 days'}
          </button>
        ))}
      </div>
      <div style={{ background: C.green, color: C.white, borderRadius: 20, padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 13, opacity: 0.85 }}>Website conversion</span>
          <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.16)', padding: '4px 9px', borderRadius: 12 }}>{s.delta}</span>
        </div>
        <div style={{ fontFamily: display, fontSize: 42, fontWeight: 800, letterSpacing: '-0.03em' }}>{s.conv}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
          {[[s.visitors, 'Visitors'], [s.leads, 'Leads'], [s.bookings, 'Bookings']].map(([v, l]) => (
            <div key={l}><div style={{ fontSize: 19, fontWeight: 600 }}>{v}</div><div style={{ fontSize: 12, opacity: 0.85 }}>{l}</div></div>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        <button onClick={() => go('payments')} style={{ ...card, padding: 14, textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
          <div style={small}>Revenue</div>
          <div style={{ fontFamily: display, fontSize: 22, fontWeight: 800 }}>{s.revenue}</div>
          <div style={{ fontSize: 12, color: C.green }}>{s.payments}</div>
        </button>
        <button onClick={() => go('bookings')} style={{ ...card, padding: 14, textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
          <div style={small}>Next call</div>
          <div style={{ fontFamily: display, fontSize: 22, fontWeight: 800 }}>2:30 PM</div>
          <div style={small}>Dana M. · consult</div>
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: C.ink, fontFamily: display, fontSize: 16, fontWeight: 700 }}>Live activity</h2>
        <button onClick={() => go('leads')} style={{ border: 0, background: 'none', color: C.green, font: `600 13px ${body}`, cursor: 'pointer' }}>See all</button>
      </div>
      <div style={card}>
        {[
          ['$', C.orangeSoft, C.orangeInk, 'Payment · $450 deposit', 'Priya K. · Glow package', '2m'],
          ['BK', C.greenSoft, C.green, 'New booking · Thu 10:00 AM', 'Marco R. · laser consult', '14m'],
          ['LD', C.blueSoft, C.blueInk, 'New lead · Instagram ad', 'Jess T. · asked about pricing', '31m'],
        ].map(([ic, bg, fg, t, sub, ago], i) => (
          <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '11px 14px', borderTop: i ? `1px solid ${C.soft}` : 0 }}>
            <span style={{ width: 32, height: 32, borderRadius: 16, background: bg, color: fg, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600, flex: 'none' }}>{ic}</span>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 13.5, fontWeight: 600 }}>{t}</div><div style={small}>{sub}</div></div>
            <span style={small}>{ago}</span>
          </div>
        ))}
      </div>
    </>
  );
}

function LeadsScreen({ leads, setLeads, toast }: { leads: Lead[]; setLeads: (l: Lead[]) => void; toast: (m: string) => void }) {
  const [filter, setFilter] = useState<LeadStatus>('new');
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<number | null>(1);
  const count = (s: LeadStatus) => leads.filter((l) => l.status === s).length;
  const shown = leads.filter((l) => l.status === filter && `${l.name} ${l.source}`.toLowerCase().includes(query.toLowerCase()));
  const act = (l: Lead, how: string) => {
    toast(`${how} ${l.name.split(' ')[0]} · marked as contacted`);
    setLeads(leads.map((x) => (x.id === l.id && x.status === 'new' ? { ...x, status: 'contacted' } : x)));
  };
  return (
    <>
      <div><span style={small}>{leads.length} today · {count('new')} not contacted</span><h1 style={h1}>Leads</h1></div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 14px', ...card, borderRadius: 14 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
        <input aria-label="Search leads" placeholder="Search name or source" value={query} onChange={(e) => setQuery(e.target.value)}
          style={{ flex: 1, minWidth: 0, border: 0, outline: 0, background: 'transparent', font: `14px ${body}`, color: C.ink }} />
      </label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }} role="group" aria-label="Lead status">
        {(['new', 'contacted', 'won'] as LeadStatus[]).map((s) => (
          <button key={s} aria-pressed={filter === s} onClick={() => setFilter(s)} style={pill(filter === s)}>
            {s[0].toUpperCase() + s.slice(1)} · {count(s)}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.length === 0 && <div style={{ ...card, padding: 16, ...small, textAlign: 'center' }}>No leads here. Nice work.</div>}
        {shown.map((l) => (
          <div key={l.id} style={{ ...card, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button onClick={() => setOpen(open === l.id ? null : l.id)} aria-expanded={open === l.id}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, border: 0, background: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
              <span><span style={{ display: 'block', fontSize: 15, fontWeight: 600 }}>{l.name}</span><span style={small}>{l.source} · {l.ago}</span></span>
              <Badge status={l.status} />
            </button>
            {open === l.id && (
              <>
                {l.note && <p style={{ margin: 0, fontSize: 13, color: '#3E4250' }}>{l.note}</p>}
                {l.status === 'new' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
                    {['Call', 'Text', 'Email'].map((how, i) => (
                      <button key={how} onClick={() => act(l, how === 'Call' ? 'Calling' : how === 'Text' ? 'Texting' : 'Emailing')}
                        style={{ height: 40, borderRadius: 12, cursor: 'pointer', font: `600 13px ${body}`, border: i ? `1px solid ${C.line}` : 0, background: i ? C.white : C.green, color: i ? C.ink : C.white }}>{how}</button>
                    ))}
                  </div>
                ) : l.status === 'contacted' ? (
                  <button onClick={() => { setLeads(leads.map((x) => (x.id === l.id ? { ...x, status: 'won' } : x))); toast(`${l.name.split(' ')[0]} booked · moved to Won`); }}
                    style={{ height: 40, borderRadius: 12, border: 0, background: C.green, color: C.white, font: `600 13px ${body}`, cursor: 'pointer' }}>Mark as booked</button>
                ) : null}
              </>
            )}
          </div>
        ))}
      </div>
      <div style={{ ...card, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Where today's leads came from</span>
        <div style={{ display: 'flex', height: 10, borderRadius: 5, overflow: 'hidden', gap: 2 }}>
          <span style={{ flex: 12, background: C.green }} /><span style={{ flex: 8, background: '#6FA898' }} /><span style={{ flex: 5, background: C.orange }} /><span style={{ flex: 3, background: '#C9C6BF' }} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 12, color: '#3E4250' }}><span>Instagram 12</span><span>Google 8</span><span>Facebook 5</span><span>Referral 3</span></div>
      </div>
    </>
  );
}

function BookingsScreen({ toast }: { toast: (m: string) => void }) {
  const [day, setDay] = useState(27);
  const list = BOOKINGS[day] ?? [];
  return (
    <>
      <div><span style={small}>9 booked today · 1 no-show this week</span><h1 style={h1}>Bookings</h1></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 5 }} role="group" aria-label="Day">
        {DAYS.map(({ d, n }) => (
          <button key={n} aria-pressed={day === n} onClick={() => setDay(n)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 0', borderRadius: 14, cursor: 'pointer', font: `500 11px ${body}`, border: day === n ? 0 : `1px solid ${C.line}`, background: day === n ? C.ink : C.white, color: day === n ? C.white : C.muted }}>
            {d}<span style={{ fontSize: 15, fontWeight: 600, color: day === n ? C.white : C.ink }}>{n}</span>
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map((b) => (
          <div key={b.time + b.name} style={{ display: 'flex', gap: 12 }}>
            <span style={{ width: 44, flex: 'none', fontSize: 13, paddingTop: 13, color: b.next ? C.green : C.muted, fontWeight: b.next ? 600 : 400 }}>{b.time}</span>
            <div style={{ flex: 1, minWidth: 0, borderRadius: 16, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 4, background: b.next ? C.greenSoft : C.white, border: b.next ? `2px solid ${C.green}` : `1px solid ${C.line}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{b.name}</span>
                {b.next && <span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>Next · in 40 min</span>}
              </div>
              <span style={small}>{b.detail}</span>
              {b.next && (
                <button onClick={() => toast('Opening Google Meet (demo)')}
                  style={{ alignSelf: 'flex-start', height: 36, padding: '0 14px', marginTop: 4, borderRadius: 12, border: 0, background: C.green, color: C.white, font: `600 13px ${body}`, cursor: 'pointer' }}>Join Meet</button>
              )}
            </div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ width: 44, flex: 'none', fontSize: 13, paddingTop: 13, color: C.muted }}>4:00</span>
          <button onClick={() => toast('Booking link copied (demo)')}
            style={{ flex: 1, borderRadius: 16, padding: '12px 14px', textAlign: 'left', cursor: 'pointer', background: C.white, border: '1px dashed #C9C6BF', font: 'inherit', color: C.muted }}>
            <span style={{ display: 'block', fontSize: 15, fontWeight: 600 }}>Open slot</span><span style={{ fontSize: 12 }}>Tap to share booking link</span>
          </button>
        </div>
      </div>
      <div style={{ ...card, padding: 14, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
        {[['38', 'Booked this week'], ['92%', 'Show-up rate'], ['32%', 'Lead to booking']].map(([v, l]) => (
          <div key={l}><div style={{ fontFamily: display, fontSize: 20, fontWeight: 800 }}>{v}</div><div style={small}>{l}</div></div>
        ))}
      </div>
    </>
  );
}

function PaymentsScreen() {
  const [bar, setBar] = useState(BARS.length - 1);
  const label = bar === BARS.length - 1 ? 'Today' : `${BARS.length - 1 - bar} day${BARS.length - 1 - bar > 1 ? 's' : ''} ago`;
  return (
    <>
      <div><span style={small}>October · via Stripe</span><h1 style={h1}>Payments</h1></div>
      <div style={{ background: C.ink, color: C.white, borderRadius: 20, padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontSize: 13, opacity: 0.8 }}>Collected this month</span>
        <span style={{ fontFamily: display, fontSize: 38, fontWeight: 800, letterSpacing: '-0.03em' }}>$24,860</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 64 }} role="group" aria-label="Daily revenue, last 14 days">
          {BARS.map((h, i) => (
            <button key={i} aria-label={`Day ${i + 1}: ${DAILY[i]}`} aria-pressed={bar === i} onClick={() => setBar(i)}
              style={{ flex: 1, height: `${h}%`, padding: 0, border: 0, borderRadius: 4, cursor: 'pointer', background: bar === i ? '#7FD1B9' : 'rgba(255,255,255,0.28)' }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.85 }}><span>{label} {DAILY[bar]}</span><span>Avg order $310</span></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        {[['Deposits', '$6,300', '14 bookings'], ['Packages', '$18,560', '31 sold']].map(([t, v, s]) => (
          <div key={t} style={{ ...card, padding: 14 }}><div style={small}>{t}</div><div style={{ fontFamily: display, fontSize: 21, fontWeight: 800 }}>{v}</div><div style={small}>{s}</div></div>
        ))}
      </div>
      <h2 style={{ margin: 0, color: C.ink, fontFamily: display, fontSize: 16, fontWeight: 700 }}>Recent</h2>
      <div style={card}>
        {[['Priya K.', 'Glow package deposit · 2m', '$450'], ['Marco R.', 'Consult deposit · 14m', '$50'], ['Leah P.', '6-session laser package · 1h', '$1,200'], ['Tom K.', 'Payment failed · card declined', '$140']].map(([n, d, a], i) => (
          <div key={n} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px', borderTop: i ? `1px solid ${C.soft}` : 0 }}>
            <div><div style={{ fontSize: 14, fontWeight: 600 }}>{n}</div><div style={{ fontSize: 12, color: d.startsWith('Payment failed') ? C.orangeInk : C.muted }}>{d}</div></div>
            <span style={{ fontSize: 14, fontWeight: 600, color: d.startsWith('Payment failed') ? C.muted : C.ink }}>{a}</span>
          </div>
        ))}
      </div>
    </>
  );
}

const TABS: [Tab, string, ReactNode][] = [
  ['today', 'Today', <path d="M3 12h4l3-8 4 16 3-8h4" />],
  ['leads', 'Leads', <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0" /><path d="M17 11h5M19.5 8.5v5" /></>],
  ['bookings', 'Bookings', <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>],
  ['payments', 'Payments', <><rect x="2" y="6" width="20" height="13" rx="2" /><path d="M2 10h20M6 15h4" /></>],
];

/** The Pulse app in a phone frame, fully clickable */
export function PulseDemo() {
  const [tab, setTab] = useState<Tab>('today');
  const [leads, setLeads] = useState<Lead[]>(START_LEADS);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(() => setMsg(null), 2200);
    return () => clearTimeout(t);
  }, [msg]);

  return (
    <div style={{ width: '100%', maxWidth: 360, margin: '0 auto', borderRadius: 40, border: `8px solid ${C.ink}`, overflow: 'hidden', boxShadow: '0 30px 60px -24px rgba(22,24,29,.4)', background: C.bg }}>
      <div style={{ height: 680, display: 'flex', flexDirection: 'column', position: 'relative', color: C.ink, fontFamily: body, textAlign: 'left' }}>
        <div key={tab} style={{ flex: 1, overflowY: 'auto', padding: '24px 18px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {tab === 'today' && <TodayScreen leads={leads} go={setTab} />}
          {tab === 'leads' && <LeadsScreen leads={leads} setLeads={setLeads} toast={setMsg} />}
          {tab === 'bookings' && <BookingsScreen toast={setMsg} />}
          {tab === 'payments' && <PaymentsScreen />}
        </div>
        {msg && (
          <div role="status" style={{ position: 'absolute', left: 16, right: 16, bottom: 92, background: C.ink, color: C.white, borderRadius: 14, padding: '11px 14px', fontSize: 13, fontWeight: 500 }}>{msg}</div>
        )}
        <nav aria-label="Pulse app" style={{ height: 76, flex: 'none', padding: '8px 10px 14px', background: C.white, borderTop: `1px solid ${C.line}`, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>
          {TABS.map(([key, label, icon]) => (
            <button key={key} aria-current={tab === key ? 'page' : undefined} onClick={() => setTab(key)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, border: 0, background: 'none', cursor: 'pointer', font: `${tab === key ? 600 : 500} 11px ${body}`, color: tab === key ? C.green : C.muted }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
