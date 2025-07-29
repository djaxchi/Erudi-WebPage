import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Briefcase, Send, CheckCircle } from 'lucide-react';
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <Navbar activePage="/Erudi/contact" />

      {/* Radial gradient & noise */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at top left, rgba(0,193,124,0.15), transparent 70%), radial-gradient(circle at bottom right, rgba(0,193,124,0.1), transparent 60%)',
      }} />
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-5 pointer-events-none" />

      <main className="relative mx-auto pt-10 pb-20 px-8">
        <div className="max-w-4xl mx-auto mt-28">
          
          {/* Header */}
          <AnimatedSection delay={100}>
            <div className="text-center mb-16">
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Get in <span className="text-emerald-400">Touch</span>
              </h1>
              <p className="text-white text-xl max-w-2xl mx-auto">
                Have questions about Erudi? Need technical advice? Want to explore business opportunities? 
                We'd love to hear from you.
              </p>
            </div>
          </AnimatedSection>

          {/* Contact Reasons */}
          <AnimatedSection delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {contactReasons.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex flex-col items-center text-center bg-[#272727]/20 hover:bg-emerald-700/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg transition"
                >
                  <Icon className="h-12 w-12 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                  <p className="text-gray-300 text-sm">{desc}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={400}>
            <div className="max-w-2xl mx-auto">
              <div className="bg-[#272727]/20 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/10">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition"
                        placeholder="Your company (optional)"
                      />
                    </div>

                    {/* Reason */}
                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-300 mb-2">
                        What can we help you with? *
                      </label>
                      <select
                        id="reason"
                        name="reason"
                        required
                        value={formData.reason}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition"
                      >
                        <option value="">Select a reason</option>
                        <option value="general">General Information</option>
                        <option value="business">Business Inquiry</option>
                        <option value="support">Support & Advice</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition resize-none"
                        placeholder="Tell us more about your needs, questions, or how we can help..."
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                        {error}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-600/50 text-white px-8 py-4 rounded-xl text-lg font-medium transition-colors shadow-lg flex items-center justify-center space-x-2"
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
                    <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-300 mb-6">
                      Thanks for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Additional Info */}
          <AnimatedSection delay={600}>
            <div className="mt-16 text-center">
              <p className="text-gray-300 text-lg mb-4">
                Prefer email? Reach us directly at
              </p>
              <a 
                href="mailto:erudipro@gmail.com" 
                className="text-emerald-400 hover:text-emerald-300 text-xl font-medium transition"
              >
                erudipro@gmail.com
              </a>
            </div>
          </AnimatedSection>

          {/* Footer */}
          <footer className="mt-20">
            <div className="text-center text-gray-400 py-8 rounded-lg">
              <p className="text-sm">© 2025 Erudi. All rights reserved.</p>
              <p className="text-xs mt-2">Made with ❤️ by the Erudi Team</p>
            </div>
          </footer>
        </div>
      </main>
    </motion.div>
  );
};

export default ContactPage;