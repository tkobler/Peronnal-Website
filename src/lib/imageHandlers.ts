import type { SyntheticEvent } from "react";

/**
 * Fade-in handler for Next.js <Image> components that start with `opacity-0`.
 * Use on images with `className="... opacity-0 transition-opacity duration-..."`.
 */
export function handleImageLoad(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.target as HTMLImageElement;
  img.classList.remove("opacity-0");
  img.classList.add("opacity-100");
}

/**
 * Gracefully hide a broken image instead of showing the browser's broken-icon.
 * Use on any <Image> or <img> loading dynamic/user-provided sources.
 */
export function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
  (e.target as HTMLImageElement).style.display = "none";
}
