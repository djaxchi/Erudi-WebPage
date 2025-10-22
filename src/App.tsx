// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WaitlistPage from './pages/WaitlistPage';
import DownloadPage from './pages/DownloadPage';
import { preloadImages, CRITICAL_IMAGES } from './utils/imageOptimization';

const App: React.FC = () => {
  // Preload critical images on app startup
  useEffect(() => {
    preloadImages(CRITICAL_IMAGES).catch(console.warn);
  }, []);

  return (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/Erudi" replace />}
      />
      <Route
      path="/Erudi"
      element={
        <>
        <Navbar activePage="/Erudi" />
        <LandingPage />
        </>
      }
      />
      <Route
      path="/Erudi/download"
      element={<DownloadPage />}
      />
      <Route
      path="/Erudi/about"
      element={
        <>
        <Navbar activePage="/Erudi/about" />
        <AboutPage />
        </>
      }
      />
      <Route
      path="/Erudi/contact"
      element={
        <>
        <Navbar activePage="/Erudi/contact" />
        <ContactPage />
        </>
      }
      />
      <Route
      path="/Erudi/waitlist"
      element={<WaitlistPage />}
      />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
