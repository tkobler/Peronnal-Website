"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Page content wrapper with transition support.
 *
 * Primary: View Transitions API handles the cross-fade (old screenshot → new DOM).
 *          This is triggered by useViewTransitionRouter, not by this component.
 *
 * Fallback: For browsers without View Transitions API (Firefox <132),
 *           useLayoutEffect applies a simple fade-in animation.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prevPathRef = useRef(pathname);
  const isFirstRender = useRef(true);
  const isPopState = useRef(false);

  // Track browser back/forward navigations to preserve native scroll restoration
  useEffect(() => {
    const onPopState = () => { isPopState.current = true; };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Fallback transition for browsers without View Transitions API
  useLayoutEffect(() => {
    if (typeof document !== "undefined" && document.startViewTransition) return;

    const el = wrapperRef.current;
    if (!el || isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (pathname === prevPathRef.current) return;
    prevPathRef.current = pathname;

    if (!isPopState.current) {
      window.scrollTo(0, 0);
    }
    isPopState.current = false;

    el.style.animation = "none";
    // Force reflow to reset animation
    void el.offsetHeight;
    el.style.animation = "pageEnter 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards";
  }, [pathname]);

  return (
    <div
      ref={wrapperRef}
      id="main-content"
      className="page-transition"
    >
      {children}
    </div>
  );
}
