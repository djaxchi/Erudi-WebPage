// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WaitlistPage from './pages/WaitlistPage';
import DownloadPage from './pages/DownloadPage';
import { preloadImages, CRITICAL_IMAGES } from './utils/imageOptimization';
import { AnimatedOrb } from './components/AnimatedOrb';

const App: React.FC = () => {
  // Preload critical images on app startup
  useEffect(() => {
    preloadImages(CRITICAL_IMAGES).catch(console.warn);
  }, []);

  // Get base path dynamically
  const base = import.meta.env.BASE_URL.replace(/\/$/, ''); // Remove trailing slash

  return (
  <BrowserRouter basename={base}>
    {/* Global animated orb that appears on all pages */}
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <AnimatedOrb />
    </div>
    
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar activePage="/" />
            <LandingPage />
          </>
        }
      />
      <Route
        path="/download"
        element={<DownloadPage />}
      />
      <Route
        path="/about"
        element={<AboutPage />}
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
  );
};

export default App;
