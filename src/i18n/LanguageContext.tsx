import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations } from './translations';

type Lang = 'en' | 'fr';

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'erudi-lang';

/** Best supported language from the browser's preferences (fr/en only). */
function detectBrowserLang(): Lang | null {
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

function getInitialLang(): Lang {
  // 1. An explicit, persisted user choice always wins.
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'fr') return stored;
  } catch {
    // localStorage unavailable
  }
  // 2. Otherwise auto-detect from the browser, falling back to English.
  return detectBrowserLang() ?? 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  // Keep <html lang> in sync for accessibility and SEO.
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
    <LanguageContext.Provider value={{ lang, setLang, t }}>
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
