"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function LenisScrollTriggerBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const sync = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(sync);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(sync);
    };
  }, [lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Home is scrollable (Hero + Clientes); clear any leftover lock class.
    document.documentElement.classList.remove("home-no-scroll");
  }, []);

  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
        touchMultiplier: 1.5,
        wheelMultiplier: 0.9,
      }}
    >
      <LenisScrollTriggerBridge />
      <div ref={wrapperRef}>{children}</div>
    </ReactLenis>
  );
}
