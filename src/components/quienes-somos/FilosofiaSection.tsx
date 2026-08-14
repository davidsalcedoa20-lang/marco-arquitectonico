"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "./FadeIn";

export function FilosofiaSection() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden md:min-h-[85vh]">
      <Image
        src="/quienes_somos/filosofia.webp"
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover"
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[#0a0a0a]/72 md:bg-[#0a0a0a]/68"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/55 via-transparent to-[#0a0a0a]/80"
      />

      <div className="relative z-10 flex min-h-[78vh] items-center justify-center px-6 py-28 md:min-h-[85vh] md:px-10 md:py-36 lg:px-14">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <p className="mb-6 font-mono text-[10px] tracking-[0.38em] text-ma-orange md:text-[11px]">
            NUESTRA FILOSOFÍA
          </p>
          <h2 className="text-[clamp(1.7rem,3.6vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.035em] text-white">
            La arquitectura no termina cuando se entrega una obra. Comienza
            cuando las personas empiezan a vivirla.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-[15px] leading-[1.8] text-white/50 md:text-[16px]">
            Diseñamos para el día a día: para la luz de la mañana, el silencio
            de la tarde y la permanencia de lo bien hecho.
          </p>
          <Link
            href="/servicios"
            className="group mt-12 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.24em] text-white/70 transition-colors duration-500 hover:text-ma-orange"
          >
            CONOCE NUESTROS SERVICIOS
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
