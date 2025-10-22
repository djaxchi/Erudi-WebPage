import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Briefcase, Send, CheckCircle, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import { AnimatedSection } from '../assets/animatedSection';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  reason: string;
  message: string;
}

const INITIAL_CONTACT_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  company: '',
  reason: '',
  message: ''
};

// TODO: Replace with actual Google Apps Script URL for contact form
const CONTACT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYoZEv3cOw6HWhKhFxaSY6TPnaKF72yr9WfJUxquroxW2J3elrJP-SGfAeiGcGQ4hizA/exec';

const contactReasons = [
  { 
    icon: MessageSquare, 
    title: 'General Info', 
    desc: 'Questions about Erudi and how it works',
    value: 'general'
  },
  { 
    icon: Briefcase, 
    title: 'Business Inquiry', 
    desc: 'Partnership opportunities and enterprise solutions',
    value: 'business'
  },
  { 
    icon: Mail, 
    title: 'Support & Advice', 
    desc: 'Technical help and guidance',
    value: 'support'
  },
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_CONTACT_FORM_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReasonClick = (reasonValue: string) => {
    setFormData(prev => ({
      ...prev,
      reason: reasonValue
    }));
    // Scroll to form smoothly
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('reason', formData.reason);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('timestamp', new Date().toISOString());
      formDataToSend.append('type', 'contact'); // Distinguish from waitlist submissions
      
      const response = await fetch(CONTACT_GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData(INITIAL_CONTACT_FORM_DATA); // Reset form
      } else {
        throw new Error('Failed to submit contact form');
      }
      
    } catch (err) {
      setError('Failed to send message. Please try again or email us directly.');
      console.error('Contact form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen bg-[#050a0f] text-white overflow-hidden"
    >
      <Navbar activePage="/contact" />

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
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mt-12 sm:mt-12 md:mt-16 mb-12 sm:mb-16 md:mb-20">
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
                  <span className="text-xs sm:text-sm text-emerald-300 font-medium">We're Here to Help</span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                >
                  Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">Touch</span>
                </motion.h1>
                
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
                >
                  Have questions about Erudi? Need technical advice? <span className="font-bold text-white">We'd love to hear from you.</span>
                </motion.p>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Reasons */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {contactReasons.map(({ icon: Icon, title, desc, value }, index) => (
                <motion.button
                  key={title}
                  onClick={() => handleReasonClick(value)}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease: "easeOut" }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group cursor-pointer"
                >
                  <div className="h-full bg-gradient-to-br from-white/[0.08] to-white/[0.04] hover:from-white/[0.12] hover:to-white/[0.08] backdrop-blur-xl border border-white/10 hover:border-emerald-500/30 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,193,124,0.15)] text-center">
                    {/* Icon */}
                    <div className="mb-4 sm:mb-5 flex justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/50 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-emerald-400" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{title}</h3>
                    
                    {/* Description */}
                    <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>

                    {/* Click hint */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-emerald-400 font-semibold">Click to select →</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <AnimatedSection delay={400}>
            <div className="max-w-2xl mx-auto" ref={formRef}>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 hover:border-emerald-500/30 transition-all duration-300"
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition"
                        placeholder="Your company (optional)"
                      />
                    </div>

                    {/* Reason */}
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-white mb-2">
                        What can we help you with? *
                      </label>
                      <select
                        id="reason"
                        name="reason"
                        required
                        value={formData.reason}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition"
                      >
                        <option value="" className="bg-[#050a0f]">Select a reason</option>
                        <option value="general" className="bg-[#050a0f]">General Information</option>
                        <option value="business" className="bg-[#050a0f]">Business Inquiry</option>
                        <option value="support" className="bg-[#050a0f]">Support & Advice</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition resize-none"
                        placeholder="Tell us more about your needs, questions, or how we can help..."
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2 sm:pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:from-emerald-600/50 disabled:to-emerald-500/50 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-[0_0_40px_rgba(0,193,124,0.4)] hover:shadow-[0_0_60px_rgba(0,193,124,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:hover:translate-y-0"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                      <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Message Sent!</h3>
                    <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-md mx-auto">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                    >
                      Send another message →
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Additional Info */}
          <AnimatedSection delay={600}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="mt-12 sm:mt-16 md:mt-20 text-center"
            >
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto hover:border-emerald-500/30 transition-all duration-300">
                <p className="text-gray-300 text-base sm:text-lg mb-3 sm:mb-4">
                  Prefer email? Reach us directly at
                </p>
                <a 
                  href="mailto:erudipro@gmail.com" 
                  className="text-emerald-400 hover:text-emerald-300 text-xl sm:text-2xl font-bold transition inline-flex items-center gap-2"
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  erudipro@gmail.com
                </a>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* Footer */}
          <AnimatedSection delay={700}>
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

export default ContactPage;