"use client";

import Image from "next/image";
import { experiences, ExperienceCategory } from "@/data/experience";
import { useLanguage } from "@/context/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function RevealEntry({ children, index }: { children: React.ReactNode; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.15);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </div>
  );
}

export default function ExperienceTimeline() {
  const { t } = useLanguage();

  // Helper to get color based on category — uses design tokens from globals.css
  const getCategoryColor = (cat: ExperienceCategory): string => {
    const map: Record<ExperienceCategory, string> = {
      service: "var(--color-cat-service)",
      music: "var(--color-cat-music)",
      engineering: "var(--color-cat-engineering)",
    };
    return map[cat] ?? "var(--color-cat-engineering)";
  };

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6">

      {/* Central Axis Line */}
      <div
        className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 sm:left-6 md:left-1/2"
        aria-hidden="true"
      />

      <div className="space-y-20">
        {experiences.map((exp, index) => {
          const isEven = index % 2 === 0;
          const nodeColor = getCategoryColor(exp.category);
          const expTr = t.experienceData[exp.id];

          return (
            <RevealEntry key={exp.id} index={index}>
            <div
              className={`group/entry relative flex flex-col md:flex-row ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Spacer for the other side */}
              <div className="flex-1 md:w-1/2" />

              {/* --- CENTER NODE --- */}
              <div className="absolute left-4 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-white ring-4 sm:left-6 md:left-1/2 lg:h-5 lg:w-5 lg:ring-8 ring-white" aria-hidden="true">
                 <div className="h-full w-full rounded-full shadow-sm ring-4 ring-white/20 transition-transform duration-300 group-hover/entry:scale-125" style={{ background: nodeColor }} />
              </div>

              {/* --- CONTENT CARD --- */}
              <div className={`flex-1 pl-8 sm:pl-16 md:w-1/2 ${isEven ? "md:pl-0 md:pr-16" : "md:pl-16"}`}>

                {/* Decoration: connector line */}
                <div
                    className={`absolute top-2 hidden h-px w-16 bg-gray-300 md:block ${
                        isEven ? "right-1/2 mr-0" : "left-1/2 ml-0"
                    }`}
                />

                <div className="group relative">
                    {/* Company Header */}
                    <div className="mb-4">
                    <div className="mb-1 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-gray-400">
                        <span>{expTr?.location ?? exp.location}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {exp.logo && (
                        <Image
                            src={exp.logo}
                            alt={`${expTr?.company ?? exp.company} logo`}
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain"
                        />
                        )}
                        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                        {expTr?.company ?? exp.company}
                        </h2>
                    </div>
                    </div>

                  {/* Roles Loop */}
                  <div className="space-y-8 border-l-2 border-gray-100 pl-6 md:border-l-0 md:pl-0">
                    {exp.roles.map((role, i) => {
                      const roleTr = expTr?.roles[i];
                      return (
                        <div key={`${exp.id}-role-${i}`} className="relative">
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                              <h3 className="font-serif text-xl italic text-gray-800">
                              {roleTr?.title ?? role.title}
                              </h3>
                              <span className="mt-1 font-mono text-xs font-bold uppercase tracking-widest text-blue-600 sm:mt-0">
                              {roleTr?.period ?? role.period}
                              </span>
                          </div>

                          <ul className="mt-3 space-y-2">
                            {(roleTr?.description ?? role.description).map((desc, dIndex) => (
                              <li key={dIndex} className="text-[15px] leading-relaxed text-gray-600">
                                <span className="mr-2 text-gray-300">/</span>
                                {desc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            </RevealEntry>
          );
        })}
      </div>
    </div>
  );
}
