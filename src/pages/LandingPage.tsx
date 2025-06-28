import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Columns, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScreenshotCarousel } from '../components/ScreenshotCarousel';
import Navbar from '../components/Navbar';

// Intersection Observer hook & AnimatedSection
import { AnimatedSection } from '../assets/animatedSection'; // assume you've extracted this

const features = [
  { icon: ShieldCheck, title: 'Full Privacy', desc: 'Your data stays on your machine, end of story' },
  { icon: Columns, title: 'Built-in Arena', desc: 'Compare base vs. fine-tuned outputs side-by-side' },
  { icon: Database, title: 'Automated Cleaning', desc: 'Remove noise, normalize formats & enrich metadata in one click' },
  { icon: Cpu, title: 'GPU Training', desc: 'One-click fine-tuning on your local GPU—no CLI needed' },
];

const LandingPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const screenshotsCount = 5;

  useEffect(() => {
    const id = setInterval(() => setCurrent(c => (c + 1) % screenshotsCount), 6000);
    return () => clearInterval(id);
  }, [screenshotsCount]);

  const next = useCallback(() => setCurrent(c => (c + 1) % screenshotsCount), [screenshotsCount]);
  const prev = useCallback(() => setCurrent(c => (c - 1 + screenshotsCount) % screenshotsCount), [screenshotsCount]);

  const companies = [
    { name: 'Tesla', logo: './images/tesla-color.svg' },
    { name: 'Google', logo: './images/google-color.svg' },
    { name: 'Spotify', logo: './images/spotify-color.svg' },
    { name: 'Pinterest', logo: './images/pinterest-color.svg' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <Navbar />

      {/* Radial gradient & noise */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at top left, rgba(0,193,124,0.15), transparent 70%), radial-gradient(circle at bottom right, rgba(0,193,124,0.1), transparent 60%)',
      }} />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 pointer-events-none" />

      <main className="relative mx-auto pt-10 pb-20 px-8">
        <div className="max-w-10xl mx-10 mt-28 grid grid-cols-1 gap-12 min-[1300px]:grid-cols-2">
          {/* Left Column */}
          <AnimatedSection delay={100}>
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Turn Your Data into a <span className="text-emerald-400">Custom LLM</span>
            </h1>
            <h2 className="text-4xl lg:text-5xl text-emerald-400 mb-6">
              Local. No-Code. Fast.
            </h2>
            <p className="text-white text-xl mb-10">
              Drag &amp; drop your documents, choose your model, and watch Erudi handle the rest.
            </p>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 my-20">
              {features.map(({ icon: Icon, title, desc }, i) => (
                <AnimatedSection key={title} delay={200 + i * 100}>
                  <div className="flex items-start space-x-4 bg-[#272727]/20 hover:bg-emerald-700/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg transition">
                    <Icon className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{title}</h3>
                      <p className="text-gray-300 mt-1">{desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={800}>
              <div className="flex justify-center">
                <button className="bg-[#272727] hover:bg-emerald-700 text-white px-8 py-4 rounded-[20px] text-2xl font-medium transition-colors shadow-neon-emerald-2">
                  Try For Free
                </button>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Right Column */}
          <AnimatedSection delay={400}>
            <div className="w-full h-[400px] flex flex-col items-center justify-center space-y-6 mt-20">
              <ScreenshotCarousel current={current} />
              <div className="flex space-x-4">
                <button onClick={prev}
                  className="p-2 bg-[#041915]/80 backdrop-blur-xl rounded-full hover:bg-black/60 transition mr-4"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button onClick={next}
                  className="p-2 bg-[#041915]/80 backdrop-blur-xl rounded-full hover:bg-black/60 transition ml-4"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Trusted By */}
        <AnimatedSection delay={1000}>
          <div className="mt-32 max-w-2xl mx-auto text-center">
            <p className="text-gray-300 text-xl mb-6">Trusted by AI innovators at:</p>
            <div className="flex justify-center items-center space-x-12">
              {companies.map((c, i) => (
                <AnimatedSection key={c.name} delay={1100 + i * 100}>
                  <img
                    src={c.logo}
                    alt={`${c.name} logo`}
                    className="h-10 opacity-70 hover:opacity-100 transition-opacity"
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </main>
    </motion.div>
  );
};

export default LandingPage;
