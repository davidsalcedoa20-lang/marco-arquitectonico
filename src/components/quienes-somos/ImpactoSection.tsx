"use client";

import Image from "next/image";
import { FadeIn } from "./FadeIn";

export function ImpactoSection() {
  return (
    <section className="relative px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <FadeIn className="relative order-2 lg:order-1">
          <div className="relative aspect-[5/4] overflow-hidden md:aspect-[16/11]">
            <Image
              src="/quienes_somos/impacto.webp"
              alt="Espacio arquitectónico que genera valor y bienestar"
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/35 lg:to-[#0a0a0a]/25"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.08} className="order-1 lg:order-2">
          <p className="mb-5 font-mono text-[10px] tracking-[0.38em] text-ma-orange md:text-[11px]">
            NUESTRO IMPACTO
          </p>
          <h2 className="max-w-lg text-[clamp(1.85rem,3.4vw,2.85rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white">
            Creamos espacios que generan valor.
          </h2>
          <p className="mt-7 max-w-md text-[15px] leading-[1.8] text-white/50 md:text-[16px]">
            El verdadero impacto de un proyecto no se mide en cifras vacías.
            Se siente en la cotidianidad: en cómo se habita, cómo se trabaja y
            cómo se permanece en un lugar diseñado con intención.
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-[1.8] text-white/50 md:text-[16px]">
            Buscamos calidad antes que cantidad. Cada decisión — material,
            proporción, luz o detalle — responde a una promesa: espacios que
            elevan la vida de quienes los usan.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
