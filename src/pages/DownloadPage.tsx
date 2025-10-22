import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, MonitorSpeaker, Apple, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { AnimatedSection } from '../assets/animatedSection';

const DownloadPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleMacDownload = () => {
    // Download the DMG file using the correct base URL path
    try {
      window.location.href = '/Erudi/erudi-Installer.dmg';
    } catch (error) {
      // Fallback: open in new tab if direct download fails
      window.open('/Erudi/erudi-Installer.dmg', '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <Navbar activePage="/Erudi/download" />
      
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
        <div className="max-w-7xl mx-auto mt-28">
          {/* Header Section */}
          <AnimatedSection delay={100}>
            <div className="text-center mb-20">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
                Download <span className="text-emerald-400">Erudi</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl text-emerald-400 mb-6">
                Get Started with Local AI
              </h2>
              <p className="text-white text-lg lg:text-xl max-w-2xl mx-auto">
                Feel free to download it and try it out, we need your feedback.
              </p>
            </div>
          </AnimatedSection>

          {/* Beta Notice Section */}
          <AnimatedSection delay={200}>
            <div className="max-w-4xl mx-auto mb-20">
              <div className="bg-[#272727]/20 backdrop-blur-lg rounded-2xl p-8 shadow-lg transition-colors duration-300">
                <div className="flex items-start space-x-4">
                  <Download className="h-8 w-8 text-emerald-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg lg:text-xl font-semibold text-emerald-400 mb-2">
                      Beta Version Available
                    </h3>
                    <p className="text-gray-300 text-sm lg:text-base">
                      This beta version gives you early access to Erudi's core features while we 
                      continue to refine and improve the experience. Your feedback is invaluable to us.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Download Buttons Section */}
          <AnimatedSection delay={300}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
              {/* Mac Download Button */}
              <motion.button
                onClick={handleMacDownload}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 backdrop-blur-lg rounded-2xl p-8 shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 border border-emerald-500/30"
              >
                <div className="flex items-start space-x-4">
                  <Apple className="h-12 w-12 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-left">
                    <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">
                      Download Beta for Mac
                    </h3>
                    <p className="text-emerald-100 text-sm lg:text-base mb-3">
                      Compatible with macOS
                    </p>
                    <div className="flex items-center text-emerald-200">
                      <Download className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">erudi-Installer.dmg</span>
                    </div>
                  </div>
                </div>
              </motion.button>

              {/* Windows Download Button (Disabled) */}
              <div className="bg-[#272727]/10 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-gray-600/20 opacity-60 cursor-not-allowed relative">
                <div className="flex items-start space-x-4">
                  <Monitor className="h-12 w-12 text-gray-400 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="text-lg lg:text-xl font-semibold text-gray-300 mb-2">
                      Download Beta for Windows
                    </h3>
                    <p className="text-gray-400 text-sm lg:text-base mb-3">
                      Coming Soon - We're working hard to bring Erudi to Windows
                    </p>
                    <div className="flex items-center text-gray-500">
                      <MonitorSpeaker className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">In Development</span>
                    </div>
                  </div>
                </div>
                {/* Coming Soon Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-gray-600/50 text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Additional Info Section */}
          <AnimatedSection delay={400}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-[#272727]/20 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                  Need Help Getting Started?
                </h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Check out our documentation or get in touch with our team if you need assistance 
                  with installation or have any questions about the beta version.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/Erudi/about"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-[20px] text-lg font-medium transition-colors shadow-lg inline-block"
                  >
                    Learn More
                  </Link>
                  <Link 
                    to="/Erudi/contact"
                    className="bg-transparent border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-black px-8 py-4 rounded-[20px] text-lg font-medium transition-colors inline-block"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Footer */}
          <footer className="mt-20">
            <AnimatedSection delay={500}>
              <div className="text-center text-gray-400 py-8 rounded-lg">
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

export default DownloadPage;