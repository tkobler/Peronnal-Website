import { useState, useEffect } from "react";
import { useViewTransitionRouter } from "@/hooks/useViewTransitionRouter";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t, locale } = useLanguage();
  const router = useViewTransitionRouter();

  // Type the greeting text one character at a time (no loop — types once and stops)
  const greeting = t.hero.greeting;
  const [charIndex, setCharIndex] = useState(0);

  // Reset-on-locale-change via the "adjusting state during render" pattern
  // (https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).
  // Avoids a setState-inside-effect, which React 19 flags.
  const [trackedLocale, setTrackedLocale] = useState(locale);
  if (trackedLocale !== locale) {
    setTrackedLocale(locale);
    setCharIndex(0);
  }

  const done = charIndex >= greeting.length;

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => setCharIndex((i) => i + 1), 110);
    return () => clearTimeout(timer);
  }, [charIndex, done]);

  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) setShowScroll(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="bg-transparent relative grid min-h-screen place-items-center overflow-hidden"
      style={{ padding: "var(--space-lg) var(--container-padding)" }}
      aria-label="Hero introduction"
      data-section-theme="light"
      data-project-id="hero"
    >
      <div className="relative flex max-w-[var(--container-max)] flex-col items-center text-center" style={{ zIndex: "var(--z-hero-content)" }}>

        {/* --- Profile Picture --- */}
        <div className="hero-fade-1 mb-8">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl md:h-40 md:w-40">
            <Image
              src="/images/profile/pp.png"
              alt="Tim Kobler, robotics student and maker"
              width={160}
              height={160}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* --- Typewriter Greeting --- */}
        <div className="hero-fade-2 relative min-h-[4rem] sm:min-h-[5rem]">
          {/* Ghost element reserves width */}
          <h1 className="invisible text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight leading-[0.9]" aria-hidden="true">
            {greeting}
            <span className="font-light">|</span>
          </h1>
          {/* Actual typed text overlaid */}
          <h1 className="absolute inset-0 flex items-center justify-center text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight text-gray-900 leading-[0.9]">
            {greeting.slice(0, charIndex)}
            <span className={`font-light text-blue-600 ${done ? "animate-pulse" : ""}`}>|</span>
          </h1>
        </div>

        {/* --- Contact Button --- */}
        <div className="hero-fade-3 mt-8 sm:mt-14 flex justify-center">
          <button
            onClick={() => router.push('/contact')}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              window.dispatchEvent(new CustomEvent("dot-pattern-burst", {
                detail: {
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                  count: 4,
                },
              }));
            }}
            className="group relative overflow-hidden rounded-full border border-black/5 bg-white/40 px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold text-black backdrop-blur-md transition-all duration-300 hover:bg-white/60 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2"
          >
            <span className="relative z-10">{t.hero.contact}</span>
          </button>
        </div>

        {/* --- Scroll indicator --- */}
        {showScroll && (
          <div className="hero-fade-4 mt-8 sm:mt-24 transition-opacity duration-500" aria-hidden="true">
            <div className="scroll-indicator">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
