import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Wand2, GitCompare, Database } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CloudField from '../components/CloudField';
import ScrollProgress from '../components/ScrollProgress';
import PlaneDemo from '../components/PlaneDemo';
import { getAssetPath } from '../utils/assetPath';
import { useLanguage } from '../i18n/LanguageContext';
import Seo, { SITE_URL } from '../components/Seo';

const FONT = '"Bricolage Grotesque", system-ui, sans-serif';
const MONO = 'ui-monospace, "SF Mono", "JetBrains Mono", "Roboto Mono", monospace';

const OS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Erudi Desktop',
  url: `${SITE_URL}/opensource`,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'macOS',
  description:
    'Erudi Desktop is a free, open-source app to chat with your own documents using local LLMs, with no code. 100% local and private, fully offline, on your own machine.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

const MODELS = [
  'Mistral 7B',
  'Mistral Nemo 12B',
  'Gemma 1B',
  'Gemma 2B',
  'Gemma 4B',
  'Gemma 7B',
  'Gemma 12B',
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.9, delay, ease: [0.2, 0.65, 0.25, 1] as [number, number, number, number] },
});

const OpenSourcePage: React.FC = () => {
  const { t } = useLanguage();
  const heroInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const onScroll = () => {
      const el = heroInnerRef.current;
      if (!el) return;
      const y = Math.min(window.scrollY, 700);
      el.style.opacity = String(Math.max(0, 1 - y / 720));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const STEPS = [
    { n: '01', title: t('os.how.0.title'), body: t('os.how.0.body') },
    { n: '02', title: t('os.how.1.title'), body: t('os.how.1.body') },
    { n: '03', title: t('os.how.2.title'), body: t('os.how.2.body') },
  ];

  const FEATURES = [
    { icon: ShieldCheck, title: t('os.feat.0.title'), body: t('os.feat.0.body') },
    { icon: Wand2, title: t('os.feat.1.title'), body: t('os.feat.1.body') },
    { icon: GitCompare, title: t('os.feat.2.title'), body: t('os.feat.2.body') },
    { icon: Database, title: t('os.feat.3.title'), body: t('os.feat.3.body') },
  ];

  const STATS = [
    { value: t('os.stat.0.value'), label: t('os.stat.0.label') },
    { value: t('os.stat.1.value'), label: t('os.stat.1.label') },
    { value: t('os.stat.2.value'), label: t('os.stat.2.label') },
  ];

  const planeProps = {
    title: t('os.demo.window.title'),
    offlineLabel: t('os.demo.window.offline'),
    youLabel: t('os.demo.window.you'),
    aiLabel: t('os.demo.window.ai'),
    userMsg: t('os.demo.window.user'),
    aiMsg: t('os.demo.window.answer'),
    statusLine: t('os.demo.window.status'),
    videoSrc: getAssetPath('/Erudi/videos/erudi-plane.mp4'),
  };

  return (
    <div className="relative min-h-screen bg-[#050a0f] text-white overflow-x-clip" style={{ fontFamily: FONT }}>
      <Seo
        path="/opensource"
        title="Erudi Desktop: Free, Open-Source Local AI You Run Offline"
        description="Erudi Desktop is a free, open-source app to chat with your own documents using local LLMs, with no code. 100% private and fully offline. Your data never leaves your machine. Mac with Apple Silicon."
        jsonLd={OS_JSON_LD}
      />
      <ScrollProgress />
      <CloudField />

      {/* ═══════════════════════════════════════ MOBILE ═══════════════════════════════════════ */}
      <div className="relative z-10 md:hidden">
        <Navbar activePage="/opensource" />

        {/* Hero */}
        <section className="relative px-6" style={{ paddingTop: '112px', paddingBottom: '40px' }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', color: '#34d399', textTransform: 'uppercase' }}>
            {t('os.hero.kicker')}
          </span>
          <h1 style={{ fontFamily: FONT, fontWeight: 500, margin: '14px 0 0', color: '#fff', fontSize: 'clamp(40px, 12.5vw, 58px)', lineHeight: 0.98, letterSpacing: '-0.042em', fontVariationSettings: '"opsz" 96' }}>
            {t('os.hero.h1.main')}
            <br />
            <em style={{ fontStyle: 'italic', color: '#6ee7b7', fontWeight: 400 }}>{t('os.hero.h1.em')}</em>
          </h1>
          <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.55, color: '#7a828c', letterSpacing: '-0.005em' }}>
            {t('os.hero.sub')}
          </p>

          <div style={{ marginTop: 26 }}>
            <PlaneDemo {...planeProps} />
          </div>

          <div style={{ marginTop: 26 }}>
            <Link
              to="/download"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '17px 22px', borderRadius: 14, width: '100%', background: '#34d399', color: '#03130E', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', textDecoration: 'none', fontFamily: FONT }}
            >
              {t('os.hero.download')} <span>→</span>
            </Link>
            <p style={{ marginTop: 14, textAlign: 'center', fontFamily: MONO, fontSize: 11.5, color: '#fff', letterSpacing: '0.02em' }}>
              {t('os.hero.note')}
            </p>
          </div>
        </section>

        <div style={{ background: '#050a0f', position: 'relative' }}>
        {/* Manifesto + stats */}
        <section style={{ padding: '46px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontFamily: FONT, fontWeight: 400, margin: 0, fontSize: 'clamp(30px, 9vw, 40px)', letterSpacing: '-0.034em', lineHeight: 1.02, fontVariationSettings: '"opsz" 72' }}>
            {t('os.manifesto.h2.main')} <em>{t('os.manifesto.h2.em')}</em>
          </h2>
          <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.62, color: '#7a828c' }}>{t('os.manifesto.body')}</p>
          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: FONT, fontSize: 30, fontWeight: 500, color: '#6ee7b7', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                <div style={{ marginTop: 6, fontSize: 11.5, color: '#7a828c', lineHeight: 1.3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Models */}
        <section style={{ padding: '46px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: '#34d399', textTransform: 'uppercase' }}>{t('os.models.label')}</span>
          <h2 style={{ fontFamily: FONT, fontWeight: 400, margin: '12px 0 20px', fontSize: 'clamp(24px, 7.5vw, 34px)', letterSpacing: '-0.030em', lineHeight: 1.08, fontVariationSettings: '"opsz" 72' }}>
            {t('os.models.heading')}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {MODELS.map((m) => (
              <span key={m} style={{ fontFamily: MONO, fontSize: 12.5, padding: '8px 13px', borderRadius: 10, color: '#c0c5cb', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>{m}</span>
            ))}
            <span style={{ fontFamily: MONO, fontSize: 12.5, padding: '8px 13px', borderRadius: 10, color: '#6ee7b7', background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.28)' }}>🤗 {t('os.models.hf')}</span>
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: '46px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontFamily: FONT, fontWeight: 400, margin: '0 0 26px', fontSize: 'clamp(26px, 8.5vw, 38px)', letterSpacing: '-0.032em', lineHeight: 1.0, fontVariationSettings: '"opsz" 72' }}>
            {t('os.how.heading.main')} <em>{t('os.how.heading.em')}</em>
          </h2>
          {STEPS.map((s) => (
            <div key={s.n} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '20px 0', display: 'flex', gap: 16 }}>
              <span style={{ fontFamily: MONO, fontSize: 11, color: '#34d399', letterSpacing: '0.08em', paddingTop: 3, flexShrink: 0 }}>{s.n}</span>
              <div>
                <h3 style={{ fontFamily: FONT, fontWeight: 400, fontSize: 20, letterSpacing: '-0.022em', margin: '0 0 7px', fontVariationSettings: '"opsz" 48' }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#7a828c', margin: 0 }}>{s.body}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        </section>

        {/* Features */}
        <section style={{ padding: '46px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontFamily: FONT, fontWeight: 400, margin: '0 0 24px', fontSize: 'clamp(26px, 8.5vw, 38px)', letterSpacing: '-0.032em', lineHeight: 1.05, fontVariationSettings: '"opsz" 72' }}>
            {t('os.feat.heading')}
          </h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} style={{ borderRadius: 16, padding: 18, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Icon className="w-5 h-5 text-emerald-300" />
                <h3 style={{ fontFamily: FONT, fontWeight: 500, fontSize: 17, margin: '12px 0 6px', letterSpacing: '-0.015em' }}>{title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#7a828c', margin: 0 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>
        </div>

        {/* Final CTA — sky finale */}
        <section style={{ padding: '58px 24px 84px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: -110, left: '50%', transform: 'translateX(-50%)', width: 340, height: 340, borderRadius: '50%', pointerEvents: 'none' }} />
          <h2 style={{ fontFamily: FONT, fontWeight: 400, margin: '0 0 16px', fontSize: 'clamp(52px, 17vw, 78px)', letterSpacing: '-0.046em', lineHeight: 0.94, fontVariationSettings: '"opsz" 96' }}>
            {t('os.cta.h2')}
          </h2>
          <p style={{ fontSize: 15, color: '#7a828c', margin: '0 0 28px', lineHeight: 1.55 }}>{t('os.cta.body')}</p>
          <Link to="/download" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderRadius: 14, width: '100%', background: '#34d399', color: '#03130E', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', textDecoration: 'none', fontFamily: FONT }}>
            {t('os.cta.download')} <span>→</span>
          </Link>
          <p style={{ marginTop: 18, fontFamily: MONO, fontSize: 11, color: '#fff', lineHeight: 1.6, letterSpacing: '0.01em' }}>
            {t('os.cta.req')}<br />{t('os.cta.license')}
          </p>
        </section>

        <Footer />
      </div>

      {/* ═══════════════════════════════════════ DESKTOP ═══════════════════════════════════════ */}
      <div className="relative z-10 hidden md:block">
        <Navbar activePage="/opensource" />

        {/* Hero */}
        <section className="relative px-6 sm:px-10 lg:px-14 pt-10 pb-24 lg:pb-28 min-h-[calc(100vh-80px)] flex flex-col justify-center mt-16 lg:mt-20">
          <div className="max-w-[1440px] mx-auto w-full">
            <div ref={heroInnerRef} className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] gap-12 lg:gap-16 xl:gap-20 items-center">
              {/* Copy */}
              <div className="max-w-[620px]">
                <motion.span {...fadeUp(0)} className="block" style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.14em', color: '#34d399', textTransform: 'uppercase' }}>
                  {t('os.hero.kicker')}
                </motion.span>
                <motion.h1
                  {...fadeUp(0.08)}
                  className="m-0 mt-5 text-white"
                  style={{ fontFamily: FONT, fontWeight: 500, fontSize: 'clamp(40px, 5.6vw, 88px)', lineHeight: 0.97, letterSpacing: '-0.046em', fontVariationSettings: '"opsz" 96' }}
                >
                  {t('os.hero.h1.main')}
                  <br />
                  <em style={{ fontWeight: 400, fontStyle: 'italic', color: '#6ee7b7', textShadow: '0 0 90px rgba(52,211,153,0.28), 0 0 32px rgba(52,211,153,0.14)' }}>
                    {t('os.hero.h1.em')}
                  </em>
                </motion.h1>
                <motion.p {...fadeUp(0.22)} className="mt-8 max-w-[46ch] text-[#c0c5cb]" style={{ fontSize: 19, lineHeight: 1.5, letterSpacing: '-0.005em' }}>
                  {t('os.hero.sub')}
                </motion.p>
                <motion.div {...fadeUp(0.36)} className="mt-10 flex items-center gap-6">
                  <Link
                    to="/download"
                    className="group inline-flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-[15px]"
                    style={{ color: '#03130E', background: '#34d399', letterSpacing: '-0.005em', boxShadow: '0 0 44px rgba(52,211,153,0.32)', transition: 'box-shadow .25s ease, transform .25s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 64px rgba(52,211,153,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 44px rgba(52,211,153,0.32)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    {t('os.hero.download')}
                    <span className="transition-transform duration-[250ms] group-hover:translate-x-1">→</span>
                  </Link>
                  <a href="#how" className="text-[15px] font-medium text-[#c0c5cb] hover:text-emerald-300 border-b border-[#3d434b] hover:border-emerald-400 pb-1 transition-colors" style={{ letterSpacing: '-0.005em' }}>
                    {t('os.hero.see')}
                  </a>
                </motion.div>
                <motion.p {...fadeUp(0.5)} className="mt-7" style={{ fontFamily: MONO, fontSize: 12, color: '#fff', letterSpacing: '0.02em' }}>
                  {t('os.hero.note')}
                </motion.p>
              </div>

              {/* Plane demo */}
              <motion.div {...fadeUp(0.3)}>
                <PlaneDemo {...planeProps} />
              </motion.div>
            </div>
          </div>
        </section>

        <div style={{ background: '#050a0f', position: 'relative', zIndex: 10 }}>
          {/* Manifesto + stats */}
          <section className="px-6 sm:px-10 lg:px-14 py-28 border-t border-white/[0.06]">
            <div className="max-w-[1440px] mx-auto w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-24 items-center">
              <div className="max-w-[640px]">
                <h2 className="m-0 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(34px, 4.6vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.034em', fontVariationSettings: '"opsz" 96' }}>
                  {t('os.manifesto.h2.main')}{' '}
                  <em style={{ fontStyle: 'italic', color: '#6ee7b7', fontWeight: 400 }}>{t('os.manifesto.h2.em')}</em>
                </h2>
                <p className="mt-7 max-w-[52ch] text-[#c0c5cb]" style={{ fontSize: 18, lineHeight: 1.6, letterSpacing: '-0.005em' }}>
                  {t('os.manifesto.body')}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {STATS.map((s) => (
                  <div key={s.label} style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 18 }}>
                    <div style={{ fontFamily: FONT, fontSize: 'clamp(34px, 3.6vw, 52px)', fontWeight: 500, color: '#6ee7b7', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ marginTop: 10, fontSize: 13.5, color: '#7a828c', lineHeight: 1.4, letterSpacing: '-0.003em' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Models */}
          <section className="px-6 sm:px-10 lg:px-14 py-24 border-t border-white/[0.06]">
            <div className="max-w-[1440px] mx-auto w-full grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-center">
              <div className="max-w-[460px]">
                <span style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.14em', color: '#34d399', textTransform: 'uppercase' }}>{t('os.models.label')}</span>
                <h2 className="m-0 mt-4 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(28px, 3.2vw, 44px)', lineHeight: 1.05, letterSpacing: '-0.030em', fontVariationSettings: '"opsz" 72' }}>
                  {t('os.models.heading')}
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {MODELS.map((m) => (
                  <span key={m} style={{ fontFamily: MONO, fontSize: 14, padding: '11px 17px', borderRadius: 12, color: '#c0c5cb', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', transition: 'border-color .2s, color .2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(52,211,153,0.35)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'; e.currentTarget.style.color = '#c0c5cb'; }}>
                    {m}
                  </span>
                ))}
                <span style={{ fontFamily: MONO, fontSize: 14, padding: '11px 17px', borderRadius: 12, color: '#6ee7b7', background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.28)' }}>🤗 {t('os.models.hf')}</span>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section id="how" className="px-6 sm:px-10 lg:px-14 py-24 border-t border-white/[0.10]">
            <div className="max-w-[1440px] mx-auto w-full">
              <div className="flex items-baseline justify-between mb-14">
                <h2 className="m-0 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.0, letterSpacing: '-0.030em', fontVariationSettings: '"opsz" 72' }}>
                  {t('os.how.heading.main')}{' '}
                  <em style={{ fontStyle: 'italic', color: '#6ee7b7', fontWeight: 400 }}>{t('os.how.heading.em')}</em>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="pillar-col group py-10 pr-10" style={{ borderTop: '1px solid rgba(255,255,255,0.10)', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.10)' : 'none', paddingLeft: i > 0 ? '2.5rem' : '0', transition: 'background .3s ease' }}>
                    <span className="block mb-6" style={{ fontFamily: MONO, fontSize: 12, color: '#34d399', letterSpacing: '0.12em' }}>{s.n}</span>
                    <h3 className="m-0 mb-4 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(22px, 2.2vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.025em', fontVariationSettings: '"opsz" 48' }}>{s.title}</h3>
                    <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-[260px] group-hover:opacity-100" style={{ transition: 'max-height .45s ease, opacity .35s ease' }}>
                      <p className="m-0 text-[#c0c5cb]" style={{ fontSize: 15, lineHeight: 1.65, letterSpacing: '-0.003em' }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="px-6 sm:px-10 lg:px-14 py-24 border-t border-white/[0.06]">
            <div className="max-w-[1440px] mx-auto w-full">
              <h2 className="m-0 mb-14 max-w-[18ch] text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.04, letterSpacing: '-0.030em', fontVariationSettings: '"opsz" 72' }}>
                {t('os.feat.heading')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, overflow: 'hidden' }}>
                {FEATURES.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="group" style={{ background: '#070c11', padding: '30px 26px', transition: 'background .3s ease' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#0a1219'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#070c11'; }}>
                    <div className="mb-7 inline-flex items-center justify-center" style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.28)' }}>
                      <Icon className="w-5 h-5 text-emerald-300" />
                    </div>
                    <h3 className="m-0 mb-3 text-white" style={{ fontFamily: FONT, fontWeight: 500, fontSize: 19, letterSpacing: '-0.018em' }}>{title}</h3>
                    <p className="m-0 text-[#7a828c] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ fontSize: 14, lineHeight: 1.6, letterSpacing: '-0.003em' }}>{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Final CTA — sky finale */}
        <section className="px-6 sm:px-10 lg:px-14 pt-36 pb-12" style={{ }}>
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="max-w-[900px]">
              <h2 className="m-0 mb-8 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(40px, 6vw, 96px)', lineHeight: 0.95, letterSpacing: '-0.040em', fontVariationSettings: '"opsz" 96' }}>
                {t('os.cta.h2')}
              </h2>
              <p className="mb-12 text-[#c0c5cb] max-w-[44ch]" style={{ fontSize: 20, lineHeight: 1.5, letterSpacing: '-0.005em' }}>
                {t('os.cta.body')}
              </p>
              <div className="flex items-center gap-7">
                <Link
                  to="/download"
                  className="group inline-flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-[15px]"
                  style={{ color: '#03130E', background: '#34d399', letterSpacing: '-0.005em', boxShadow: '0 0 44px rgba(52,211,153,0.32)', transition: 'box-shadow .25s ease, transform .25s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 64px rgba(52,211,153,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 44px rgba(52,211,153,0.32)'; e.currentTarget.style.transform = 'none'; }}
                >
                  {t('os.cta.download')}
                  <span className="transition-transform duration-[250ms] group-hover:translate-x-1">→</span>
                </Link>
                <p className="m-0" style={{ fontFamily: MONO, fontSize: 12, color: '#555d66', lineHeight: 1.7, letterSpacing: '0.01em' }}>
                  {t('os.cta.req')}<br />{t('os.cta.license')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        em { font-style: italic; color: #6ee7b7; font-weight: 400; }
      `}</style>
    </div>
  );
};

export default OpenSourcePage;
