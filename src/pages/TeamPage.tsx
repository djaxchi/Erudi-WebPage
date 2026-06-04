import React, { memo, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FluidShader from '../components/FluidShader';
import ScrollProgress from '../components/ScrollProgress';
import { preloadImages } from '../utils/imageOptimization';
import { getAssetPath } from '../utils/assetPath';
import { useLanguage } from '../i18n/LanguageContext';
import { withLang } from '../i18n/langPath';
import Seo from '../components/Seo';

const FONT = '"Bricolage Grotesque", system-ui, sans-serif';
const MONO = 'ui-monospace, "SF Mono", "JetBrains Mono", "Roboto Mono", monospace';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.9, delay, ease: [0.2, 0.65, 0.25, 1] as [number, number, number, number] },
});

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
  </svg>
);

const Portrait: React.FC<{
  src: string;
  alt: string;
  imgPosition?: string;
  className?: string;
}> = memo(({ src, alt, imgPosition, className = '' }) => (
  <img
    src={src}
    alt={alt}
    className={className}
    style={imgPosition ? { objectPosition: imgPosition } : undefined}
    loading="lazy"
    decoding="async"
    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
  />
));
Portrait.displayName = 'Portrait';

const TeamPage: React.FC = () => {
  const { t, lang } = useLanguage();
  const heroInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    preloadImages([
      getAssetPath('/Erudi/images/djalil.png'),
      getAssetPath('/Erudi/images/rayan.png'),
      getAssetPath('/Erudi/images/selyane.png'),
      getAssetPath('/Erudi/images/sami.png'),
      getAssetPath('/Erudi/images/Youssef-C.jpg'),
      getAssetPath('/Erudi/images/Youssef-L.jpeg'),
    ]).catch(console.warn);
  }, []);

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

  const team = useMemo(() => [
    {
      name: 'Djalil Chikhi',
      role: 'CEO',
      img: getAssetPath('/Erudi/images/djalil.png'),
      imgPosition: 'center top',
      bio: t('team.member.0.bio'),
      skills: [t('team.member.0.skill.0'), t('team.member.0.skill.1')],
      linkedin: 'https://linkedin.com/in/djalil-chikhi',
    },
    {
      name: 'Rayan Hanader',
      role: 'CTO',
      img: getAssetPath('/Erudi/images/rayan.png'),
      bio: t('team.member.1.bio'),
      skills: [t('team.member.1.skill.0'), t('team.member.1.skill.1')],
      linkedin: 'https://linkedin.com/in/rayanhanader',
    },
    {
      name: 'Selyane Cheklat',
      role: 'COO',
      img: getAssetPath('/Erudi/images/selyane.png'),
      imgPosition: 'center top',
      bio: t('team.member.2.bio'),
      skills: [t('team.member.2.skill.0'), t('team.member.2.skill.1')],
      linkedin: '',
    },
    {
      name: 'Sami Taider',
      role: 'Application Architect',
      img: getAssetPath('/Erudi/images/sami.png'),
      bio: t('team.member.3.bio'),
      skills: [t('team.member.3.skill.0'), t('team.member.3.skill.1'), t('team.member.3.skill.2')],
      linkedin: 'https://linkedin.com/in/sami-taider',
    },
    {
      name: 'Youssef Chaouki',
      role: 'AI Engineer',
      img: getAssetPath('/Erudi/images/Youssef-C.jpg'),
      imgPosition: 'center top',
      bio: t('team.member.4.bio'),
      skills: [t('team.member.4.skill.0'), t('team.member.4.skill.1')],
      linkedin: 'https://linkedin.com/in/youssef-chaouki',
    },
    {
      name: 'Youssef Laatar',
      role: 'Infrastructure Engineer',
      img: getAssetPath('/Erudi/images/Youssef-L.jpeg'),
      bio: t('team.member.5.bio'),
      skills: [t('team.member.5.skill.0'), t('team.member.5.skill.1')],
      linkedin: 'https://linkedin.com/in/youssef-laatar',
    },
  ], [t]);

  return (
    <div className="relative min-h-screen bg-[#050a0f] text-white overflow-x-clip" style={{ fontFamily: FONT }}>
      <Seo
        path="/team"
        title={t('meta.team.title')}
        description={t('meta.team.desc')}
      />
      <ScrollProgress />
      <FluidShader />

      {/* ═══════════════════════════════════════ MOBILE ═══════════════════════════════════════ */}
      <div className="relative z-10 md:hidden">
        <Navbar activePage="/team" />

        {/* Hero */}
        <section className="relative px-6" style={{ paddingTop: '112px', paddingBottom: '40px' }}>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: '#34d399', textTransform: 'uppercase' }}>
            {t('team.kicker')}
          </span>
          <h1 style={{ fontFamily: FONT, fontWeight: 500, margin: '14px 0 0', color: '#fff', fontSize: 'clamp(40px, 12.5vw, 58px)', lineHeight: 0.98, letterSpacing: '-0.042em', fontVariationSettings: '"opsz" 96' }}>
            {t('team.hero.h1.1')}{' '}
            <em style={{ fontStyle: 'italic', color: '#6ee7b7', fontWeight: 400 }}>{t('team.hero.h1.2')}</em>
          </h1>
          <p style={{ marginTop: 18, fontSize: 15, lineHeight: 1.55, color: '#7a828c', letterSpacing: '-0.005em' }}>
            {t('team.hero.sub.1')}{' '}
            <span style={{ color: '#c0c5cb' }}>{t('team.hero.sub.accent')}</span>{t('team.hero.sub.2')}
          </p>
        </section>

        <div style={{ background: '#050a0f', position: 'relative' }}>
          {/* Roster */}
          <section style={{ padding: '40px 24px 8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: FONT, fontWeight: 400, margin: 0, fontSize: 'clamp(26px, 8vw, 36px)', letterSpacing: '-0.032em', lineHeight: 1.0, fontVariationSettings: '"opsz" 72' }}>
                {t('team.leadership.heading')}
              </h2>
              <span style={{ fontFamily: MONO, fontSize: 11, color: '#34d399', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>06</span>
            </div>

            {team.map((m) => (
              <div key={m.name} style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '22px 0', display: 'flex', gap: 16 }}>
                <div style={{ flexShrink: 0, width: 74, height: 90, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', background: '#070c11' }}>
                  <Portrait src={m.img} alt={m.name} imgPosition={m.imgPosition} className="w-full h-full object-cover" />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h3 style={{ fontFamily: FONT, fontWeight: 500, fontSize: 19, letterSpacing: '-0.018em', margin: 0, color: '#fff' }}>{m.name}</h3>
                  <div style={{ fontFamily: MONO, fontSize: 11.5, color: '#6ee7b7', letterSpacing: '0.02em', marginTop: 3, textTransform: 'uppercase' }}>{m.role}</div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#7a828c', margin: '10px 0 0' }}>{m.bio}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                    {m.skills.map((s) => (
                      <span key={s} style={{ fontFamily: MONO, fontSize: 10.5, padding: '4px 9px', borderRadius: 8, color: '#c0c5cb', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>{s}</span>
                    ))}
                  </div>
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, color: '#7a828c', textDecoration: 'none' }}>
                      <LinkedInIcon className="w-4 h-4" />
                      <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{t('team.linkedin')}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
          </section>

          {/* Company DNA */}
          <section style={{ padding: '46px 24px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.14em', color: '#34d399', textTransform: 'uppercase' }}>{t('team.dna.eyebrow')}</span>
            <h2 style={{ fontFamily: FONT, fontWeight: 400, margin: '12px 0 0', fontSize: 'clamp(28px, 8.5vw, 38px)', letterSpacing: '-0.032em', lineHeight: 1.05, fontVariationSettings: '"opsz" 72' }}>
              {t('team.dna.heading')}
            </h2>
            <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.62, color: '#7a828c' }}>{t('team.dna.sub')}</p>
            <blockquote style={{ margin: '26px 0 0', padding: '20px 22px', borderLeft: '2px solid rgba(52,211,153,0.5)', background: 'rgba(255,255,255,0.03)', borderRadius: '0 12px 12px 0' }}>
              <p style={{ fontFamily: FONT, fontStyle: 'italic', fontSize: 16, lineHeight: 1.55, color: '#e6e9ec', margin: 0 }}>{t('team.dna.quote')}</p>
              <footer style={{ fontFamily: MONO, fontSize: 11, color: '#6ee7b7', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 14 }}>— {t('team.dna.attribution')}</footer>
            </blockquote>
          </section>
        </div>

        {/* Final CTA */}
        <section style={{ padding: '58px 24px 84px', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: -110, left: '50%', transform: 'translateX(-50%)', width: 340, height: 340, borderRadius: '50%', background: 'radial-gradient(circle, rgba(52,211,153,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <h2 style={{ fontFamily: FONT, fontWeight: 400, margin: '0 0 16px', fontSize: 'clamp(46px, 15vw, 70px)', letterSpacing: '-0.046em', lineHeight: 0.95, fontVariationSettings: '"opsz" 96' }}>
            {t('team.cta.h2')}
          </h2>
          <p style={{ fontSize: 15, color: '#7a828c', margin: '0 0 28px', lineHeight: 1.55 }}>{t('team.cta.body')}</p>
          <Link to={withLang('/contact', lang)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderRadius: 14, width: '100%', background: '#34d399', color: '#03130E', fontSize: 16, fontWeight: 600, letterSpacing: '-0.01em', textDecoration: 'none', fontFamily: FONT }}>
            {t('team.cta.btn')} <span>→</span>
          </Link>
        </section>

        <Footer />
      </div>

      {/* ═══════════════════════════════════════ DESKTOP ═══════════════════════════════════════ */}
      <div className="relative z-10 hidden md:block">
        <Navbar activePage="/team" />

        {/* Hero */}
        <section className="relative px-6 sm:px-10 lg:px-14 pt-16 pb-20 lg:pt-28 lg:pb-28">
          <div ref={heroInnerRef} className="max-w-[1440px] mx-auto w-full">
            <div className="max-w-[1100px]">
              <motion.span {...fadeUp(0)} className="block" style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.16em', color: '#34d399', textTransform: 'uppercase' }}>
                {t('team.kicker')}
              </motion.span>
              <motion.h1
                {...fadeUp(0.08)}
                className="m-0 mt-6 text-white"
                style={{ fontFamily: FONT, fontWeight: 500, fontSize: 'clamp(48px, 7vw, 104px)', lineHeight: 0.96, letterSpacing: '-0.046em', fontVariationSettings: '"opsz" 96' }}
              >
                {t('team.hero.h1.1')}{' '}
                <em style={{ fontWeight: 400, fontStyle: 'italic', color: '#6ee7b7', textShadow: '0 0 90px rgba(52,211,153,0.28), 0 0 32px rgba(52,211,153,0.14)' }}>
                  {t('team.hero.h1.2')}
                </em>
              </motion.h1>
              <motion.p {...fadeUp(0.22)} className="mt-9 max-w-[52ch] text-[#c0c5cb]" style={{ fontSize: 21, lineHeight: 1.5, letterSpacing: '-0.005em' }}>
                {t('team.hero.sub.1')}{' '}
                <span className="text-white">{t('team.hero.sub.accent')}</span>{t('team.hero.sub.2')}
              </motion.p>
            </div>
          </div>
        </section>

        <div style={{ background: '#050a0f', position: 'relative', zIndex: 10 }}>
          {/* Roster */}
          <section className="px-6 sm:px-10 lg:px-14 py-24 border-t border-white/[0.10]">
            <div className="max-w-[1440px] mx-auto w-full">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.16em', color: '#34d399', textTransform: 'uppercase' }}>{t('team.leadership.eyebrow')}</span>
                  <h2 className="m-0 mt-4 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(30px, 3.6vw, 52px)', lineHeight: 1.0, letterSpacing: '-0.032em', fontVariationSettings: '"opsz" 72' }}>
                    {t('team.leadership.heading')}
                  </h2>
                </div>
                <span className="hidden lg:block text-right" style={{ fontFamily: MONO, fontSize: 13, color: '#555d66', letterSpacing: '0.04em', maxWidth: 220, lineHeight: 1.5 }}>
                  {t('team.leadership.sub')}
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {team.map((m, i) => (
                  <motion.article
                    key={m.name}
                    {...fadeUp(0.05 * i)}
                    className="member-card group relative flex flex-col"
                  >
                    {/* portrait */}
                    <div className="member-portrait relative">
                      <div className="member-photo">
                        <Portrait
                          src={m.img}
                          alt={m.name}
                          imgPosition={m.imgPosition || 'center top'}
                          className="block w-full h-full object-cover"
                        />
                      </div>
                      {m.linkedin && (
                        <a
                          href={m.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${m.name} — LinkedIn`}
                          className="card-linkedin"
                        >
                          <LinkedInIcon className="w-[15px] h-[15px]" />
                        </a>
                      )}
                    </div>

                    {/* body */}
                    <div className="member-body">
                      <h3 className="card-name">{m.name}</h3>
                      <div className="card-role">{m.role}</div>
                      <span className="card-divider" aria-hidden="true" />
                      <p className="card-bio">{m.bio}</p>
                      <div className="card-skills">
                        {m.skills.map((s) => (
                          <span key={s} className="card-chip">{s}</span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* Company DNA */}
          <section className="px-6 sm:px-10 lg:px-14 py-28 border-t border-white/[0.06]">
            <div className="max-w-[1440px] mx-auto w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-24 items-center">
              <div className="max-w-[620px]">
                <span style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: '0.16em', color: '#34d399', textTransform: 'uppercase' }}>{t('team.dna.eyebrow')}</span>
                <h2 className="m-0 mt-5 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(32px, 4.2vw, 60px)', lineHeight: 1.02, letterSpacing: '-0.034em', fontVariationSettings: '"opsz" 96' }}>
                  {t('team.dna.heading')}
                </h2>
                <p className="mt-7 max-w-[52ch] text-[#c0c5cb]" style={{ fontSize: 18, lineHeight: 1.6, letterSpacing: '-0.005em' }}>
                  {t('team.dna.sub')}
                </p>
              </div>
              <blockquote
                className="m-0 relative"
                style={{ padding: '40px 40px 36px', borderRadius: 22, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <span aria-hidden="true" style={{ position: 'absolute', top: 14, left: 28, fontFamily: FONT, fontSize: 96, lineHeight: 1, color: 'rgba(52,211,153,0.16)' }}>“</span>
                <p className="relative" style={{ fontFamily: FONT, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(20px, 1.7vw, 26px)', lineHeight: 1.5, letterSpacing: '-0.012em', color: '#e6e9ec', margin: 0 }}>
                  {t('team.dna.quote')}
                </p>
                <footer style={{ fontFamily: MONO, fontSize: 12, color: '#6ee7b7', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 22 }}>
                  — {t('team.dna.attribution')}
                </footer>
              </blockquote>
            </div>
          </section>
        </div>

        {/* Final CTA */}
        <section className="px-6 sm:px-10 lg:px-14 pt-36 pb-16">
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="max-w-[900px]">
              <h2 className="m-0 mb-8 text-white" style={{ fontFamily: FONT, fontWeight: 400, fontSize: 'clamp(40px, 6vw, 96px)', lineHeight: 0.95, letterSpacing: '-0.040em', fontVariationSettings: '"opsz" 96' }}>
                {t('team.cta.h2')}
              </h2>
              <p className="mb-12 text-[#c0c5cb] max-w-[44ch]" style={{ fontSize: 20, lineHeight: 1.5, letterSpacing: '-0.005em' }}>
                {t('team.cta.body')}
              </p>
              <Link
                to={withLang('/contact', lang)}
                className="group inline-flex items-center gap-3 px-7 py-4 rounded-full font-semibold text-[15px]"
                style={{ color: '#03130E', background: '#34d399', letterSpacing: '-0.005em', boxShadow: '0 0 44px rgba(52,211,153,0.32)', transition: 'box-shadow .25s ease, transform .25s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 64px rgba(52,211,153,0.5)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 0 44px rgba(52,211,153,0.32)'; e.currentTarget.style.transform = 'none'; }}
              >
                {t('team.cta.btn')}
                <span className="transition-transform duration-[250ms] group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <style>{`
        em { font-style: italic; color: #6ee7b7; font-weight: 400; }

        /* ── Team dossier cards ─────────────────────────────────────── */
        .member-card {
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.018) 100%);
          border: 1px solid rgba(255,255,255,0.09);
          transition: transform .55s cubic-bezier(.2,.65,.25,1), border-color .55s ease, box-shadow .55s ease;
          will-change: transform;
        }
        .member-card:hover {
          transform: translateY(-6px);
          border-color: rgba(52,211,153,0.42);
          box-shadow:
            0 26px 60px -30px rgba(0,0,0,0.8),
            0 0 0 1px rgba(52,211,153,0.10),
            0 0 60px -16px rgba(52,211,153,0.28);
        }

        .member-portrait {
          display: flex;
          justify-content: center;
          padding: 26px 0 14px;
          background:
            radial-gradient(120% 80% at 50% 0%, rgba(52,211,153,0.06) 0%, transparent 62%),
            #070c11;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .member-photo {
          width: 170px;
          height: 212px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.10);
          background: #050a0f;
          transition: border-color .5s ease;
        }
        .member-photo img {
          filter: grayscale(0.26) contrast(1.02);
          transition: transform .85s cubic-bezier(.2,.65,.25,1), filter .55s ease;
        }
        .member-card:hover .member-photo { border-color: rgba(52,211,153,0.4); }
        .member-card:hover .member-photo img {
          transform: scale(1.05);
          filter: grayscale(0) contrast(1.03);
        }

        .card-linkedin {
          position: absolute; top: 11px; right: 11px;
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 10px;
          color: #d4d8dc;
          background: rgba(5,10,15,0.5);
          border: 1px solid rgba(255,255,255,0.14);
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          transition: color .3s ease, background .3s ease, border-color .3s ease, transform .3s ease;
        }
        .card-linkedin:hover {
          color: #03130E; background: #34d399; border-color: #34d399;
          transform: translateY(-1px);
        }

        .member-body { padding: 20px 22px 24px; display: flex; flex-direction: column; }
        .card-name {
          margin: 0; color: #fff; font-family: ${FONT}; font-weight: 400;
          font-size: clamp(20px, 1.5vw, 25px); letter-spacing: -0.024em; line-height: 1.06;
          font-variation-settings: "opsz" 48;
        }
        .card-role {
          margin-top: 9px; font-family: ${MONO}; font-size: 11.5px; color: #6ee7b7;
          letter-spacing: 0.07em; text-transform: uppercase; display: flex; align-items: center; gap: 8px;
        }
        .card-role::before {
          content: ''; width: 14px; height: 1px; background: #34d399; flex: none; opacity: 0.7;
        }
        .card-divider {
          display: block; height: 1px; margin: 16px 0 14px;
          background: rgba(255,255,255,0.09);
        }
        .card-bio {
          margin: 0; color: #8b929b; font-family: ${FONT};
          font-size: 14px; line-height: 1.55; letter-spacing: -0.002em;
        }
        .card-skills { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 16px; }
        .card-chip {
          font-family: ${MONO}; font-size: 10.5px; padding: 4px 9px; border-radius: 8px;
          color: #c0c5cb; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10); letter-spacing: 0.01em;
          transition: color .4s ease, border-color .4s ease;
        }
        .member-card:hover .card-chip { border-color: rgba(52,211,153,0.22); }

        @media (prefers-reduced-motion: reduce) {
          .member-card, .member-portrait img, .card-linkedin { transition: none; }
          .member-card:hover { transform: none; }
          .member-card:hover .member-portrait img { transform: none; }
        }
      `}</style>
    </div>
  );
};

export default TeamPage;
