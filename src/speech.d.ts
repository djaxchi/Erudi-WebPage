// speech.d.ts

/**
 * Export an empty object so TypeScript treats this as a module
 * and will apply our global declarations properly.
 */
export {};

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

/**
 * Basic type definitions for the Web Speech API.
 * You can expand these if you use more features.
 */
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onaudiostart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  serviceURI: string;
  abort(): void;
  start(): void;
  stop(): void;
}

declare const SpeechRecognition: {
  prototype: SpeechRecognition;
  new(): SpeechRecognition;
};

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

declare const SpeechRecognitionEvent: {
  prototype: SpeechRecognitionEvent;
  new(): SpeechRecognitionEvent;
};

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

/**
 * Additional interfaces for the result list and alternatives.
 */
interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}
