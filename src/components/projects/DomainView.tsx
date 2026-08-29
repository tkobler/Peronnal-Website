"use client";

import Image from "next/image";
import { ProjectDomain } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

interface DomainViewProps {
  onSelectDomain: (domain: ProjectDomain) => void;
}

const domains: { key: ProjectDomain; image: string }[] = [
  { key: "Microelectronics & Photonics", image: "/images/placeholders/wide.svg" },
  { key: "Product Engineering & IoT", image: "/images/placeholders/wide.svg" },
  { key: "Robotics & AI", image: "/images/placeholders/wide.svg" },
  { key: "Industrial Design & Mechanical", image: "/images/placeholders/wide.svg" },
];

export default function DomainView({ onSelectDomain }: DomainViewProps) {
  const { t } = useLanguage();

  return (
    <section className="section-light min-h-[50vh] md:min-h-[70vh] w-full" style={{ paddingBottom: "clamp(2rem, 5vh, 5rem)" }} data-section-theme="light">
      <div
        className="mx-auto grid max-w-[1200px] grid-cols-1 md:grid-cols-2"
        style={{ padding: "0 var(--container-padding)", gap: "clamp(1rem, 2vw, 2rem)" }}
      >
        {domains.map((domain) => {
          const tr = t.projects.domains[domain.key];
          return (
            <button
              key={domain.key}
              onClick={() => onSelectDomain(domain.key)}
              className="group relative flex aspect-video w-full overflow-hidden rounded-xl border border-black/10 bg-black/5 transition-all hover:border-black/30 shadow-sm active:scale-[0.98]"
            >
              <Image
                src={domain.image}
                alt={tr?.name ?? domain.key}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-60 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="relative z-10 flex h-full w-full flex-col justify-end text-left" style={{ padding: "clamp(1rem, max(2vw, 2vh), 2rem)" }}>
                <span className="uppercase tracking-[0.3em] text-white/50" style={{ fontSize: "clamp(0.5rem, max(0.7vw, 1vh), 0.625rem)" }}>{t.projects.exploreDomain}</span>
                <h3 className="font-display font-bold text-white" style={{ fontSize: "clamp(1.125rem, max(1.8vw, 2.5vh), 1.5rem)" }}>{tr?.name ?? domain.key}</h3>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
