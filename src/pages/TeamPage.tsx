import React, { memo, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  imgPosition?: string;
  imgFit?: 'cover' | 'contain';
}> = memo(({ src, alt, className = "", priority = false, imgPosition, imgFit }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        ...(imgPosition ? { objectPosition: imgPosition } : {}),
        ...(imgFit ? { objectFit: imgFit } : {}),
      }}
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

const TeamPage: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const criticalImages = [
      getAssetPath('/Erudi/images/djalil.png'),
      getAssetPath('/Erudi/images/rayan.png'),
      getAssetPath('/Erudi/images/sami.png'),
    ];
    preloadImages(criticalImages).catch(console.warn);
  }, []);

  const team = useMemo(() => [
    {
      name: 'Djalil Chikhi',
      role: 'CEO',
      img: getAssetPath('/Erudi/images/djalil.png'),
      imgPosition: 'center top',
      bio: t('team.member.0.bio'),
      skills: [t('team.member.0.skill.0'), t('team.member.0.skill.1')],
      linkedin: 'https://linkedin.com/in/djalil-chikhi'
    },
    {
      name: 'Rayan Hanader',
      role: 'CTO',
      img: getAssetPath('/Erudi/images/rayan.png'),
      bio: t('team.member.1.bio'),
      skills: [t('team.member.1.skill.0'), t('team.member.1.skill.1')],
      linkedin: 'https://linkedin.com/in/rayanhanader'
    },
    {
      name: 'Selyane Cheklat',
      role: 'COO',
      img: getAssetPath('/Erudi/images/ChatGPT Image 1 avr. 2026, 11_53_09.png'),
      imgPosition: 'center top',
      bio: t('team.member.2.bio'),
      skills: [t('team.member.2.skill.0'), t('team.member.2.skill.1')],
      linkedin: ''
    },
    {
      name: 'Sami Taider',
      role: 'Application Architect',
      img: getAssetPath('/Erudi/images/sami.png'),
      bio: t('team.member.3.bio'),
      skills: [t('team.member.3.skill.0'), t('team.member.3.skill.1'), t('team.member.3.skill.2')],
      linkedin: 'https://linkedin.com/in/sami-taider'
    },
    {
      name: 'Youssef Chaouki',
      role: 'AI Engineer',
      img: getAssetPath('/Erudi/images/Youssef-C.jpg'),
      imgPosition: 'center top',
      bio: t('team.member.4.bio'),
      skills: [t('team.member.4.skill.0'), t('team.member.4.skill.1')],
      linkedin: 'https://linkedin.com/in/youssef-chaouki'
    },
    {
      name: 'Youssef Laatar',
      role: 'Infrastructure Engineer',
      img: getAssetPath('/Erudi/images/Youssef-L.jpeg'),
      bio: t('team.member.5.bio'),
      skills: [t('team.member.5.skill.0'), t('team.member.5.skill.1')],
      linkedin: 'https://linkedin.com/in/youssef-laatar'
    },
  ], [t]);

  return (
    <PageLayout activePage="/team" mainClassName="pt-20">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <AnimatedSection delay={100}>
          <div className="text-center mb-20 mt-32 sm:mt-20 md:mt-20">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              {t('team.hero.h1.1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">{t('team.hero.h1.2')}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto">
              {t('team.hero.sub.1')}{' '}
              <span className="text-emerald-400 font-semibold">{t('team.hero.sub.accent')}</span>{t('team.hero.sub.2')}
            </p>
          </div>
        </AnimatedSection>

        {/* Meet the Visionaries Section */}
        <AnimatedSection delay={200}>
          <div className="mb-32">
            <div className="text-center mb-4">
              <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-2">{t('team.leadership.eyebrow')}</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-16">{t('team.leadership.heading')}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto mb-8"></div>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                {t('team.leadership.sub')}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] hover:from-white/[0.12] hover:to-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.15)] hover:-translate-y-2">
                    <div className="relative mb-6">
                      <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden border-2 border-emerald-500/30 group-hover:border-emerald-400/50 transition-all duration-300 shadow-lg bg-[#050a0f]">
                        <OptimizedImage
                          src={member.img}
                          alt={member.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                          imgPosition={member.imgPosition}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-emerald-300 mb-1 group-hover:text-emerald-200 transition-colors">{member.name}</h3>
                      <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-3">
                        <span className="text-sm text-emerald-300 font-semibold">{member.role}</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-2 justify-center mb-4">
                        {member.skills.map((skill, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-emerald-500/15 text-emerald-300 rounded-full border border-emerald-500/30">
                            {skill}
                          </span>
                        ))}
                      </div>
                      {member.linkedin ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.linkedin, '_blank');
                          }}
                          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group/btn"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs group-hover/btn:underline">{t('team.linkedin')}</span>
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-2 invisible">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs">{t('team.linkedin')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Company DNA Section */}
        <AnimatedSection delay={300}>
          <div className="mb-32">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-12">
              <div className="text-center mb-8">
                <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4">{t('team.dna.eyebrow')}</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  {t('team.dna.heading')}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {t('team.dna.sub')}
                </p>
              </div>
              <div className="bg-white/[0.05] border border-white/5 rounded-2xl p-8">
                <p className="text-white text-lg italic leading-relaxed text-center">
                  {t('team.dna.quote')}
                </p>
                <p className="text-emerald-400 text-center mt-4 font-semibold">{t('team.dna.attribution')}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <Footer delay={400} />
      </div>
    </PageLayout>
  );
};

export default TeamPage;
