import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Columns, Database, Cpu, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChatSimulation } from '../components/ChatSimulation';
import Navbar from '../components/Navbar';
import { AnimatedSection } from '../assets/animatedSection';

const features = [
  { 
    icon: ShieldCheck, 
    label: 'Local Processing',
    title: 'Complete Privacy', 
    desc: 'Your data never leaves your machine, train models with absolute confidence' 
  },
  { 
    icon: Columns, 
    label: 'Model Comparison',
    title: 'Built-in Arena', 
    desc: 'Compare base vs. fine-tuned models side-by-side with interactive evaluation' 
  },
  { 
    icon: Database, 
    label: 'Auto Processing',
    title: 'Smart Data Pipeline', 
    desc: 'Automated cleaning, normalization and enrichment, from raw data to training-ready' 
  },
  { 
    icon: Cpu, 
    label: 'Zero-Code Training',
    title: 'Accelerated Training', 
    desc: 'One-click fine-tuning optimized for your hardware, no CLI or coding required' 
  },
];

const LandingPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-[#050a0f] text-white overflow-hidden"
    >
      <Navbar activePage="/" />
      
      {/* Animated grid background */}
      <div className="grid-background" />

      {/* Radial gradient backgrounds for depth */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(16, 35, 56, 0.6), transparent 40%), radial-gradient(circle at 70% 60%, rgba(0, 193, 124, 0.08), transparent 50%), radial-gradient(circle at 50% 100%, rgba(10, 25, 40, 0.5), transparent 60%)',
        }} 
      />

      <main className="relative z-10 mx-auto mt-8 sm:pt-8 md:pt-12 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="mt-8 sm:mt-12 md:mt-16 mb-12 sm:mb-16 md:mb-20">
            <AnimatedSection delay={100}>
              <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center lg:text-left">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm text-emerald-300 font-medium">Revolutionary AI Training Platform</span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                >
                  Turn Your Data into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">Custom LLM</span>
                </motion.h1>
                
                {/* Subheading */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300"
                >
                  Local. No-Code. Fast.
                </motion.h2>
                
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto lg:mx-0 leading-relaxed"
                >
                  Drag & drop your documents, choose your model, and watch Erudi handle the rest. <span className="font-bold text-white">No coding required.</span>
                </motion.p>
              </div>
            </AnimatedSection>
          </div>

          {/* Features Grid */}
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
                    {/* Icon */}
                    <div className="mb-4 sm:mb-5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/50 transition-colors">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-emerald-400" />
                      </div>
                    </div>
                    
                    {/* Label */}
                    <div className="inline-block px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 mb-3 sm:mb-4">
                      <span className="text-xs text-emerald-300 font-semibold">{label}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{title}</h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section with Chat Simulation */}
          <div className="space-y-10 sm:space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-start">
            {/* Left Column - CTA */}
            <AnimatedSection delay={400}>
              <div className="space-y-6 sm:space-y-8">
                <motion.h2
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight flex sm:justify-center lg:justify-start"
                >
                  Ready to Transform Your Data?
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed flex sm:text-center lg:text-left"
                >
                  Join thousands of developers who are already training custom models locally with Erudi. No cloud dependencies, no data privacy concerns, no coding required.
                </motion.p>

                {/* CTA Button */}
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
                    Get Early Access →
                  </Link>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="text-sm text-gray-400 text-center lg:text-left"
                >
                  Join an <span className="text-emerald-400 font-semibold">early access community</span> of AI enthusiasts
                </motion.p>

                {/* What you get section */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-5">What you get:</h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-center gap-3 text-gray-200 text-sm sm:text-base">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(0,193,124,0.6)] flex-shrink-0" />
                      <span>Free to get started</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-200 text-sm sm:text-base">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(0,193,124,0.6)] flex-shrink-0" />
                      <span>No credit card required</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-200 text-sm sm:text-base">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(0,193,124,0.6)] flex-shrink-0" />
                      <span>Works on Mac, Windows & Linux</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-200 text-sm sm:text-base">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(0,193,124,0.6)] flex-shrink-0" />
                      <span>Complete privacy & security</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Right Column - Chat Simulation */}
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

          {/* Footer */}
          <AnimatedSection delay={600}>
            <footer className="text-center text-gray-400 py-8 sm:py-10 md:py-12 mt-16 sm:mt-24 md:mt-32 border-t border-emerald-800/20">
              <p className="text-xs sm:text-sm">© 2025 Erudi. All rights reserved.</p>
              <p className="text-xs mt-2">Made with ❤️ by the Erudi Team</p>
            </footer>
          </AnimatedSection>
        </div>
      </main>
    </motion.div>
  );
};

export default LandingPage;


