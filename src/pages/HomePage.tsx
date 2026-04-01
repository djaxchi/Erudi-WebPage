import React from 'react';
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
} from 'lucide-react';
import { ChatSimulation, ChatScenario } from '../components/ChatSimulation';
import PageLayout from '../components/PageLayout';
import Footer from '../components/Footer';
import { AnimatedSection } from '../assets/animatedSection';

// ── B2B Chat Scenarios ──────────────────────────────────────────────────────

const HOME_SCENARIOS: readonly ChatScenario[] = [
  {
    userMessage: 'We lose 3h/day reformulating prompts for our audit reports.',
    aiResponse:
      "We'll build a specialized model trained on your audit methodology. It generates reports in your format, with your terminology — zero prompt engineering needed.",
  },
  {
    userMessage: "Our client data can't leave our infrastructure.",
    aiResponse:
      'All Erudi solutions deploy on-premise or on your private cloud. Your data never leaves your environment. GDPR-compliant by design.',
  },
  {
    userMessage: 'How do we integrate AI into our existing SAP workflow?',
    aiResponse:
      'We plug directly into your existing stack — SAP, Salesforce, custom ERPs. Our solutions are built to fit your processes, not the other way around.',
  },
  {
    userMessage: 'We need AI that speaks our industry terminology.',
    aiResponse:
      'Every model we deliver is trained on your domain vocabulary and validated by your experts. No generic answers — only responses that match your standards.',
  },
];

// ── Pain Points Data ────────────────────────────────────────────────────────

const painPoints = [
  {
    icon: AlertTriangle,
    color: '#F59E0B',
    title: 'Endless prompting',
    desc: 'Hours wasted reformulating to get a usable answer',
  },
  {
    icon: ShieldAlert,
    color: '#EF4444',
    title: 'Non-sovereign data',
    desc: 'Your business data flows through third-party servers with no guarantees',
  },
  {
    icon: BrainCircuit,
    color: '#8B5CF6',
    title: 'Recurring hallucinations',
    desc: 'Plausible but wrong answers, impossible to detect without expertise',
  },
];

// ── Solution Cards Data ─────────────────────────────────────────────────────

const solutionCards = [
  {
    icon: Scan,
    title: 'Bespoke',
    desc: 'Every solution is built around your data, your processes and your domain vocabulary. No templates, no compromises.',
  },
  {
    icon: ShieldCheck,
    title: 'Sovereign & secure',
    desc: 'On-premise or private cloud deployment. Your data stays with you, under your full control. GDPR-compliant by design.',
  },
  {
    icon: Zap,
    title: 'Performant',
    desc: 'Models optimized for your use case, not generalist behemoths. Precise answers, minimal latency, controlled costs.',
  },
  {
    icon: Blocks,
    title: 'Industrialized',
    desc: 'From proof of concept to production deployment. Monitoring, maintenance and continuous evolution included.',
  },
];

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

// ── Placeholder Logos ───────────────────────────────────────────────────────

const PLACEHOLDER_LOGOS = [
  'Acme Corp',
  'Globex',
  'Initech',
  'Umbrella',
  'Stark Industries',
  'Wayne Enterprises',
];

// ── Component ───────────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  return (
    <PageLayout activePage="/">
      <div className="max-w-7xl mx-auto">
        {/* ─── Hero Section ─── */}
        <div className="mt-32 sm:mt-20 md:mt-20 mb-12 sm:mb-16 md:mb-20">
          <div className="space-y-10 sm:space-y-12 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column */}
            <AnimatedSection delay={100}>
              <div className="space-y-7">
                {/* Eyebrow Badge */}
                <motion.div {...fadeLeft(0)}>
                  <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                    <span className="text-xs sm:text-sm text-emerald-300 font-medium">
                      Bespoke AI solutions for the enterprise
                    </span>
                  </div>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  {...fadeLeft(0.1)}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08]"
                >
                  AI that understands{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
                    your business.
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  {...fadeLeft(0.2)}
                  className="text-white/70 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed"
                >
                  We design, industrialize and deploy artificial intelligence
                  solutions tailored to your expertise. Sovereign, secure,
                  ruthlessly effective.
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
                    Talk to an expert
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/desktop"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold text-gray-400 hover:text-white border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    Discover Erudi Desktop
                  </Link>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Right Column — Chat Simulation */}
            <motion.div {...fadeRight(0.2)}>
              <ChatSimulation
                scenarios={HOME_SCENARIOS}
                footerText="Ask anything about your business..."
                footerLink="/contact"
              />
            </motion.div>
          </div>
        </div>

        {/* ─── Logo Bar ─── */}
        <AnimatedSection delay={200}>
          <div className="py-12 sm:py-16 border-t border-b border-white/[0.06]">
            <p className="text-center text-xs sm:text-sm text-gray-500 font-medium tracking-[0.2em] uppercase mb-8">
              Trusted by industry leaders
            </p>
            <div
              className="relative overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              }}
            >
              <div className="flex animate-scroll w-max">
                {[...PLACEHOLDER_LOGOS, ...PLACEHOLDER_LOGOS].map(
                  (name, index) => (
                    <div
                      key={`${name}-${index}`}
                      className="flex-shrink-0 mx-10 sm:mx-14 flex items-center justify-center"
                    >
                      <div className="px-6 py-2 rounded bg-white/[0.04] border border-white/[0.06]">
                        <span className="text-sm font-medium text-white/20 whitespace-nowrap">
                          {name}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
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
                The problem
              </motion.p>
              <motion.h2
                {...fadeUp(0.1)}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl"
              >
                Generic AI is no longer enough.
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
                  Your teams spend hours reformulating prompts, correcting
                  hallucinations, adapting generic answers to your business
                  context. ChatGPT, Copilot and the like are built for
                  everyone — not for your expertise.
                </motion.p>
                <motion.p
                  {...fadeLeft(0.1)}
                  className="text-white/80 text-base sm:text-lg leading-relaxed font-medium"
                >
                  The result: marginal productivity gains, stalling adoption,
                  and a widening gap between the promise of AI and the reality
                  on the ground.
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
                      <Icon
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        style={{ color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                        {title}
                      </h3>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {desc}
                      </p>
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
                The solution
              </motion.p>
              <motion.h2
                {...fadeUp(0.1)}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl"
              >
                AI that embraces your know-how.
              </motion.h2>
              <motion.p
                {...fadeUp(0.2)}
                className="text-gray-400 text-base sm:text-lg mt-4 max-w-2xl leading-relaxed"
              >
                Erudi builds AI solutions rooted in your business reality — not
                off-the-shelf generalist gadgets.
              </motion.p>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {solutionCards.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                {...popUp(0.1 + index * 0.1)}
                className="group"
              >
                <div className="flex items-center gap-5 sm:gap-7 p-6 sm:p-8 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-emerald-500/20 rounded-2xl sm:rounded-3xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.08)]">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 group-hover:border-emerald-400/40 transition-colors">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                      {title}
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      {desc}
                    </p>
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
                Ready to transform your IT?
              </h2>
              <p className="text-gray-300 text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                Let's discuss your challenges. Our experts support you from
                initial audit to production deployment.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-10 sm:px-12 py-4 sm:py-5 rounded-xl sm:rounded-2xl text-lg sm:text-xl font-bold transition-all duration-300 shadow-[0_0_40px_rgba(0,193,124,0.4)] hover:shadow-[0_0_60px_rgba(0,193,124,0.6)] hover:-translate-y-0.5"
              >
                Talk to an expert
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>
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
