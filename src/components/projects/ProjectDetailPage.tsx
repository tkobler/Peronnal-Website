"use client";

import { useState, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useViewTransitionRouter } from "@/hooks/useViewTransitionRouter";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import Lightbox from "@/components/ui/Lightbox";
import { handleImageLoad, handleImageError } from "@/lib/imageHandlers";

interface ProjectDetailPageProps {
  project: Project;
  theme?: "dark" | "light";
}

/* ─── Unified content section (replaces ExpandableSection + SectionWithImage) ─── */
const ContentSection = ({
  label,
  text,
  section,
  accent,
  expandable,
  isDark,
  subtleBorder,
  bodyStyle,
  sectionImage,
  onImageClick,
}: {
  label: string;
  text: string;
  section: string;
  accent?: boolean;
  expandable?: boolean;
  isDark: boolean;
  subtleBorder: string;
  bodyStyle: React.CSSProperties;
  sectionImage: (s: string) => { src: string; alt: string; caption?: string } | undefined;
  onImageClick: (img: { src: string; alt: string; caption?: string }) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const img = sectionImage(section);
  const showBorder = accent || expandable;

  // Expandable preview logic
  const sentences = expandable ? (text.match(/[^.!?]+[.!?]+/g) || [text]) : null;
  const needsExpand = expandable && sentences && sentences.length > 2;
  const preview = needsExpand ? sentences!.slice(0, 2).join(" ") : null;

  return (
    <div className={showBorder ? `border-l-2 ${isDark ? "border-white/20" : "border-black/15"} pl-5 md:pl-6` : ""}>
      <h2 className="tag-text mb-3 md:mb-4 uppercase tracking-widest opacity-50">{label}</h2>
      <div className={img ? "grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start" : ""}>
        <div>
          <p className="leading-relaxed opacity-85" style={bodyStyle}>
            {expandable && needsExpand ? (expanded ? text : preview) : text}
          </p>
          {needsExpand && (
            <button
              onClick={() => setExpanded(!expanded)}
              className={`mt-3 font-mono text-xs uppercase tracking-wider transition-colors ${isDark ? "text-white/50 hover:text-white" : "text-black/40 hover:text-black"}`}
            >
              {expanded ? (<><span aria-hidden="true">&#9650; </span>Show less</>) : (<><span aria-hidden="true">&#9660; </span>Read full methodology</>)}
            </button>
          )}
        </div>
        {img && (
          <div className="mt-4 lg:mt-0">
            <button type="button" onClick={() => onImageClick(img)} className={`relative block w-full overflow-hidden rounded-lg border ${subtleBorder} cursor-pointer`}>
              <Image src={img.src} alt={img.alt} width={600} height={400} className="w-full h-auto object-cover" onError={handleImageError} />
            </button>
            {img.caption && (
              <p className="mt-2 text-center font-mono text-[0.65rem] italic opacity-50">{img.caption}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ProjectDetailPage({ project, theme: themeProp = "dark" }: ProjectDetailPageProps) {
  const router = useViewTransitionRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const tc = t.projectsContent[project.id];
  const themeParam = searchParams.get("theme");
  const theme = (themeParam === "dark" || themeParam === "light") ? themeParam : themeProp;
  const isDark = theme === "dark";
  const sectionClass = isDark ? "section-dark" : "section-light";
  const [exiting, setExiting] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openLightbox = useCallback((img: { src: string; alt: string; caption?: string }) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setLightboxImage(img);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
      triggerRef.current = null;
    });
  }, []);

  const keyResults = tc?.detail.keyResults ?? project.detail.keyResults;
  const scope = tc?.detail.scope ?? project.detail.scope;
  const methodology = tc?.detail.methodology ?? project.detail.methodology;
  const challenges = tc?.detail.challenges ?? project.detail.challenges;
  const publication = tc?.detail.publication ?? project.detail.publication;
  const images = tc?.detail.images ?? project.detail.images;

  const sectionImage = (section: string) => images?.find(img => img.section === section);

  const handleBack = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      const returnParams = new URLSearchParams();
      const view = searchParams.get("view");
      const domain = searchParams.get("domain");
      if (view) returnParams.set("view", view);
      if (domain) returnParams.set("domain", domain);
      const qs = returnParams.toString();
      router.push(qs ? `/projects?${qs}` : "/projects");
    }, 400);
  }, [router, searchParams]);

  const subtleBg = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";
  const subtleBorder = isDark ? "border-white/[0.06]" : "border-black/[0.06]";
  const bodyStyle = { fontFamily: "var(--font-body)", fontSize: "var(--text-base)" };

  // Gallery of remaining images not assigned to a section
  const unassignedImages = images?.filter(img => !img.section) ?? [];

  return (
    <>
      <main className="relative">
        <section
          className={`${sectionClass} relative min-h-screen overflow-hidden`}
          style={{ padding: "clamp(3rem, 6vh, 6rem) var(--container-padding)" }}
          data-section-theme={theme}
        >
          <div className={exiting ? "project-detail-exit" : "project-detail-enter"}>
            <div className="mx-auto w-full max-w-[1200px]" style={{ paddingTop: "clamp(2rem, 4vh, 4rem)" }}>

              {/* Back button */}
              <div className="flex justify-end">
                <button
                  onClick={handleBack}
                  disabled={exiting}
                  className={`tag-text flex items-center gap-2 rounded border transition-all duration-300 active:scale-95 ${
                    isDark
                      ? "border-white/30 text-white hover:bg-white/10"
                      : "border-black/20 text-black hover:bg-black/5"
                  }`}
                  style={{ padding: "clamp(0.4rem, 1vh, 0.625rem) clamp(0.75rem, 2vw, 1.25rem)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  {t.projects.back}
                </button>
              </div>

              {/* Hero: 2-col on desktop (image left, header right) */}
              <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
                {/* Hero image */}
                <div
                  className={`relative aspect-video w-full overflow-hidden rounded-xl border ${
                    isDark ? "bg-neutral-900 border-white/[0.06]" : "bg-neutral-100 border-black/[0.06]"
                  }`}
                >
                  <Image src={project.heroImage} alt={tc?.title ?? project.title} fill sizes="(max-width: 1024px) 90vw, 55vw" className="object-cover opacity-0 transition-opacity duration-500" priority onLoad={handleImageLoad} onError={handleImageError} />
                </div>

                {/* Header */}
                <div>
                  <span className="card-number block">{project.number}</span>
                  <h1 className="card-title mt-2 leading-tight">{tc?.title ?? project.title}</h1>
                  <p className="card-tagline opacity-85" style={{ marginTop: "clamp(0.5rem, 1vh, 1rem)", fontSize: "var(--text-lg)" }}>
                    {tc?.tagline ?? project.tagline}
                  </p>

                  {/* Metadata bar */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <p className="card-descriptor uppercase tracking-widest opacity-50">{tc?.descriptor ?? project.descriptor}</p>
                    {project.course && (
                      <span className={`rounded border font-mono text-xs tracking-wider ${
                        isDark ? "border-white/15 bg-white/5 text-white/60" : "border-black/10 bg-black/5 text-black/50"
                      }`} style={{ padding: "0.2rem 0.5rem" }}>
                        {project.course}
                      </span>
                    )}
                  </div>
                  {scope && (
                    <p className="mt-2 font-mono text-xs italic opacity-50">{scope}</p>
                  )}

                  {/* Publication badge */}
                  {publication && (
                    <div
                      className={`mt-4 flex items-start gap-2.5 rounded-lg border ${subtleBorder} ${subtleBg}`}
                      style={{ padding: "0.6rem 0.9rem" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mt-0.5 flex-shrink-0 opacity-50">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                      <p className="text-xs leading-relaxed opacity-70" style={{ fontFamily: "var(--font-body)" }}>{publication}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Why / What / How */}
              <div style={{ marginTop: "clamp(3rem, 6vh, 6rem)" }} className="space-y-12 md:space-y-16">
                <ContentSection
                  label={t.projects.contextLabel}
                  text={tc?.detail.description.why ?? project.detail.description.why}
                  section="why"
                  isDark={isDark}
                  subtleBorder={subtleBorder}
                  bodyStyle={bodyStyle}
                  sectionImage={sectionImage}
                  onImageClick={openLightbox}
                />
                <ContentSection
                  label={t.projects.solutionLabel}
                  text={tc?.detail.description.what ?? project.detail.description.what}
                  section="what"
                  isDark={isDark}
                  subtleBorder={subtleBorder}
                  bodyStyle={bodyStyle}
                  sectionImage={sectionImage}
                  onImageClick={openLightbox}
                />
                <ContentSection
                  label={t.projects.implementationLabel}
                  text={tc?.detail.description.how ?? project.detail.description.how}
                  section="how"
                  isDark={isDark}
                  subtleBorder={subtleBorder}
                  bodyStyle={bodyStyle}
                  sectionImage={sectionImage}
                  onImageClick={openLightbox}
                />

                {/* Methodology (collapsible) */}
                {methodology && (
                  <ContentSection
                    label={t.projects.methodologyLabel}
                    text={methodology}
                    section="methodology"
                    expandable
                    accent
                    isDark={isDark}
                    subtleBorder={subtleBorder}
                    bodyStyle={bodyStyle}
                    sectionImage={sectionImage}
                    onImageClick={openLightbox}
                  />
                )}

                {/* Challenges & Decisions */}
                {challenges && challenges.length > 0 && (
                  <div>
                    <h2 className="tag-text mb-3 md:mb-4 uppercase tracking-widest opacity-50">{t.projects.challengesLabel}</h2>
                    <div className={sectionImage("challenges") ? "grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start" : ""}>
                      <ul className="space-y-3">
                        {challenges.map((challenge, i) => (
                          <li key={i} className="flex gap-3 leading-relaxed opacity-85" style={bodyStyle}>
                            <span className={`mt-2 flex-shrink-0 h-1.5 w-1.5 rounded-full ${isDark ? "bg-white/30" : "bg-black/20"}`} />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                      {sectionImage("challenges") && (() => {
                        const img = sectionImage("challenges")!;
                        return (
                          <div className="mt-4 lg:mt-0">
                            <button type="button" onClick={() => openLightbox(img)} className={`relative block w-full overflow-hidden rounded-lg border ${subtleBorder} cursor-pointer`}>
                              <Image src={img.src} alt={img.alt} width={600} height={400} className="w-full h-auto object-cover" onError={handleImageError} />
                            </button>
                            {img.caption && <p className="mt-2 text-center font-mono text-[0.65rem] italic opacity-50">{img.caption}</p>}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* Key Results + Metadata */}
              <div
                className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start"
                style={{ marginTop: "clamp(3rem, 6vh, 6rem)" }}
              >
                {/* Key Results */}
                {keyResults && keyResults.length > 0 ? (
                  <div
                    className={`rounded-xl border ${subtleBorder} ${subtleBg}`}
                    style={{ padding: "clamp(1.25rem, 3vh, 2rem)" }}
                  >
                    <h2 className="tag-text mb-4 uppercase tracking-widest opacity-50">{t.projects.keyResultsLabel}</h2>
                    <ul className="space-y-3">
                      {keyResults.map((result, i) => (
                        <li key={i} className="flex gap-3 leading-relaxed opacity-85" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)" }}>
                          <span className={`mt-1.5 flex-shrink-0 h-1.5 w-1.5 rounded-full ${isDark ? "bg-white/40" : "bg-black/30"}`} />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : <div />}

                {/* Metadata */}
                <div className={`space-y-6 rounded-xl border ${subtleBorder} ${subtleBg}`} style={{ padding: "clamp(1.25rem, 3vh, 2rem)" }}>
                  <div>
                    <h3 className="tag-text mb-1.5 uppercase tracking-widest opacity-50">{t.projects.roleLabel}</h3>
                    <p className="font-medium" style={{ fontSize: "var(--text-base)" }}>{tc?.detail.role ?? project.detail.role}</p>
                  </div>
                  <div>
                    <h3 className="tag-text mb-1.5 uppercase tracking-widest opacity-50">{t.projects.durationLabel}</h3>
                    <p className="font-medium" style={{ fontSize: "var(--text-base)" }}>{tc?.detail.duration ?? project.detail.duration}</p>
                  </div>
                  <div>
                    <h3 className="tag-text mb-2 uppercase tracking-widest opacity-50">{t.projects.technologiesLabel}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.detail.technologies.map((tech) => (
                        <span key={tech} className={`tag-text rounded-full border text-[0.65rem] transition-colors duration-200 hover:opacity-100 ${
                          isDark
                            ? "bg-white/5 border-white/10 text-white/70"
                            : "bg-black/5 border-black/10 text-black/70"
                        }`} style={{ padding: "clamp(0.15rem, 0.5vh, 0.25rem) clamp(0.5rem, 1.5vw, 0.75rem)" }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image gallery for unassigned images */}
              {unassignedImages.length > 0 && (
                <div className="mt-12 grid gap-4 sm:grid-cols-2" >
                  {unassignedImages.map((img, i) => (
                    <div key={i} className={unassignedImages.length % 2 !== 0 && i === unassignedImages.length - 1 ? "sm:col-span-2" : ""}>
                      <button type="button" onClick={() => openLightbox(img)} className={`relative block w-full overflow-hidden rounded-lg border ${subtleBorder} cursor-pointer`}>
                        <Image src={img.src} alt={img.alt} width={800} height={500} className="w-full h-auto object-cover" onError={handleImageError} />
                      </button>
                      {img.caption && <p className="mt-2 text-center font-mono text-[0.65rem] italic opacity-50">{img.caption}</p>}
                    </div>
                  ))}
                </div>
              )}

              <div style={{ paddingBottom: "clamp(4rem, 8vh, 8rem)" }} />
            </div>
          </div>
        </section>
      </main>

      <Lightbox image={lightboxImage} onClose={closeLightbox} />
    </>
  );
}
