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
          <p className="mb-6 font-mono text-[16px] font-semibold tracking-[0.06em] text-ma-orange">
            Quiénes somos
          </p>
          <h1 className="text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-ma-black">
            Arquitectura con propósito,
            <br />
            construida desde la{" "}
            <span className="text-ma-orange">confianza.</span>
          </h1>
          <p className="mt-8 max-w-[32rem] text-[16px] leading-[1.8] text-ma-black/70 md:mt-9">
            Somos un estudio que une diseño, construcción y acompañamiento con
            una misma exigencia: espacios que funcionan, se sienten y
            perduran.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.12, ease }}
          className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-[5/4] xl:aspect-[5/4] lg:min-h-[420px]"
        >
          <Image
            src="/quienes_somos/hero.webp"
            alt="Equipo de Marco Arquitectónico trabajando sobre planos en el estudio"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />


        </motion.div>
      </div>
    </section>
  );
}

