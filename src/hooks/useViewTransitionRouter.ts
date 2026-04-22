"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Wraps Next.js router with the View Transitions API for smooth cross-fades.
 *
 * The callback returns a Promise that resolves when React has actually
 * committed the new page DOM (detected via MutationObserver on #main-content).
 * This ensures the API captures the real new state, not stale content.
 */
export function useViewTransitionRouter() {
  const router = useRouter();

  const push = useCallback(
    (href: string) => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!document.startViewTransition || prefersReduced) {
        router.push(href);
        return;
      }

      document.startViewTransition(async () => {
        router.push(href);

        // Wait for React to commit the new route's DOM
        await new Promise<void>((resolve) => {
          const target = document.getElementById("main-content");
          if (!target) { resolve(); return; }

          const observer = new MutationObserver(() => {
            observer.disconnect();
            resolve();
          });
          observer.observe(target, { childList: true, subtree: true });

          // Safety timeout — never hang the transition
          setTimeout(() => {
            observer.disconnect();
            resolve();
          }, 2000);
        });
      });
    },
    [router]
  );

  return { ...router, push };
}
