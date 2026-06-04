import { useEffect, useState } from 'react';

/**
 * AuroraField — the contact page's atmosphere: a northern-lights night sky that
 * fills the whole page, top to bottom.
 *
 * Real aurora hangs in tall vertical DRAPERIES — soft-edged curtains of light,
 * brightest near their crown and fading as they fall — and the lower edge folds
 * and ripples, slowly changing shape. So each "drape" here is a tall, narrow
 * vertical light gradient (bright crown → long fade), heavily blurred sideways
 * into a soft column and composited with `screen` so overlapping curtains add up
 * the way photons do.
 *
 * Two slow, soft motions give the living-aurora feel:
 *   1. an organic WARP — a shared SVG turbulence displacement whose frequency
 *      breathes over ~30s, so the curtains fold and reshape (strongest where the
 *      light is, i.e. the lower rays);
 *   2. a gentle SWAY — each curtain pivots at its crown, so the bottom drifts
 *      side to side, each on its own long clock.
 * Nothing is quick. Disabled under prefers-reduced-motion.
 */

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const EMERALD = '52,211,153';
const SPRING = '74,222,168';
const TEAL = '20,210,184';
const CYAN = '56,224,210';
const MINT = '134,240,198';

interface Drape {
  key: string;
  left: number; // % — centre of the column
  width: number; // vw — band width before blur
  top: number; // %
  height: number; // % of viewport
  color: string;
  alpha: number;
  blur: number;
  skew: number; // deg — the base hang
  shimmer: number; // s — one brightness cycle
  sway: number; // s — one sway (bottom drift) cycle
  delay: number;
  warp?: boolean; // organic fold (the heavier layers skip it)
  desktopOnly?: boolean;
}

// back → front. Two broad ambient veils fill the field; the rest are curtains.
const DRAPES: Drape[] = [
  { key: 'a0', left: 24, width: 28, top: -10, height: 122, color: TEAL,    alpha: 0.12, blur: 82, skew: -3, shimmer: 24, sway: 40, delay: -3 },
  { key: 'a1', left: 72, width: 32, top: -12, height: 126, color: EMERALD, alpha: 0.12, blur: 92, skew: 4,  shimmer: 28, sway: 46, delay: -11 },
  { key: 'c0', left: 14, width: 6,  top: -4,  height: 80,  color: EMERALD, alpha: 0.20, blur: 44, skew: -6, shimmer: 19, sway: 33, delay: -3,  warp: true },
  { key: 'c1', left: 30, width: 8,  top: -6,  height: 100, color: EMERALD, alpha: 0.26, blur: 40, skew: -5, shimmer: 17, sway: 31, delay: -2,  warp: true },
  { key: 'c2', left: 40, width: 6,  top: -4,  height: 92,  color: SPRING,  alpha: 0.30, blur: 33, skew: 3,  shimmer: 14, sway: 27, delay: -7,  warp: true },
  { key: 'c3', left: 50, width: 5,  top: -2,  height: 96,  color: MINT,    alpha: 0.30, blur: 28, skew: -4, shimmer: 12, sway: 24, delay: -1,  warp: true },
  { key: 'c4', left: 58, width: 7,  top: -6,  height: 94,  color: TEAL,    alpha: 0.26, blur: 38, skew: 5,  shimmer: 21, sway: 37, delay: -9,  warp: true },
  { key: 'c5', left: 67, width: 6,  top: -4,  height: 88,  color: CYAN,    alpha: 0.24, blur: 34, skew: -3, shimmer: 16, sway: 29, delay: -5,  warp: true },
  { key: 'c6', left: 45, width: 3.5, top: 0,  height: 74,  color: MINT,    alpha: 0.30, blur: 20, skew: 2,  shimmer: 10, sway: 22, delay: -4,  warp: true, desktopOnly: true },
  { key: 'c7', left: 84, width: 6,  top: -3,  height: 82,  color: CYAN,    alpha: 0.20, blur: 42, skew: 6,  shimmer: 23, sway: 43, delay: -8,  desktopOnly: true },
];

// Brightness profile down a curtain: bright crown near the top, long soft fade.
const drapeGradient = (c: string, a: number): string =>
  `linear-gradient(to bottom,
     rgba(${c},0) 0%,
     rgba(${c},${(a * 0.3).toFixed(3)}) 8%,
     rgba(${c},${a.toFixed(3)}) 22%,
     rgba(${c},${(a * 0.7).toFixed(3)}) 46%,
     rgba(${c},${(a * 0.4).toFixed(3)}) 70%,
     rgba(${c},${(a * 0.15).toFixed(3)}) 88%,
     rgba(${c},0) 100%)`;

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")";

const STARS = (() => {
  const rng = mulberry32(4271);
  return Array.from({ length: 60 }, () => ({
    x: rng() * 100,
    y: rng() * 72,
    s: 0.5 + rng() * 1.5,
    o: 0.14 + rng() * 0.5,
    d: rng() * 6,
  }));
})();

const AuroraField: React.FC = () => {
  const [desktop, setDesktop] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mqD = window.matchMedia('(min-width: 768px)');
    const mqR = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setD = () => setDesktop(mqD.matches);
    const setR = () => setReduced(mqR.matches);
    setD();
    setR();
    mqD.addEventListener('change', setD);
    mqR.addEventListener('change', setR);
    return () => {
      mqD.removeEventListener('change', setD);
      mqR.removeEventListener('change', setR);
    };
  }, []);

  const drapes = desktop ? DRAPES : DRAPES.filter((d) => !d.desktopOnly);
  const animate = desktop && !reduced;

  return (
    <div aria-hidden className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Organic fold for the curtains — shared turbulence displacement. Its
          frequency breathes slowly so the draperies reshape over time. */}
      {desktop && (
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
          <filter id="au-warp" x="-40%" y="-15%" width="180%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.006" numOctaves="2" seed="7" result="noise">
              {!reduced && (
                <animate
                  attributeName="baseFrequency"
                  dur="32s"
                  calcMode="spline"
                  keyTimes="0;0.5;1"
                  keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
                  values="0.012 0.006;0.017 0.004;0.012 0.006"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="26" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      )}

      {/* Polar night base — kept dark so the curtains read as light */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #01030a 0%, #02050e 32%, #03070f 58%, #030912 80%, #04101a 100%)',
        }}
      />

      {/* Faint airglow at the crown and the foot so the colour spans the page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 58% at 50% -6%, rgba(52,211,153,0.16) 0%, transparent 58%), radial-gradient(130% 58% at 50% 108%, rgba(56,224,210,0.14) 0%, transparent 62%)',
        }}
      />

      {/* Stars */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className={animate ? 'au-twinkle' : undefined}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            borderRadius: 99,
            background: '#dcefe8',
            opacity: s.o,
            animationDelay: `${s.d}s`,
          }}
        />
      ))}

      {/* Aurora curtains — tall vertical draperies of light, warped + swaying */}
      {drapes.map((d) => (
        <div
          key={d.key}
          style={{
            position: 'absolute',
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.width}vw`,
            height: `${d.height}%`,
            transform: `translateX(-50%) skewX(${d.skew}deg)`,
            transformOrigin: '50% 0%',
          }}
        >
          <div
            className={animate ? 'au-curtain' : undefined}
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin: '50% 0%',
              background: drapeGradient(d.color, d.alpha),
              filter: desktop && d.warp ? `url(#au-warp) blur(${d.blur}px)` : `blur(${d.blur}px)`,
              mixBlendMode: 'screen',
              animationDuration: `${d.sway}s, ${d.shimmer}s`,
              animationDelay: `${d.delay}s, ${d.delay}s`,
              willChange: 'transform, opacity',
            }}
          />
        </div>
      ))}

      {/* Grain — kills banding, adds a polar shimmer */}
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

      {/* Gentle vignette only — the glow runs to the edges. The form card carries
          its own backdrop-blur for legibility. */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 7,
          background:
            'radial-gradient(ellipse 140% 120% at 50% 50%, transparent 62%, rgba(1,3,10,0.34) 100%)',
        }}
      />

      <style>{`
        @keyframes au-sway {
          0%,100% { transform: skewX(-2.4deg) scaleY(1);    }
          50%     { transform: skewX(2.4deg)  scaleY(1.035); }
        }
        @keyframes au-shimmer { 0%,100% { opacity: 0.68; } 50% { opacity: 1; } }
        @keyframes au-twinkle { 0%,100% { opacity: 0.16; } 50% { opacity: 0.85; } }
        .au-curtain {
          animation-name: au-sway, au-shimmer;
          animation-timing-function: ease-in-out, ease-in-out;
          animation-iteration-count: infinite, infinite;
        }
        .au-twinkle { animation: au-twinkle 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default AuroraField;
