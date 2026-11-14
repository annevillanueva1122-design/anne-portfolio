"use client"

import * as React from "react"

/**
 * Breath Bloom — six luminous petals orbiting a shared centre, breathing in,
 * holding, and breathing out on a slow eased loop.
 * Source: 21st.dev. Tailwind classes swapped for a small plain-CSS block;
 * behaviour is unchanged.
 */

export type BloomKey = {
  /** Position on the timeline, 0..1. */
  at: number
  /** Distance of each petal from the centre, in petal sizes. */
  amplitude: number
  /** Petal scale, 1 = `size`. */
  scale: number
}

export type BloomPose = { amplitude: number; scale: number }

type Ease = (x: number) => number
type Range = [number, number]

export type BloomParams = {
  petals: number
  size: number | "auto"
  offset: number
  tilt: number
  spin: number
  duration: number
  easing: [number, number, number, number]
  keyframes: BloomKey[]
  pointerAmplitude: Range
  pointerScale: Range
  follow: number
  stops: [string, string, string]
  focus: string
  blend: React.CSSProperties["mixBlendMode"]
  background: string
  glow: number
  glowColor: string
  ink: string
}

export const BLOOM_DEFAULTS: BloomParams = {
  petals: 6,
  size: "auto",
  offset: 30,
  tilt: 17,
  spin: 0,

  duration: 4.01,
  easing: [0.8, 0, 0.2, 1],
  keyframes: [
    { at: 0, amplitude: 1.5, scale: 1 },
    { at: 0.5, amplitude: 1, scale: 3 },
    { at: 1, amplitude: 1.5, scale: 3 },
  ],

  pointerAmplitude: [0, 5],
  pointerScale: [0.15, 8],
  follow: 7,

  stops: ["oklch(0.1186 0.0248 260.66)", "oklch(0.3133 0.1419 260.73)", "oklch(0.6061 0.2122 260.66)"],
  focus: "50% 0%",
  blend: "lighten",
  background: "#0d0f1e",
  glow: 0.35,
  glowColor: "oklch(0.6061 0.2122 260.66 / 0.35)",
  ink: "rgba(226, 232, 255, 0.86)",
}

export const BLOOM_PRESETS = {
  abyss: {},
  ember: {
    stops: ["oklch(0.14 0.035 30)", "oklch(0.43 0.17 32)", "oklch(0.74 0.19 52)"],
    background: "#150a07",
    glowColor: "oklch(0.7 0.19 45 / 0.35)",
    ink: "rgba(255, 228, 206, 0.88)",
  },
  aurora: {
    stops: ["oklch(0.13 0.03 190)", "oklch(0.4 0.11 175)", "oklch(0.84 0.17 158)"],
    background: "#05110f",
    glowColor: "oklch(0.8 0.16 160 / 0.3)",
    ink: "rgba(214, 255, 238, 0.86)",
    spin: 4,
  },
  orchid: {
    stops: ["oklch(0.13 0.035 320)", "oklch(0.4 0.17 325)", "oklch(0.74 0.2 340)"],
    background: "#12071a",
    glowColor: "oklch(0.7 0.2 335 / 0.32)",
    ink: "rgba(255, 222, 246, 0.88)",
    petals: 8,
    offset: 0,
  },
  solstice: {
    stops: ["oklch(0.99 0.01 85)", "oklch(0.86 0.09 70)", "oklch(0.64 0.17 42)"],
    blend: "multiply",
    background: "#f5efe4",
    glowColor: "oklch(0.85 0.1 70 / 0.45)",
    ink: "rgba(74, 40, 20, 0.82)",
  },
  graphite: {
    stops: ["oklch(0.12 0 0)", "oklch(0.36 0 0)", "oklch(0.86 0 0)"],
    background: "#0a0a0a",
    glowColor: "oklch(0.9 0 0 / 0.16)",
    ink: "rgba(240, 240, 240, 0.82)",
    petals: 5,
    offset: 90,
  },
} satisfies Record<string, Partial<BloomParams>>

export type BloomPreset = keyof typeof BLOOM_PRESETS

const STAGE_HIDDEN = -1
const STAGE_PINNED = 3

export function cubicBezier(x1: number, y1: number, x2: number, y2: number): Ease {
  const cl = (v: number) => Math.min(1, Math.max(0, v))
  const ax1 = cl(x1)
  const ax2 = cl(x2)
  const curve = (a: number, b: number, t: number) => {
    const u = 1 - t
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t
  }
  return (x: number) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let lo = 0
    let hi = 1
    let t = x
    for (let i = 0; i < 32; i++) {
      if (curve(ax1, ax2, t) < x) lo = t
      else hi = t
      t = (lo + hi) / 2
    }
    return curve(y1, y2, t)
  }
}

export function sampleKeys(keys: BloomKey[], x: number, ease: Ease) {
  if (!keys.length) return { amplitude: 0, scale: 1 }
  const first = keys[0]
  const last = keys[keys.length - 1]
  if (x <= first.at) return { amplitude: first.amplitude, scale: first.scale }
  if (x >= last.at) return { amplitude: last.amplitude, scale: last.scale }
  let i = 0
  while (i < keys.length - 2 && x > keys[i + 1].at) i++
  const a = keys[i]
  const b = keys[i + 1]
  const span = b.at - a.at
  const e = span > 0 ? ease((x - a.at) / span) : 1
  return {
    amplitude: a.amplitude + (b.amplitude - a.amplitude) * e,
    scale: a.scale + (b.scale - a.scale) * e,
  }
}

export function breathAt(t: number, duration: number) {
  const d = duration > 0 ? duration : 1
  const u = (((t / d) % 2) + 2) % 2
  const forward = u < 1
  const x = forward ? u : 2 - u
  const stage = x >= 0.5 ? 1 : forward ? 0 : 2
  return { x: x, stage: stage }
}

export function pointerPose(px: number, py: number, amp: Range, scale: Range) {
  const cx = Math.min(1, Math.max(0, px))
  const cy = Math.min(1, Math.max(0, py))
  return {
    amplitude: amp[0] + (amp[1] - amp[0]) * cx,
    scale: scale[0] + (scale[1] - scale[0]) * cy,
  }
}

export function damp(current: number, target: number, rate: number, dt: number) {
  if (!(rate > 0)) return target
  return target + (current - target) * Math.exp(-rate * dt)
}

export function petalTransform(i: number, n: number, ring: number, tilt: number, pose: BloomPose, size: number) {
  const deg = (360 / Math.max(1, n)) * i + ring
  const rad = (deg * Math.PI) / 180
  const r = pose.amplitude * size
  const x = Math.cos(rad) * r
  const y = -Math.sin(rad) * r
  const s = Math.max(0, pose.scale)
  return (
    "translate(" + x.toFixed(2) + "px, " + y.toFixed(2) + "px) scale(" + s.toFixed(4) + ") rotate(" +
    (tilt - deg).toFixed(2) + "deg)"
  )
}

export function petalSize(size: number | "auto", width: number, height: number) {
  if (typeof size === "number") return Math.max(1, size)
  const short = Math.min(width, height)
  if (!(short > 0)) return 100
  return Math.min(140, Math.max(36, short * 0.13))
}

export type BreathBloomProps = {
  height?: string
  preset?: BloomPreset
  params?: Partial<BloomParams>
  interactive?: boolean
  touch?: "scroll" | "draw"
  guide?: boolean | [string, string, string]
  hint?: boolean | string
  onPinChange?: (pose: BloomPose | null) => void
  label?: string
  children?: React.ReactNode
  className?: string
}

// Plain CSS (this project has no Tailwind). Classes are prefixed bb- so they
// can't collide with the rest of the site.
const BLOOM_CSS = `
.bb-root{position:relative;isolation:isolate;width:100%;overflow:hidden;outline:none}
.bb-root:focus-visible{box-shadow:inset 0 0 0 2px var(--bloom-ink)}
.bb-interactive{cursor:crosshair}
.bb-fill{position:absolute;inset:0;pointer-events:none}
.bb-orb{position:absolute;left:50%;top:50%;border-radius:9999px}
.bb-guide{display:grid;place-items:center}
.bb-word{grid-column-start:1;grid-row-start:1;user-select:none;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;text-transform:uppercase;letter-spacing:.42em;transition:opacity .7s ease-out,letter-spacing .7s ease-out}
.bb-children{position:relative;z-index:10;width:100%;height:100%;pointer-events:none}
.bb-hint{position:absolute;left:0;right:0;bottom:20px;z-index:10;margin:0;padding:0 16px;text-align:center;pointer-events:none;user-select:none;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:10px;text-transform:uppercase;letter-spacing:.3em;transition:opacity .5s}
.bb-sm-only{display:none}
@media (min-width:640px){.bb-sm-only{display:inline}}
@media (prefers-reduced-motion:reduce){.bb-word{transition:none}}
`

const DEFAULT_GUIDE: [string, string, string] = ["Breathe in", "Hold", "Breathe out"]
const CONTROLS = "a,button,input,select,textarea,label,summary,[role=button]"

export default function BreathBloom({
  height = "100svh",
  preset = "abyss",
  params,
  interactive = true,
  touch = "scroll",
  guide = true,
  hint = true,
  onPinChange,
  label = "Breathing bloom",
  children,
  className = "",
}: BreathBloomProps) {
  const p = React.useMemo<BloomParams>(
    () => ({ ...BLOOM_DEFAULTS, ...BLOOM_PRESETS[preset], ...params }),
    [preset, params],
  )
  const count = Math.max(1, Math.min(24, Math.round(p.petals)))

  const rootRef = React.useRef<HTMLElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const glowRef = React.useRef<HTMLDivElement>(null)
  const petalRefs = React.useRef<(HTMLDivElement | null)[]>([])

  const live = React.useRef({ p, interactive, onPinChange })
  live.current = { p, interactive, onPinChange }
  const pointer = React.useRef({ px: 0.5, py: 0.5, active: false })
  const pinned = React.useRef<BloomPose | null>(null)
  const pose = React.useRef<BloomPose>({ ...p.keyframes[0] })

  const [stage, setStage] = React.useState(0)
  const [isPinned, setIsPinned] = React.useState(false)
  const stageNow = React.useRef(0)

  const setPin = React.useCallback((next: BloomPose | null) => {
    pinned.current = next
    setIsPinned(next !== null)
    live.current.onPinChange?.(next)
  }, [])

  React.useEffect(() => {
    const root = rootRef.current
    const stageEl = stageRef.current
    if (!root || !stageEl) return

    let size = 100
    let raf = 0
    let last = 0
    let clock = 0
    let ring = 0
    let onScreen = true
    let reduced = false
    let ease = cubicBezier(...live.current.p.easing)
    let easeKey = live.current.p.easing.join()

    const measure = () => {
      size = petalSize(live.current.p.size, root.clientWidth, root.clientHeight)
      stageEl.style.setProperty("--bloom-size", size + "px")
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)

    const frame = (now: number) => {
      raf = 0
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0
      last = now
      const q = live.current.p
      const k = q.easing.join()
      if (k !== easeKey) {
        easeKey = k
        ease = cubicBezier(...q.easing)
      }
      if (typeof q.size === "number") measure()

      if (!reduced) {
        clock += dt
        ring += q.spin * dt
      }
      const breath = reduced ? { x: 0.5, stage: STAGE_HIDDEN } : breathAt(clock, q.duration)
      const ptr = pointer.current
      const steering = live.current.interactive && ptr.active
      const target =
        pinned.current ??
        (steering
          ? pointerPose(ptr.px, ptr.py, q.pointerAmplitude, q.pointerScale)
          : sampleKeys(q.keyframes, breath.x, ease))

      const cur = pose.current
      cur.amplitude = damp(cur.amplitude, target.amplitude, q.follow, dt)
      cur.scale = damp(cur.scale, target.scale, q.follow, dt)

      const n = petalRefs.current.length
      for (let i = 0; i < n; i++) {
        const el = petalRefs.current[i]
        if (el) el.style.transform = petalTransform(i, n, q.offset + ring, q.tilt, cur, size)
      }
      const glow = glowRef.current
      if (glow) {
        const reach = cur.amplitude + cur.scale * 0.5 + 0.5
        glow.style.transform = "translate(-50%, -50%) scale(" + (reach / 3).toFixed(4) + ")"
        glow.style.opacity = String(q.glow * Math.min(1, 0.35 + cur.scale / 4))
      }

      const nextStage = pinned.current ? STAGE_PINNED : steering ? STAGE_HIDDEN : breath.stage
      if (nextStage !== stageNow.current) {
        stageNow.current = nextStage
        setStage(nextStage)
      }

      if (onScreen && !document.hidden) raf = requestAnimationFrame(frame)
    }

    const wake = () => {
      if (!raf && onScreen && !document.hidden) {
        last = 0
        raf = requestAnimationFrame(frame)
      }
    }

    const io = new IntersectionObserver((entries) => {
      onScreen = entries[entries.length - 1].isIntersecting
      wake()
    })
    io.observe(root)

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onMotion = () => {
      reduced = mq.matches
      wake()
    }
    onMotion()
    mq.addEventListener("change", onMotion)
    document.addEventListener("visibilitychange", wake)
    wake()

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      io.disconnect()
      mq.removeEventListener("change", onMotion)
      document.removeEventListener("visibilitychange", wake)
    }
  }, [])

  const locate = (e: React.PointerEvent) => {
    const r = rootRef.current?.getBoundingClientRect()
    if (!r || !r.width || !r.height) return null
    return { px: (e.clientX - r.left) / r.width, py: (e.clientY - r.top) / r.height }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!interactive) return
    if (e.pointerType === "touch" && touch === "scroll") return
    const at = locate(e)
    if (!at) return
    pointer.current = { ...at, active: true }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive || e.button > 0) return
    if ((e.target as Element).closest?.(CONTROLS)) return
    const at = locate(e)
    if (!at) return
    if (pinned.current) {
      setPin(null)
    } else {
      const q = live.current.p
      setPin(pointerPose(at.px, at.py, q.pointerAmplitude, q.pointerScale))
    }
    if (e.pointerType !== "touch" || touch === "draw") pointer.current = { ...at, active: true }
  }

  const release = (e: React.PointerEvent) => {
    if (e.type === "pointerup" && e.pointerType !== "touch") return
    pointer.current = { ...pointer.current, active: false }
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!interactive || e.target !== e.currentTarget) return
    const q = p
    const from = pinned.current ?? { ...pose.current }
    const da = (q.pointerAmplitude[1] - q.pointerAmplitude[0]) / 20
    const ds = (q.pointerScale[1] - q.pointerScale[0]) / 20
    const clampTo = (v: number, r: Range) => Math.min(Math.max(r[0], r[1]), Math.max(Math.min(r[0], r[1]), v))
    let next: BloomPose | null = null
    if (e.key === "ArrowRight") next = { ...from, amplitude: clampTo(from.amplitude + da, q.pointerAmplitude) }
    else if (e.key === "ArrowLeft") next = { ...from, amplitude: clampTo(from.amplitude - da, q.pointerAmplitude) }
    else if (e.key === "ArrowUp") next = { ...from, scale: clampTo(from.scale + ds, q.pointerScale) }
    else if (e.key === "ArrowDown") next = { ...from, scale: clampTo(from.scale - ds, q.pointerScale) }
    else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setPin(pinned.current ? null : { ...pose.current })
      return
    } else if (e.key === "Escape") {
      if (pinned.current) setPin(null)
      return
    }
    if (next) {
      e.preventDefault()
      setPin(next)
    }
  }

  const words = Array.isArray(guide) ? guide : DEFAULT_GUIDE
  const hintText =
    typeof hint === "string" ? (
      hint
    ) : (
      <>
        {touch === "draw" ? "drag to shape · tap to pin" : "move to shape · click to pin"}
        <span className="bb-sm-only"> · arrows to tune</span>
      </>
    )
  const gradient = "radial-gradient(circle at " + p.focus + ", " + p.stops.join(", ") + ")"
  const initial = sampleKeys(p.keyframes, 0, (x) => x)

  return (
    <section
      ref={rootRef}
      aria-label={label}
      aria-roledescription="interactive animation"
      tabIndex={interactive ? 0 : undefined}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      onKeyDown={onKeyDown}
      className={
        "bb-root " +
        (interactive ? "bb-interactive " : "") +
        className
      }
      style={
        {
          height,
          background: p.background,
          touchAction: interactive && touch === "draw" ? "none" : "auto",
          "--bloom-ink": p.ink,
        } as React.CSSProperties
      }
    >
      <style>{BLOOM_CSS}</style>
      <div ref={stageRef} aria-hidden className="bb-fill">
        <div
          ref={glowRef}
          className="bb-orb"
          style={{
            width: "calc(var(--bloom-size, 100px) * 6)",
            height: "calc(var(--bloom-size, 100px) * 6)",
            background: "radial-gradient(circle, " + p.glowColor + ", transparent 62%)",
            opacity: p.glow,
            transform: "translate(-50%, -50%)",
            willChange: "transform, opacity",
          }}
        />
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            ref={(el) => {
              petalRefs.current[i] = el
              petalRefs.current.length = count
            }}
            data-petal={i}
            className="bb-orb"
            style={{
              width: "calc(var(--bloom-size, 100px) * 1)",
              height: "calc(var(--bloom-size, 100px) * 1)",
              margin: "calc(var(--bloom-size, 100px) * -0.5) 0 0 calc(var(--bloom-size, 100px) * -0.5)",
              background: gradient,
              mixBlendMode: p.blend,
              transformOrigin: "center",
              transform: petalTransform(i, count, p.offset, p.tilt, initial, 100),
            }}
          />
        ))}
      </div>

      {guide !== false && (
        <div aria-live="polite" className="bb-fill bb-guide">
          {[...words, "Pinned"].map((word, i) => (
            <span
              key={i}
              className="bb-word"
              style={{
                color: p.ink,
                opacity: stage === i ? 1 : 0,
                letterSpacing: stage === i ? "0.42em" : "0.2em",
                textShadow: "0 1px 12px " + p.background,
              }}
              aria-hidden={stage !== i}
            >
              {word}
            </span>
          ))}
        </div>
      )}

      {children !== undefined && <div className="bb-children">{children}</div>}

      {hint !== false && interactive && (
        <p
          className="bb-hint"
          style={{ color: p.ink, opacity: isPinned ? 0.85 : 0.45 }}
        >
          {isPinned ? "pinned · click or esc to let it breathe" : hintText}
        </p>
      )}
    </section>
  )
}
