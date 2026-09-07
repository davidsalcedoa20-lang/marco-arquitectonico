"use client";

import { RevealArticle } from "@/components/scroll-frames/RevealArticle";
import {
  EditorialImage,
} from "@/components/servicios/EditorialImage";

const IMG = "/assets/servicios/construccion";

/** Two-size type system for this page: HEADING for h1/h2, BODY for everything else. */
const HEADING =
  "text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-ma-black";
const BODY = "text-[16px] leading-[1.8] text-ma-black/65";
const LABEL =
  "font-mono text-[16px] font-semibold tracking-[0.06em] text-ma-orange";

function BlockList({ items }: { items: string[] }) {
  return (
    <ul className="mt-10 space-y-4">
      {items.map((item) => (
        <li key={item} data-reveal className={`flex gap-4 ${BODY} !text-ma-black/75`}>
          <span className="mt-2 h-px w-6 shrink-0 bg-ma-orange/70" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Editorial copy organized in three pillars: Planificación, Ejecución, Entrega. */
export function ConstruccionArticle() {
  return (
    <RevealArticle className="editorial">
      {/* Hero */}
      <header className="flex min-h-0 flex-col justify-center py-14 md:min-h-[85vh] md:py-20">
        <p data-reveal className={`mb-6 ${LABEL}`}>
          Construcción
        </p>
        <h1 data-reveal className={HEADING}>
          Del plano
          <br />
          a la <span className="text-ma-orange">realidad.</span>
        </h1>
        <p data-reveal className={`mt-8 ${BODY}`}>
          Toda gran construcción inicia mucho antes del primer movimiento de
          tierra. Comienza con una idea, un análisis técnico y una
          planificación rigurosa que permite transformar una visión en un
          proyecto ejecutable. En Marco Arquitectónico entendemos que cada
          decisión tomada en esta etapa determina la calidad, seguridad y
          éxito de la obra.
        </p>
      </header>

      {/* 01 — Planificación y cimentación */}
      <section className="flex min-h-0 flex-col justify-center border-t border-black/8 py-14 md:min-h-[85vh] md:py-20">
        <p data-reveal className={`mb-5 ${LABEL}`}>
          01 · Planificación y cimentación
        </p>
        <h2 data-reveal className={HEADING}>
          Todo proyecto necesita una base sólida.
        </h2>
        <p data-reveal className={`mt-8 ${BODY}`}>
          Antes de iniciar la ejecución realizamos un proceso integral de
          planificación: analizamos cada detalle, optimizamos recursos y
          definimos una estrategia constructiva clara. La cimentación sigue
          ese mismo rigor, con controles permanentes que garantizan
          estabilidad y durabilidad para cada proyecto.
        </p>
        <EditorialImage
          src={`${IMG}/07_vaciado_concreto.webp`}
          alt="Vaciado de concreto en cimentación"
          label="Proceso"
          layout="offset-end"
        />
        <BlockList
          items={[
            "Análisis del proyecto y coordinación técnica",
            "Presupuesto y cronograma",
            "Estudios previos y excavaciones",
            "Cimentaciones y verificación estructural",
          ]}
        />
      </section>

      {/* 02 — Estructura y supervisión */}
      <section className="flex min-h-0 flex-col justify-center border-t border-black/8 py-14 md:min-h-[85vh] md:py-20">
        <p data-reveal className={`mb-5 ${LABEL}`}>
          02 · Estructura y supervisión
        </p>
        <h2 data-reveal className={HEADING}>
          Donde la arquitectura toma forma.
        </h2>
        <p data-reveal className={`mt-8 ${BODY}`}>
          Con precisión y seguimiento permanente desarrollamos la estructura
          principal de la edificación, mientras nuestro equipo supervisa cada
          etapa para garantizar cronogramas, materiales y calidad de
          ejecución.
        </p>
        <EditorialImage
          src={`${IMG}/08_montaje_vigas.webp`}
          alt="Montaje de vigas y estructura"
          label="Construcción"
          layout="feature"
          aspect="aspect-[16/10]"
        />
        <BlockList
          items={[
            "Columnas, vigas y losas",
            "Sistemas estructurales y escaleras",
            "Personal, materiales y seguridad industrial",
            "Control de avance y calidad de ejecución",
          ]}
        />
      </section>

      {/* 03 — Acabados y entrega */}
      <section className="flex min-h-0 flex-col justify-center border-t border-black/8 py-14 md:min-h-[85vh] md:py-20">
        <p data-reveal className={`mb-5 ${LABEL}`}>
          03 · Acabados y entrega
        </p>
        <h2 data-reveal className={HEADING}>
          Más que construir edificios, entregamos confianza.
        </h2>
        <p data-reveal className={`mt-8 ${BODY}`}>
          Los acabados representan la etapa donde el proyecto adquiere
          identidad. Cuidamos cada elemento arquitectónico con altos
          estándares de calidad, para que el resultado final entregue espacios
          funcionales, estéticos y duraderos.
        </p>
        <EditorialImage
          src={`${IMG}/12_edificio_construccion.webp`}
          alt="Edificio en etapa avanzada de construcción"
          label="Resultado esperado"
          layout="feature"
          aspect="aspect-[16/10]"
        />
        <BlockList
          items={[
            "Fachadas y pisos",
            "Pintura y carpintería",
            "Iluminación y urbanismo",
          ]}
        />
        <p data-reveal className={`mt-10 ${LABEL}`}>
          Entrega · Proyecto completo
        </p>
      </section>
    </RevealArticle>
  );
}
