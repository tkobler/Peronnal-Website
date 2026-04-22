"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import DotPattern from "./DotPattern";
import Navigation from "./Navigation";
import PageTransition from "./PageTransition";
import { LanguageProvider } from "@/context/LanguageContext";
import { AdminProvider } from "@/context/AdminContext";
import type { Schematic } from "@/data/projects";

// Signal pulse — a horizontal line that pulses like an ECG when discovered.
// The line sits at 58% height, below the hero content.
const SIGNAL_SCHEMATIC: Schematic = {
  mode: "pulse",
  paths: [
    [5, 58, 95, 58],   // main signal line spanning most of viewport
  ],
  pads: [],
};
const HOME_SCHEMATICS: Record<string, Schematic> = { hero: SIGNAL_SCHEMATIC };
const EMPTY_SCHEMATICS: Record<string, Schematic> = {};

/**
 * Layout-level client shell.
 * Renders DotPattern + Navigation OUTSIDE PageTransition so that
 * `position: fixed` elements are never trapped inside a CSS-transformed parent.
 */
export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // After page transition settles, signal DotPattern to re-detect sections.
  // Uses a custom event (not resize) to avoid a full canvas rebuild & visual flash.
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("route-change"));
    }, 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AdminProvider>
      <LanguageProvider>
        {/* Skip link for keyboard/screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only fixed left-4 top-4 rounded-lg bg-white px-4 py-2 text-sm font-bold text-black shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-500"
          style={{ zIndex: "var(--z-skip-link)" }}
        >
          Skip to main content
        </a>

        {/* These render OUTSIDE PageTransition — never affected by transforms */}
        <DotPattern
          schematics={isHome ? HOME_SCHEMATICS : EMPTY_SCHEMATICS}
          enableReveal={isHome}
        />
        <Navigation />

        {/* Only page content is animated */}
        <PageTransition>{children}</PageTransition>
      </LanguageProvider>
    </AdminProvider>
  );
}
