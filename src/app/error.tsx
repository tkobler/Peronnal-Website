"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useLanguage();

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      data-section-theme="light"
    >
      <p
        className="font-mono text-sm font-bold uppercase tracking-widest text-gray-400"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        Error
      </p>
      <h1
        className="mt-4 font-bold tracking-tight text-gray-900"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
      >
        {locale === "fr" ? "Une erreur est survenue" : "Something went wrong"}
      </h1>
      <p className="mt-4 max-w-md text-gray-600" style={{ fontSize: "clamp(0.95rem, 2vw, 1.125rem)" }}>
        {locale === "fr" ? "Une erreur inattendue s'est produite. Veuillez réessayer." : "An unexpected error occurred. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-block rounded-full bg-gray-900 px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
      >
        {locale === "fr" ? "Réessayer" : "Try again"}
      </button>
    </main>
  );
}
