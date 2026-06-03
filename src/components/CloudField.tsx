import { useEffect, useState } from 'react';

/**
 * CloudField — the open-source page's hero atmosphere.
 *
 * The product's whole story is "run AI locally, even offline at 38,000 ft."
 * So instead of an abstract fluid shader, this is the view *out the airplane
 * window*: a dark stratosphere up top, a sliver of emerald dawn at the horizon,
 * and three parallax decks of volumetric cloud drifting past, each one backlit
 * with an emerald rim where the low sun catches its crown.
 *
 * Pure CSS/SVG. Clouds are built from clustered radial-gradient "puffs" merged
 * with a heavy blur, then doubled into a seamless horizontal loop. Each deck has
 * a bright emerald RIM copy peeking just above a darker BODY copy — that offset
 * is what reads as rim-light. Far decks drift slow, near decks drift fast.
 */

// ── deterministic puff generator ───────────────────────────────────────────
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

interface Puff {
  x: number; // % across the (200%-wide) deck
  y: number; // % down the deck band
  rx: number; // vw — scales with the viewport so clouds fill big screens
  ry: number; // vw
  a: number; // peak alpha multiplier
}

// Build one tile of puffs in [0,50)% then clone at +50% for a seamless loop.
const makeDeck = (
  seed: number,
  count: number,
  rx: [number, number],
  ry: [number, number],
): Puff[] => {
  const rng = mulberry32(seed);
  const out: Puff[] = [];
  for (let i = 0; i < count; i++) {
    const x = rng() * 50;
    const y = 24 + rng() * 54;
    const w = rx[0] + rng() * (rx[1] - rx[0]);
    const h = ry[0] + rng() * (ry[1] - ry[0]);
    const a = 0.55 + rng() * 0.45;
    out.push({ x, y, rx: w, ry: h, a });
    out.push({ x: x + 50, y, rx: w, ry: h, a });
  }
  return out;
};

const toBackground = (
  puffs: Puff[],
  [r, g, b]: [number, number, number],
  baseAlpha: number,
): string =>
  puffs
    .map((p) => {
      const a = (p.a * baseAlpha).toFixed(3);
      const mid = (p.a * baseAlpha * 0.55).toFixed(3);
      return `radial-gradient(${p.rx}vw ${p.ry}vw at ${p.x}% ${p.y}%, rgba(${r},${g},${b},${a}) 0%, rgba(${r},${g},${b},${mid}) 40%, rgba(${r},${g},${b},0) 72%)`;
    })
    .join(', ');

// ── deck definitions (far → near) ──────────────────────────────────────────
interface DeckCfg {
  key: string;
  geom: Puff[];
  bottom: string;
  height: string;
  blur: number;
  drift: number; // seconds for a full loop
  rimShift: number; // px the rim peeks above the body
  body: [number, number, number];
  bodyAlpha: number;
  rim: [number, number, number];
  rimAlpha: number;
  z: number;
}

const DECKS: DeckCfg[] = [
  {
    key: 'far',
    geom: makeDeck(1109, 12, [4.5, 9.5], [1.7, 3.6]),
    bottom: '38%',
    height: '48vh',
    blur: 26,
    drift: 168,
    rimShift: 9,
    body: [16, 36, 40],
    bodyAlpha: 0.55,
    rim: [134, 240, 198],
    rimAlpha: 0.55,
    z: 2,
  },
  {
    key: 'mid',
    geom: makeDeck(2207, 11, [8, 15], [3, 6]),
    bottom: '16%',
    height: '58vh',
    blur: 22,
    drift: 104,
    rimShift: 13,
    body: [9, 22, 26],
    bodyAlpha: 0.82,
    rim: [120, 234, 188],
    rimAlpha: 0.46,
    z: 3,
  },
  {
    key: 'near',
    geom: makeDeck(3733, 10, [13, 23], [4.5, 9]),
    bottom: '-3%',
    height: '24vh',
    blur: 15,
    drift: 66,
    rimShift: 16,
    body: [5, 12, 15],
    bodyAlpha: 0.95,
    rim: [104, 226, 176],
    rimAlpha: 0.34,
    z: 4,
  },
];

// Sparse high-altitude stars (top band only).
const STARS = (() => {
  const rng = mulberry32(8081);
  return Array.from({ length: 46 }, () => ({
    x: rng() * 100,
    y: rng() * 44,
    s: 0.6 + rng() * 1.4,
    o: 0.18 + rng() * 0.5,
    d: rng() * 6,
  }));
})();

// Inline film grain (kills banding in the gradients, adds altitude texture).
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

const CloudField: React.FC = () => {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Stratosphere → emerald dawn at the horizon */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #040810 0%, #050b12 26%, #07171c 46%, #0b2f27 66%, #114a3b 84%, #0f4234 100%)',
        }}
      />

      {/* Lit cloud-sea glow: fills the whole lower half down to the bottom edge */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: '78%',
          background:
            'radial-gradient(130% 120% at 50% 88%, rgba(74,222,168,0.5) 0%, rgba(52,211,153,0.28) 26%, rgba(45,184,140,0.12) 46%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className={desktop ? 'cf-twinkle' : undefined}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            borderRadius: 99,
            background: '#cfe9df',
            opacity: s.o,
            animationDelay: `${s.d}s`,
          }}
        />
      ))}

      {/* Cloud decks (far → near), each = emerald rim peeking above a dark body */}
      {DECKS.map((d) => (
        <div
          key={d.key}
          className="absolute inset-x-0"
          style={{ bottom: d.bottom, height: d.height, zIndex: d.z }}
        >
          {/* rim (lit crown), nudged up so it shows above the body */}
          <div
            className="absolute inset-0"
            style={{ transform: `translateY(-${d.rimShift}px)`, filter: `blur(${d.blur}px)` }}
          >
            <div
              className={desktop ? 'cf-drift' : undefined}
              style={{
                position: 'absolute',
                inset: 0,
                width: '200%',
                background: toBackground(d.geom, d.rim, d.rimAlpha),
                animationDuration: `${d.drift}s`,
              }}
            />
          </div>
          {/* body (dark mass) */}
          <div className="absolute inset-0" style={{ filter: `blur(${d.blur}px)` }}>
            <div
              className={desktop ? 'cf-drift' : undefined}
              style={{
                position: 'absolute',
                inset: 0,
                width: '200%',
                background: toBackground(d.geom, d.body, d.bodyAlpha),
                animationDuration: `${d.drift}s`,
              }}
            />
          </div>
        </div>
      ))}

      {/* Grain */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 6,
          backgroundImage: GRAIN,
          backgroundSize: '180px 180px',
          opacity: 0.05,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Soft top fade + side vignette to keep the headline legible. No bottom
          darkening — the cloud sea is meant to run all the way to the edge. */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 7,
          background:
            'radial-gradient(ellipse at 50% 38%, transparent 46%, rgba(4,8,12,0.34) 100%), linear-gradient(180deg, rgba(4,8,12,0.55) 0%, transparent 22%)',
        }}
      />

      <style>{`
        @keyframes cf-drift { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes cf-twinkle { 0%,100% { opacity: 0.2; } 50% { opacity: 0.85; } }
        .cf-drift { animation: cf-drift linear infinite; will-change: transform; }
        .cf-twinkle { animation: cf-twinkle 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .cf-drift, .cf-twinkle { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default CloudField;
