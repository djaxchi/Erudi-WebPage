import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, MonitorSpeaker, Apple, Monitor, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AnimatedSection } from '../assets/animatedSection';

const DownloadPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMacDownload = () => {
    // Create a proper download link with the download attribute
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}erudi-Installer.dmg`;
    link.download = 'erudi-Installer.dmg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-[#050a0f] text-white overflow-hidden"
    >
      <Navbar activePage="/download" />
      
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
          {/* Header Section */}
          <div className="mt-8 sm:mt-12 md:mt-16 mb-12 sm:mb-16 md:mb-20">
            <AnimatedSection delay={100}>
              <div className="space-y-4 sm:space-y-6 md:space-y-8 text-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 backdrop-blur-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm text-emerald-300 font-medium">Early Access Beta</span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                >
                  Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">Erudi</span>
                </motion.h1>
                
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
                >
                  Start training custom models locally. <span className="font-bold text-white">Your feedback shapes the future.</span>
                </motion.p>
              </div>
            </AnimatedSection>
          </div>

          {/* Beta Notice Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.15)]">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                    <Download className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                      Beta Version Available
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      This beta version gives you early access to Erudi's core features while we 
                      continue to refine and improve the experience. Your feedback is invaluable to us.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Download Buttons Section */}
          <AnimatedSection delay={300}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20">
              {/* Mac Download Button */}
              <motion.button
                onClick={handleMacDownload}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="group h-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,193,124,0.4)] hover:shadow-[0_0_60px_rgba(0,193,124,0.6)] transition-all duration-300 border border-emerald-400/30"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Apple className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">
                      Download for Mac
                    </h3>
                    <p className="text-emerald-50 text-sm sm:text-base mb-3 sm:mb-4">
                      Compatible with macOS 11.0 or later
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/15 border border-white/20">
                      <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">erudi-Installer.dmg</span>
                    </div>
                  </div>
                </div>
              </motion.button>

              {/* Windows Download Button (Disabled) */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                className="relative h-full bg-gradient-to-br from-white/[0.05] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 opacity-60 cursor-not-allowed"
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gray-500/10 border border-gray-500/20 flex items-center justify-center flex-shrink-0">
                    <Monitor className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-gray-400" />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-300 mb-2 sm:mb-3">
                      Download for Windows
                    </h3>
                    <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                      Coming Soon - In Active Development
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gray-600/20 border border-gray-600/30">
                      <MonitorSpeaker className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-xs sm:text-sm font-medium text-gray-500">In Development</span>
                    </div>
                  </div>
                </div>
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-gray-600/30 border border-gray-500/30 text-gray-300 text-xs font-semibold">
                    Coming Soon
                  </span>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Additional Info Section */}
          <AnimatedSection delay={400}>
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center hover:border-emerald-500/30 transition-all duration-300">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
                  Need Help Getting Started?
                </h3>
                <p className="text-gray-300 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
                  Check out our documentation or get in touch with our team if you need assistance 
                  with installation or have any questions about the beta version.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/about"
                    className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 shadow-[0_0_30px_rgba(0,193,124,0.3)] hover:shadow-[0_0_50px_rgba(0,193,124,0.5)] hover:-translate-y-0.5"
                  >
                    Learn More
                  </Link>
                  <Link 
                    to="/contact"
                    className="inline-block bg-transparent border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Footer */}
          <AnimatedSection delay={500}>
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

export default DownloadPage;