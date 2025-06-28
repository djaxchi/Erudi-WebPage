// App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
      path="/"
      element={
        <>
        <Navbar activePage="/download" />
        <LandingPage />
        </>
      }
      />
      <Route
      path="/download"
      element={
        <>
        <Navbar activePage="/download" />
        <LandingPage />
        </>
      }
      />
      <Route
      path="/about"
      element={
        <>
        <Navbar activePage="/about" />
        <AboutPage />
        </>
      }
      />
      <Route
      path="/contact"
      element={
        <>
        <Navbar activePage="/contact" />
        <ContactPage />
        </>
      }
      />
    </Routes>
  </BrowserRouter>
);

export default App;
