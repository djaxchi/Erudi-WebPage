//pages/qpage.tsx
import React, { useState } from 'react';
import VoiceRecognition from "../components/VoiceRecognition";
import TranscriptDisplay from "../components/TranscriptDisplay";
import { TranscriptProvider } from '../context/TranscriptContext';
import WriteOrb from "../components/WriteOrb";

const QPage: React.FC = () => {
    
    const [swapped, setSwapped] = useState(false);
  
    // When either orb is clicked, toggle the swapped state
    const toggleSwap = () => {
      setSwapped((prev) => !prev);
    };
    return (
        
        <TranscriptProvider>
        <div className="relative h-screen w-screen overflow-hidden bg-black text-white">
          {/* Purple Glow Top-Left */}
          <div className="pointer-events-none absolute top-0 left-0 h-64 w-64 rounded-full bg-purple-700 opacity-40 blur-3xl" />
          {/* Purple Glow Bottom-Right */}
          <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-purple-700 opacity-40 blur-3xl" />
    
          {/* 
            Main container:
            Using flex to center vertically,
            but we'll shift horizontally for a slight left offset.
          */}
          <div className="flex h-full items-center justify-center">
            {/* 
              Wrapper for question + orbs,
              shifted left with negative translate-x.
              Adjust the percentage/px to fine-tune how far left it goes.
            */}
            <div className="relative -translate-x-1/3">
              {/* The "printer slot" or line container */}
                <div
                className="
                    relative
                    w-80
                    h-32
                    overflow-hidden
                    bottom-4
                "
                >
                {/* The paper is absolutely positioned at the bottom */}
                <div
                    className="
                    absolute
                    bottom-0
                    w-full
                    rounded-t-lg
                    bg-white
                    px-6
                    py-3
                    text-black
                    shadow-lg
                    animate-slideFromLine
                    "
                >
                    <span className="text-lg font-medium">
                    Djalil Chikhi
                    </span>
                </div>
                </div>
    
              {/* Question + Subtext */}
              <h1 className="mb-2 text-5xl font-bold">
                Quel est votre nom complet ?
              </h1>
              <p className="text-xl text-gray-300">
                Ici on demande le nom et prénom affichés sur le cv.
              </p>
    
              <div className="absolute top-5 right-[-15em] flex flex-col items-center justify-center space-y-4 pt-10">
                {/* Orb 1: Large by default; becomes small when swapped */}
                <VoiceRecognition swapped={swapped} onSwap={toggleSwap} />
                {/* Orb 2: Small by default; becomes large when swapped */}
                <WriteOrb swapped={swapped} onSwap={toggleSwap} />
                </div>
                
                <TranscriptDisplay />
            </div>
          </div>
        </div>
        </TranscriptProvider>
      );
    };

export default QPage;
