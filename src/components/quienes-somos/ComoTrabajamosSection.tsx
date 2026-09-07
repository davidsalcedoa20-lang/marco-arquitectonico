"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeIn } from "./FadeIn";

const STEPS = [
  {
    title: "Escuchamos y diseñamos",
    text: "Entendemos tu visión y el contexto real del proyecto, y la traducimos en arquitectura clara: espacios, proporciones y soluciones con intención.",
    image: "/quienes_somos/idea.webp",
  },
  {
    title: "Planificamos y construimos",
    text: "Definimos tiempos, costos y prioridades, y ejecutamos con rigor técnico, control de calidad y presencia constante en obra.",
    image: "/quienes_somos/construccion.webp",
  },
  {
    title: "Acompañamos",
    text: "Seguimos cerca después de la entrega para que el espacio se viva con tranquilidad.",
    image: "/quienes_somos/acompanamiento.webp",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function ComoTrabajamosSection() {
  return (
    <section
      id="como-trabajamos"
      className="relative scroll-mt-24 px-6 py-24 md:px-10 md:py-32 lg:px-14 lg:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <FadeIn className="max-w-2xl">
          <p className="mb-5 font-mono text-[16px] font-semibold tracking-[0.06em] text-ma-orange">
            Cómo trabajamos
          </p>
          <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-ma-black">
            Proceso claro, transparente y colaborativo
          </h2>
          <p className="mt-6 max-w-xl text-[16px] leading-[1.8] text-ma-black/65">
            Tres momentos que se conectan sin fricción: desde la primera
            conversación hasta el acompañamiento en el tiempo.
          </p>
        </FadeIn>


        <div className="mt-10 grid gap-5 md:grid-cols-3 xl:gap-6">
          {STEPS.map((step, i) => (
            <ProcessCard key={step.title} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  step,
  index,
  mobile = false,
}: {
  step: (typeof STEPS)[number];
  index: number;
  mobile?: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay: index * 0.07, ease }}
      whileHover={{ y: -4, transition: { duration: 0.4, ease } }}
      className={`group relative flex flex-col overflow-hidden border border-black/[0.08] bg-black/[0.015] transition-[border-color,background-color] duration-500 hover:border-black/15 hover:bg-black/[0.03] ${
        mobile
          ? "w-[78vw] max-w-[320px] shrink-0 snap-center sm:w-[58vw]"
          : "min-w-0"
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={step.image}
          alt={step.title}
          fill
          loading="lazy"
          sizes={mobile ? "78vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-[#0a0a0a]/15 to-transparent"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 py-6 md:px-5 md:py-7">
        <p className="font-mono text-[16px] font-semibold tracking-[0.14em] text-ma-orange">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-3 text-[16px] font-semibold tracking-[-0.01em] text-ma-black">
          {step.title}
        </h3>
        <p className="mt-3 text-[16px] leading-[1.7] text-ma-black/65">
          {step.text}
        </p>
      </div>
    </motion.article>
  );
}

