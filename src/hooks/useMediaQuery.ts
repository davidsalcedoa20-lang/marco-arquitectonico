"use client";

import { useEffect, useState } from "react";

/** Desktop / tablet landscape sticky experiences (Tailwind `md`) */
export const DESKTOP_MQ = "(min-width: 768px)";

/**
 * Client-only media query. Starts as `false` to avoid mounting heavy
 * WebGL/video-scrub on phones; desktop hydrates and enables after mount.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

export function useIsDesktopMd() {
  return useMediaQuery(DESKTOP_MQ);
}
