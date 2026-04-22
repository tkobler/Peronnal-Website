"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useViewTransitionRouter } from "@/hooks/useViewTransitionRouter";
import Image from "next/image";
import { getAllProjects, ProjectDomain, Project } from "@/data/projects";
import { handleImageLoad, handleImageError } from "@/lib/imageHandlers";
import { useLanguage } from "@/context/LanguageContext";
import DomainView from "@/components/projects/DomainView";

export default function FullPortfolioPage() {
  const router = useViewTransitionRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const allProjects = getAllProjects();

  // Restore state from URL search params (e.g. after returning from detail page)
  const initialView = searchParams.get("view") === "list" ? "list" as const : "domains" as const;
  const initialDomain = searchParams.get("domain") as ProjectDomain | null;

  const [viewMode, setViewMode] = useState<"domains" | "list">(initialView);
  const [activeDomain, setActiveDomain] = useState<ProjectDomain | null>(initialDomain);
  const [flippingId, setFlippingId] = useState<string | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Fix 2: Scroll to project on return from detail page
  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo) {
      const el = document.getElementById(`project-${scrollTo}`);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
      }
    }
  }, [searchParams]);

  const filteredProjects = useMemo(() => {
    if (!activeDomain) return allProjects;
    return allProjects.filter(p => p.domain === activeDomain);
  }, [activeDomain, allProjects]);

  const handleDomainSelect = (domain: ProjectDomain) => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveDomain(domain);
      setViewMode("list");
      setTransitioning(false);
    }, 200);
  };

  const handleMoreDetails = useCallback((projectId: string, cardTheme: "dark" | "light") => {
    setFlippingId(projectId);
    // Encode current view state into the detail URL so the back button can restore it
    const params = new URLSearchParams();
    params.set("view", "list");
    params.set("theme", cardTheme);
    if (activeDomain) params.set("domain", activeDomain);
    params.set("scrollTo", projectId);
    setTimeout(() => {
      router.push(`/projects/${projectId}?${params.toString()}`);
    }, 500);
  }, [router, activeDomain]);

  // Translated domain name for the header
  const domainTitle = activeDomain
    ? (t.projects.domains[activeDomain]?.name ?? activeDomain)
    : t.projects.heading;

  return (
    <main className="relative min-h-screen text-white" style={{ background: "var(--portfolio-bg)" }}>
      {/* 1. HEADER SECTION */}
      <section className="section-light relative grid min-h-[30vh] md:h-[40vh] place-items-center text-center px-[var(--container-padding)] py-12 md:py-0" data-section-theme="light">
        <div className="relative w-full max-w-[1200px]">

          {/* Back Button: above title row, right-aligned */}
          {activeDomain && (
            <div className="flex justify-end mb-6">
              <button
                onClick={() => { setTransitioning(true); setTimeout(() => { setViewMode("domains"); setActiveDomain(null); setTransitioning(false); }, 200); }}
                className="tag-text flex items-center gap-2 rounded border border-black/20 px-5 py-2 text-black transition-all hover:bg-black/5 active:scale-95"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {t.projects.backToDomains}
              </button>
            </div>
          )}

          <div className="flex flex-col items-center">
            <h1
              className="text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.9] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {domainTitle}
            </h1>

            {/* Toggle Navigation: visible only when no domain is active */}
            {!activeDomain && (
              <div className="mt-10 flex justify-center gap-10 border-b border-black/10 pb-4">
                <button
                  onClick={() => { setTransitioning(true); setTimeout(() => { setViewMode("domains"); setTransitioning(false); }, 200); }}
                  className={`text-sm uppercase tracking-[0.2em] transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95 active:opacity-70 ${viewMode === "domains" ? "opacity-100 font-bold border-b-2 border-black" : "opacity-40 hover:opacity-100"}`}
                >
                  {t.projects.byDomain}
                </button>
                <button
                  onClick={() => { setTransitioning(true); setTimeout(() => { setViewMode("list"); setTransitioning(false); }, 200); }}
                  className={`text-sm uppercase tracking-[0.2em] transition-all focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-95 active:opacity-70 ${viewMode === "list" ? "opacity-100 font-bold border-b-2 border-black" : "opacity-40 hover:opacity-100"}`}
                >
                  {t.projects.listView}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. VIEW CONDITIONAL RENDERING */}
      <div className={`transition-opacity duration-200 ${transitioning ? "opacity-0" : "opacity-100"}`}>
        {viewMode === "domains" ? (
          <DomainView onSelectDomain={handleDomainSelect} />
        ) : (
          <div className="flex flex-col">
            {filteredProjects.map((project, i) => (
              <PortfolioCard
                key={project.id}
                project={project}
                index={i}
                isFlipping={flippingId === project.id}
                onMoreDetails={handleMoreDetails}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/**
 * 2-Column Project Card
 */
function PortfolioCard({ project, index, isFlipping, onMoreDetails }: {
  project: Project, index: number, isFlipping: boolean,
  onMoreDetails: (id: string, theme: "dark" | "light") => void
}) {
  const { t } = useLanguage();
  const tc = t.projectsContent[project.id];
  const theme = index % 2 === 0 ? "dark" : "light";
  const sectionClass = theme === "dark" ? "section-dark" : "section-light";

  return (
    <section
      id={`project-${project.id}`}
      className={`${sectionClass} relative flex items-center
        min-h-screen py-16 lg:py-0 lg:h-screen lg:overflow-hidden`}
      data-section-theme={theme}
    >
      <div className={`w-full transition-all duration-700 ${isFlipping ? "opacity-0 scale-95" : "opacity-100"}`} style={{ padding: "0 clamp(1.5rem, 5vw, 5%)" }}>
        {/* Mobile: image on top, then text below. Desktop: 2-column side-by-side */}
        <div className="mx-auto flex flex-col lg:grid lg:grid-cols-2 lg:items-center" style={{ gap: "clamp(2rem, max(4vw, 4vh), 6rem)" }}>

          {/* IMAGE COLUMN — shown first on mobile (order-1), second on desktop (lg:order-2) */}
          <div className="flex flex-col order-1 lg:order-2" style={{ gap: "clamp(0.75rem, max(1.5vw, 1.5vh), 1.5rem)" }}>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-current/5 shadow-2xl">
              <Image src={project.heroImage} alt={tc?.title ?? project.title} fill sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover opacity-0 transition-opacity duration-500" onLoad={handleImageLoad} onError={handleImageError} />
            </div>
            <div className="hidden lg:grid grid-cols-2 border-t border-current/10" style={{ gap: "clamp(1rem, 2vw, 2rem)", paddingTop: "clamp(0.75rem, 1.5vw, 1.5rem)" }}>
              <div>
                <h3 className="uppercase tracking-widest opacity-40 font-bold" style={{ fontSize: "clamp(0.5rem, max(0.65vw, 0.9vh), 0.625rem)", marginBottom: "clamp(0.1rem, 0.2vw, 0.25rem)" }}>{t.projects.roleLabel}</h3>
                <p className="font-medium" style={{ fontSize: "clamp(0.75rem, max(0.95vw, 1.3vh), 0.875rem)" }}>{tc?.detail.role ?? project.detail.role}</p>
              </div>
              <div>
                <h3 className="uppercase tracking-widest opacity-40 font-bold" style={{ fontSize: "clamp(0.5rem, max(0.65vw, 0.9vh), 0.625rem)", marginBottom: "clamp(0.1rem, 0.2vw, 0.25rem)" }}>{t.projects.durationLabel}</h3>
                <p className="font-medium" style={{ fontSize: "clamp(0.75rem, max(0.95vw, 1.3vh), 0.875rem)" }}>{tc?.detail.duration ?? project.detail.duration}</p>
              </div>
            </div>
            <div className="hidden lg:flex flex-wrap" style={{ gap: "clamp(0.3rem, 0.5vw, 0.5rem)" }}>
              {project.detail.technologies.map((tech) => (
                <span key={tech} className="uppercase tracking-wider rounded-full bg-current/5 border border-current/10 opacity-70" style={{ fontSize: "clamp(0.5rem, max(0.65vw, 0.9vh), 0.625rem)", padding: "clamp(0.15rem, 0.3vw, 0.25rem) clamp(0.5rem, 0.8vw, 0.75rem)" }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* TEXT COLUMN — shown second on mobile (order-2), first on desktop (lg:order-1) */}
          <div className="flex flex-col order-2 lg:order-1">
            <span className="card-number block font-mono opacity-50" style={{ fontSize: "clamp(0.85rem, max(1.2vw, 1.5vh), 1.25rem)" }}>{project.number}</span>
            <h2 className="card-title font-bold leading-[1.1]" style={{ marginTop: "clamp(0.25rem, 0.5vw, 0.5rem)", fontSize: "clamp(1.75rem, max(3.5vw, 4vh), 4rem)" }}>{tc?.title ?? project.title}</h2>
            <p className="card-tagline opacity-80" style={{ marginTop: "clamp(0.5rem, 0.8vw, 0.75rem)", fontSize: "clamp(0.9rem, max(1.2vw, 1.5vh), 1.125rem)" }}>{tc?.tagline ?? project.tagline}</p>
            <p className="card-descriptor uppercase tracking-widest opacity-40" style={{ marginTop: "clamp(0.15rem, 0.3vw, 0.25rem)", fontSize: "clamp(0.6rem, max(0.7vw, 1vh), 0.75rem)" }}>{tc?.descriptor ?? project.descriptor}</p>

            <div style={{ marginTop: "clamp(1rem, max(3vw, 3vh), 2.5rem)", display: "flex", flexDirection: "column", gap: "clamp(0.75rem, max(2vw, 2vh), 2rem)" }}>
              <div>
                <h4 className="uppercase tracking-widest font-bold opacity-40" style={{ fontSize: "clamp(0.55rem, max(0.65vw, 0.9vh), 0.625rem)", marginBottom: "clamp(0.25rem, 0.5vw, 0.5rem)" }}>{t.projects.contextLabel}</h4>
                <p className="leading-relaxed max-w-md opacity-90" style={{ fontSize: "clamp(0.8rem, max(0.95vw, 1.3vh), 0.875rem)" }}>{tc?.detail.description.why ?? project.detail.description.why}</p>
              </div>
              <div>
                <h4 className="uppercase tracking-widest font-bold opacity-40" style={{ fontSize: "clamp(0.55rem, max(0.65vw, 0.9vh), 0.625rem)", marginBottom: "clamp(0.25rem, 0.5vw, 0.5rem)" }}>{t.projects.solutionLabel}</h4>
                <p className="leading-relaxed max-w-md opacity-90" style={{ fontSize: "clamp(0.8rem, max(0.95vw, 1.3vh), 0.875rem)" }}>{tc?.detail.description.what ?? project.detail.description.what}</p>
              </div>
              <div>
                <h4 className="uppercase tracking-widest font-bold opacity-40" style={{ fontSize: "clamp(0.55rem, max(0.65vw, 0.9vh), 0.625rem)", marginBottom: "clamp(0.25rem, 0.5vw, 0.5rem)" }}>{t.projects.implementationLabel}</h4>
                <p className="leading-relaxed max-w-md opacity-90" style={{ fontSize: "clamp(0.8rem, max(0.95vw, 1.3vh), 0.875rem)" }}>{tc?.detail.description.how ?? project.detail.description.how}</p>
              </div>
            </div>

            {/* Metadata: visible on mobile below descriptions */}
            <div className="grid lg:hidden grid-cols-2 border-t border-current/10 mt-6" style={{ gap: "clamp(1rem, 4vw, 2rem)", paddingTop: "clamp(0.75rem, 2vw, 1.5rem)" }}>
              <div>
                <h3 className="uppercase tracking-widest opacity-40 font-bold" style={{ fontSize: "clamp(0.55rem, 2.5vw, 0.65rem)", marginBottom: "0.15rem" }}>{t.projects.roleLabel}</h3>
                <p className="font-medium" style={{ fontSize: "clamp(0.8rem, 3.5vw, 0.9rem)" }}>{tc?.detail.role ?? project.detail.role}</p>
              </div>
              <div>
                <h3 className="uppercase tracking-widest opacity-40 font-bold" style={{ fontSize: "clamp(0.55rem, 2.5vw, 0.65rem)", marginBottom: "0.15rem" }}>{t.projects.durationLabel}</h3>
                <p className="font-medium" style={{ fontSize: "clamp(0.8rem, 3.5vw, 0.9rem)" }}>{tc?.detail.duration ?? project.detail.duration}</p>
              </div>
            </div>

            <div style={{ marginTop: "clamp(1.25rem, max(3vw, 3vh), 2.5rem)" }}>
              <button
                onClick={() => onMoreDetails(project.id, theme)}
                className={`tag-text rounded border transition-all duration-300 ${
                  theme === "dark" ? "border-white/30 text-white hover:bg-white/10" : "border-black/20 text-black hover:bg-black/5"
                } active:scale-95`}
                style={{ padding: "clamp(0.5rem, max(0.8vw, 1vh), 0.75rem) clamp(1.25rem, max(2vw, 2.5vh), 2rem)" }}
              >
                {t.projects.moreDetails}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
