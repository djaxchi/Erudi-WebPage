import React, { memo, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Columns, Database, Cpu, Sparkles, Shield, Zap, Users, Award, Monitor, Apple } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatSimulation } from '../components/ChatSimulation';
import PageLayout from '../components/PageLayout';
import Footer from '../components/Footer';
import { AnimatedSection } from '../assets/animatedSection';
import { preloadImages } from '../utils/imageOptimization';
import { getAssetPath } from '../utils/assetPath';
import '../styles/performance.css';
import { useLanguage } from '../i18n/LanguageContext';

const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}> = memo(({ src, alt, className = "", priority = false }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
      }}
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    preloadImages([getAssetPath('/Erudi/images/about-us-image-1.png')]).catch(console.warn);
  }, []);

  const features = useMemo(() => [
    { icon: ShieldCheck, label: t('desktop.feat.0.label'), title: t('desktop.feat.0.title'), desc: t('desktop.feat.0.desc') },
    { icon: Columns,     label: t('desktop.feat.1.label'), title: t('desktop.feat.1.title'), desc: t('desktop.feat.1.desc') },
    { icon: Database,    label: t('desktop.feat.2.label'), title: t('desktop.feat.2.title'), desc: t('desktop.feat.2.desc') },
    { icon: Cpu,         label: t('desktop.feat.3.label'), title: t('desktop.feat.3.title'), desc: t('desktop.feat.3.desc') },
  ], [t]);

  const whyChooseFeatures = useMemo(() => [
    { icon: Cpu,    title: t('desktop.why.0.title'), description: t('desktop.why.0.desc') },
    { icon: Shield, title: t('desktop.why.1.title'), description: t('desktop.why.1.desc') },
    { icon: Zap,    title: t('desktop.why.2.title'), description: t('desktop.why.2.desc') },
    { icon: Users,  title: t('desktop.why.3.title'), description: t('desktop.why.3.desc') },
  ], [t]);

  const supportedModels = useMemo(() => [
    { name: t('desktop.models.0.name'), badge: t('desktop.models.0.badge'), description: t('desktop.models.0.desc'), params: t('desktop.models.0.params') },
    { name: t('desktop.models.1.name'), badge: t('desktop.models.1.badge'), description: t('desktop.models.1.desc'), params: t('desktop.models.1.params') },
    { name: t('desktop.models.2.name'), badge: t('desktop.models.2.badge'), description: t('desktop.models.2.desc'), params: t('desktop.models.2.params') },
    { name: t('desktop.models.3.name'), badge: t('desktop.models.3.badge'), description: t('desktop.models.3.desc'), params: t('desktop.models.3.params') },
    { name: t('desktop.models.4.name'), badge: t('desktop.models.4.badge'), description: t('desktop.models.4.desc'), params: t('desktop.models.4.params') },
    { name: t('desktop.models.5.name'), badge: t('desktop.models.5.badge'), description: t('desktop.models.5.desc'), params: t('desktop.models.5.params') },
    { name: t('desktop.models.6.name'), badge: t('desktop.models.6.badge'), description: t('desktop.models.6.desc'), params: t('desktop.models.6.params') },
    { name: t('desktop.models.7.name'), badge: t('desktop.models.7.badge'), description: t('desktop.models.7.desc'), params: t('desktop.models.7.params') },
    { name: t('desktop.models.8.name'), badge: t('desktop.models.8.badge'), description: t('desktop.models.8.desc'), params: t('desktop.models.8.params') },
  ], [t]);

  const democratizeTexts = useMemo(() => [
    t('desktop.democratize.p0'),
    t('desktop.democratize.p1'),
    t('desktop.democratize.p2'),
    t('desktop.democratize.p3'),
  ], [t]);

  const ctaGetItems = useMemo(() => [
    t('desktop.cta.get.0'),
    t('desktop.cta.get.1'),
    t('desktop.cta.get.2'),
    t('desktop.cta.get.3'),
  ], [t]);

  const winReqs = useMemo(() => [
    t('desktop.sysreq.win.0'),
    t('desktop.sysreq.win.1'),
    t('desktop.sysreq.win.2'),
    t('desktop.sysreq.win.3'),
  ], [t]);

  const macReqs = useMemo(() => [
    t('desktop.sysreq.mac.0'),
    t('desktop.sysreq.mac.1'),
    t('desktop.sysreq.mac.2'),
  ], [t]);

  // "More Coming Soon" special model name for border styling
  const moreComingSoonName = t('desktop.models.8.name');

  return (
    <PageLayout activePage="/desktop">
      <div className="max-w-7xl mx-auto">

        {/* ─── Hero Section ─── */}
        <div className="mt-32 sm:mt-20 md:mt-20 mb-12 sm:mb-16 md:mb-20">
          <AnimatedSection delay={100}>
            <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-sm"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm text-emerald-300 font-medium">{t('desktop.hero.badge')}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
              >
                {t('desktop.hero.h1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">{t('desktop.hero.h1.accent')}</span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300"
              >
                {t('desktop.hero.h2')}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto lg:mx-0 leading-relaxed"
              >
                {t('desktop.hero.subtitle')} <span className="font-bold text-white">{t('desktop.hero.subtitle.bold')}</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="pt-2 space-y-3"
              >
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <Link
                    to="/download"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-3.5 rounded-xl text-base font-bold transition-all duration-300 shadow-[0_0_30px_rgba(0,193,124,0.35)] hover:shadow-[0_0_50px_rgba(0,193,124,0.55)] hover:-translate-y-0.5"
                  >
                    {t('desktop.hero.download')}
                  </Link>
                </div>
                <p className="text-xs text-gray-500 text-center lg:text-left">{t('desktop.hero.note')}</p>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>

        {/* ─── Features Grid ─── */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {features.map(({ icon: Icon, label, title, desc }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease: "easeOut" }}
                className="relative group"
              >
                <div className="h-full bg-gradient-to-br from-white/[0.08] to-white/[0.04] hover:from-white/[0.12] hover:to-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.15)] hover:-translate-y-1">
                  <div className="mb-4 sm:mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/50 transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-emerald-400" />
                    </div>
                  </div>
                  <div className="inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-3 sm:mb-4">
                    <span className="text-xs text-emerald-300 font-semibold">{label}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── CTA Section with Chat Simulation ─── */}
        <div className="space-y-10 sm:space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-start mb-32">
          <AnimatedSection delay={400}>
            <div className="space-y-6 sm:space-y-8">
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight flex sm:justify-center lg:justify-start"
              >
                {t('desktop.cta.heading')}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed flex sm:text-center lg:text-left"
              >
                {t('desktop.cta.sub')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="pt-2 sm:pt-4 flex sm:justify-center lg:justify-start"
              >
                <Link
                  to="/download"
                  className="inline-block w-full sm:w-auto text-center bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 shadow-[0_0_40px_rgba(0,193,124,0.4)] hover:shadow-[0_0_60px_rgba(0,193,124,0.6)] hover:-translate-y-0.5"
                >
                  {t('desktop.cta.download')}
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="text-sm text-gray-400 text-center lg:text-left"
              >
                {t('desktop.cta.community')} <span className="text-emerald-400 font-semibold">{t('desktop.cta.community.accent')}</span> {t('desktop.cta.community.suffix')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-5">{t('desktop.cta.whatyouget')}</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {ctaGetItems.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-gray-200 text-sm sm:text-base">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(0,193,124,0.6)] flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={500}>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start space-y-4 sm:space-y-6 h-full"
            >
              <ChatSimulation />
            </motion.div>
          </AnimatedSection>
        </div>

        {/* ─── Democratizing AI Training ─── */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="text-4xl lg:text-5xl font-bold text-white"
              >
                {t('desktop.democratize.heading')}
              </motion.h2>
              <div className="space-y-4 text-gray-300 text-lg">
                {democratizeTexts.map((text, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: "easeOut" }}
                    className={idx === 1 ? "text-emerald-400 font-semibold" : ""}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
                className="pt-4"
              >
                <Link
                  to="/download"
                  className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-[0_0_40px_rgba(0,193,124,0.4)] hover:shadow-[0_0_60px_rgba(0,193,124,0.6)]"
                >
                  {t('desktop.democratize.download')}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <OptimizedImage
                src={getAssetPath('/Erudi/images/about-us-image-1.png')}
                alt="Democratizing AI Training"
                className="w-full h-auto rounded-3xl shadow-2xl"
                priority={true}
              />
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ─── Why Choose Erudi ─── */}
        <AnimatedSection delay={300}>
          <div className="mb-32">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold text-white text-center mb-6"
            >
              {t('desktop.why.heading')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-center text-gray-300 text-lg mb-16 max-w-3xl mx-auto"
            >
              {t('desktop.why.sub')}
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseFeatures.map(({ icon: Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease: "easeOut" }}
                  className="relative group"
                >
                  <div className="h-full bg-gradient-to-br from-white/[0.08] to-white/[0.04] hover:from-white/[0.12] hover:to-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-3xl p-7 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.15)] hover:-translate-y-1">
                    <div className="mb-5">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/50 transition-colors">
                        <Icon className="w-7 h-7 text-emerald-400" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* ─── Supported Models ─── */}
        <AnimatedSection delay={400}>
          <div className="mb-32">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl lg:text-5xl font-bold text-center mb-6"
            >
              {t('desktop.models.heading')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">{t('desktop.models.heading.accent')}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-center text-gray-300 text-lg mb-16"
            >
              {t('desktop.models.sub')}
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportedModels.map((model, index) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                  className={`relative group bg-gradient-to-br from-white/[0.08] to-white/[0.04] hover:from-white/[0.12] hover:to-white/[0.08] backdrop-blur-xl border ${model.name === moreComingSoonName ? 'border-purple-500/20 hover:border-purple-400/40' : 'border-white/10 hover:border-emerald-500/30'} rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.15)] hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{model.name}</h3>
                    {model.badge && (
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        model.badge === t('desktop.models.0.badge') ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                        model.badge === t('desktop.models.2.badge') ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                        model.badge === t('desktop.models.3.badge') ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' :
                        model.badge === t('desktop.models.4.badge') ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' :
                        'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                      }`}>
                        {model.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{model.description}</p>
                  <p className="text-gray-400 text-xs">{model.params}</p>
                </motion.div>
              ))}
            </div>

            {/* Hugging Face Integration */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mt-8 bg-gradient-to-br from-[#2a1a0f]/70 to-[#1a0f05]/70 backdrop-blur-md border border-orange-800/30 rounded-3xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🤗</span>
                <h3 className="text-2xl font-bold text-white">{t('desktop.models.hf.title')}</h3>
              </div>
              <div className="space-y-3 text-gray-300">
                <p><span className="text-orange-400 font-semibold">{t('desktop.models.hf.p1.label')}</span> {t('desktop.models.hf.p1.text')}</p>
                <p><span className="text-orange-400 font-semibold">{t('desktop.models.hf.p2.label')}</span> {t('desktop.models.hf.p2.text')}</p>
                <p><span className="text-orange-400 font-semibold">{t('desktop.models.hf.p3.label')}</span> {t('desktop.models.hf.p3.text')}</p>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* ─── System Requirements ─── */}
        <AnimatedSection delay={500}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-32"
          >
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-10">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                >
                  <Award className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                </motion.div>
                <h2 className="text-4xl font-bold text-white mb-4">{t('desktop.sysreq.heading')}</h2>
                <p className="text-gray-300 text-lg">{t('desktop.sysreq.sub')}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Monitor className="w-8 h-8 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">{t('desktop.sysreq.win.title')}</h3>
                  </div>
                  <div className="space-y-4">
                    {winReqs.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-200 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-500/5 to-gray-600/5 border border-gray-500/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Apple className="w-8 h-8 text-gray-400" />
                    <h3 className="text-xl font-bold text-white">{t('desktop.sysreq.mac.title')}</h3>
                  </div>
                  <div className="space-y-4">
                    {macReqs.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gray-500/20 border border-gray-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-200 text-sm">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-10 p-6 bg-white/[0.05] border border-white/5 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-3">{t('desktop.sysreq.ready.heading')}</h3>
                <p className="text-gray-300 mb-4">
                  {t('desktop.sysreq.ready.sub')}
                </p>
                <Link
                  to="/download"
                  className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-3 rounded-xl text-base font-bold transition-all duration-300"
                >
                  {t('desktop.sysreq.ready.cta')}
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>

        <Footer />
      </div>
    </PageLayout>
  );
};

export default LandingPage;
