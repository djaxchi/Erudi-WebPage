// src/components/WriteOrb.tsx
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Props for the WriteOrb:
 * - swapped: controls whether we should appear 'large' (swapped) or 'small' (normal).
 * - onSwap: function to toggle the swapped state in the parent container.
 */
interface WriteOrbProps {
  swapped: boolean;     
  onSwap: () => void;   
}

const WriteOrb: React.FC<WriteOrbProps> = ({ swapped, onSwap }) => {
  const [isWriting, setIsWriting] = useState(false);
  const [draftText, setDraftText] = useState('');

  // Toggle the visibility of the input popup
  const toggleWriting = () => {
    setIsWriting(!isWriting);
  };

  // When the orb is clicked, we'll do both:
  // 1) Toggle the text input panel
  // 2) Notify the parent to swap orbs
  const handleClick = () => {
    toggleWriting();
    onSwap();
  };

  // Create a portal for the text input at the bottom of the screen
  const writePortal = isWriting
    ? createPortal(
        <div className="fixed bottom-4 left-0 right-0 flex justify-center z-[9999]">
          <div className="bg-gray-100 text-black p-4 rounded shadow-md w-80 flex flex-col space-y-2">
            <h2 className="font-bold text-center">Saisie au clavier</h2>
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder="Saisissez votre texte ici..."
              className="w-full p-2 border rounded focus:outline-none"
              rows={4}
            />
            <div className="flex space-x-2 justify-end">
              <button
                className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                onClick={toggleWriting}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* The Orb Button */}
      <button
        onClick={handleClick}
        className={`
          group
          relative
          flex items-center justify-center
          rounded-full
          text-white
          transition-all duration-500
          transform
          ${
            swapped
              ? 'h-14 w-14 '
              : 'h-10 w-10 -translate-y-1/4 translate-x-[2.5em] rotate-180'
          }
          before:absolute before:inset-[-12px]
          before:rounded-full before:bg-gradient-to-r
          before:from-purple-400/40 before:to-purple-600/40
          before:blur-2xl
          after:absolute after:inset-[-6px]
          after:rounded-full after:bg-gradient-to-r
          after:from-purple-400/60 after:to-purple-600/60
          after:opacity-90 after:blur-xl
          hover:before:from-purple-400/50 hover:before:to-purple-600/50
        `}
      >
        <div className={`relative z-10 rounded-full bg-gradient-to-r from-purple-400/90 to-purple-600/90 ${
          swapped
            // If swapped, become the biger orb position
            ? 'p-4'
            // Otherwise, small default orb
            : 'p-2'
        }`}>
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

      {/* The Portal for text input */}
      {writePortal}
    </>
  );
};

export default WriteOrb;
