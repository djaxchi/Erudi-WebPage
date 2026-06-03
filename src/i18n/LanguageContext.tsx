import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations } from './translations';
import { parseLangPath, type Lang } from './langPath';

interface LanguageContextValue {
  lang: Lang;
  /** Apply the language dictated by the current URL (content language). */
  applyUrlLang: (l: Lang) => void;
  /** Persist a manual language preference (used by the first-visit redirect). */
  setPreference: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'erudi-lang';

/** Best supported language from the browser's preferences (fr/en only). */
export function detectBrowserLang(): Lang | null {
  try {
    const prefs =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language];
    for (const pref of prefs) {
      const tag = pref.toLowerCase();
      if (tag.startsWith('fr')) return 'fr';
      if (tag.startsWith('en')) return 'en';
    }
  } catch {
    // navigator unavailable (e.g. during prerender)
  }
  return null;
}

/** A stored manual preference, if any. */
export function storedPreference(): Lang | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'fr') return stored;
  } catch {
    // localStorage unavailable
  }
  return null;
}

// The URL is the source of truth. On the server/prerender there is no window,
// so we fall back to English (the root-language default).
function getInitialLang(): Lang {
  if (typeof window !== 'undefined') {
    return parseLangPath(window.location.pathname).lang;
  }
  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  // Content language follows the URL (driven by RouterLangSync).
  const applyUrlLang = useCallback((l: Lang) => setLangState(l), []);

  // Persist a manual choice so the first-visit auto-redirect can honour it.
  const setPreference = useCallback((l: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  // Keep <html lang> in sync for accessibility (Helmet owns the prerendered value).
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: string): string => {
      return (
        translations[lang]?.[key] ??
        translations['en']?.[key] ??
        key
      );
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, applyUrlLang, setPreference, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside <LanguageProvider>');
  }
  return ctx;
}
