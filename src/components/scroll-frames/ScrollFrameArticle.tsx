"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { StickyFrameCanvas } from "./StickyFrameCanvas";
import { MobileServiceVisual } from "@/components/mobile/MobileServiceVisual";
import { useIsDesktopMd } from "@/hooks/useMediaQuery";
import { smoothstep } from "@/lib/narrativeBlend";
import { frameUrl } from "@/lib/frames";

type Props = {
  sequenceId: string;
  children: ReactNode;
  buildingScale?: number;
  className?: string;
  animationPortion?: number;
  variant?: "editorial" | "cinematic";
  /** Optional override for mobile still */
  mobileStillSrc?: string;
};

/**
 * Continuous split: text | sticky frame scrub (desktop).
 * Mobile: stacked text + final-frame still (no sequence loader).
 */
export function ScrollFrameArticle({
  sequenceId,
  children,
  buildingScale = 0.8,
  animationPortion = 0.48,
  className = "",
  variant = "editorial",
  mobileStillSrc,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const isDesktop = useIsDesktopMd();
  const cinematic = variant === "cinematic";
  /** Desktop column split — editorial (Mantenimiento): ~45 / 55 */
  const leftPct = cinematic ? 43.5 : 45;

  const still =
    mobileStillSrc ??
    (sequenceId === "servicios-profesionales"
      ? frameUrl(
          "/assets/frames/servicios-profesionales",
          181,
          "frame_%04d.webp",
        )
      : "/assets/servicios/mantenimiento/13_mantenimiento_fachada.webp");

  useEffect(() => {
    if (!isDesktop) return;

    const el = sectionRef.current;
    if (!el) return;

    let ticking = false;
    let lastEmit = 0;

    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = scrolled / total;
      const now = performance.now();
      if (now - lastEmit > 24 || p >= 0.995 || p <= 0.005) {
        lastEmit = now;
        setProgress(p);
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

  const frameProgress = Math.min(
    1,
    progress / Math.max(0.0001, animationPortion),
  );
  const handoff = smoothstep(progress, 0.88, 1);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-ma-black ${cinematic ? "frame-cinematic" : ""} ${className}`}
      data-act="1"
      data-variant={variant}
      data-layout="continuous-split"
    >
      {cinematic && isDesktop && (
        <div
          className="frame-cinematic-atmosphere pointer-events-none absolute inset-0 z-0"
          aria-hidden
        />
      )}

      <div className="relative flex flex-col md:flex-row md:items-start">
        <article
          className={`relative z-20 w-full px-5 pt-24 pb-10 sm:px-6 md:pb-24 ${
            cinematic
              ? "bg-ma-black md:bg-transparent md:pr-6 lg:pl-14 lg:pr-4 xl:pl-16"
              : "bg-ma-black md:px-8 lg:px-10 xl:px-12"
          }`}
          style={
            isDesktop
              ? {
                  width: `${leftPct}%`,
                  maxWidth: `${leftPct}%`,
                  minWidth: 0,
                  flexShrink: 0,
                }
              : { width: "100%", maxWidth: "100%" }
          }
        >
          {cinematic && isDesktop && (
            <div
              className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-[120%]"
              style={{
                background:
                  "linear-gradient(90deg, #090909 0%, rgba(9,9,9,0.94) 48%, rgba(9,9,9,0.55) 72%, rgba(9,9,9,0.15) 88%, transparent 100%)",
              }}
              aria-hidden
            />
          )}

          <div
            className={`mx-auto w-full md:mx-0 ${
              cinematic ? "max-w-[48rem]" : "max-w-[52rem]"
            }`}
          >
            {children}
          </div>
        </article>

        {/* Mobile — final still */}
        <div className="relative z-10 w-full px-5 pb-12 sm:px-6 md:hidden">
          <MobileServiceVisual
            src={still}
            alt="Vista del servicio"
            label={cinematic ? "Diseño" : "Resultado"}
            priority
          />
        </div>

        {/* Desktop — sticky frames */}
        <div
          className={`pointer-events-none absolute inset-0 z-0 hidden opacity-0 md:pointer-events-auto md:relative md:z-10 md:block md:sticky md:top-0 md:h-screen md:min-w-0 md:flex-1 md:opacity-100 ${
            cinematic
              ? "md:-mr-12 md:ml-[-2%] lg:-mr-16 lg:ml-[-3%]"
              : ""
          }`}
        >
          <div
            className="h-full w-full"
            style={{
              opacity: 1 - handoff * 0.4,
              transform: `translate3d(0, ${handoff * -28}px, 0)`,
            }}
          >
            {isDesktop ? (
              <StickyFrameCanvas
                sequenceId={sequenceId}
                progress={frameProgress}
                buildingScale={buildingScale}
                variant={variant}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
