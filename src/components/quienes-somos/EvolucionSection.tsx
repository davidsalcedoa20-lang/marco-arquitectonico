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
    text: "Profesionales que coordinan cada disciplina y acompañan el proyecto hasta la entrega.",
  },

] as const;

export function EvolucionSection() {
  return (
    <section className="relative px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-24">
        <div>
          <FadeIn>
            <p className="mb-5 font-mono text-[16px] font-semibold tracking-[0.06em] text-ma-orange">
              Nuestra evolución
            </p>
            <h2 className="max-w-lg text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-ma-black">
              Un camino de crecimiento constante
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-[1.8] text-ma-black/65">
              Cada proyecto nos ha permitido crecer, perfeccionar nuestros
              procesos y consolidar un equipo capaz de afrontar proyectos cada
              vez más ambiciosos.
            </p>
          </FadeIn>

          <div className="mt-8 grid gap-4">
            {PILLARS.map((item, i) => (
              <FadeIn
                key={item.title}
                delay={0.08 * i}
                className="rounded-[20px] bg-ma-beige/25 p-6"
              >
                <h3 className="text-[16px] font-semibold tracking-[0.02em] text-ma-black">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-sm text-[16px] leading-[1.75] text-ma-black/60">
                  {item.text}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={0.1} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6] lg:aspect-[4/5]">
            <Image
              src="/quienes_somos/planificacion.webp"
              alt="Equipo planificando el desarrollo de una obra"
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

