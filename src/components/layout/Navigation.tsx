"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useViewTransitionRouter } from "@/hooks/useViewTransitionRouter";
import { useLanguage } from "@/context/LanguageContext";

export default function Navigation() {
  const { locale, setLocale, t } = useLanguage();
  const MENU_ITEMS = [
    { label: t.nav.projects, href: "/projects" },
    { label: t.nav.experience, href: "/experience" },
    { label: t.nav.hobby, href: "/hobby" },
    { label: t.nav.about, href: "/about" },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const router = useViewTransitionRouter();
  const pathname = usePathname();

  // Theme detection loops through [data-section-theme] elements on each scroll
  // frame (via rAF). An IntersectionObserver would avoid per-frame rect queries,
  // but in practice the page never has more than ~10 themed sections, so the
  // current approach is fast enough and far simpler to reason about.
  const detectTheme = useCallback(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-section-theme]");
    let currentTheme: "dark" | "light" = "light";

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 48 && rect.bottom > 96) {
        currentTheme = (section.dataset.sectionTheme as "dark" | "light") || "light";
        break;
      }
    }

    setTheme(currentTheme);
  }, []);

  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (delta > 5 && currentY > 80) {
        setHidden(true);
      } else if (delta < -5) {
        setHidden(false);
      }
      lastScrollY.current = currentY;
      detectTheme();
      ticking.current = false;
    });
  }, [detectTheme]);

  useEffect(() => {
    const onScroll = () => {
      handleScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    // Defer the initial detection to satisfy react-hooks/set-state-in-effect —
    // detectTheme calls setState and must not run synchronously in the effect body.
    const id = requestAnimationFrame(() => detectTheme());
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, [handleScroll, detectTheme]);

  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [menuOpen]);

  const menuPanelRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setMenuOpen(false);
    // Return focus to hamburger button after closing
    hamburgerRef.current?.focus();
  };

  // Focus trap + Escape key for menu modal
  useEffect(() => {
    if (!menuOpen) return;

    const panel = menuPanelRef.current;
    if (!panel) return;

    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusableElements = () => Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector));

    // Focus first focusable element when menu opens
    const focusables = getFocusableElements();
    if (focusables.length > 0) focusables[0].focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (e.key === "Tab") {
        const focusables = getFocusableElements();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMenu();
    router.push(href);
  };

  const pillHidden = hidden && !menuOpen;

  return (
    <>
      {/* ======================================= */}
      {/* 1. PILL NAVIGATION (Standard State)     */}
      {/* ======================================= */}
      <nav
        className={`nav-pill ${pillHidden ? "hidden" : ""}`}
        data-theme={theme}
        role="navigation"
        aria-label="Main navigation"
        style={{ zIndex: "var(--z-nav)" }}
      >
        <button
          ref={hamburgerRef}
          className={`hamburger ${menuOpen ? "open" : ""} flex h-11 w-11 flex-col items-center justify-center gap-[6px] border-none bg-transparent p-0 transition-transform duration-200 hover:scale-110 active:scale-95`}
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="nav-menu-panel"
          style={{ cursor: "pointer" }}
        >
          <span className="block h-[2px] w-7 bg-current transition-all" />
          <span className="block h-[2px] w-7 bg-current transition-all" />
          <span className="block h-[2px] w-7 bg-current transition-all" />
        </button>

        <Link href="/" className="nav-home-text" onClick={handleHomeClick}>
          {t.nav.home}
        </Link>
      </nav>

      {/* ======================================= */}
      {/* LOCALE TOGGLE (top-right, fixed)        */}
      {/* ======================================= */}
      <div
        className={`nav-locale-toggle ${pillHidden ? "hidden" : ""}`}
        data-theme={theme}
      >
        <button
          onClick={() => setLocale("fr")}
          className={`focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 active:opacity-70 ${locale === "fr" ? "active" : ""}`}
          aria-label="Passer en français"
          aria-pressed={locale === "fr"}
        >
          FR
        </button>
        <span className="nav-locale-sep" aria-hidden="true">·</span>
        <button
          onClick={() => setLocale("en")}
          className={`focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 active:opacity-70 ${locale === "en" ? "active" : ""}`}
          aria-label="Switch to English"
          aria-pressed={locale === "en"}
        >
          EN
        </button>
      </div>

      {/* ======================================= */}
      {/* 2. FULL SCREEN BACKDROP (Blur Layer)    */}
      {/* ======================================= */}
      <div
        className={`fixed inset-0 transition-all duration-200 ease-in-out ${
          menuOpen
            ? "bg-black/20 opacity-100 pointer-events-auto"
            : "bg-transparent backdrop-blur-none opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: "var(--z-menu-backdrop)" }}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ======================================= */}
      {/* 3. MENU PANEL (The "Card")              */}
      {/* ======================================= */}
      <div
        ref={menuPanelRef}
        id="nav-menu-panel"
        className={`fixed left-1/2 top-1/2 flex w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-3xl border border-white/40 bg-white/90 p-8 shadow-2xl backdrop-blur-2xl transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:aspect-[3/4] md:h-auto md:max-h-[700px] h-[min(85vh,90%)]
        ${menuOpen ? "scale-100 opacity-100" : "scale-90 opacity-0 pointer-events-none"}`}
        style={{ zIndex: "var(--z-menu-panel)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        {...(!menuOpen && { inert: true })}
      >
        
        {/* --- HEADER --- */}
        <div className="flex w-full items-center justify-between border-b border-black/5 pb-6">
          <Link
            href="/"
            onClick={handleHomeClick}
            className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:rounded-sm"
          >
            {t.nav.home}
          </Link>

          <button
            onClick={closeMenu}
            className="group flex min-h-[44px] min-w-[44px] items-center justify-end gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 transition-colors hover:text-black"
            aria-label="Close menu"
          >
            <span>{t.nav.close}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 ease-out group-hover:rotate-90 group-hover:text-black"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* --- BODY --- */}
        <div className="flex flex-col items-center justify-center gap-6">
          <ul className="flex flex-col items-center gap-6 text-center">
            {MENU_ITEMS.map((item) => (
              <li key={item.href} className="p-2">
                  <a
                    href={item.href}
                    onClick={(e) => handleMenuClick(e, item.href)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`block text-3xl font-bold uppercase tracking-wide transition-[transform,color] duration-300 hover:scale-110 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:rounded-sm ${
                      pathname === item.href ? "text-black underline underline-offset-8 decoration-2" : "text-black/90"
                    }`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.label}
                  </a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- FOOTER --- */}
        <div className="flex w-full flex-col items-center gap-5 border-t border-black/5 pt-6">
          <button
            onClick={() => {
              closeMenu();
              router.push("/contact");
            }}
            className="group relative flex items-center gap-3 rounded-full bg-black/5 px-8 py-3 text-xs font-bold uppercase tracking-widest text-black/70 transition-all hover:bg-black hover:text-white hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-4 focus-visible:rounded-sm"
          >
            <span>{t.nav.getInTouch}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] group-hover:bg-green-400" />
          </button>

          <span className="font-mono text-[9px] uppercase tracking-widest text-black/30">
             © {new Date().getFullYear()} Your Name
          </span>
        </div>

      </div>
    </>
  );
}