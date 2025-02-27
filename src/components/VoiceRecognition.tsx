// src/components/VoiceRecognition.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useTranscript } from '../context/TranscriptContext';

interface VoiceRecognitionProps {
    swapped: boolean;
    onSwap: () => void;
  }

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ swapped, onSwap }) => {
  const { setTranscript } = useTranscript(); 
  const [isListening, setIsListening] = useState(false);
  const [timer, setTimer] = useState('00:00:00');

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const startTimeRef = useRef<number>(0);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      console.error("La reconnaissance vocale n'est pas prise en charge par ce navigateur.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.addEventListener('result', (e: SpeechRecognitionEvent) => {
      if (e.results && e.results.length > 0) {
        const newTranscript = Array.from(e.results)
          .map((r) => r[0].transcript)
          .join('');
        setTranscript(newTranscript);
      }
    });

    recognition.addEventListener('end', () => {
      if (isListening) {
        recognition.start();
      }
    });

    recognition.addEventListener('error', (e: SpeechRecognitionErrorEvent) => {
      console.error('Erreur lors de la reconnaissance vocale :', e.error);
    });

    recognitionRef.current = recognition;
  }, [isListening, setTranscript]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
      startTimeRef.current = Date.now();
      updateTimer();
      timerIntervalRef.current = window.setInterval(updateTimer, 10);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
  };

  const toggleListening = () => {
    isListening ? stopListening() : startListening();

    // Also trigger swap animation if desired
    onSwap();
  };

  const updateTimer = () => {
    if (!startTimeRef.current) return;
    const elapsedTime = Date.now() - startTimeRef.current;
    setTimer(formatTime(elapsedTime));
  };

  const formatTime = (ms: number) => {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
  };

  return (
    <button
      id="toggleButton"
      onClick={toggleListening}
      className={`
        group
        relative
        flex items-center justify-center
        rounded-full
        text-white
        transform
        transition-all duration-500
        ${
          swapped
            // If swapped, become the smaller orb position
            ? 'h-10 w-10 -translate-y-1/4 translate-x-[2.5em] rotate-180'
            // Otherwise, large default orb
            : 'h-14 w-14'
        }
        before:absolute before:inset-[-16px]
        before:rounded-full before:bg-gradient-to-r
        before:from-purple-400/40 before:to-purple-600/40
        before:blur-2xl
        after:absolute after:inset-[-8px]
        after:rounded-full after:bg-gradient-to-r
        after:from-purple-400/60 after:to-purple-600/60
        after:opacity-90 after:blur-xl
        hover:before:from-purple-400/50 hover:before:to-purple-600/50
        ${isListening ? 'animate-breathe' : ''}
      `}
    >
      <div className={`relative z-10 rounded-full bg-gradient-to-r from-purple-400/90 to-purple-600/90 ${
          swapped
            // If swapped, become the smaller orb position
            ? 'p-2'
            // Otherwise, large default orb
            : 'p-4'
        }`}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
  );
};

export default VoiceRecognition;
