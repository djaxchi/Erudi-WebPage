import React from 'react';
import { AnimatedSection } from '../assets/animatedSection';

interface FooterProps {
  delay?: number;
}

const Footer: React.FC<FooterProps> = ({ delay = 700 }) => {
  return (
    <AnimatedSection delay={delay}>
      <footer className="text-center text-gray-400 py-8 sm:py-10 md:py-12 mt-16 sm:mt-24 md:mt-32 border-t border-emerald-800/20">
        <p className="text-xs sm:text-sm">© 2026 Erudi. All rights reserved.</p>
        <p className="text-xs mt-2">Made with ❤️ by the Erudi Team</p>
      </footer>
    </AnimatedSection>
  );
};

export default Footer;
