"use client";

import { useCallback, useMemo } from "react";
import { useViewTransitionRouter } from "@/hooks/useViewTransitionRouter";
import HeroSection from "./HeroSection";
import ProjectSection from "./ProjectSection";
import TopoBackground from "@/components/layout/TopoBackground";
import { getHomeCards } from "@/data/homeCards";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
  const router = useViewTransitionRouter();
  const { t } = useLanguage();
  const rawCards = getHomeCards();

  // Overlay translated titles/descriptors onto raw card data
  const cards = useMemo(() =>
    rawCards.map((card) => {
      const tr = t.homeCards[card.id];
      if (!tr) return card;
      return { ...card, title: tr.title, descriptor: tr.descriptor };
    }),
    [rawCards, t]
  );

  const sectionThemes: Array<"dark" | "light"> = cards.map((_, i) =>
    i % 2 === 0 ? "dark" : "light"
  );

  const handleExplore = useCallback(
    (linkTo: string) => {
      router.push(linkTo);
    },
    [router]
  );

  return (
    <>
      <main className="relative">
        <HeroSection />

        {/* Narrative bridge */}
        <section
          className="section-light relative flex items-center justify-center py-16 md:py-24"
          data-section-theme="light"
          style={{ paddingLeft: "var(--container-padding)", paddingRight: "var(--container-padding)" }}
        >
          <TopoBackground theme="light" seed={2} />
          <p
            className="relative z-10 max-w-2xl text-center text-[length:var(--text-lg)] leading-relaxed opacity-70"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {t.hero.tagline}
          </p>
        </section>

        {cards.map((card, i) => (
          <ProjectSection
            key={card.id}
            card={card}
            theme={sectionThemes[i]}
            onSelect={() => handleExplore(card.linkTo)}
          />
        ))}
      </main>
    </>
  );
}
