//pages/qpage.tsx
//import React from 'react';

const QPage = () => {
    return (
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
                {/* Microphone Orb */}
                <button
                    className="
                    group
                    relative
                    flex h-14 w-14
                    items-center justify-center
                    rounded-full
                    text-white
                    transition-all duration-300
                    before:absolute before:inset-[-16px]
                    before:rounded-full before:bg-gradient-to-r
                    before:from-purple-400/40 before:to-purple-600/40
                    before:blur-2xl
                    after:absolute after:inset-[-8px]
                    after:rounded-full after:bg-gradient-to-r
                    after:from-purple-400/60 after:to-purple-600/60
                    after:opacity-90 after:blur-xl
                    hover:before:from-purple-400/50 hover:before:to-purple-600/50
                    "
                >
                    <div className="relative z-10 rounded-full bg-gradient-to-r from-purple-400/90 to-purple-600/90 p-4 ">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-1"
                    >
                        <path 
                        d="M24 4v40M34 12v24M4 18v12M44 18v12M14 12v24" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        />
                    </svg>
                    </div>
                </button>

                {/* Menu Orb */}
                <button
                    className="
                    group
                    relative
                    flex h-10 w-10
                    -translate-y-1/4 translate-x-[2.5em]
                    items-center justify-center
                    rounded-full
                    text-white
                    transition-all duration-300
                    before:absolute before:inset-[-12px]
                    before:rounded-full before:bg-gradient-to-r
                    before:from-purple-400/40 before:to-purple-600/40
                    before:blur-2xl
                    after:absolute after:inset-[-6px]
                    after:rounded-full after:bg-gradient-to-r
                    after:from-purple-400/60 after:to-purple-600/60
                    after:opacity-90 after:blur-xl
                    hover:before:from-purple-400/50 hover:before:to-purple-600/50
                    "
                >
                    <div className="relative z-10 rounded-full bg-gradient-to-r from-purple-400/90 to-purple-600/90 p-2">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-90"
                    >
                        <path
                        d="M4.5 6.5h12M7.5 10.5h6M5.5 14.5h10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    </div>
                </button>
                </div>

            </div>
          </div>
        </div>
      );
    };

export default QPage;
