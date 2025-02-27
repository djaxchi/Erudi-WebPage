// src/context/TranscriptContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface TranscriptContextValue {
  transcript: string;
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
}

const TranscriptContext = createContext<TranscriptContextValue | null>(null);

export const useTranscript = () => {
  const context = useContext(TranscriptContext);
  if (!context) {
    throw new Error('useTranscript must be used within a TranscriptProvider');
  }
  return context;
};

export const TranscriptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transcript, setTranscript] = useState('');

  return (
    <TranscriptContext.Provider value={{ transcript, setTranscript }}>
      {children}
    </TranscriptContext.Provider>
  );
};
