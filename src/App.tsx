// App.tsx
import React, { useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OpenSourcePage from './pages/OpenSourcePage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import WaitlistPage from './pages/WaitlistPage';
import DownloadPage from './pages/DownloadPage';
import { preloadImages, CRITICAL_IMAGES } from './utils/imageOptimization';
import { LanguageProvider } from './i18n/LanguageContext';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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

<Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/opensource"
        element={<OpenSourcePage />}
      />
      <Route
        path="/download"
        element={<DownloadPage />}
      />
      <Route
        path="/about"
        element={<Navigate to="/opensource" replace />}
      />
      <Route
        path="/team"
        element={<TeamPage />}
      />
      <Route
        path="/contact"
        element={<ContactPage />}
      />
      <Route
        path="/waitlist"
        element={<WaitlistPage />}
      />
      {/* Legacy route: /desktop was renamed to /opensource. */}
      <Route
        path="/desktop"
        element={<Navigate to="/opensource" replace />}
      />
      {/* Catch-all: never render a blank page for an unknown path. */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  </BrowserRouter>
  </LanguageProvider>
  );
};

export default App;
