import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';

const App: React.FC = () => {
  return (
    <>
      <LandingPage />
      <Navbar />
    </>
  );
};

export default App;
