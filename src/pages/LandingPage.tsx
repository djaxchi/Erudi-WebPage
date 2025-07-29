import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Columns, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatSimulation } from '../components/ChatSimulation';
import Navbar from '../components/Navbar';
import { AnimatedSection } from '../assets/animatedSection';

const features = [
  { 
    icon: ShieldCheck, 
    title: 'Full Privacy', 
    desc: 'Your data stays on your machine, end of story' 
  },
  { 
    icon: Columns, 
    title: 'Built-in Arena', 
    desc: 'Compare base vs. fine-tuned outputs side-by-side' 
  },
  { 
    icon: Database, 
    title: 'Automated Cleaning', 
    desc: 'Remove noise, normalize formats & enrich metadata in one click' 
  },
  { 
    icon: Cpu, 
    title: 'GPU Training', 
    desc: 'One-click fine-tuning on your local GPU—no CLI needed' 
  },
];

const CTAButton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <Link 
    to="/Erudi/waitlist"
    className={`bg-[#272727] hover:bg-emerald-700 text-white px-8 py-4 rounded-[20px] text-2xl font-medium transition-colors shadow-neon-emerald-2 inline-block ${className}`}
  >
    Try For Free
  </Link>
);

const LandingPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <Navbar activePage="/Erudi" />
      
      {/* Top gradient fade */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-6 bg-gradient-to-b from-black to-transparent z-50" />

      {/* Background effects */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(circle at top left, rgba(0,193,124,0.15), transparent 70%), radial-gradient(circle at bottom right, rgba(0,193,124,0.1), transparent 60%)',
        }} 
      />

      <main className="relative mx-auto pt-10 pb-20 px-8">
        <div className="max-w-7xl mx-auto mt-28 grid grid-cols-1 gap-12 min-[1300px]:grid-cols-2">
          {/* Hero Section */}
          <AnimatedSection delay={100}>
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                Turn Your Data into a <span className="text-emerald-400">Custom LLM</span>
              </h1>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl text-emerald-400">
                Local. No-Code. Fast.
              </h2>
              <p className="text-white text-lg lg:text-xl max-w-2xl">
                Drag &amp; drop your documents, choose your model, and watch Erudi handle the rest.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12">
                {features.map(({ icon: Icon, title, desc }, index) => (
                  <AnimatedSection key={title} delay={200 + index * 100}>
                    <div className="flex items-start space-x-4 bg-[#272727]/20 hover:bg-emerald-700/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg transition-colors duration-300">
                      <Icon className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg lg:text-xl font-semibold text-white">{title}</h3>
                        <p className="text-gray-300 text-sm lg:text-base mt-1">{desc}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* Mobile CTA */}
              <AnimatedSection delay={100}>
                <div className="flex justify-center pt-8 min-[1300px]:hidden">
                  <CTAButton />
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Chat Demo Section */}
          <AnimatedSection delay={400}>
            <div className="flex flex-col items-center justify-center space-y-8 mt-20 min-[1300px]:mt-0">
              <ChatSimulation />
              
              {/* Desktop CTA */}
              <AnimatedSection delay={500}>
                <div className="hidden min-[1300px]:block">
                  <CTAButton />
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>

          {/* Footer */}
          <footer className="col-span-1 min-[1300px]:col-span-2 mt-20">
            <AnimatedSection delay={600}>
              <div className=" text-center text-gray-400 py-8 rounded-lg">
                <p className="text-sm">© 2025 Erudi. All rights reserved.</p>
                <p className="text-xs mt-2">Made with ❤️ by the Erudi Team</p>
              </div>
            </AnimatedSection>
          </footer>
        </div>
      </main>
    </motion.div>
  );
};

export default LandingPage;
