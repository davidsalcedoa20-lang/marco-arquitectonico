"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-5 pb-14 pt-24 sm:px-6 md:px-10 md:pb-28 md:pt-36 lg:px-14 lg:pb-36">
      <div className="mx-auto grid max-w-[1600px] items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }}
          className="max-w-xl"
        >
          <p className="mb-6 font-mono text-[10px] tracking-[0.38em] text-ma-orange md:text-[11px]">
            QUIÉNES SOMOS
          </p>
          <h1 className="text-[clamp(2.35rem,4.6vw,3.85rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-white">
            Arquitectura con propósito,
            <br />
            construida desde la{" "}
            <span className="text-ma-orange">confianza.</span>
          </h1>
          <p className="mt-8 max-w-[32rem] text-[15px] leading-[1.8] text-white/55 md:mt-9 md:text-[16px]">
            Somos un estudio que une diseño, construcción y acompañamiento con
            una misma exigencia: espacios que funcionan, se sienten y
            perduran — con precisión técnica y cercanía humana.
          </p>
          <a
            href="#como-trabajamos"
            className="group mt-8 inline-flex min-h-11 items-center gap-3 border border-white/25 px-6 py-3.5 text-[10px] font-medium tracking-[0.22em] text-white transition-colors duration-500 hover:border-white/50 hover:bg-white/[0.03] md:mt-12 md:text-[11px]"
          >
            CONOCE NUESTRA FORMA DE TRABAJAR
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease }}
          className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5] xl:aspect-[5/4] lg:min-h-[560px]"
        >
          <Image
            src="/quienes_somos/hero.webp"
            alt="Equipo de Marco Arquitectónico trabajando sobre planos en el estudio"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/65 via-[#0a0a0a]/20 to-transparent lg:from-[#0a0a0a]/55"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/25"
          />
        </motion.div>
      </div>
    </section>
  );
}
