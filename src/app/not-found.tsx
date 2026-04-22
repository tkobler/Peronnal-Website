"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
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
        404
      </p>
      <h1
        className="mt-4 font-bold tracking-tight text-gray-900"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
      >
        {locale === "fr" ? "Page introuvable" : "Page not found"}
      </h1>
      <p className="mt-4 max-w-md text-gray-600" style={{ fontSize: "clamp(0.95rem, 2vw, 1.125rem)" }}>
        {locale === "fr"
          ? "La page que vous cherchez n'existe pas ou a été déplacée."
          : "The page you\u2019re looking for doesn\u2019t exist or has been moved."}
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-gray-900 px-8 py-3 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
      >
        {locale === "fr" ? "Retour à l'accueil" : "Back to Home"}
      </Link>
    </main>
  );
}
