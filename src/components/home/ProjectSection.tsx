"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import ProjectCard, { CardInfo } from "./ProjectCard";
import { handleImageLoad } from "@/lib/imageHandlers";

interface ProjectSectionProps {
  card: CardInfo;
  theme: "dark" | "light";
  onSelect?: () => void;
}

export default function ProjectSection({ card, theme, onSelect }: ProjectSectionProps) {
  const sectionClass = theme === "dark" ? "section-dark" : "section-light";
  const ref = useRef<HTMLElement>(null);

  // If user prefers reduced motion, skip scroll-reveal entirely
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const [revealed, setRevealed] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return; // already revealed
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ref}
      className={`${sectionClass} relative min-h-screen w-full overflow-hidden`}
      style={{ height: "100svh" }}
      aria-label={`Featured: ${card.title}`}
      data-section-theme={theme}
    >
      {/* 1. FULL-BLEED BACKGROUND IMAGE + COLOR OVERLAY */}
      {card.image && (
        <>
          <div className="absolute inset-0 z-0">
            <Image
              src={card.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-0 transition-opacity duration-700"
              onLoad={handleImageLoad}
            />
          </div>
          <div className={`absolute inset-0 z-[1] ${
            theme === "dark"
              ? "bg-gradient-to-b from-[var(--dark-bg)]/80 via-[var(--dark-bg)]/50 to-[var(--dark-bg)]/95"
              : "bg-gradient-to-b from-[var(--light-bg)]/80 via-[var(--light-bg)]/50 to-[var(--light-bg)]/95"
          }`} />
        </>
      )}

      {/* 2. CONTENT LAYER — scroll-reveal */}
      <div
        className={`relative z-10 flex h-full w-full flex-col items-center
          justify-center md:justify-end
          transition-[opacity,transform] duration-700 ease-[var(--ease-spring)]
          ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{
          paddingLeft: "var(--container-padding)",
          paddingRight: "var(--container-padding)",
          paddingBottom: "clamp(2rem, 6vh, 5rem)",
          paddingTop: "clamp(3rem, 6vh, 6rem)",
        }}
      >
        <div className="flex w-full shrink-0 justify-center">
          <ProjectCard card={card} theme={theme} onExplore={onSelect} />
        </div>
      </div>
    </section>
  );
}
