import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FluidShader from '../components/FluidShader';
import ScrollProgress from '../components/ScrollProgress';
import { ChatSimulation, ChatScenario } from '../components/ChatSimulation';
import { getAssetPath } from '../utils/assetPath';
import { useLanguage } from '../i18n/LanguageContext';
import Seo, { SITE_URL } from '../components/Seo';

const HOME_JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Erudi',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon.png`,
    description:
      'Erudi is a specialized AI consulting firm building bespoke, turnkey AI solutions for SMEs and mid-market companies — designed, deployed, hosted and maintained for each client.',
    slogan: 'Bespoke AI, built and operated for your business.',
    knowsAbout: [
      'Bespoke AI solutions',
      'AI consulting',
      'Retrieval-augmented generation (RAG)',
      'AI agents',
      'Document analysis',
      'Workflow automation',
      'GDPR and AI Act compliance',
    ],
    areaServed: 'EU',
    sameAs: [
      'https://www.linkedin.com/company/erudi-app',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: 'Erudi',
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en',
  },
];

const FONT = '"Bricolage Grotesque", system-ui, sans-serif';

const PARTNER_LOGOS = [
  { src: 'images/orange-logo.png',                                alt: 'Orange' },
  { src: 'images/EDF.png',                                        alt: 'EDF' },
  { src: 'images/Logo_Onepoint_clair.png',                        alt: 'Onepoint' },
  { src: 'images/LEMO%20LOGOS_edited.avif',                       alt: 'LEMO' },
  { src: 'images/65ef9d74ce6b09a400ce0543_carre_couleur_rvb.png', alt: 'ETIC INSA' },
  { src: 'images/logo.webp',                                      alt: 'RTE' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.9, delay, ease: [0.2, 0.65, 0.25, 1] as [number, number, number, number] },
});

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const heroInnerRef = useRef<HTMLDivElement | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeMobileCard, setActiveMobileCard] = useState<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const onScroll = () => {
      const el = heroInnerRef.current;
      if (!el) return;
      const y = Math.min(window.scrollY, 800);
      el.style.transform = `translateY(${y * -0.18}px)`;
      el.style.opacity = String(Math.max(0, 1 - y / 700));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const B2B_SCENARIOS: readonly ChatScenario[] = [
    { userMessage: t('home.scenario.0.user'), aiResponse: t('home.scenario.0.ai') },
    { userMessage: t('home.scenario.1.user'), aiResponse: t('home.scenario.1.ai') },
    { userMessage: t('home.scenario.2.user'), aiResponse: t('home.scenario.2.ai') },
    { userMessage: t('home.scenario.3.user'), aiResponse: t('home.scenario.3.ai') },
  ];

  const PILLARS = [
    { n: '01', title: <>{t('home.pillars.0.title.main')} <em>{t('home.pillars.0.title.em')}</em></>, body: t('home.pillars.0.body') },
    { n: '02', title: <>{t('home.pillars.1.title.main')} <em>{t('home.pillars.1.title.em')}</em></>, body: t('home.pillars.1.body') },
    { n: '03', title: <>{t('home.pillars.2.title.main')} <em>{t('home.pillars.2.title.em')}</em></>, body: t('home.pillars.2.body') },
  ];

  const SITUATIONS = [
    { n: '01', problem: t('home.situations.0.problem'), solution: t('home.situations.0.solution'), tag: t('home.situations.0.tag') },
    { n: '02', problem: t('home.situations.1.problem'), solution: t('home.situations.1.solution'), tag: t('home.situations.1.tag') },
    { n: '03', problem: t('home.situations.2.problem'), solution: t('home.situations.2.solution'), tag: t('home.situations.2.tag') },
    { n: '04', problem: t('home.situations.3.problem'), solution: t('home.situations.3.solution'), tag: t('home.situations.3.tag') },
    { n: '05', problem: t('home.situations.4.problem'), solution: t('home.situations.4.solution'), tag: t('home.situations.4.tag') },
    { n: '06', problem: t('home.situations.5.problem'), solution: t('home.situations.5.solution'), tag: t('home.situations.5.tag') },
  ];

  return (
    <div
      className="relative min-h-screen bg-[#050a0f] text-white overflow-x-hidden"
      style={{ fontFamily: FONT }}
    >
      <Seo
        path="/"
        title="Erudi — Bespoke, Turnkey AI Solutions for Your Business"
        description="Erudi is a specialized AI consulting firm. We design, build, host and maintain bespoke, turnkey AI solutions for SMEs and mid-market companies — GDPR & AI Act compliant, live in 2–6 weeks."
        jsonLd={HOME_JSON_LD}
      />
      <ScrollProgress />
      <FluidShader />

      {/* ═══════════════════════════════════════
          MOBILE  (hidden on md+)
      ═══════════════════════════════════════ */}
      <div className="relative z-10 md:hidden">
        <Navbar activePage="/" />

        {/* Hero — full viewport, content + CTA in thumb zone */}
        <section
          className="relative overflow-hidden flex flex-col px-6"
          style={{ minHeight: '100svh', paddingTop: '88px', paddingBottom: '36px' }}
        >
          {/* Ambient orb — transform-only keyframe, GPU composited */}
          <div className="mob-orb" style={{
            position: 'absolute', top: '-110px', right: '-130px',
            width: '440px', height: '440px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.15) 0%, rgba(52,211,153,0.04) 45%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Headline centred vertically */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{
              fontFamily: FONT, fontWeight: 500, margin: 0, color: '#fff',
              fontSize: 'clamp(40px, 12.5vw, 58px)',
              lineHeight: 0.97, letterSpacing: '-0.042em',
              fontVariationSettings: '"opsz" 96',
            }}>
              {t('home.hero.h1.main')}
              <br />
              <em style={{ fontStyle: 'italic', color: '#6ee7b7', fontWeight: 400 }}>
                {t('home.hero.h1.em')}
              </em>
            </h1>
            <p style={{ marginTop: '20px', fontSize: '15px', lineHeight: 1.52, color: '#7a828c', letterSpacing: '-0.005em' }}>
              {t('home.hero.sub')}
            </p>
          </div>

          {/* CTA — anchored in thumb zone */}
          <div style={{ paddingTop: '32px' }}>
            <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, rgba(52,211,153,0.35) 50%, transparent)', marginBottom: '16px' }} />
            <Link
              to="/contact"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '17px 22px', borderRadius: '14px', width: '100%',
                background: 'rgba(52,211,153,0.09)', border: '1px solid rgba(52,211,153,0.24)',
                color: '#fff', fontSize: '16px', fontWeight: 500,
                letterSpacing: '-0.01em', textDecoration: 'none', fontFamily: FONT,
              }}
            >
              {t('home.hero.cta')} <span style={{ color: '#34d399' }}>→</span>
            </Link>
            <a
              href="#m-pillars"
              style={{
                display: 'block', textAlign: 'center', marginTop: '14px',
                fontSize: '13px', color: '#555d66', letterSpacing: '-0.003em', textDecoration: 'none',
              }}
            >
              {t('home.hero.see')}
            </a>
          </div>
        </section>

        {/* Logo bar — compact scrolling strip */}
        <section style={{ padding: '28px 0 30px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ textAlign: 'center', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3d434b', margin: '0 0 16px' }}>
            {t('home.logobar.trusted')}
          </p>
          <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)' }}>
            <div className="flex animate-scroll w-max items-center">
              {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                <div key={i} style={{ flexShrink: 0, margin: '0 26px' }}>
                  <img src={getAssetPath(logo.src)} alt={logo.alt} style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chat demo — widget full width, minimal header */}
        <section style={{ padding: '44px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#34d399', margin: '0 0 18px' }}>
            See it in action
          </p>
          <ChatSimulation
            scenarios={B2B_SCENARIOS}
            footerLink="/contact"
            footerText={t('home.chat.footertext')}
          />
        </section>

        {/* Pillars — horizontal rows, number + content side by side */}
        <section id="m-pillars" style={{ padding: '44px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{
            fontFamily: FONT, fontWeight: 400, margin: '0 0 32px',
            fontSize: 'clamp(26px, 8.5vw, 38px)',
            letterSpacing: '-0.032em', lineHeight: 1.0, fontVariationSettings: '"opsz" 72',
          }}>
            {t('home.pillars.heading.main')} <em>{t('home.pillars.heading.em')}</em>
          </h2>
          {PILLARS.map((p) => (
            <div key={p.n} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '22px 0', display: 'flex', gap: '18px' }}>
              <span style={{ fontSize: '11px', color: '#34d399', letterSpacing: '0.1em', paddingTop: '2px', flexShrink: 0, fontWeight: 500 }}>{p.n}</span>
              <div>
                <h3 style={{ fontFamily: FONT, fontWeight: 400, fontSize: '21px', letterSpacing: '-0.022em', lineHeight: 1.1, margin: '0 0 8px', fontVariationSettings: '"opsz" 48' }}>{p.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.62, color: '#7a828c', margin: 0, letterSpacing: '-0.003em' }}>{p.body}</p>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
        </section>

        {/* Situations — 4 cards, tap to reveal */}
        <section style={{ padding: '44px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{
            fontFamily: FONT, fontWeight: 400, margin: '0 0 6px',
            fontSize: 'clamp(26px, 8.5vw, 38px)',
            letterSpacing: '-0.032em', lineHeight: 1.0, fontVariationSettings: '"opsz" 72',
          }}>
            {t('home.situations.heading')}
          </h2>
          <p style={{ fontSize: '13px', color: '#555d66', margin: '0 0 22px', letterSpacing: '-0.003em' }}>
            {t('home.situations.sub')}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {SITUATIONS.slice(0, 4).map((s, i) => {
              const isOpen = activeMobileCard === i;
              return (
                <div
                  key={s.n}
                  onClick={() => setActiveMobileCard(isOpen ? null : i)}
                  style={{
                    padding: '18px 20px', borderRadius: '12px', cursor: 'pointer',
                    background: isOpen ? 'rgba(16,40,30,0.92)' : 'rgba(255,255,255,0.03)',
                    border: isOpen ? '1px solid rgba(52,211,153,0.25)' : '1px solid rgba(255,255,255,0.07)',
                    transition: 'border-color .25s, background .25s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '10px', color: '#34d399', letterSpacing: '0.1em', fontWeight: 500 }}>{s.n}</span>
                    <span style={{ fontSize: '10px', color: isOpen ? '#34d399' : '#555d66', letterSpacing: '0.1em', textTransform: 'uppercase', transition: 'color .25s', fontWeight: 500 }}>{s.tag}</span>
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: 1.56, margin: 0, letterSpacing: '-0.003em', color: isOpen ? '#a7f3d0' : '#c0c5cb', transition: 'color .3s' }}>
                    {isOpen ? s.solution : s.problem}
                  </p>
                  <div style={{ marginTop: '11px', fontSize: '11px', fontWeight: 500, color: isOpen ? '#34d399' : '#3d434b', letterSpacing: '0.02em', transition: 'color .3s' }}>
                    {isOpen ? `${t('home.situations.cta.open')} →` : t('home.situations.cta.closed')}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA — editorial large type, solid button */}
        <section style={{ padding: '60px 24px 88px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', bottom: '-110px', left: '50%', transform: 'translateX(-50%)',
            width: '340px', height: '340px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <h2 style={{
            fontFamily: FONT, fontWeight: 400, margin: '0 0 16px',
            fontSize: 'clamp(54px, 18vw, 82px)',
            letterSpacing: '-0.048em', lineHeight: 0.93, fontVariationSettings: '"opsz" 96',
          }}>
            {t('home.cta.h2')}
          </h2>
          <p style={{ fontSize: '15px', color: '#7a828c', margin: '0 0 30px', lineHeight: 1.5 }}>
            {t('home.cta.body')}
          </p>
          <Link
            to="/contact"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '18px 24px', borderRadius: '14px', width: '100%',
              background: '#34d399', color: '#03130E',
              fontSize: '16px', fontWeight: 600,
              letterSpacing: '-0.01em', textDecoration: 'none', fontFamily: FONT,
            }}
          >
            {t('home.cta.btn')} <span>→</span>
          </Link>
        </section>

        <Footer />
      </div>

      {/* ═══════════════════════════════════════
          DESKTOP  (hidden on mobile)
      ═══════════════════════════════════════ */}
      <div className="relative z-10 hidden md:block">
        <Navbar activePage="/" />

        {/* Hero */}
        <section className="relative px-6 sm:px-10 lg:px-14 pt-10 pb-24 lg:pb-32 min-h-[calc(100vh-80px)] flex flex-col justify-center mt-16 lg:mt-24">
          <div className="max-w-[1440px] mx-auto w-full">
          <div ref={heroInnerRef} className="max-w-[1280px] will-change-transform">
            <motion.h1
              {...fadeUp(0)}
              className="m-0 text-white"
              style={{ fontFamily: FONT, fontWeight: 500, fontSize: 'clamp(38px, 7.5vw, 112px)', lineHeight: 0.96, letterSpacing: '-0.046em', fontVariationSettings: '"opsz" 96' }}
            >
              {t('home.hero.h1.main')}
              <br />
              <em style={{ fontWeight: 400, fontStyle: 'italic', color: '#6ee7b7', textShadow: '0 0 90px rgba(52,211,153,0.28), 0 0 32px rgba(52,211,153,0.14)' }}>
                {t('home.hero.h1.em')}
              </em>
            </motion.h1>

            <motion.p
              {...fadeUp(0.28)}
              className="mt-12 max-w-[48ch] text-[#c0c5cb]"
              style={{ fontSize: '21px', lineHeight: 1.48, letterSpacing: '-0.005em' }}
            >
              {t('home.hero.sub')}
            </motion.p>

            <motion.div {...fadeUp(0.62)} className="mt-14 flex items-center gap-7">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-[26px] py-4 rounded-full font-medium text-[15px]"
                style={{ color: '#ffffff', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.18)', letterSpacing: '-0.005em', transition: 'background .25s ease, border-color .25s ease, color .25s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#34d399'; e.currentTarget.style.borderColor = '#34d399'; e.currentTarget.style.color = '#03130E'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#ffffff'; }}
              >
                {t('home.hero.cta')}
                <span className="transition-transform duration-[250ms] group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#pillars"
                className="text-[15px] font-medium text-[#c0c5cb] hover:text-emerald-300 border-b border-[#3d434b] hover:border-emerald-400 pb-1 transition-colors"
                style={{ letterSpacing: '-0.005em' }}
              >
                {t('home.hero.see')}
              </a>
            </motion.div>
          </div>
          </div>

          <motion.div {...fadeUp(0.88)} className="absolute left-1/2 -translate-x-1/2 bottom-9 flex flex-col items-center">
            <span className="relative block w-px h-11 overflow-hidden" style={{ background: 'linear-gradient(to bottom, transparent, #34d399)' }}>
              <span className="absolute left-0 w-full h-3" style={{ top: '-12px', background: '#a7f3d0', boxShadow: '0 0 12px rgba(52,211,153,0.22)', animation: 'erudi-travel 2.8s ease-in-out infinite' }} />
            </span>
          </motion.div>
        </section>

        {/* Logo bar */}
        <section className="px-6 sm:px-10 lg:px-14 pb-20 pt-4 border-t border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto w-full">
          <p className="text-center text-xs text-gray-600 font-medium tracking-[0.2em] uppercase mb-10 mt-10">
            {t('home.logobar.trusted')}
          </p>
          <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
            <div className="flex animate-scroll w-max items-center">
              {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
                <div key={i} className="flex-shrink-0 mx-10 sm:mx-14 flex items-center justify-center">
                  <img src={getAssetPath(logo.src)} alt={logo.alt} className="h-10 w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>

        {/* Solid background */}
        <div style={{ background: '#050a0f', position: 'relative', zIndex: 10 }}>

        {/* Chat demo */}
        <section className="px-6 sm:px-10 lg:px-14 py-32 border-t border-white/[0.06]">
          <div className="max-w-[1440px] mx-auto w-full">
          <div className="max-w-[1280px] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 xl:gap-48 items-center">
            <div>
              <h2 className="m-0 mb-6 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(36px, 5vw, 72px)', lineHeight: 1.0, letterSpacing: '-0.036em', fontVariationSettings: '"opsz" 96' }}>
                {t('home.chat.h2.main')}{' '}
                <em className="italic font-normal text-emerald-300">{t('home.chat.h2.em')}</em>
              </h2>
              <p className="text-[#c0c5cb] max-w-[44ch]" style={{ fontSize: '18px', lineHeight: 1.55, letterSpacing: '-0.005em' }}>
                {t('home.chat.desc')}
              </p>
            </div>
            <div>
              <ChatSimulation scenarios={B2B_SCENARIOS} footerLink="/contact" footerText={t('home.chat.footertext')} />
            </div>
          </div>
          </div>
        </section>

        {/* Pillars */}
        <section id="pillars" className="px-6 sm:px-10 lg:px-14 py-24 border-t border-white/[0.10]">
          <div className="max-w-[1440px] mx-auto w-full">
          <div className="flex items-baseline justify-between mb-14">
            <h2 className="m-0 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.0, letterSpacing: '-0.030em', fontVariationSettings: '"opsz" 72' }}>
              {t('home.pillars.heading.main')}{' '}
              <em style={{ fontStyle: 'italic', color: '#6ee7b7', fontWeight: 400 }}>{t('home.pillars.heading.em')}</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <div key={p.n} className="pillar-col group py-10 pr-10" style={{ borderTop: '1px solid rgba(255,255,255,0.10)', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.10)' : 'none', paddingLeft: i > 0 ? '2.5rem' : '0', transition: 'background .3s ease' }}>
                <span className="block mb-6 text-[11px] font-medium tabular-nums" style={{ color: '#34d399', letterSpacing: '0.12em' }}>{p.n}</span>
                <h3 className="m-0 mb-4 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(22px, 2.2vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.025em', fontVariationSettings: '"opsz" 48', transition: 'color .3s ease' }}>{p.title}</h3>
                <p className="m-0 text-[#7a828c] group-hover:text-[#c0c5cb]" style={{ fontSize: '15px', lineHeight: 1.65, letterSpacing: '-0.003em', transition: 'color .3s ease' }}>{p.body}</p>
              </div>
            ))}
          </div>
          </div>
        </section>

        </div>{/* end solid background */}

        {/* Situations */}
        <section className="px-6 sm:px-10 lg:px-14 pt-32 pb-40" style={{ background: '#050a0f' }}>
          <div className="max-w-[1440px] mx-auto w-full">
          <h2 className="m-0 mb-3 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 48px)', lineHeight: 1.0, letterSpacing: '-0.030em', fontVariationSettings: '"opsz" 72' }}>
            {t('home.situations.heading')}
          </h2>
          <p className="mb-12 text-[#555d66] text-[15px]" style={{ letterSpacing: '-0.003em' }}>
            {t('home.situations.sub')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SITUATIONS.map((s, i) => {
              const isOpen = activeCard === i;
              return (
                <div
                  key={s.n}
                  onClick={() => setActiveCard(isOpen ? null : i)}
                  className="relative flex flex-col p-7 rounded-2xl cursor-pointer"
                  style={{ height: '240px', background: isOpen ? 'rgba(16,40,30,0.80)' : 'rgba(5,10,15,0.55)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: isOpen ? '1px solid rgba(52,211,153,0.30)' : '1px solid rgba(255,255,255,0.07)', transition: 'border-color .3s ease, background .3s ease' }}
                >
                  <div className="flex items-start justify-between mb-5 flex-shrink-0">
                    <span className="text-[11px] font-medium text-emerald-400 tabular-nums" style={{ letterSpacing: '0.1em' }}>{s.n}</span>
                    <span className="text-[10.5px] font-medium uppercase" style={{ letterSpacing: '0.1em', color: isOpen ? '#34d399' : '#555d66', transition: 'color .3s ease' }}>{s.tag}</span>
                  </div>
                  <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
                    <p className="m-0 text-[#c0c5cb]" style={{ fontSize: '15px', lineHeight: 1.6, letterSpacing: '-0.003em', opacity: isOpen ? 0 : 1, transform: isOpen ? 'translateY(-6px)' : 'translateY(0)', transition: 'opacity .22s ease, transform .22s ease', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                      {s.problem}
                    </p>
                    <p className="m-0" style={{ fontSize: '15px', lineHeight: 1.6, letterSpacing: '-0.003em', color: '#a7f3d0', opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity .28s ease .12s, transform .28s ease .12s', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                      {s.solution}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-[12px] font-medium" style={{ color: isOpen ? '#34d399' : '#3d434b', transition: 'color .3s ease', letterSpacing: '0.02em' }}>
                    <span style={{ display: 'inline-block', width: '14px', height: '1px', background: 'currentColor' }} />
                    {isOpen ? t('home.situations.cta.open') : t('home.situations.cta.closed')}
                  </div>
                </div>
              );
            })}
          </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 sm:px-10 lg:px-14 py-40">
          <div className="max-w-[1440px] mx-auto w-full">
          <div className="max-w-[900px]">
            <h2 className="m-0 mb-8 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(40px, 6vw, 96px)', lineHeight: 0.95, letterSpacing: '-0.040em', fontVariationSettings: '"opsz" 96' }}>
              {t('home.cta.h2')}
            </h2>
            <p className="mb-12 text-[#c0c5cb] max-w-[42ch]" style={{ fontSize: '20px', lineHeight: 1.5, letterSpacing: '-0.005em' }}>
              {t('home.cta.body')}
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 px-[26px] py-4 rounded-full font-medium text-[15px]"
              style={{ color: '#ffffff', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.18)', letterSpacing: '-0.005em', transition: 'background .25s ease, border-color .25s ease, color .25s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#34d399'; e.currentTarget.style.borderColor = '#34d399'; e.currentTarget.style.color = '#03130E'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = '#ffffff'; }}
            >
              {t('home.cta.btn')}
              <span className="transition-transform duration-[250ms] group-hover:translate-x-1">→</span>
            </Link>
          </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        @keyframes erudi-travel {
          0%   { top: -12px; opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes mob-orb {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(-22px, 26px); }
        }
        .mob-orb { animation: mob-orb 9s ease-in-out infinite; will-change: transform; }
        em { font-style: italic; color: #6ee7b7; font-weight: 400; }
        @media (prefers-reduced-motion: reduce) {
          .mob-orb { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
