"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  ctaTitle?: string;
  ctaBody?: string;
  mailSubject?: string;
};

/**
 * Closing CTA for service pages (after Act 1 content).
 */
export function ServiceFinalCta({
  ctaTitle = "Construyamos su próximo proyecto.",
  ctaBody = "Desde la planificación hasta la entrega, acompañamos cada etapa con precisión técnica y compromiso con la calidad.",
  mailSubject = "Construcci%C3%B3n",
}: Props = {}) {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();
      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 1.1,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative border-t border-white/5 bg-ma-black"
      data-act="service-cta"
    >
      <div className="mx-auto flex min-h-[50vh] max-w-[1200px] flex-col justify-center px-6 py-28 md:px-10 md:py-40 lg:px-14">
        <div data-reveal>
          <p className="mb-5 font-mono text-[10px] tracking-[0.35em] text-ma-orange">
            SIGUIENTE PASO
          </p>
          <h2 className="max-w-3xl text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-white">
            {ctaTitle}
          </h2>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-white/55 md:text-base">
            {ctaBody}
          </p>
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href={`mailto:contacto@marcoarquitectonico.com?subject=Cotizaci%C3%B3n%20${mailSubject}`}
              className="inline-flex items-center justify-center bg-ma-orange px-8 py-4 text-[11px] font-medium tracking-[0.22em] text-ma-black transition-opacity duration-500 hover:opacity-90"
            >
              SOLICITAR COTIZACIÓN
            </a>
            <a
              href={`mailto:contacto@marcoarquitectonico.com?subject=Asesor%C3%ADa%20${mailSubject}`}
              className="group inline-flex flex-col gap-2"
            >
              <span className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-white">
                HABLAR CON UN ASESOR
                <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
              <span className="relative h-px w-full overflow-hidden bg-white/20">
                <span className="absolute inset-y-0 left-0 w-0 bg-ma-orange transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
