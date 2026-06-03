// App.tsx
import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OpenSourcePage from './pages/OpenSourcePage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import WaitlistPage from './pages/WaitlistPage';
import DownloadPage from './pages/DownloadPage';
import { preloadImages, CRITICAL_IMAGES } from './utils/imageOptimization';
import { LanguageProvider, useLanguage, detectBrowserLang, storedPreference } from './i18n/LanguageContext';
import { parseLangPath, withLang } from './i18n/langPath';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Keep the content language locked to the URL (/fr -> French, else English).
const RouterLangSync: React.FC = () => {
  const { pathname } = useLocation();
  const { lang, applyUrlLang } = useLanguage();
  const urlLang = parseLangPath(pathname).lang;
  useLayoutEffect(() => {
    if (urlLang !== lang) applyUrlLang(urlLang);
  }, [urlLang, lang, applyUrlLang]);
  return null;
};

// First-visit only: send a French-preferring visitor from an English (root)
// URL to its /fr counterpart. Runs once per session and never redirects an
// English crawler (which detects as 'en'), so / stays indexed as English.
const AutoLangRedirect: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    try {
      if (sessionStorage.getItem('erudi-redirected')) return;
      sessionStorage.setItem('erudi-redirected', '1');
    } catch {
      return;
    }
    const { lang: urlLang, base } = parseLangPath(pathname);
    if (urlLang !== 'en') return; // already on a French URL
    const pref = storedPreference() ?? detectBrowserLang();
    if (pref === 'fr') navigate(withLang(base, 'fr'), { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

// Pages that exist in both languages (root = English, /fr = French).
const BILINGUAL = [
  { path: '/', element: <HomePage /> },
  { path: '/opensource', element: <OpenSourcePage /> },
  { path: '/team', element: <TeamPage /> },
  { path: '/contact', element: <ContactPage /> },
];

const App: React.FC = () => {
  // Preload critical images on app startup
  useEffect(() => {
    preloadImages(CRITICAL_IMAGES).catch(console.warn);
  }, []);

  // Get base path dynamically
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // Remove trailing slash

  return (
  <LanguageProvider>
  <BrowserRouter basename={base}>
    <ScrollToTop />
    <RouterLangSync />
    <AutoLangRedirect />

    <Routes>
      {/* Bilingual pages: English at root, French under /fr */}
      {BILINGUAL.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      {BILINGUAL.map(({ path, element }) => (
        <Route key={`fr${path}`} path={path === '/' ? '/fr' : `/fr${path}`} element={element} />
      ))}

      {/* English-only utility pages */}
      <Route path="/download" element={<DownloadPage />} />
      <Route path="/waitlist" element={<WaitlistPage />} />

      {/* Redirects: /about and the legacy /desktop -> /opensource (both languages) */}
      <Route path="/about" element={<Navigate to="/opensource" replace />} />
      <Route path="/fr/about" element={<Navigate to="/fr/opensource" replace />} />
      <Route path="/desktop" element={<Navigate to="/opensource" replace />} />
      <Route path="/fr/desktop" element={<Navigate to="/fr/opensource" replace />} />

      {/* Catch-alls: never render a blank page; stay in-language where possible */}
      <Route path="/fr/*" element={<Navigate to="/fr" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
  </LanguageProvider>
  );
};

export default App;
