"use client";

import { RevealArticle } from "@/components/scroll-frames/RevealArticle";
import {
  EditorialImage,
} from "@/components/servicios/EditorialImage";

const IMG = "/assets/servicios/servicios-profesionales";

/** Two-size type system for this page: HEADING for h1/h2, BODY for everything else. */
const HEADING =
  "text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-white";
const BODY = "text-[16px] leading-[1.85] text-white/60";
const LABEL =
  "font-mono text-[16px] font-semibold tracking-[0.06em] text-ma-orange";

function BlockList({ items }: { items: string[] }) {
  return (
    <ul className="mt-10 space-y-4">
      {items.map((item) => (
        <li key={item} data-reveal className={`flex gap-4 ${BODY} !text-white/70`}>
          <span className="mt-2 h-px w-6 shrink-0 bg-ma-orange/70" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Editorial copy organized in three pillars: Diseño, Documentación, Coordinación. */
export function ServiciosProfesionalesArticle() {
  return (
    <RevealArticle className="editorial editorial-cinematic">
      {/* Hero */}
      <header className="flex min-h-0 flex-col justify-center py-14 md:min-h-[85vh] md:py-20">
        <p data-reveal className={`mb-6 ${LABEL}`}>
          Servicios profesionales
        </p>
        <h1 data-reveal className={HEADING}>
          Todo comienza con
          <br />
          una <span className="text-ma-orange">conversación.</span>
        </h1>
        <p data-reveal className={`mt-8 ${BODY}`}>
          Cada proyecto nace antes del primer plano. Escuchamos las
          necesidades del cliente, analizamos el entorno y transformamos cada
          requerimiento en una visión clara y alcanzable.
        </p>
        <EditorialImage
          src={`${IMG}/01_servicios_reunion_cliente.webp`}
          alt="Reunión de definición del proyecto con el cliente"
          label="Proceso"
          layout="feature"
          aspect="aspect-[16/10]"
        />
      </header>

      {/* 01 — Diseño y planeación */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/[0.06] py-14 md:min-h-[85vh] md:py-20">
        <p data-reveal className={`mb-5 ${LABEL}`}>
          01 · Diseño y planeación
        </p>
        <h2 data-reveal className={HEADING}>
          Diseñar también significa prever.
        </h2>
        <p data-reveal className={`mt-8 ${BODY}`}>
          Antes de dibujar una sola línea estudiamos el terreno, la
          normativa y la viabilidad técnica. Cada concepto se convierte
          después en planos arquitectónicos precisos que integran
          funcionalidad, estética y eficiencia.
        </p>
        <EditorialImage
          src={`${IMG}/02_disenando.webp`}
          alt="Proceso de diseño arquitectónico sobre el tablero"
          label="Diseño"
          layout="offset-end"
        />
        <BlockList
          items={[
            "Análisis del proyecto y normativa",
            "Estudio de viabilidad técnica",
            "Planos arquitectónicos precisos",
          ]}
        />
      </section>

      {/* 02 — Visualización y documentación */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/[0.06] py-14 md:min-h-[85vh] md:py-20">
        <p data-reveal className={`mb-5 ${LABEL}`}>
          02 · Visualización y documentación
        </p>
        <h2 data-reveal className={HEADING}>
          Antes de construir, ya puede verlo.
        </h2>
        <p data-reveal className={`mt-8 ${BODY}`}>
          Generamos representaciones tridimensionales que permiten
          comprender el proyecto antes de iniciar la obra, y elaboramos la
          documentación técnica necesaria para que se ejecute con precisión.
        </p>
        <EditorialImage
          src={`${IMG}/05_maqueta.webp`}
          alt="Maqueta y visualización del proyecto"
          label="Diseño"
          layout="feature"
          aspect="aspect-[16/11]"
        />
        <BlockList
          items={[
            "Modelado 3D y visualización",
            "Planos constructivos y especificaciones",
            "Cuantificación de materiales",
          ]}
        />
      </section>

      {/* 03 — Coordinación y acompañamiento */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/[0.06] py-14 md:min-h-[85vh] md:py-20">
        <p data-reveal className={`mb-5 ${LABEL}`}>
          03 · Coordinación y acompañamiento
        </p>
        <h2 data-reveal className={HEADING}>
          Cada disciplina trabaja como una sola.
        </h2>
        <p data-reveal className={`mt-8 ${BODY}`}>
          Arquitectura, estructura e instalaciones deben funcionar en
          perfecta armonía. Coordinamos cada componente y permanecemos
          presentes durante todo el proceso, resolviendo inquietudes técnicas
          hasta la entrega.
        </p>
        <EditorialImage
          src={`${IMG}/04_coordinacion_tecnica.webp`}
          alt="Coordinación técnica multidisciplinaria"
          label="Supervisión"
          layout="offset-start"
        />
        <BlockList
          items={[
            "Coordinación interdisciplinaria",
            "Acompañamiento durante la ejecución",
            "Respaldo técnico hasta la entrega",
          ]}
        />
        <p data-reveal className={`mt-10 ${LABEL}`}>
          Entrega · Documentación coordinada
        </p>
      </section>
    </RevealArticle>
  );
}
