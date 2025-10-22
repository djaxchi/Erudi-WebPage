import React, { memo, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AnimatedSection } from '../assets/animatedSection';
import { preloadImages } from '../utils/imageOptimization';
import '../styles/performance.css';

// Optimized Image Component with lazy loading and error handling
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

// Memoized floating particles for better performance
const FloatingParticles: React.FC = memo(() => {
  const particles = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    })), []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full animate-float filter blur-sm opacity-50"
          style={{
            left: particle.left,
            top: particle.top,
            animationDuration: '2s',
            animationDelay: '2s',
          }}
        />
      ))}
    </div>
  );
});

FloatingParticles.displayName = 'FloatingParticles';

const CTAButton: React.FC = memo(() => (
  <Link to="/Erudi/download">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
    >
      Try for Free
    </motion.button>
  </Link>
));

CTAButton.displayName = 'CTAButton';



const AboutPage: React.FC = () => {
  // Preload critical images for better performance
  useEffect(() => {
    const criticalImages = [
      '/Erudi/images/about-us-image-1.png',
      '/Erudi/images/about-us-image-2.png',
      '/Erudi/images/about-us-image-3.png',
      '/Erudi/images/djalil.png',
      '/Erudi/images/rayan.png',
      '/Erudi/images/sami.png',
    ];
    preloadImages(criticalImages).catch(console.warn);
  }, []);

  // Memoized data to prevent unnecessary re-calculations
  const availableModels = useMemo(() => [
    { 
      name: 'Mistral-7B', 
      desc: "A high-performance, open-source 7B LLM. Fine-tune locally with Erudi's no-code interface." 
    },
    // Additional models will be added in future releases
  ], []);

  const requirements = useMemo(() => [
    'NVIDIA GPU with ≥8 GB VRAM (CUDA-capable)',
    '16 GB RAM recommended',
    'Windows 10+ / macOS 12+ / Linux (x86_64)',
    'Disk space: ~20 GB for model weights',
  ], []);

  const team = useMemo(() => [
    { 
      name: 'Djalil Chikhi', 
      role: 'Team Lead', 
      img: '/Erudi/images/djalil.png', 
      bio: 'Leads the team and drives product vision.',
      linkedin: 'https://linkedin.com/in/djalil-chikhi' 
    },
    { 
      name: 'Rayan Hanader', 
      role: 'AI Engineer', 
      img: '/Erudi/images/rayan.png', 
      bio: 'Develops and optimizes machine learning tasks.',
      linkedin: 'https://linkedin.com/in/rayanhanader'
    },
    { 
      name: 'Sami Taider', 
      role: 'Full Stack Engineer', 
      img: '/Erudi/images/sami.png', 
      bio: 'Implements user interfaces and integrates APIs.',
      linkedin: 'https://linkedin.com/in/sami-taider'
    },
    { 
      name: 'Youssef Chaouki', 
      role: 'Data Engineer', 
      img: '/Erudi/images/YoussefC.png', 
      bio: 'Designs and maintains dataset cleaning pipelines.',
      linkedin: 'https://linkedin.com/in/youssef-chaouki'
    },
    { 
      name: 'Mathieu Jarry', 
      role: 'Commercial Lead', 
      img: '/Erudi/images/mathieu.png', 
      bio: 'Handles business development and commercial strategies.',
      linkedin: 'https://linkedin.com/in/mathieu-jarry-a086b6334'
    },
    { 
      name: 'Youssef Laatar', 
      role: 'Infrastructure Engineer', 
      img: '/Erudi/images/youssefL.png', 
      bio: 'Works on computational resources and their optimization.',
      linkedin: 'https://linkedin.com/in/youssef-laatar'
    },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <Navbar activePage="/Erudi/about" />
      
      <div className="fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at top left, rgba(0,193,124,0.15), transparent 70%), radial-gradient(circle at bottom right, rgba(0,193,124,0.1), transparent 60%)',
        }} 
      />
      <FloatingParticles />

      <div className="relative z-10 mt-28 container mx-auto px-4 py-16">

        {/* Hero Section */}
    <AnimatedSection delay={0}>
      <div className="relative  backdrop-blur-lg rounded-2xl p-10 mb-20 overflow-visible">
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-10 overflow-visible">
          
          {/* Text column */}
          <div className="flex-1 space-y-4 z-10">
            <h1 className="text-4xl lg:text-5xl mb-14 font-extrabold text-emerald-400">
              About Erudi
            </h1>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg text-white">
                Do you find your AI too general, not connected enough to your field?
              </p>
              <p className="text-lg text-white">
                Want to leverage your data for superior performance while keeping it secure?
              </p>
              <p className="text-lg font-thin text-white">
                No pipeline hassles or CLI needed—Erudi handles cleaning, analysis, and fine-tuning for you.
              </p>
              <p className="text-lg font-thin text-white">
                Access models, drag & drop your folders, and hit Train. Instantly infuse your custom dataset.
              </p>
              <p className="text-lg font-thin text-white">
                Compare models in Arena, tweak creativity or token limits, and explore differences in the Infinite Sandbox.
              </p>
            </div>
          </div>

          {/* Image column: overflows to the right */}
          <div className="relative overflow-visible z-0">
            <OptimizedImage
              src="/Erudi/images/about-us-image-1.png"
              alt="About Us Hero"
              className="
                object-cover  h-[300px] lg:h-[400px]
                max-w-full
                transform scale-105 
                shadow-2xl 
                rounded-2xl
              "
              priority={true}
            />
          </div>

        </div>
      </div>
    </AnimatedSection>
            {/* Beta Requirements */}
            <AnimatedSection delay={200}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 mx-8">
                <div>
                  <div className=" bg-[#041915]/80 backdrop-blur-xl shadow-lg rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Beta Requirements</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-200 mb-6">
                      {requirements.map((r: string, i: number) => <li key={i}>{r}</li>)}
                    </ul>
                    <CTAButton />
                  </div>
                </div>
                <div className="hidden lg:block">
                  <div className="w-full h-80 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center">
                    <OptimizedImage
                      src="/Erudi/images/about-us-image-3.png"
                      alt="About Us Hero"
                      className="object-cover object-center w-full h-full transform shadow-2xl rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Available Models */}
            <AnimatedSection delay={200}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20 mx-8">
                <div className="hidden lg:block">
                    <div className="w-full h-64 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center overflow-hidden mx-auto">
                      <OptimizedImage
                      src="/Erudi/images/about-us-image-2.png"
                      alt="About Us Hero"
                      className="object-cover object-center w-full h-full transform shadow-2xl rounded-2xl"
                      />
                    </div>
                </div>
                <div>
                  <div className=" bg-[#041915]/80 backdrop-blur-xl shadow-lg rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Available Models</h2>
                    {availableModels.map((m: { name: string; desc: string }, i: number) => (
                      <div key={i} className="mb-4">
                        <h3 className="text-lg font-bold text-white">• {m.name}</h3>
                        <p className="text-gray-200 text-sm leading-relaxed">{m.desc}</p>
                      </div>
                    ))}
                    <CTAButton />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Meet The Team */}
            <AnimatedSection delay={200}>
              <div className="mb-32 text-left mx-8">
                <h2 className="text-4xl lg:text-5xl font-extrabold text-emerald-400">Meet The Team</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 mx-8">
                {team.map((p: { name: string; role: string; img: string; bio: string; linkedin: string }, i: number) => (
                  <AnimatedSection key={i} delay={200 + i*100}>
                    <div 
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center cursor-pointer hover:bg-white/20 transition-all duration-300 group"
                      onClick={() => window.open(p.linkedin, '_blank')}
                    >
                        <div className="w-48 h-48 -mt-28 mb-4 bg-white/5 backdrop-blur-md rounded-full overflow-hidden flex items-center justify-center mx-auto">
                        <OptimizedImage 
                          src={p.img} 
                          alt={`Photo of ${p.name}`} 
                          className="object-cover transform scale-110 group-hover:scale-125 transition-all duration-300 w-full h-full" 
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">{p.name}</h3>
                      <p className="text-emerald-300 text-sm mb-2">{p.role}</p>
                      <p className="text-gray-200 text-sm leading-relaxed mb-3">{p.bio}</p>
                      <div className="flex justify-center items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs">View LinkedIn</span>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </AnimatedSection>

            {/* Footer */}
            <footer className="mt-32">
              <AnimatedSection delay={600}>
                <div className=" text-center text-gray-400 py-8 rounded-lg">
                  <p className="text-sm">© 2025 Erudi. All rights reserved.</p>
                  <p className="text-xs mt-2">Made with ❤️ by the Erudi Team</p>
                </div>
              </AnimatedSection>
            </footer>
          </div>
        </motion.div>
  );
};

export default AboutPage;
