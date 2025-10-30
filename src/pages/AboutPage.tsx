import React, { memo, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AnimatedSection } from '../assets/animatedSection';
import { preloadImages } from '../utils/imageOptimization';
import { getAssetPath } from '../utils/assetPath';
import { Cpu, Shield, Zap, Users, Award, Monitor, Apple } from 'lucide-react';
import '../styles/performance.css';

// Optimized Image Component
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

const AboutPage: React.FC = () => {
  // Preload critical images
  useEffect(() => {
    const criticalImages = [
      getAssetPath('/Erudi/images/djalil.png'),
      getAssetPath('/Erudi/images/rayan.png'),
      getAssetPath('/Erudi/images/sami.png'),
    ];
    preloadImages(criticalImages).catch(console.warn);
  }, []);

  const whyChooseFeatures = useMemo(() => [
    {
      icon: Cpu,
      title: 'Local Processing',
      description: 'Train models directly on your hardware with GPU acceleration'
    },
    {
      icon: Shield,
      title: 'Data Privacy',
      description: 'Your data never leaves your machine - complete privacy guaranteed'
    },
    {
      icon: Zap,
      title: 'No-Code Interface',
      description: 'Drag, drop, and train - no command line or coding required'
    },
    {
      icon: Users,
      title: 'Model Comparison',
      description: 'Built-in arena to compare and evaluate different model versions'
    },
  ], []);

  const supportedModels = useMemo(() => [
    {
      name: 'Mistral-7B',
      badge: 'Foundation',
      description: 'Base Mistral 7B model for general fine-tuning tasks with excellent performance',
      params: '7B parameters'
    },
    {
      name: 'Mistral-Nemo-12B',
      badge: 'Advanced',
      description: "Mistral and NVIDIA's model with enhanced reasoning and extended context capabilities",
      params: '12B parameters'
    },
    {
      name: 'Mistral-7B Variants',
      badge: 'Community',
      description: 'Hundreds of community fine-tuned Mistral-7B models from Hugging Face',
      params: 'Various specializations'
    },
    {
      name: 'Gemma 1B',
      badge: 'Ultra-Light',
      description: "Google's most efficient model, perfect for edge devices and mobile deployment",
      params: '1B parameters'
    },
    {
      name: 'Gemma 2B',
      badge: 'Lightweight',
      description: "Google's efficient model for resource-constrained environments",
      params: '2B parameters'
    },
    {
      name: 'Gemma 4B',
      badge: 'Balanced',
      description: "Google's versatile model offering excellent performance-to-resource ratio",
      params: '4B parameters'
    },
    {
      name: 'Gemma 7B',
      badge: 'High Performance',
      description: "Google's powerful model with advanced reasoning capabilities",
      params: '7B parameters'
    },
    {
      name: 'Gemma 12B',
      badge: 'Enterprise',
      description: "Google's largest SLM model with superior performance for complex tasks",
      params: '12B parameters'
    },
    {
      name: 'More Coming Soon',
      badge: '',
      description: "We're actively developing support for more models to give you maximum choice",
      params: 'Stay tuned for updates'
    },
  ], []);

  const team = useMemo(() => [
    {
      name: 'Djalil Chikhi',
      role: 'CEO',
      img: getAssetPath('/Erudi/images/djalil.png'),
      bio: 'Leads the team and drives product vision.',
      skills: ['Product Strategy', 'AI Research'],
      linkedin: 'https://linkedin.com/in/djalil-chikhi'
    },
    {
      name: 'Rayan Hanader',
      role: 'Chief AI Scientist',
      img: getAssetPath('/Erudi/images/rayan.png'),
      bio: 'Develops and optimizes machine learning tasks.',
      skills: ['Deep Learning', 'Model Optimization'],
      linkedin: 'https://linkedin.com/in/rayanhanader'
    },
    {
      name: 'Sami Taider',
      role: 'Application Architect',
      img: getAssetPath('/Erudi/images/sami.png'),
      bio: 'Implements user interfaces and integrates APIs.',
      skills: ['React', 'Node.js', 'System Design'],
      linkedin: 'https://linkedin.com/in/sami-taider'
    },
    {
      name: 'Youssef Chaouki',
      role: 'Data Engineer',
      img: getAssetPath('/Erudi/images/YoussefC.png'),
      bio: 'Designs and maintains dataset cleaning pipelines.',
      skills: ['Data Processing', 'Pipeline Architecture'],
      linkedin: 'https://linkedin.com/in/youssef-chaouki'
    },
    {
      name: 'Youssef Laatar',
      role: 'Infrastructure Engineer',
      img: getAssetPath('/Erudi/images/youssefL.png'),
      bio: 'Works on computational resources and optimization.',
      skills: ['Infrastructure', 'System Optimization'],
      linkedin: 'https://linkedin.com/in/youssef-laatar'
    },
    {
      name: 'Mathieu Jarry',
      role: 'Commercial Lead',
      img: getAssetPath('/Erudi/images/mathieu.png'),
      bio: 'Handles business and commercial strategies.',
      skills: ['Business Strategy', 'Sales'],
      linkedin: 'https://linkedin.com/in/mathieu-jarry-a086b6334'
    },
  ], []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-[#050a0f] text-white overflow-hidden"
    >
      <Navbar activePage="/about" />

      {/* Animated grid background */}
      <div className="grid-background" />

      {/* Radial gradient backgrounds */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 30% 20%, rgba(16, 35, 56, 0.6), transparent 40%), radial-gradient(circle at 70% 60%, rgba(0, 193, 124, 0.08), transparent 50%), radial-gradient(circle at 50% 100%, rgba(10, 25, 40, 0.5), transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto mt-8 pt-20 pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Hero Section */}
          <AnimatedSection delay={100}>
            <div className="text-center mb-20 mt-32 sm:mt-20 md:mt-20">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">Erudi</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto">
                The future of <span className="text-emerald-400 font-semibold">AI specialization</span> is here. Local, secure, and accessible to everyone.
              </p>
            </div>
          </AnimatedSection>

          {/* Democratizing AI Training Section */}
          <AnimatedSection delay={200}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
              {/* Left side - Text fades in from left */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-6"
              >
                <motion.h2
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                  className="text-4xl lg:text-5xl font-bold text-white"
                >
                  Democratizing AI Training
                </motion.h2>
                <div className="space-y-4 text-gray-300 text-lg">
                  {[
                    "Traditional AI fine-tuning requires extensive technical knowledge, expensive cloud resources, and often compromises your data privacy.",
                    "Erudi changes everything.",
                    "Our platform brings enterprise-grade AI training capabilities directly to your desktop, with an intuitive drag-and-drop interface that anyone can use.",
                    "Train models locally, keep your data secure, and achieve professional results without the complexity or cost of traditional solutions."
                  ].map((text, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.15 + idx * 0.1, ease: "easeOut" }}
                      className={idx === 1 ? "text-emerald-400 font-semibold" : ""}
                    >
                      {text}
                    </motion.p>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
                  className="pt-4"
                >
                  <Link
                    to="/download"
                    className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-[0_0_40px_rgba(0,193,124,0.4)] hover:shadow-[0_0_60px_rgba(0,193,124,0.6)]"
                  >
                    Get Early Access
                  </Link>
                </motion.div>
              </motion.div>

              {/* Right side - Image fades in from right */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:block"
              >
                <OptimizedImage
                  src={getAssetPath('/Erudi/images/about-us-image-1.png')}
                  alt="Democratizing AI Training"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                  priority={true}
                />
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Why Choose Erudi Section */}
          <AnimatedSection delay={300}>
            <div className="mb-32">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl lg:text-5xl font-bold text-white text-center mb-6"
              >
                Why Choose Erudi?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-center text-gray-300 text-lg mb-16 max-w-3xl mx-auto"
              >
                Built for the modern AI practitioner who values privacy, simplicity, and performance
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyChooseFeatures.map(({ icon: Icon, title, description }, index) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.2 + index * 0.12, 
                      ease: "easeOut"
                    }}
                    className="relative group"
                  >
                    <div className="h-full bg-gradient-to-br from-white/[0.08] to-white/[0.04] hover:from-white/[0.12] hover:to-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-3xl p-7 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.15)] hover:-translate-y-1">
                      <div className="mb-5">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/50 transition-colors">
                          <Icon className="w-7 h-7 text-emerald-400" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Supported Models Section */}
          <AnimatedSection delay={400}>
            <div className="mb-32">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl lg:text-5xl font-bold text-center mb-6"
              >
                Supported <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">Models</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-center text-gray-300 text-lg mb-16"
              >
                Fine-tune the latest models and seamlessly integrate with Hugging Face
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportedModels.map((model, index) => (
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.2 + index * 0.1, 
                      ease: "easeOut"
                    }}
                    className={`relative group bg-gradient-to-br from-white/[0.08] to-white/[0.04] hover:from-white/[0.12] hover:to-white/[0.08] backdrop-blur-xl border ${model.name === 'More Coming Soon' ? 'border-purple-500/20 hover:border-purple-400/40' : 'border-white/10 hover:border-emerald-500/30'} rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.15)] hover:-translate-y-1`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{model.name}</h3>
                      {model.badge && (
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          model.badge === 'Foundation' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                          model.badge === 'Community' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                          model.badge === 'Ultra-Light' ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' :
                          model.badge === 'Lightweight' ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30' :
                          'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                        }`}>
                          {model.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {model.description}
                    </p>
                    <p className="text-gray-400 text-xs">{model.params}</p>
                  </motion.div>
                ))}
              </div>

              {/* Hugging Face Integration */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="mt-8 bg-gradient-to-br from-[#2a1a0f]/70 to-[#1a0f05]/70 backdrop-blur-md border border-orange-800/30 rounded-3xl p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🤗</span>
                  <h3 className="text-2xl font-bold text-white">Hugging Face Integration</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p><span className="text-orange-400 font-semibold">One-Click Publishing:</span> Deploy models directly to Hugging Face</p>
                  <p><span className="text-orange-400 font-semibold">Community Access:</span> Use any community model as starting point</p>
                  <p><span className="text-orange-400 font-semibold">Model Sharing:</span> Share your fine-tuned models globally</p>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* System Requirements Section */}
          <AnimatedSection delay={500}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-32"
            >
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-center mb-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  >
                    <Award className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-4xl font-bold text-white mb-4">System Requirements</h2>
                  <p className="text-gray-300 text-lg">Optimized for modern hardware with GPU acceleration</p>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Windows Requirements */}
                  <div className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 border border-blue-500/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Monitor className="w-8 h-8 text-blue-400" />
                      <h3 className="text-xl font-bold text-white">Windows Requirements</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: 'NVIDIA GPU with ≥8 GB VRAM (CUDA 12.x)' },
                        { label: 'Windows 10+' },
                        { label: '8 GB RAM recommended' },
                        { label: 'Disk space: ~15 GB for model weights and cache' },
                      ].map((req, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-200 text-sm">{req.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mac Requirements */}
                  <div className="bg-gradient-to-br from-gray-500/5 to-gray-600/5 border border-gray-500/20 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Apple className="w-8 h-8 text-gray-400" />
                      <h3 className="text-xl font-bold text-white">Mac Requirements</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        { label: 'Apple Silicon (M1/M2/M3/M4)' },
                        { label: '8 GB RAM recommended' },
                        { label: 'Disk space: ~10 GB for model weights and cache' },
                      ].map((req, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-gray-500/20 border border-gray-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-200 text-sm">{req.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-10 p-6 bg-white/[0.05] border border-white/5 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-3">Beta Access</h3>
                  <p className="text-gray-300 mb-4">
                    Join our beta program and be among the first to experience the future of AI training.
                  </p>
                  <Link
                    to="/download"
                    className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-3 rounded-xl text-base font-bold transition-all duration-300"
                  >
                    Get Early Access
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Meet the Visionaries Section */}
          <AnimatedSection delay={600}>
            <div className="mb-32">
              <div className="text-center mb-4">
                <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-2">LEADERSHIP TEAM</p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-16">Meet the Visionaries</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto mb-8"></div>
                <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                  Six engineering students from INSA Lyon building the future of AI accessibility
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {team.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] hover:from-white/[0.12] hover:to-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-3xl p-6 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.15)] hover:-translate-y-2">
                      <div className="relative mb-6">
                        <div className="w-40 h-40 mx-auto rounded-2xl overflow-hidden border-2 border-emerald-500/30 group-hover:border-emerald-400/50 transition-all duration-300 shadow-lg">
                          <OptimizedImage
                            src={member.img}
                            alt={member.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
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
                          <span className="text-xs group-hover/btn:underline">View LinkedIn</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Company DNA Section */}
          <AnimatedSection delay={700}>
            <div className="mb-32">
              <div className="max-w-5xl mx-auto bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                <div className="text-center mb-8">
                  <p className="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-4">COMPANY DNA</p>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                    Building the Future of AI, Together
                  </h2>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    We're six computer science engineering students from INSA Lyon, passionate about making AI technology more accessible. United by our shared vision of democratizing powerful AI training for everyone.
                  </p>
                </div>
                <div className="bg-white/[0.05] border border-white/5 rounded-2xl p-8">
                  <p className="text-white text-lg italic leading-relaxed text-center">
                    "We believe that the future of AI should be accessible, secure, and empowering for everyone. Our mission is to break down the barriers between cutting-edge AI technology and the people who need it most."
                  </p>
                  <p className="text-emerald-400 text-center mt-4 font-semibold">— The Erudi Team</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Final CTA Section */}
          <AnimatedSection delay={800}>
            <div className="mb-20">
              <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#0f2621]/90 to-[#0a1410]/90 backdrop-blur-md border-2 border-emerald-600/40 rounded-3xl p-12 text-center shadow-[0_0_80px_rgba(0,193,124,0.3)]">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Transform Your AI Workflow?
                </h2>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of developers, researchers, and businesses already using Erudi to train better models faster and more securely.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/download"
                    className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all duration-300 shadow-[0_0_40px_rgba(0,193,124,0.5)] hover:shadow-[0_0_60px_rgba(0,193,124,0.7)]"
                  >
                    Get Early Access
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-block bg-transparent hover:bg-emerald-950/30 text-white px-10 py-4 rounded-2xl text-lg font-bold border-2 border-emerald-600/40 hover:border-emerald-500/60 transition-all duration-300"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Footer */}
          <footer className="text-center text-gray-400 py-12 border-t border-emerald-800/20">
            <p className="text-sm">© 2025 Erudi. All rights reserved.</p>
            <p className="text-xs mt-2">Made with ❤️ by the Erudi Team</p>
          </footer>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
