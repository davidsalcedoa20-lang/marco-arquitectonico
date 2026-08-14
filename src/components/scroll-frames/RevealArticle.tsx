"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Reveals each [data-reveal] child when it enters the viewport.
 * Never hides or replaces previous content — document flow only.
 */
export function RevealArticle({ children, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const cinematic = root.classList.contains("editorial-cinematic");

    const ctx = gsap.context(() => {
      const reduceMotion =
        typeof window !== "undefined" &&
        (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
          window.matchMedia("(max-width: 767px)").matches);

      const items = root.querySelectorAll<HTMLElement>("[data-reveal]");
      items.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: reduceMotion ? 14 : cinematic ? 28 : 30,
            filter: reduceMotion ? "none" : "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "none",
            duration: reduceMotion ? 0.45 : cinematic ? 0.85 : 0.75,
            ease: cinematic ? "power3.out" : "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
