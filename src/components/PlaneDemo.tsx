import { useEffect, useRef, useState } from 'react';

const FONT = '"Bricolage Grotesque", system-ui, sans-serif';
const MONO = 'ui-monospace, "SF Mono", "JetBrains Mono", "Roboto Mono", monospace';

export interface PlaneDemoProps {
  /** Window chrome title, e.g. "Erudi · Local" */
  title: string;
  /** Offline pill text, e.g. "Airplane mode" */
  offlineLabel: string;
  youLabel: string;
  aiLabel: string;
  userMsg: string;
  aiMsg: string;
  /** Tiny mono status line under the AI answer. */
  statusLine: string;
  /**
   * Optional real clip. When the file exists it crossfades over the animated
   * mock. Drop a file at public/videos/erudi-plane.(mp4|webm) and pass its path.
   */
  videoSrc?: string;
}

/**
 * Hero centerpiece for the open-source page. Renders a fully animated
 * "using AI on a plane" mock (cabin porthole + a local app-window session that
 * types itself out) and progressively upgrades to a real looping clip the
 * moment a video is available at `videoSrc`. No network, no dependency on the
 * asset existing.
 */
const PlaneDemo: React.FC<PlaneDemoProps> = ({
  title,
  offlineLabel,
  youLabel,
  aiLabel,
  userMsg,
  aiMsg,
  statusLine,
  videoSrc,
}) => {
  const [hasVideo, setHasVideo] = useState(false);
  const [typed, setTyped] = useState('');
  const [streaming, setStreaming] = useState(true);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce.current) {
      setTyped(aiMsg);
      setStreaming(false);
      return;
    }
    let i = 0;
    let alive = true;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (!alive) return;
      if (i <= aiMsg.length) {
        setTyped(aiMsg.slice(0, i));
        i += 1;
        timer = setTimeout(step, 24);
      } else {
        setStreaming(false);
        timer = setTimeout(() => {
          if (!alive) return;
          i = 0;
          setStreaming(true);
          step();
        }, 4200);
      }
    };
    timer = setTimeout(step, 900);
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [aiMsg]);

  return (
    <div style={{ fontFamily: FONT }} className="w-full">
      {/* Media frame */}
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        style={{
          aspectRatio: '4 / 3',
          border: '1px solid rgba(255,255,255,0.10)',
          boxShadow: '0 40px 120px -40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
          background: '#080d12',
        }}
      >
        {/* Real clip (crossfades in when available) */}
        {videoSrc && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: hasVideo ? 1 : 0, transition: 'opacity .8s ease', zIndex: 3 }}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setHasVideo(true)}
            onError={() => setHasVideo(false)}
          />
        )}

        {/* ── Animated mock (cabin scene) ── */}
        <div
          className="absolute inset-0"
          style={{ opacity: hasVideo ? 0 : 1, transition: 'opacity .8s ease' }}
        >
          {/* Cabin ambient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 90% at 78% 8%, rgba(13,80,80,0.30) 0%, transparent 45%), linear-gradient(160deg, #0b1117 0%, #070b10 60%, #05080c 100%)',
            }}
          />

          {/* Plane porthole, upper right (the "on a plane" context) */}
          <div
            className="absolute"
            style={{
              top: '7%',
              right: '6%',
              width: '30%',
              height: '52%',
              borderRadius: '999px',
              padding: '7px',
              background: 'linear-gradient(155deg, #2a3138 0%, #161b21 60%, #1f262d 100%)',
              boxShadow:
                '0 18px 40px -16px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.12), inset 0 -3px 6px rgba(0,0,0,0.5)',
            }}
          >
            <div
              className="relative h-full w-full overflow-hidden"
              style={{
                borderRadius: '999px',
                background:
                  'linear-gradient(180deg, #0a2740 0%, #0f4a52 52%, #14605c 78%, #1b6f5f 100%)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.55)',
              }}
            >
              {/* Sun glow at horizon */}
              <div
                className="absolute"
                style={{
                  bottom: '14%',
                  left: '50%',
                  width: '150%',
                  height: '40%',
                  transform: 'translateX(-50%)',
                  background:
                    'radial-gradient(ellipse at center, rgba(110,231,183,0.45) 0%, rgba(52,211,153,0.12) 40%, transparent 70%)',
                  filter: 'blur(2px)',
                }}
              />
              {/* Drifting clouds */}
              <span className="pd-cloud" style={{ top: '34%', left: '-30%', width: '70%', height: '14%', animationDelay: '0s' }} />
              <span className="pd-cloud" style={{ top: '56%', left: '-50%', width: '90%', height: '12%', animationDelay: '-7s' }} />
              <span className="pd-cloud" style={{ top: '22%', left: '-40%', width: '55%', height: '10%', animationDelay: '-13s' }} />
              {/* Glass reflection */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 38%)',
                  mixBlendMode: 'screen',
                }}
              />
            </div>
          </div>

          {/* App window, lower foreground (the local AI session) */}
          <div
            className="absolute overflow-hidden"
            style={{
              left: '7%',
              bottom: '8%',
              width: '72%',
              borderRadius: '12px',
              background: 'rgba(10,15,20,0.82)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 30px 70px -30px rgba(0,0,0,0.85)',
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-3.5 py-2.5"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span style={{ width: 9, height: 9, borderRadius: 99, background: '#ff5f57', opacity: 0.85 }} />
              <span style={{ width: 9, height: 9, borderRadius: 99, background: '#febc2e', opacity: 0.85 }} />
              <span style={{ width: 9, height: 9, borderRadius: 99, background: '#28c840', opacity: 0.85 }} />
              <span
                className="flex-1 text-center"
                style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.02em', color: '#6b7686' }}
              >
                {title}
              </span>
              <span
                className="inline-flex items-center gap-1 rounded-full px-2 py-[3px]"
                style={{
                  fontSize: 9.5,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: '#6ee7b7',
                  background: 'rgba(52,211,153,0.12)',
                  border: '1px solid rgba(52,211,153,0.30)',
                }}
              >
                <span aria-hidden>✈</span>
                {offlineLabel}
              </span>
            </div>

            {/* Body */}
            <div className="px-4 py-4">
              <span
                className="block"
                style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: '#555d66', marginBottom: 5 }}
              >
                {youLabel.toUpperCase()}
              </span>
              <p className="m-0" style={{ color: '#c0c5cb', fontSize: 12.5, lineHeight: 1.5, letterSpacing: '-0.005em' }}>
                {userMsg}
              </p>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '13px 0' }} />

              <span
                className="block"
                style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '0.14em', color: '#34d399', marginBottom: 6 }}
              >
                {aiLabel.toUpperCase()}
              </span>
              <p
                className="m-0"
                style={{ color: '#eef2f4', fontSize: 13, lineHeight: 1.6, letterSpacing: '-0.005em', minHeight: '3.2em' }}
              >
                {typed}
                {streaming && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 2,
                      height: '1.05em',
                      background: '#34d399',
                      marginLeft: 2,
                      verticalAlign: 'text-bottom',
                      animation: 'pd-blink 0.9s step-start infinite',
                    }}
                  />
                )}
              </p>

              <div
                className="mt-3 flex items-center gap-1.5"
                style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '0.03em', color: '#4b5563' }}
              >
                <span style={{ width: 6, height: 6, borderRadius: 99, background: '#34d399', boxShadow: '0 0 8px rgba(52,211,153,0.7)' }} />
                {statusLine}
              </div>
            </div>
          </div>
        </div>

        {/* Caption chip (always on top) */}
        <div
          className="absolute"
          style={{ left: 14, bottom: 14, zIndex: 4, pointerEvents: 'none' }}
        >
          
        </div>

        {/* Top sheen */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{ height: '40%', background: 'linear-gradient(180deg, rgba(255,255,255,0.05), transparent)', zIndex: 4 }}
        />
      </div>

      <style>{`
        @keyframes pd-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pd-drift {
          0%   { transform: translateX(0); }
          100% { transform: translateX(260%); }
        }
        .pd-cloud {
          position: absolute;
          border-radius: 999px;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 45%, transparent 72%);
          filter: blur(6px);
          animation: pd-drift 22s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .pd-cloud { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default PlaneDemo;
