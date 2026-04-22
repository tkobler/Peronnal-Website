"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { getTranslations, type Locale, type Translations } from "@/data/translations";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectLocale(): Locale {
  if (typeof window !== "undefined") {
    const preloaded = (window as unknown as { __LOCALE__?: string }).__LOCALE__;
    if (preloaded === "en" || preloaded === "fr") return preloaded;
    const stored = localStorage.getItem("locale");
    if (stored === "en" || stored === "fr") return stored;
    if (navigator.language?.startsWith("fr")) return "fr";
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with detected locale directly. On the server this returns "en".
  // On the client the inline <script> has already set window.__LOCALE__ before
  // React hydrates, so this reads the correct locale synchronously.
  // suppressHydrationWarning on <html> and <body> covers the attribute mismatch;
  // the text content mismatch (e.g. "Home" vs "Accueil") is a one-time recoverable
  // error in dev mode that doesn't occur in production static export.
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
    document.documentElement.lang = l;
  }, []);

  const t = getTranslations(locale);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
      <div aria-live="polite" className="sr-only" role="status">
        {locale === "fr" ? "Langue : français" : "Language: English"}
      </div>
    </LanguageContext.Provider>
  );
}

const fallback: LanguageContextValue = {
  locale: "en",
  setLocale: () => {},
  t: getTranslations("en"),
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  return ctx ?? fallback;
}
