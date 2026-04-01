import React from 'react';
import { AnimatedSection } from '../assets/animatedSection';
import { useLanguage } from '../i18n/LanguageContext';

interface FooterProps {
  delay?: number;
}

const Footer: React.FC<FooterProps> = ({ delay = 700 }) => {
  const { t } = useLanguage();
  return (
    <AnimatedSection delay={delay}>
      <footer className="text-center text-gray-400 py-8 sm:py-10 md:py-12 mt-16 sm:mt-24 md:mt-32 border-t border-emerald-800/20">
        <p className="text-xs sm:text-sm">{t('footer.rights')}</p>
        <p className="text-xs mt-2">{t('footer.made')}</p>
      </footer>
    </AnimatedSection>
  );
};

export default Footer;
