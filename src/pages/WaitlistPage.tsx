import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

interface FormData {
  email: string;
  name: string;
  company: string;
  useCase: string;
}

const INITIAL_FORM_DATA: FormData = {
  email: '',
  name: '',
  company: '',
  useCase: ''
};

// TODO: Replace with actual Google Apps Script URL when ready for production
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9Zdis409aU19j6pd8lKXwEqtSklBTIVApgvkYlL_jC0XiigkKmBB9DAwCQGeBpLqJrg/exec';

const WaitlistPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      formDataToSend.append('useCase', formData.useCase);
      formDataToSend.append('timestamp', new Date().toISOString());
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit');
      }
      
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative  min-h-screen bg-black text-white overflow-hidden"
      >
        <Navbar activePage="/waitlist" />

        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(circle at top left, rgba(0,193,124,0.15), transparent 70%), radial-gradient(circle at bottom right, rgba(0,193,124,0.1), transparent 60%)',
        }} />

        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center max-w-md"
          >
            <CheckCircle className="h-20 w-20 text-emerald-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">You're on the list!</h1>
            <p className="text-gray-300 text-lg mb-8">
              We'll notify you as soon as Erudi is ready. Get ready to transform your data into powerful AI models!
            </p>
            <Link
              to="/"
              className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <Navbar activePage="/waitlist" />

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at top left, rgba(0,193,124,0.15), transparent 70%), radial-gradient(circle at bottom right, rgba(0,193,124,0.1), transparent 60%)',
      }} />

      <div className="relative mt-16 w-full z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-sm"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <Mail className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
            <h1 className="text-3xl font-bold mb-2">Join the Waitlist</h1>
            <p className="text-gray-300 text-base">
              Be the first to know when Erudi launches and get early access to transform your data into custom LLMs.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#272727]/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#272727]/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-1">
                Company/Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#272727]/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                placeholder="Your company (optional)"
              />
            </div>

            <div>
              <label htmlFor="useCase" className="block text-sm font-medium mb-1">
                What would you use Erudi for?
              </label>
              <textarea
                id="useCase"
                name="useCase"
                rows={2}
                value={formData.useCase}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-[#272727]/40 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 resize-none"
                placeholder="Tell us about your use case (optional)"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Joining...</span>
                </>
              ) : (
                <span>Join Waitlist</span>
              )}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition inline-flex items-center space-x-1 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>

        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="mt-20">
        <div className=" text-center text-gray-400 py-6 rounded-lg">
          <p className="text-sm">© 2025 Erudi. All rights reserved.</p>
          <p className="text-xs mt-2">Made with ❤️ by the Erudi Team</p>
        </div>
      </footer>
    </motion.div>
  );
};

export default WaitlistPage;
