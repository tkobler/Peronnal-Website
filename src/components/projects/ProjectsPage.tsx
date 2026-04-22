"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback, useState } from "react";
import { handleImageError } from "@/lib/imageHandlers";
import { getFeaturedProjects, type ProjectDomain } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

const DOMAIN_KEYS: ProjectDomain[] = [
  "Microelectronics & Photonics",
  "Product Engineering & IoT",
  "Robotics & AI",
  "Industrial Design & Mechanical",
];

export default function ProjectsPage() {
  const { t } = useLanguage();
  const allProjects = getFeaturedProjects();
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  // flippingId is read-only now that project detail pages are disabled —
  // the "flip into detail" animation has no trigger, so the setter is gone.
  const [flippingId] = useState<string | null>(null);
  const [activeDomain, setActiveDomain] = useState<ProjectDomain | null>(null);

  const projects = activeDomain
    ? allProjects.filter((p) => p.domain === activeDomain)
    : allProjects;

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const timer = setTimeout(() => {
        const el = sectionRefs.current.get(hash);
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const setSectionRef = useCallback((id: string, el: HTMLElement | null) => {
    if (el) sectionRefs.current.set(id, el);
  }, []);

  return (
    <main className="relative">
      {/* 1. RESTORED CENTERED HEADER */}
      <section
        className="section-light relative grid h-[40vh] place-items-center overflow-hidden"
        style={{ padding: "var(--space-xl) var(--container-padding)" }}
        data-section-theme="light"
      >
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tight">
            {t.projects.heading}
          </h1>
          <p className="hero-subtitle mt-6 max-w-2xl">
            {t.projects.subtitle}
          </p>
          <div
            role="group"
            aria-label="Filter projects by domain"
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            <button
              aria-pressed={activeDomain === null}
              onClick={() => setActiveDomain(null)}
              className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all duration-200 ${
                activeDomain === null
                  ? "bg-black text-white"
                  : "border border-black/20 text-black/60 hover:bg-black/5 active:opacity-80"
              }`}
            >
              {t.projects.filterAll}
            </button>
            {DOMAIN_KEYS.map((domain) => (
              <button
                key={domain}
                aria-pressed={activeDomain === domain}
                onClick={() => setActiveDomain(domain)}
                className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-all duration-200 ${
                  activeDomain === domain
                    ? "bg-black text-white"
                    : "border border-black/20 text-black/60 hover:bg-black/5 active:opacity-80"
                }`}
              >
                {t.projects.domains[domain]?.name ?? domain}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. PROJECT LISTINGS (2-COLUMN) */}
      {projects.map((project, i) => {
        const theme = i % 2 === 0 ? "dark" : "light";
        const isFlipping = flippingId === project.id;
        const tc = t.projectsContent[project.id];

        return (
          <section
            key={project.id}
            ref={(el) => setSectionRef(project.id, el)}
            id={project.id}
            className={`${theme === "dark" ? "section-dark" : "section-light"} relative min-h-screen py-16 lg:py-0 lg:h-screen flex items-center lg:overflow-hidden ${isFlipping ? "project-transition-container project-leaving" : "project-transition-container"}`}
            data-section-theme={theme}
          >
            <div className="project-transition-inner w-full px-[var(--container-padding)]">
              <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-center">

                {/* LEFT COLUMN: Main Info & New Description Structure */}
                <div className="flex flex-col">
                  <span className="card-number block font-mono text-xl opacity-50">{project.number}</span>
                  <h2 className="card-title mt-2 text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.1]">{tc?.title ?? project.title}</h2>
                  <p className="card-tagline mt-3 text-lg opacity-80">{tc?.tagline ?? project.tagline}</p>
                  <p className="card-descriptor mt-1 text-xs uppercase tracking-widest opacity-40">{tc?.descriptor ?? project.descriptor}</p>

                  <div className="mt-10 space-y-8">
                    <div>
                      <h4 className="text-[11px] uppercase tracking-widest font-bold opacity-40 mb-2">{t.projects.contextLabel}</h4>
                      <p className="text-sm leading-relaxed max-w-md opacity-90">{tc?.detail.description.why ?? project.detail.description.why}</p>
                    </div>
                    <div>
                      <h4 className="text-[11px] uppercase tracking-widest font-bold opacity-40 mb-2">{t.projects.solutionLabel}</h4>
                      <p className="text-sm leading-relaxed max-w-md opacity-90">{tc?.detail.description.what ?? project.detail.description.what}</p>
                    </div>
                    <div>
                      <h4 className="text-[11px] uppercase tracking-widest font-bold opacity-40 mb-2">{t.projects.implementationLabel}</h4>
                      <p className="text-sm leading-relaxed max-w-md opacity-90">{tc?.detail.description.how ?? project.detail.description.how}</p>
                    </div>
                  </div>

                  {/* Detail pages temporarily disabled */}
                  <div className="mt-10" />
                </div>

                {/* RIGHT COLUMN: Picture & Meta Info Below */}
                <div className="flex flex-col gap-6">
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-current/5 shadow-2xl">
                    <Image
                      src={project.heroImage}
                      alt={tc?.title ?? project.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 50vw"
                      className="object-cover"
                      onError={handleImageError}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-8 border-t border-current/10 pt-6">
                    <div>
                      <h3 className="text-[11px] uppercase tracking-widest opacity-40 mb-1 font-bold">{t.projects.roleLabel}</h3>
                      <p className="text-sm font-medium">{tc?.detail.role ?? project.detail.role}</p>
                    </div>
                    <div>
                      <h3 className="text-[11px] uppercase tracking-widest opacity-40 mb-1 font-bold">{t.projects.durationLabel}</h3>
                      <p className="text-sm font-medium">{tc?.detail.duration ?? project.detail.duration}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.detail.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-current/5 border border-current/10 opacity-70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        );
      })}

      {/* 3. FOOTER SPACER */}
      <section
        className="section-dark relative grid h-[20vh] place-items-center overflow-hidden"
        data-section-theme="dark"
      />
    </main>
  );
}