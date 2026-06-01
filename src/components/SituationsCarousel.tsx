import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const FONT = '"Bricolage Grotesque", system-ui, sans-serif';

export interface Situation {
  n: string;
  problem: string;
  solution: string;
  tag: string;
}

interface Props {
  situations: Situation[];
  contactHref?: string;
}

const SituationsCarousel: React.FC<Props> = ({ situations, contactHref = '/contact' }) => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const total = situations.length;
  if (total === 0) return null;
  const s = situations[index];

  const next = () => {
    setRevealed(false);
    setIndex((i) => (i + 1) % total);
  };
  const goTo = (i: number) => {
    setRevealed(false);
    setIndex(i);
  };

  return (
    <div style={{ fontFamily: FONT }} className="w-full max-w-[680px]">
      {/* Card */}
      <div
        className="relative rounded-2xl flex flex-col"
        style={{
          minHeight: '264px',
          padding: '28px',
          background: revealed ? 'rgba(16,40,30,0.55)' : 'rgba(255,255,255,0.03)',
          border: revealed ? '1px solid rgba(52,211,153,0.28)' : '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'background .35s ease, border-color .35s ease',
        }}
      >
        {/* Header: counter + tag */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-[11px] font-medium text-emerald-400 tabular-nums" style={{ letterSpacing: '0.1em' }}>
            {s.n}
            <span className="text-white/25"> / {String(total).padStart(2, '0')}</span>
          </span>
          <span
            className="text-[10.5px] font-medium uppercase"
            style={{ letterSpacing: '0.1em', color: revealed ? '#34d399' : '#555d66', transition: 'color .3s' }}
          >
            {s.tag}
          </span>
        </div>

        {/* Animated problem / solution swap */}
        <div style={{ flex: 1, position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${revealed}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.26 }}
            >
              <span
                className="block text-[10px] uppercase mb-3"
                style={{ letterSpacing: '0.13em', fontWeight: 500, color: revealed ? '#34d399' : '#555d66' }}
              >
                {revealed ? t('home.situations.label.solution') : t('home.situations.label.challenge')}
              </span>
              <p
                className="m-0"
                style={{
                  fontSize: 'clamp(17px, 2.3vw, 21px)',
                  lineHeight: 1.5,
                  letterSpacing: '-0.006em',
                  color: revealed ? '#a7f3d0' : '#dfe3e8',
                }}
              >
                {revealed ? s.solution : s.problem}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Book-a-call link, only once the solution is shown */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="mt-4"
            >
              <Link
                to={contactHref}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                {t('home.situations.cta.open')} <span aria-hidden>→</span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 mt-5">
        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {situations.map((item, i) => (
            <button
              key={item.n}
              onClick={() => goTo(i)}
              aria-label={`Scenario ${i + 1}`}
              aria-current={i === index}
              style={{
                width: i === index ? '20px' : '7px',
                height: '7px',
                borderRadius: '9999px',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                background: i === index ? '#34d399' : 'rgba(255,255,255,0.18)',
                transition: 'width .3s ease, background .3s ease',
              }}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setRevealed((r) => !r)}
            className="text-[13.5px] font-medium px-4 py-2.5 rounded-xl transition-all duration-200 text-emerald-300 bg-emerald-400/15 border border-emerald-400/30 hover:bg-emerald-400/25"
          >
            {revealed ? t('home.situations.btn.problem') : t('home.situations.cta.closed')}
          </button>
          <button
            onClick={next}
            className="text-[13.5px] font-medium px-4 py-2.5 rounded-xl transition-all duration-200 text-white/70 border border-white/15 hover:text-white hover:border-white/25"
          >
            {t('home.situations.btn.next')} <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SituationsCarousel;
