import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  AlertTriangle,
  ShieldAlert,
  BrainCircuit,
  Scan,
  ShieldCheck,
  Zap,
  Blocks,
  Building2,
  Monitor,
} from 'lucide-react';
import { ChatSimulation, ChatScenario } from '../components/ChatSimulation';
import PageLayout from '../components/PageLayout';
import Footer from '../components/Footer';
import { AnimatedSection } from '../assets/animatedSection';
import { getAssetPath } from '../utils/assetPath';
import { useLanguage } from '../i18n/LanguageContext';

// ── Shared Animation Variants ───────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-100px' as const },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

const popUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40, scale: 0.95 as const },
  whileInView: { opacity: 1, y: 0, scale: 1 as const },
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

// ── Partner Logos ───────────────────────────────────────────────────────────

const PARTNER_LOGOS = [
  { src: 'images/orange-logo.png',                                     alt: 'Orange' },
  { src: 'images/EDF.png',                                             alt: 'EDF' },
  { src: 'images/Logo_Onepoint_clair.png',                             alt: 'Onepoint' },
  { src: 'images/LEMO%20LOGOS_edited.avif',                            alt: 'LEMO' },
  { src: 'images/65ef9d74ce6b09a400ce0543_carre_couleur_rvb.png',      alt: 'ETIC INSA' },
  { src: 'images/logo.webp',                                           alt: 'RTE' },
];

// ── Component ───────────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  const { t } = useLanguage();

  // ── B2B Chat Scenarios (translated) ────────────────────────────────────
  const homeScenarios = useMemo<readonly ChatScenario[]>(() => [
    { userMessage: t('home.chat.0.user'), aiResponse: t('home.chat.0.ai') },
    { userMessage: t('home.chat.1.user'), aiResponse: t('home.chat.1.ai') },
    { userMessage: t('home.chat.2.user'), aiResponse: t('home.chat.2.ai') },
    { userMessage: t('home.chat.3.user'), aiResponse: t('home.chat.3.ai') },
  ], [t]);

  // ── Pain Points ─────────────────────────────────────────────────────────
  const painPoints = useMemo(() => [
    { icon: AlertTriangle, color: '#F59E0B', title: t('home.pain.0.title'), desc: t('home.pain.0.desc') },
    { icon: ShieldAlert,   color: '#EF4444', title: t('home.pain.1.title'), desc: t('home.pain.1.desc') },
    { icon: BrainCircuit,  color: '#8B5CF6', title: t('home.pain.2.title'), desc: t('home.pain.2.desc') },
  ], [t]);

  // ── Solution Cards ──────────────────────────────────────────────────────
  const solutionCards = useMemo(() => [
    { icon: Scan,       title: t('home.sol.0.title'), desc: t('home.sol.0.desc') },
    { icon: ShieldCheck, title: t('home.sol.1.title'), desc: t('home.sol.1.desc') },
    { icon: Zap,        title: t('home.sol.2.title'), desc: t('home.sol.2.desc') },
    { icon: Blocks,     title: t('home.sol.3.title'), desc: t('home.sol.3.desc') },
  ], [t]);

  // ── B2B features ────────────────────────────────────────────────────────
  const b2bFeatures = useMemo(() => [
    t('home.split.b2b.feat.0'),
    t('home.split.b2b.feat.1'),
    t('home.split.b2b.feat.2'),
    t('home.split.b2b.feat.3'),
  ], [t]);

  // ── Desktop features ────────────────────────────────────────────────────
  const desktopFeatures = useMemo(() => [
    t('home.split.desktop.feat.0'),
    t('home.split.desktop.feat.1'),
    t('home.split.desktop.feat.2'),
    t('home.split.desktop.feat.3'),
  ], [t]);

  return (
    <PageLayout activePage="/">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ─── Hero Section + Logo Bar ─── */}
        <div className="min-h-[calc(100vh-80px)] flex flex-col mt-32 sm:mt-10 md:mt-10 pb-4 sm:pb-6">
          <div className="flex-1 flex flex-col justify-center space-y-10 sm:space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-center">
            {/* Left Column */}
            <AnimatedSection delay={100}>
              <div className="space-y-7">
                {/* Eyebrow Badge */}
                <motion.div {...fadeLeft(0)}>
                  <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                    <span className="text-xs sm:text-sm text-emerald-300 font-medium">
                      {t('home.hero.badge')}
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  {...fadeLeft(0.1)}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08]"
                >
                  {t('home.hero.headline1')}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                    {t('home.hero.headline2')}
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  {...fadeLeft(0.2)}
                  className="text-white/70 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed"
                >
                  {t('home.hero.subtitle')}
                </motion.p>

                {/* CTA Row */}
                <motion.div
                  {...fadeLeft(0.3)}
                  className="flex flex-col sm:flex-row gap-4 pt-2"
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-[0_0_40px_rgba(0,193,124,0.4)] hover:shadow-[0_0_60px_rgba(0,193,124,0.6)] hover:-translate-y-0.5"
                  >
                    {t('home.hero.cta.expert')}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/desktop"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-gray-400 hover:text-white border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    {t('home.hero.cta.desktop')}
                  </Link>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Right Column — Chat Simulation */}
            <motion.div {...fadeRight(0.2)} className="mt-8 sm:mt-10 lg:mt-0">
              <ChatSimulation
                scenarios={homeScenarios}
                footerText={t('home.chat.footer')}
                footerLink="/contact"
              />
            </motion.div>
          </div>

          {/* ─── Logo Bar ─── */}
          <div className="pt-6 sm:pt-8 border-t border-white/[0.06] mt-6 sm:mt-8">
            <p className="text-center text-xs sm:text-sm text-gray-500 font-medium tracking-[0.2em] uppercase mb-8">
              {t('home.logobar.label')}
            </p>
            <div
              className="relative overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              }}
            >
              <div className="flex animate-scroll w-max items-center">
                {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 mx-10 sm:mx-14 flex items-center justify-center group"
                  >
                    <img
                      src={getAssetPath(logo.src)}
                      alt={logo.alt}
                      className="h-10 w-auto object-contain opacity-35 transition-all duration-300 group-hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Two Products Split ─── */}
        <AnimatedSection delay={100}>
          <div className="py-16 sm:py-20">
            <motion.div {...fadeUp(0)} className="text-center mb-12">
              <p className="text-xs sm:text-sm text-emerald-400 font-semibold tracking-[0.2em] uppercase mb-4">
                {t('home.split.eyebrow')}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {t('home.split.heading')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* ── Business Solutions Card ── */}
              <motion.div {...popUp(0.1)} className="group relative">
                <div className="h-full flex flex-col p-8 sm:p-10 bg-gradient-to-br from-emerald-950/60 to-[#050a0f] border border-emerald-600/25 hover:border-emerald-500/50 rounded-3xl transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,193,124,0.12)]">
                  {/* Label */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 w-fit mb-6">
                    <span className="text-xs text-emerald-300 font-semibold tracking-wide uppercase">{t('home.split.b2b.badge')}</span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">{t('home.split.b2b.title')}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                    {t('home.split.b2b.desc')}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-10 flex-1">
                    {b2bFeatures.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-[0_0_30px_rgba(0,193,124,0.3)] hover:shadow-[0_0_50px_rgba(0,193,124,0.5)] hover:-translate-y-0.5"
                  >
                    {t('home.split.b2b.cta')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              {/* ── Desktop App Card ── */}
              <motion.div {...popUp(0.2)} className="group relative">
                <div className="h-full flex flex-col p-8 sm:p-10 bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.08] hover:border-white/[0.15] rounded-3xl transition-all duration-300">
                  {/* Label */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] w-fit mb-6">
                    <span className="text-xs text-gray-300 font-semibold tracking-wide uppercase">{t('home.split.desktop.badge')}</span>
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                      <Monitor className="w-6 h-6 text-gray-300" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">{t('home.split.desktop.title')}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                    {t('home.split.desktop.desc')}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-10 flex-1">
                    {desktopFeatures.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to="/desktop"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {t('home.split.desktop.cta')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

            </div>
          </div>
        </AnimatedSection>

        {/* ─── The Problem ─── */}
        <div className="py-20 sm:py-28">
          <AnimatedSection delay={100}>
            <div className="mb-12 sm:mb-16">
              <motion.p
                {...fadeUp(0)}
                className="text-xs sm:text-sm text-emerald-400 font-semibold tracking-[0.2em] uppercase mb-4"
              >
                {t('home.problem.eyebrow')}
              </motion.p>
              <motion.h2
                {...fadeUp(0.1)}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl"
              >
                {t('home.problem.heading')}
              </motion.h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
            {/* Left — Narrative */}
            <AnimatedSection delay={200}>
              <div className="space-y-6">
                <motion.p
                  {...fadeLeft(0)}
                  className="text-gray-400 text-base sm:text-lg leading-relaxed"
                >
                  {t('home.problem.p1')}
                </motion.p>
                <motion.p
                  {...fadeLeft(0.1)}
                  className="text-white/80 text-base sm:text-lg leading-relaxed font-medium"
                >
                  {t('home.problem.p2')}
                </motion.p>
              </div>
            </AnimatedSection>

            {/* Right — Pain Point Cards */}
            <div className="space-y-4">
              {painPoints.map(({ icon: Icon, color, title, desc }, index) => (
                <motion.div
                  key={title}
                  {...popUp(0.15 + index * 0.12)}
                  className="group"
                >
                  <div className="flex items-center gap-4 sm:gap-5 p-5 bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.1] rounded-2xl transition-all duration-300">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color }} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base mb-1">{title}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── The Solution ─── */}
        <div className="py-20 sm:py-28 border-t border-white/[0.06]">
          <AnimatedSection delay={100}>
            <div className="mb-12 sm:mb-16">
              <motion.p
                {...fadeUp(0)}
                className="text-xs sm:text-sm text-emerald-400 font-semibold tracking-[0.2em] uppercase mb-4"
              >
                {t('home.solution.eyebrow')}
              </motion.p>
              <motion.h2
                {...fadeUp(0.1)}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl"
              >
                {t('home.solution.heading')}
              </motion.h2>
              <motion.p
                {...fadeUp(0.2)}
                className="text-gray-400 text-base sm:text-lg mt-4 max-w-2xl leading-relaxed"
              >
                {t('home.solution.sub')}
              </motion.p>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {solutionCards.map(({ icon: Icon, title, desc }, index) => (
              <motion.div key={title} {...popUp(0.1 + index * 0.1)} className="group">
                <div className="flex items-center gap-5 sm:gap-7 p-6 sm:p-8 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-emerald-500/20 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.08)]">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-400/40 transition-colors">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── CTA Final ─── */}
        <AnimatedSection delay={200}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="my-20 sm:my-28"
          >
            <div className="bg-gradient-to-br from-[#0f261f]/90 to-[#0a1410]/90 backdrop-blur-md border-2 border-emerald-600/30 rounded-3xl p-10 sm:p-16 text-center shadow-[0_0_80px_rgba(0,193,124,0.15)]">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
                {t('home.cta.heading')}
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                {t('home.cta.sub')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 shadow-[0_0_40px_rgba(0,193,124,0.4)] hover:shadow-[0_0_60px_rgba(0,193,124,0.6)] hover:-translate-y-0.5"
                >
                  {t('home.cta.expert')}
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
                <Link
                  to="/desktop"
                  className="inline-flex items-center justify-center gap-2 px-10 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-bold text-white border border-white/20 hover:border-white/40 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t('home.cta.desktop')}
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* ─── Footer ─── */}
        <Footer />
      </div>
    </PageLayout>
  );
};

export default HomePage;
