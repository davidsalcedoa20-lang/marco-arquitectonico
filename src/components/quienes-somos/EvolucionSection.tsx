"use client";

import Image from "next/image";
import { FadeIn } from "./FadeIn";

const PILLARS = [
  {
    title: "Experiencia",
    text: "Cada obra nos ha enseñado a anticipar lo que el proyecto necesita antes de que se vuelva un problema.",
  },
  {
    title: "Procesos",
    text: "Métodos claros y decisiones documentadas para que el avance sea ordenado, transparente y medible.",
  },
  {
    title: "Equipo",
    text: "Profesionales multidisciplinarios que hablan el mismo idioma: calidad, detalle y responsabilidad.",
  },
  {
    title: "Compromiso",
    text: "Acompañamos hasta el final — y más allá — porque la confianza se construye con presencia.",
  },
] as const;

export function EvolucionSection() {
  return (
    <section className="relative px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-24">
        <div>
          <FadeIn>
            <p className="mb-5 font-mono text-[10px] tracking-[0.38em] text-ma-orange md:text-[11px]">
              NUESTRA EVOLUCIÓN
            </p>
            <h2 className="max-w-lg text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white">
              Un camino de crecimiento constante
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-white/50 md:text-[16px]">
              Cada proyecto nos ha permitido crecer, perfeccionar nuestros
              procesos y consolidar un equipo capaz de afrontar proyectos cada
              vez más ambiciosos.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2">
            {PILLARS.map((item, i) => (
              <FadeIn
                key={item.title}
                delay={0.08 * i}
                className="bg-[#0a0a0a] px-0 py-8 sm:p-8"
              >
                <h3 className="text-[15px] font-medium tracking-[0.04em] text-white md:text-[16px]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-[13px] leading-[1.75] text-white/45 md:text-[14px]">
                  {item.text}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.1} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6] lg:aspect-[4/5]">
            <Image
              src="/quienes_somos/crecimiento.webp"
              alt="Proceso de diseño y construcción en evolución"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0a0a0a]/40 lg:to-[#0a0a0a]/30"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/45 via-transparent to-transparent"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
