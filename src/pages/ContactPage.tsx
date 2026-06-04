import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Briefcase, Send, CheckCircle, ArrowUpRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuroraField from '../components/AuroraField';
import { useLanguage } from '../i18n/LanguageContext';
import Seo, { SITE_URL } from '../components/Seo';

const FONT = '"Bricolage Grotesque", system-ui, sans-serif';
const MONO = 'ui-monospace, "SF Mono", "JetBrains Mono", "Roboto Mono", monospace';

const CONTACT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: `${SITE_URL}/contact`,
  name: 'Contact Erudi',
  description:
    'Get in touch with the Erudi team to discuss your bespoke AI project, partnership or support request.',
};

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

const CONTACT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzLs0ZihTwuPJ1FPHWni7YgYte0dLSH8tjEP0UFKizh6CV3sHm6EMVSgbLxSB-ng4jlGw/exec';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.8, delay, ease: [0.2, 0.65, 0.25, 1] as [number, number, number, number] },
});

// Shared input styling — quiet glass with an emerald focus ring.
const FIELD =
  'w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-white placeholder-white/30 ' +
  'focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/15 focus:bg-white/[0.05] transition';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_CONTACT_FORM_DATA);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const contactReasons = useMemo(() => [
    { icon: MessageSquare, title: t('contact.reason.0.title'), desc: t('contact.reason.0.desc'), value: 'general' },
    { icon: Briefcase,     title: t('contact.reason.1.title'), desc: t('contact.reason.1.desc'), value: 'business' },
    { icon: Mail,          title: t('contact.reason.2.title'), desc: t('contact.reason.2.desc'), value: 'support' },
  ], [t]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleReasonClick = (reasonValue: string) => {
    setFormData(prev => ({ ...prev, reason: reasonValue }));
    // On stacked (mobile) layouts the form sits below the picker — nudge to it.
    if (window.matchMedia('(max-width: 1023px)').matches) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  };

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      setError(t('contact.form.error'));
      console.error('Contact form submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, t]);

  return (
    <div className="relative min-h-screen bg-[#02040a] text-white overflow-x-clip" style={{ fontFamily: FONT }}>
      <Seo
        path="/contact"
        title={t('meta.contact.title')}
        description={t('meta.contact.desc')}
        jsonLd={CONTACT_JSON_LD}
      />

      <Navbar activePage="/contact" />

      <main>
        {/* ── Hero — a compact band lit by the aurora, dissolving into black ── */}
        <section className="relative overflow-hidden">
          <AuroraField />
          {/* dissolve the aurora into the page black toward the hero's foot */}
          <div
            aria-hidden
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{ background: 'linear-gradient(180deg, transparent 0%, transparent 44%, rgba(2,4,10,0.6) 74%, #02040a 100%)' }}
          />
          <motion.div
            {...fadeUp(0)}
            className="relative z-[2] mx-auto max-w-6xl px-5 sm:px-6 md:px-8"
            style={{ paddingTop: 'clamp(116px, 15vh, 152px)', paddingBottom: 'clamp(52px, 9vh, 96px)' }}
          >
            <div className="max-w-3xl">
              <h1
                className="text-white font-medium"
                style={{
                  fontSize: 'clamp(40px, 7vw, 76px)',
                  lineHeight: 0.98,
                  letterSpacing: '-0.04em',
                  fontVariationSettings: '"opsz" 96',
                }}
              >
                {t('contact.heading1')}{' '}
                <em className="not-italic">
                  <span
                    className="italic font-normal text-transparent bg-clip-text inline-block pr-[0.14em]"
                    style={{ backgroundImage: 'linear-gradient(100deg, #6ee7b7, #34d399 45%, #5eead4)' }}
                  >
                    {t('contact.heading2')}
                  </span>
                </em>
              </h1>

              <p className="mt-5 text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
                {t('contact.sub')}{' '}
                <span className="text-white/90 font-medium">{t('contact.sub.bold')}</span>
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── Form — directly beneath the hero, on solid black ── */}
        <section className="relative mx-auto max-w-6xl px-5 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* Left rail — reason picker + direct lines */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Direct email — pinned to the top of the rail */}
              <motion.a
                href="mailto:contact@erudi.app"
                className="group rounded-2xl p-4 sm:p-5 bg-white/[0.03] border border-white/10 hover:border-emerald-400/40 hover:bg-white/[0.05] transition-all duration-300 flex items-center gap-4"
              >
                <span className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-300" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-wider text-white/35" style={{ fontFamily: MONO }}>
                    {t('contact.email.label')}
                  </span>
                  <span className="block text-emerald-300 font-semibold group-hover:text-emerald-200 transition-colors truncate">
                    contact@erudi.app
                  </span>
                </span>
              </motion.a>

              {contactReasons.map(({ icon: Icon, title, desc, value }, index) => {
                const selected = formData.reason === value;
                return (
                  <motion.button
                    key={value}
                    type="button"
                    onClick={() => handleReasonClick(value)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    aria-pressed={selected}
                    className={`group relative text-left rounded-2xl p-4 sm:p-5 flex items-start gap-4 backdrop-blur-xl transition-all duration-300 border ${
                      selected
                        ? 'bg-emerald-500/[0.12] border-emerald-400/40 shadow-[0_0_44px_-8px_rgba(52,211,153,0.45)]'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                    }`}
                  >
                    {/* editorial index */}
                    <span
                      style={{ fontFamily: MONO }}
                      className={`mt-0.5 text-[11px] tabular-nums transition-colors ${selected ? 'text-emerald-300' : 'text-white/30'}`}
                    >
                      0{index + 1}
                    </span>

                    <span
                      className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${
                        selected
                          ? 'bg-emerald-500/20 border-emerald-400/50'
                          : 'bg-white/[0.04] border-white/10 group-hover:border-white/25'
                      }`}
                    >
                      <Icon className={`w-5 h-5 transition-colors ${selected ? 'text-emerald-300' : 'text-white/60 group-hover:text-white/80'}`} />
                    </span>

                    <span className="flex-1 min-w-0">
                      <span className="block text-[15px] font-semibold text-white">{title}</span>
                      <span className="block mt-0.5 text-[13px] leading-snug text-white/45">{desc}</span>
                    </span>

                    <ArrowUpRight
                      className={`w-4 h-4 mt-1 shrink-0 transition-all duration-300 ${
                        selected ? 'text-emerald-300 opacity-100' : 'text-white/30 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0'
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* Right — the form card */}
            <motion.div {...fadeUp(0.18)} className="lg:col-span-7" ref={formRef}>
              <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 bg-white/[0.04] border border-white/10 overflow-hidden">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="relative space-y-5 sm:space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                      <div>
                        <label htmlFor="name" className="block text-[13px] font-medium text-white/70 mb-2">
                          {t('contact.form.name')}
                        </label>
                        <input
                          type="text" id="name" name="name" required
                          value={formData.name} onChange={handleInputChange}
                          className={FIELD} placeholder={t('contact.form.name.placeholder')}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[13px] font-medium text-white/70 mb-2">
                          {t('contact.form.email')}
                        </label>
                        <input
                          type="email" id="email" name="email" required
                          value={formData.email} onChange={handleInputChange}
                          className={FIELD} placeholder={t('contact.form.email.placeholder')}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-[13px] font-medium text-white/70 mb-2">
                        {t('contact.form.company')}
                      </label>
                      <input
                        type="text" id="company" name="company"
                        value={formData.company} onChange={handleInputChange}
                        className={FIELD} placeholder={t('contact.form.company.placeholder')}
                      />
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-[13px] font-medium text-white/70 mb-2">
                        {t('contact.form.reason')}
                      </label>
                      <select
                        id="reason" name="reason" required
                        value={formData.reason} onChange={handleInputChange}
                        className={`${FIELD} appearance-none cursor-pointer`}
                      >
                        <option value="" className="bg-[#050a0f]">{t('contact.form.reason.placeholder')}</option>
                        <option value="general" className="bg-[#050a0f]">{t('contact.form.reason.general')}</option>
                        <option value="business" className="bg-[#050a0f]">{t('contact.form.reason.business')}</option>
                        <option value="support" className="bg-[#050a0f]">{t('contact.form.reason.support')}</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[13px] font-medium text-white/70 mb-2">
                        {t('contact.form.message')}
                      </label>
                      <textarea
                        id="message" name="message" rows={5} required
                        value={formData.message} onChange={handleInputChange}
                        className={`${FIELD} resize-none`} placeholder={t('contact.form.message.placeholder')}
                      />
                    </div>

                    {error && (
                      <div className="text-red-300 text-sm bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-3">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-60 text-[#02120c] px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-[0_8px_40px_-8px_rgba(52,211,153,0.6)] hover:shadow-[0_10px_50px_-6px_rgba(52,211,153,0.8)] hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#02120c]" />
                          <span>{t('contact.form.sending')}</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>{t('contact.form.send')}</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_-6px_rgba(52,211,153,0.55)]">
                      <CheckCircle className="h-10 w-10 text-emerald-300" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">{t('contact.success.heading')}</h3>
                    <p className="text-white/55 text-base sm:text-lg mb-8 leading-relaxed max-w-md mx-auto">
                      {t('contact.success.sub')}
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-emerald-300 hover:text-emerald-200 font-semibold transition-colors"
                    >
                      {t('contact.success.again')}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          <Footer />
        </section>
      </main>
    </div>
  );
};

export default ContactPage;
