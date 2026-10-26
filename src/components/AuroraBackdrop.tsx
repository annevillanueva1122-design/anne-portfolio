/** Animated abstract backdrop: warm gradient, orbs, rings, arcs and dot grids drifting slowly. */
const css = `
.aurora-bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;
  background:linear-gradient(135deg,#f9b54c 0%,#f0717f 28%,#c43d9b 52%,#7b2fb5 78%,#4a1f8f 100%);
  background-size:220% 220%;animation:ab-shift 40s ease-in-out infinite alternate}
.aurora-bg svg{position:absolute;inset:0;width:100%;height:100%}
.aurora-bg .veil{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 40%,rgba(20,8,40,0) 40%,rgba(20,8,40,.28) 100%)}
.aurora-bg g{transform-box:fill-box;transform-origin:center}
.ab-drift-a{animation:ab-drift-a 46s ease-in-out infinite alternate}
.ab-drift-b{animation:ab-drift-b 58s ease-in-out infinite alternate}
.ab-drift-c{animation:ab-drift-c 52s ease-in-out infinite alternate}
.ab-spin{animation:ab-spin 90s linear infinite}
.ab-spin-rev{animation:ab-spin 120s linear infinite reverse}
.ab-breathe{animation:ab-breathe 18s ease-in-out infinite alternate}
@keyframes ab-shift{0%{background-position:0% 0%}100%{background-position:100% 100%}}
@keyframes ab-drift-a{0%{transform:translate(0,0)}100%{transform:translate(60px,-40px)}}
@keyframes ab-drift-b{0%{transform:translate(0,0)}100%{transform:translate(-70px,50px)}}
@keyframes ab-drift-c{0%{transform:translate(0,0) scale(1)}100%{transform:translate(40px,60px) scale(1.06)}}
@keyframes ab-spin{to{transform:rotate(360deg)}}
@keyframes ab-breathe{0%{transform:scale(1)}100%{transform:scale(1.08)}}
@media (prefers-reduced-motion:reduce){.aurora-bg,.aurora-bg g{animation:none!important}}

/* Frosted panels so text stays easy to read on the colourful backdrop */
.app main .view{background:rgba(250,245,243,.86);-webkit-backdrop-filter:blur(18px) saturate(1.2);backdrop-filter:blur(18px) saturate(1.2);
  border:1px solid rgba(255,255,255,.55);border-radius:28px;padding:28px;box-shadow:0 20px 60px -24px rgba(40,10,70,.45)}
.app .side{background:rgba(250,245,243,.82)}
@media (max-width:700px){.app main .view{padding:18px;border-radius:20px}}
`;

export function AuroraBackdrop() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <style>{css}</style>
      <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ab-pink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff6a8d" /><stop offset=".55" stopColor="#c93a9e" /><stop offset="1" stopColor="#5a1fa3" />
          </linearGradient>
          <linearGradient id="ab-peach" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffc46b" /><stop offset="1" stopColor="#f2607e" />
          </linearGradient>
          <linearGradient id="ab-sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd27a" /><stop offset="1" stopColor="#f58a5c" />
          </linearGradient>
          <pattern id="ab-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="2.4" fill="#fff" opacity=".75" />
          </pattern>
        </defs>

        {/* big pink-to-violet disc, left */}
        <g className="ab-drift-a">
          <circle cx="170" cy="330" r="430" fill="url(#ab-pink)" opacity=".95" />
          <path d="M-60 120 A 330 330 0 0 1 560 260" fill="none" stroke="#ffcf7a" strokeWidth="3" opacity=".7" />
        </g>

        {/* warm top glow */}
        <g className="ab-breathe"><circle cx="760" cy="-60" r="240" fill="url(#ab-sun)" opacity=".55" /></g>

        {/* peach orb */}
        <g className="ab-drift-b"><circle cx="420" cy="230" r="78" fill="url(#ab-peach)" /></g>

        {/* dark donut */}
        <g className="ab-drift-c"><circle cx="560" cy="560" r="86" fill="none" stroke="#3a0f6e" strokeWidth="56" opacity=".42" /></g>

        {/* concentric rings, right top (rotating dashed so motion reads) */}
        <g className="ab-spin">
          {[300, 255, 210, 165, 120].map((r) => (
            <circle key={r} cx="1560" cy="300" r={r} fill="none" stroke="#ff7aa8" strokeWidth="16" strokeDasharray={`${r * 3.2} ${r * 1.2}`} opacity=".55" />
          ))}
        </g>

        {/* big concentric rings, bottom right */}
        <g className="ab-drift-a">
          <circle cx="1260" cy="790" r="300" fill="url(#ab-peach)" opacity=".9" />
          <g className="ab-spin-rev">
            {[250, 210, 170, 130, 90].map((r) => (
              <circle key={r} cx="1260" cy="790" r={r} fill="none" stroke="#6a1a9a" strokeWidth="11" strokeDasharray={`${r * 5.4} ${r * 0.9}`} />
            ))}
          </g>
          <circle cx="1260" cy="790" r="58" fill="#6a1a9a" />
        </g>

        {/* bottom-left warm disc with ring */}
        <g className="ab-drift-b">
          <circle cx="90" cy="960" r="280" fill="url(#ab-peach)" opacity=".85" />
          <circle cx="90" cy="960" r="190" fill="none" stroke="#c93a9e" strokeWidth="26" opacity=".7" />
        </g>

        {/* thin golden arcs */}
        <g className="ab-spin-rev"><path d="M1080 120 A 260 260 0 0 1 1300 520" fill="none" stroke="#ffcf7a" strokeWidth="3" opacity=".75" /></g>
        <g className="ab-spin"><path d="M300 860 A 120 120 0 0 1 520 900" fill="none" stroke="#ffcf7a" strokeWidth="3" opacity=".75" /></g>

        {/* dot grids */}
        <g className="ab-drift-c"><rect x="1240" y="20" width="200" height="200" fill="url(#ab-dots)" /></g>
        <g className="ab-drift-b"><rect x="20" y="560" width="230" height="150" fill="url(#ab-dots)" /></g>
        <g className="ab-drift-a"><rect x="760" y="860" width="260" height="110" fill="url(#ab-dots)" /></g>
      </svg>
      <div className="veil" />
    </div>
  );
}
