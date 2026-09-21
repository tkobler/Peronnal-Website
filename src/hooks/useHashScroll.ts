"use client";

import { useEffect } from "react";

/**
 * Scrolls to the element matching the URL hash once the page has mounted.
 *
 * Needed because navigation here goes through the client router (often wrapped
 * in a view transition), so the browser never performs its own anchor jump.
 * The short delay lets images and reveal animations settle before we measure.
 */
export function useHashScroll(delayMs = 100) {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);
}
