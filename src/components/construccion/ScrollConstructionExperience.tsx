"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { StickyConstructionScene } from "./StickyConstructionScene";
import { MobileServiceVisual } from "@/components/mobile/MobileServiceVisual";
import { useIsDesktopMd } from "@/hooks/useMediaQuery";
import { smoothstep } from "@/lib/narrativeBlend";

type Props = {
  children: ReactNode;
  className?: string;
  animationPortion?: number;
};

/**
 * Continuous split: article | sticky Three.js building (desktop).
 * Mobile: stacked text + static finished-building visual (no WebGL).
 */
export function ScrollConstructionExperience({
  children,
  animationPortion = 0.48,
  className = "",
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneProgressRef = useRef(0);
  const [layoutProgress, setLayoutProgress] = useState(0);
  const isDesktop = useIsDesktopMd();
  const lastLayoutEmit = useRef(0);
  const animPortionRef = useRef(animationPortion);
  animPortionRef.current = animationPortion;
  const leftPct = 43;

  useEffect(() => {
    if (!isDesktop) {
      sceneProgressRef.current = 1;
      return;
    }

    const el = sectionRef.current;
    if (!el) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = scrolled / total;
      sceneProgressRef.current = Math.min(
        1,
        p / Math.max(0.0001, animPortionRef.current),
      );

      const now = performance.now();
      if (now - lastLayoutEmit.current > 32 || p >= 0.995 || p <= 0.005) {
        lastLayoutEmit.current = now;
        setLayoutProgress(p);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop]);

  const handoff = smoothstep(layoutProgress, 0.88, 1);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-ma-black ${className}`}
      data-act="construccion-1"
      data-layout="continuous-split"
    >
      <div className="relative flex flex-col md:flex-row md:items-start">
        <article
          className="relative z-20 w-full bg-ma-black px-5 pt-24 pb-10 sm:px-6 md:bg-ma-black md:px-10 md:pt-28 md:pb-24 lg:px-14"
          style={
            isDesktop
              ? {
                  width: `${leftPct}%`,
                  maxWidth: `${leftPct}%`,
                  minWidth: 0,
                  flexShrink: 0,
                  borderRight: "1px solid rgba(255,255,255,0.05)",
                }
              : { width: "100%", maxWidth: "100%" }
          }
        >
          <div className="mx-auto w-full max-w-[720px] md:mx-0">{children}</div>
        </article>

        {/* Mobile — finished building, no WebGL */}
        <div className="relative z-10 w-full px-5 pb-12 sm:px-6 md:hidden">
          <MobileServiceVisual
            src="/assets/servicios/construccion/12_edificio_construccion.webp"
            alt="Edificio construido — resultado del proceso"
            label="Resultado"
            priority
          />
        </div>

        {/* Desktop — sticky 3D scene */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden opacity-0 md:pointer-events-auto md:relative md:z-10 md:block md:sticky md:top-0 md:h-screen md:min-w-0 md:flex-1 md:opacity-100">
          <div
            className="h-full w-full"
            style={{
              opacity: 1 - handoff * 0.15,
            }}
          >
            {isDesktop ? (
              <StickyConstructionScene progressRef={sceneProgressRef} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
