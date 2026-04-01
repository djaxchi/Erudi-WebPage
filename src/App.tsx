// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import WaitlistPage from './pages/WaitlistPage';
import DownloadPage from './pages/DownloadPage';
import { preloadImages, CRITICAL_IMAGES } from './utils/imageOptimization';
import { AnimatedOrb } from './components/AnimatedOrb';
import { LanguageProvider } from './i18n/LanguageContext';

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
    {/* Global animated orb that appears on all pages */}
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <AnimatedOrb />
    </div>

    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />
      <Route
        path="/desktop"
        element={<LandingPage />}
      />
      <Route
        path="/download"
        element={<DownloadPage />}
      />
      <Route
        path="/about"
        element={<Navigate to="/desktop" replace />}
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
    </Routes>
  </BrowserRouter>
  </LanguageProvider>
  );
};

export default App;
