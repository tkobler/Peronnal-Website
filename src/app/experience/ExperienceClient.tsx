"use client";

import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperienceClient() {
  const { t } = useLanguage();
  return (
    <main 
      className="min-h-screen bg-gray-50 pt-24 pb-24"
      data-section-theme="light" 
    >
      {/* Background Graphic: Subtle Circuit Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" 
        style={{
            backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
        }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
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