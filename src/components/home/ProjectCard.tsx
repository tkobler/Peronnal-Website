import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export interface CardInfo {
  number: string;
  title: string;
  tagline: string;
  descriptor: string;
  image?: string;
  layout?: "boxed" | "full-screen";
}

interface ProjectCardProps {
  card: CardInfo;
  theme: "dark" | "light";
  onExplore?: () => void;
}

export default function ProjectCard({ card, theme, onExplore }: ProjectCardProps) {
  const { t } = useLanguage();
  const glassClass = theme === "dark" ? "glass-dark" : "glass-light";
  const isDark = theme === "dark";

  // --- FORCE SIZE LOGIC ---
  // We use '!' to override the .card-title CSS that is making it huge.
  const getTitleClass = (text: string) => {
    const len = text.length;

    // > 25 chars: smaller clamp range to fit ~3 lines
    if (len > 25) return "leading-tight";

    // < 25 chars: larger clamp range
    return "leading-none";
  };

  // Viewport-proportional title sizes via inline style
  // Uses max(vw, vh-based) so portrait screens get reasonable sizes
  const getTitleStyle = (text: string): React.CSSProperties => {
    if (text.length > 25) return { fontSize: "clamp(1rem, max(1.8vw, 2.5vh), 1.5rem)" };
    return { fontSize: "clamp(1.25rem, max(2.5vw, 3vh), 2.25rem)" };
  };

  const titleSizeClass = getTitleClass(card.title);

  return (
    <article
      className={`
        ${glassClass}
        group relative flex w-full cursor-default flex-col md:flex-row
        items-center justify-center md:justify-between rounded-2xl
        transition-[transform,box-shadow] duration-300 hover:scale-[1.01] hover:shadow-2xl active:scale-[0.98]
        h-auto max-w-full md:max-w-[min(60%,800px)]
      `}
      style={{
        padding: "clamp(1rem, 2.5vh, 1.5rem) clamp(1.25rem, 2vw, 2rem)",
        gap: "clamp(0.75rem, 1.5vh, 1rem)",
      }}
    >
      {/* --- LEFT SECTION: TITLE --- */}
      <div className="flex shrink-0 flex-col text-center md:basis-1/4 md:text-left justify-center">
        <h2
          className={`card-title font-bold text-balance ${titleSizeClass} ${isDark ? "text-white" : "text-gray-900"}`}
          style={getTitleStyle(card.title)}
        >
          {card.title}
        </h2>

        {card.tagline && (
          <p
            className={`truncate font-bold uppercase tracking-widest ${isDark ? "text-white/60" : "text-gray-900/60"}`}
            style={{ marginTop: "clamp(0.25rem, 0.5vw, 0.5rem)", fontSize: "clamp(0.6rem, max(0.7vw, 1vh), 0.75rem)" }}
          >
            {card.tagline}
          </p>
        )}
      </div>

      {/* --- MIDDLE SECTION: DESCRIPTION --- */}
      <p
        className={`flex-none md:flex-1 text-center leading-relaxed line-clamp-3 ${isDark ? "text-white/80" : "text-gray-800/80"}`}
        style={{
          padding: "0 clamp(0.5rem, 1vw, 1rem)",
          fontSize: "clamp(0.8rem, max(1.2vw, 1.5vh), 0.9rem)"
        }}
      >
        {card.descriptor}
      </p>

      {/* --- RIGHT SECTION: BUTTON --- */}
      <div className="flex shrink-0 items-center">
        <button
          className={`shrink-0 rounded font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
            isDark
              ? "border border-white/30 text-white hover:bg-white/10 hover:scale-105 active:scale-95 focus-visible:ring-white/50 focus-visible:ring-offset-black"
              : "border border-black/20 text-gray-900 hover:bg-black/5 hover:scale-105 active:scale-95 focus-visible:ring-black/30"
          }`}
          style={{ padding: "clamp(0.5rem, max(0.6vw, 0.8vh), 0.625rem) clamp(1rem, max(1.5vw, 2vh), 1.5rem)", fontSize: "clamp(0.75rem, max(0.85vw, 1.1vh), 0.85rem)" }}
          onClick={() => onExplore?.()}
        >
          {t.explore}
        </button>
      </div>
    </article>
  );
}