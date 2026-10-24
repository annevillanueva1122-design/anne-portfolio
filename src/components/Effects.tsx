import { useEffect, useRef } from 'react';

/** Diagonal pills and soft orbs drifting behind the dashboard */
export function BackgroundFx() {
  const pills: [string, string, string, string, string, string, string?][] = [
    ['--pill-a', '72%', '-4%', '520px', '70px', '28s'], ['--pill-b', '80%', '8%', '420px', '60px', '22s', '-6s'],
    ['--pill-c', '86%', '20%', '480px', '66px', '32s', '-12s'], ['--pill-a', '90%', '38%', '380px', '58px', '25s', '-3s'],
    ['--pill-c', '-14%', '62%', '440px', '64px', '30s', '-9s'], ['--pill-a', '-8%', '78%', '520px', '70px', '24s', '-15s'],
    ['--pill-b', '10%', '94%', '360px', '58px', '27s', '-4s'], ['--pill-b', '45%', '104%', '420px', '60px', '34s', '-20s'],
  ];
  const orbs: [string, string, string, string, string?][] = [
    ['76%', '-2%', '34px', '12s'], ['95%', '30%', '40px', '16s', '-5s'], ['8%', '86%', '44px', '14s', '-8s'],
  ];
  return (
    <div className="bgfx" aria-hidden="true">
      {pills.map(([c, left, top, w, h, t, d], i) => (
        <span key={i} className="p" style={{ left, top, ['--c1' as string]: `var(${c})`, ['--w' as string]: w, ['--h' as string]: h, ['--t' as string]: t, ['--d' as string]: d ?? '0s' }} />
      ))}
      {orbs.map(([left, top, s, t, d], i) => (
        <i key={i} className="o" style={{ left, top, ['--s' as string]: s, ['--t' as string]: t, ['--d' as string]: d ?? '0s' }} />
      ))}
    </div>
  );
}

/** Confetti burst wherever you click or tap (off for reduced motion) */
export function Confetti() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const cv = ref.current!, cx = cv.getContext('2d');
    if (!cx) return;
    const COLORS = ['#df6e54', '#f4a259', '#7b6cf6', '#2d2660', '#5fcf9a', '#f7c8d6'];
    type Bit = { x: number; y: number; vx: number; vy: number; r: number; vr: number; w: number; h: number; c: string; life: number; round: boolean };
    let bits: Bit[] = [], running = false;
    const size = () => { const r = devicePixelRatio || 1; cv.width = innerWidth * r; cv.height = innerHeight * r; cx.setTransform(r, 0, 0, r, 0, 0); };
    const tick = () => {
      cx.clearRect(0, 0, innerWidth, innerHeight);
      bits = bits.filter((b) => b.life > 0);
      for (const b of bits) {
        b.vy += 0.22; b.vx *= 0.98; b.x += b.vx; b.y += b.vy; b.r += b.vr; b.life -= 0.014;
        cx.save(); cx.globalAlpha = Math.max(b.life, 0); cx.translate(b.x, b.y); cx.rotate(b.r); cx.fillStyle = b.c;
        if (b.round) { cx.beginPath(); cx.arc(0, 0, b.h / 1.5, 0, 7); cx.fill(); } else cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
        cx.restore();
      }
      if (bits.length) requestAnimationFrame(tick); else { running = false; cx.clearRect(0, 0, innerWidth, innerHeight); }
    };
    const burst = (e: PointerEvent) => {
      for (let i = 0; i < 34; i++) {
        const a = Math.random() * Math.PI * 2, s = 3 + Math.random() * 6;
        bits.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 3, r: Math.random() * 6.3, vr: (Math.random() - 0.5) * 0.4,
          w: 5 + Math.random() * 5, h: 3 + Math.random() * 4, c: COLORS[i % COLORS.length], life: 1, round: Math.random() < 0.3 });
      }
      if (!running) { running = true; requestAnimationFrame(tick); }
    };
    size();
    addEventListener('resize', size);
    addEventListener('pointerdown', burst);
    return () => { removeEventListener('resize', size); removeEventListener('pointerdown', burst); };
  }, []);
  return <canvas id="confetti" ref={ref} />;
}

/** Soft "tap" sound on every click, made with Web Audio (no sound file) */
export function useTapSound() {
  useEffect(() => {
    let ac: AudioContext | undefined, noise: AudioBuffer | undefined;
    const tap = () => {
      try {
        ac ??= new AudioContext();
        if (ac.state === 'suspended') void ac.resume();
        if (!noise) {
          noise = ac.createBuffer(1, Math.floor(ac.sampleRate * 0.03), ac.sampleRate);
          const d = noise.getChannelData(0);
          for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4);
        }
        const t = ac.currentTime;
        const src = ac.createBufferSource(), bp = ac.createBiquadFilter(), g1 = ac.createGain();
        src.buffer = noise; bp.type = 'bandpass'; bp.frequency.value = 3200; bp.Q.value = 1.4; g1.gain.value = 0.55;
        src.connect(bp).connect(g1).connect(ac.destination); src.start(t);
        const o = ac.createOscillator(), g2 = ac.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(220, t); o.frequency.exponentialRampToValueAtTime(120, t + 0.04);
        g2.gain.setValueAtTime(0.12, t); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
        o.connect(g2).connect(ac.destination); o.start(t); o.stop(t + 0.06);
      } catch { /* audio is a nice-to-have */ }
    };
    addEventListener('pointerdown', tap);
    return () => removeEventListener('pointerdown', tap);
  }, []);
}
