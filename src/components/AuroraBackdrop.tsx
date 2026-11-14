import BreathBloom, { type BloomParams } from './ui/breath-bloom';

/** Animated backdrop: the warm site gradient with a slow "breath bloom" glowing through it. */
const css = `
.aurora-bg{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;
background:linear-gradient(135deg,#f9b54c 0%,#f0717f 28%,#c43d9b 52%,#7b2fb5 78%,#4a1f8f 100%)}
.aurora-bg .veil{position:absolute;inset:0;background:radial-gradient(120% 90% at 50% 40%,rgba(20,8,40,0) 40%,rgba(20,8,40,.28) 100%)}

/* Frosted panels so text stays easy to read on the colourful backdrop */
.app main .view{background:rgba(250,245,243,.5);-webkit-backdrop-filter:blur(26px) saturate(1.1);backdrop-filter:blur(26px) saturate(1.1);
border:1px solid rgba(255,255,255,.55);border-radius:28px;padding:28px;box-shadow:0 20px 60px -24px rgba(40,10,70,.45)}
.app .side{background:rgba(250,245,243,.5);-webkit-backdrop-filter:blur(26px);backdrop-filter:blur(26px)}
@media (max-width:700px){.app main .view{padding:18px;border-radius:20px}}
`;

// Petals fade from deep plum at the rim to warm cream at the core. With
// "lighten" blending, the overlaps glow instead of muddying.
// Kept outside the component so the object stays the same between renders.
const BLOOM: Partial<BloomParams> = {
  background: 'linear-gradient(135deg,#f9b54c 0%,#f0717f 28%,#c43d9b 52%,#7b2fb5 78%,#4a1f8f 100%)',
  stops: ['oklch(0.32 0.12 320)', 'oklch(0.66 0.2 10)', 'oklch(0.94 0.08 75)'],
  blend: 'lighten',
  glow: 0.45,
  glowColor: 'oklch(0.95 0.08 75 / 0.4)',
  spin: 3,
  duration: 6,
};

export function AuroraBackdrop() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <style>{css}</style>
      <BreathBloom
        height="100%"
        params={BLOOM}
        interactive={false}
        guide={false}
        hint={false}
        label="Decorative background"
      />
      <div className="veil" />
    </div>
  );
}
