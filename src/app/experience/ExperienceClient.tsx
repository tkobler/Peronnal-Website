"use client";

import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperienceClient() {
  const { t } = useLanguage();
  return (
    <main
      className="section-light relative min-h-screen pt-24 pb-24"
      data-section-theme="light"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* TYPOGRAPHY: Big Bold Heading */}
        <h1 className="font-display text-4xl font-bold tracking-tighter text-gray-900 sm:text-6xl mb-6">
          {t.experience.heading}
        </h1>
        
        {/* TYPOGRAPHY: Serif Italic Subtitle */}
        <p className="mx-auto max-w-2xl font-serif text-xl italic text-gray-600">
          {/* From managing medical manufacturing lines to creating drone swarms and serving the community. */}
        </p>
      </div>

      <ExperienceTimeline />
    </main>
  );
}