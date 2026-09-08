"use client";

import { useLanguage } from "@/context/LanguageContext";

/**
 * Deliberately minimal. This page exists to demonstrate that a portfolio
 * can hold a non-project page — swap it out for whatever you actually do
 * outside of engineering, or delete the route entirely (see SETUP.md §2.5).
 */
export default function HobbyClient() {
  const { t } = useLanguage();

  return (
    <main
      className="section-light relative min-h-screen pt-24 pb-20"
      data-section-theme="light"
    >
      <section className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h1 className="font-display font-bold tracking-tight text-gray-900" style={{ fontSize: "clamp(2.25rem, 6vw, 3.5rem)" }}>
          {t.hobby.heading}
        </h1>
        <p className="mt-6 text-gray-600 leading-relaxed" style={{ fontSize: "clamp(1rem, 2.5vw, 1.125rem)" }}>
          {t.hobby.intro}
        </p>
      </section>

      <section className="relative z-10 mx-auto mt-16 max-w-3xl px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {t.hobby.highlights.map((highlight, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <p className="font-medium text-gray-900">{highlight}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
