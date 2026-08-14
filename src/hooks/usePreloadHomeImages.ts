"use client";

import { useEffect, useState } from "react";
import { ALL_HOME_BG_URLS } from "@/lib/homeBackgrounds";

let preloadStarted = false;
let preloadDone = false;
const waiters: Array<() => void> = [];

function startPreload() {
  if (preloadStarted || typeof window === "undefined") return;
  preloadStarted = true;

  let remaining = ALL_HOME_BG_URLS.length;
  const settle = () => {
    remaining -= 1;
    if (remaining <= 0) {
      preloadDone = true;
      waiters.splice(0).forEach((fn) => fn());
    }
  };

  ALL_HOME_BG_URLS.forEach((src) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = settle;
    img.onerror = settle;
    img.src = src;
  });
}

/** Preload all service backgrounds once for the session. */
export function usePreloadHomeImages() {
  const [ready, setReady] = useState(preloadDone);

  useEffect(() => {
    if (preloadDone) {
      setReady(true);
      return;
    }
    startPreload();
    const onReady = () => setReady(true);
    waiters.push(onReady);
    return () => {
      const i = waiters.indexOf(onReady);
      if (i >= 0) waiters.splice(i, 1);
    };
  }, []);

  return ready;
}
