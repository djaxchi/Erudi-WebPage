// src/components/TranscriptDisplay.tsx
import React from 'react';
import { createPortal } from 'react-dom';
import { useTranscript } from '../context/TranscriptContext';

const TranscriptDisplay: React.FC = () => {
  const { transcript } = useTranscript(); // read transcript from context

  // Only show if transcript isn't empty
  if (!transcript) return null;

  // Create a portal so it sits at the bottom of the page
  return createPortal(
    <div className="fixed bottom-4 left-0 right-0 flex justify-center">
      <div className="bg-gray-100 text-black p-4 rounded shadow-md w-80 text-center">
        {transcript}
      </div>
    </div>,
    document.body
  );
};

export default TranscriptDisplay;
