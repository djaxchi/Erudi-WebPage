import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

interface PageLayoutProps {
  activePage: string;
  children: React.ReactNode;
  mainClassName?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ activePage, children, mainClassName = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-[#050a0f] text-white overflow-hidden"
    >
      <Navbar activePage={activePage} />

      {/* Animated grid background */}
      <div className="grid-background" />

      {/* Radial gradient backgrounds for depth */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 30% 20%, rgba(16, 35, 56, 0.6), transparent 40%), radial-gradient(circle at 70% 60%, rgba(0, 193, 124, 0.08), transparent 50%), radial-gradient(circle at 50% 100%, rgba(10, 25, 40, 0.5), transparent 60%)',
        }}
      />

      <main className={`relative z-10 mx-auto mt-8 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 ${mainClassName}`}>
        {children}
      </main>
    </motion.div>
  );
};

export default PageLayout;
