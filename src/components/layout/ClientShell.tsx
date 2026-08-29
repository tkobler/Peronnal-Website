"use client";

import Navigation from "./Navigation";
import PageTransition from "./PageTransition";
import { LanguageProvider } from "@/context/LanguageContext";
import { AdminProvider } from "@/context/AdminContext";

/**
 * Layout-level client shell.
 * Renders Navigation OUTSIDE PageTransition so that
 * `position: fixed` elements are never trapped inside a CSS-transformed parent.
 */
export default function ClientShell({ children }: { children: React.ReactNode }) {
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

        {/* Renders OUTSIDE PageTransition — never affected by transforms */}
        <Navigation />

        {/* Only page content is animated */}
        <PageTransition>{children}</PageTransition>
      </LanguageProvider>
    </AdminProvider>
  );
}
