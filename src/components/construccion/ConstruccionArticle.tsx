"use client";

import { RevealArticle } from "@/components/scroll-frames/RevealArticle";
import {
  EditorialImage,
} from "@/components/servicios/EditorialImage";

const IMG = "/assets/servicios/construccion";

function BlockList({ items }: { items: string[] }) {
  return (
    <ul className="mt-10 space-y-4">
      {items.map((item) => (
        <li
          key={item}
          data-reveal
          className="flex gap-4 text-[15px] leading-relaxed text-white/65"
        >
          <span className="mt-2 h-px w-6 shrink-0 bg-ma-orange/70" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ConstruccionArticle() {
  return (
    <RevealArticle className="editorial">
      {/* Section 1 — Hero */}
      <header className="flex min-h-0 flex-col justify-center py-14 md:min-h-[85vh] md:py-20">
        <p
          data-reveal
          className="mb-6 font-mono text-[10px] tracking-[0.35em] text-ma-orange md:text-[11px]"
        >
          CONSTRUCCIÓN
        </p>
        <h1
          data-reveal
          className="text-[clamp(2.4rem,4.5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-white"
        >
          Del plano
          <br />
          a la <span className="text-ma-orange">realidad.</span>
        </h1>
        <p
          data-reveal
          className="mt-8 text-[16px] leading-[1.8] text-white/60 md:text-[17px]"
        >
          Toda gran construcción inicia mucho antes del primer movimiento de
          tierra. Comienza con una idea, un análisis técnico y una planificación
          rigurosa que permite transformar una visión en un proyecto ejecutable.
          En Marco Arquitectónico entendemos que cada decisión tomada en esta
          etapa determina la calidad, seguridad y éxito de la obra.
        </p>
      </header>

      {/* Section 2 — Planificación */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/10 py-14 md:min-h-[85vh] md:py-20">
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.55rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Todo proyecto necesita una base sólida.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Antes de iniciar la ejecución realizamos un proceso integral de
          planificación donde analizamos cada detalle del proyecto, optimizamos
          recursos y definimos una estrategia constructiva clara. Nuestro
          objetivo es reducir riesgos, optimizar tiempos y garantizar una
          ejecución eficiente desde el primer día.
        </p>
        <EditorialImage
          src={`${IMG}/07_vaciado_concreto.webp`}
          alt="Vaciado de concreto en cimentación"
          label="Proceso"
          layout="offset-end"
        />
        <BlockList
          items={[
            "Análisis del proyecto",
            "Programación de obra",
            "Presupuesto",
            "Cronograma",
            "Coordinación técnica",
          ]}
        />
      </section>

      {/* Section 3 — Cimentación */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/10 py-14 md:min-h-[85vh] md:py-20">
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.55rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          La estabilidad comienza bajo tierra.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          La cimentación es la base sobre la que descansa toda la estructura.
          Ejecutamos esta etapa siguiendo criterios técnicos y controles
          permanentes que garantizan seguridad, estabilidad y durabilidad para
          cada proyecto.
        </p>
        <EditorialImage
          src={`${IMG}/10_instalacion_estructural.webp`}
          alt="Instalación estructural en obra"
          label="Ejecución"
          layout="offset-start"
          aspect="aspect-[16/11]"
        />
        <BlockList
          items={[
            "Estudios previos",
            "Excavaciones",
            "Cimentaciones",
            "Control de calidad",
            "Verificación estructural",
          ]}
        />
      </section>

      {/* Section 4 — Estructura */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/10 py-14 md:min-h-[85vh] md:py-20">
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.55rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Donde la arquitectura empieza a tomar forma.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Con precisión y seguimiento permanente desarrollamos la estructura
          principal de la edificación. Cada columna, viga y losa responde a un
          proceso cuidadosamente planificado que asegura resistencia,
          funcionalidad y cumplimiento de las especificaciones técnicas.
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
            "Columnas",
            "Vigas",
            "Losas",
            "Escaleras",
            "Sistemas estructurales",
          ]}
        />
      </section>

      {/* Section 5 — Supervisión */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/10 py-14 md:min-h-[85vh] md:py-20">
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.55rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Coordinamos cada etapa con precisión.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Mientras la estructura avanza, nuestro equipo supervisa
          permanentemente la ejecución para garantizar el cumplimiento de los
          cronogramas, la correcta utilización de materiales y el control de
          cada proceso constructivo.
        </p>
        <EditorialImage
          src={`${IMG}/09_supervision_obra.webp`}
          alt="Supervisión técnica en obra"
          label="Supervisión"
          layout="offset-end"
        />
        <BlockList
          items={[
            "Personal",
            "Materiales",
            "Seguridad industrial",
            "Avance de obra",
            "Calidad de ejecución",
          ]}
        />
      </section>

      {/* Section 6 — Acabados */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/10 py-14 md:min-h-[85vh] md:py-20">
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.55rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Cada detalle refleja nuestro compromiso.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Los acabados representan la etapa donde el proyecto adquiere
          identidad. Cuidamos cada elemento arquitectónico con altos estándares
          de calidad para entregar espacios funcionales, estéticos y duraderos.
        </p>
        <EditorialImage
          src={`${IMG}/11_acabados.webp`}
          alt="Acabados arquitectónicos en obra"
          label="Ejecución"
          layout="offset-start"
          aspect="aspect-[16/11]"
        />
        <BlockList
          items={[
            "Fachadas",
            "Pisos",
            "Pintura",
            "Carpintería",
            "Iluminación",
            "Urbanismo",
          ]}
        />
      </section>

      {/* Section 7 — Entrega */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/10 py-14 md:min-h-[85vh] md:py-20">
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.55rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Más que construir edificios, entregamos confianza.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Cada proyecto finalizado representa el resultado de un proceso donde
          la planificación, la experiencia técnica y el compromiso con la
          calidad trabajan en conjunto para entregar espacios que perduran en
          el tiempo.
        </p>
        <EditorialImage
          src={`${IMG}/12_edificio_construccion.webp`}
          alt="Edificio en etapa avanzada de construcción"
          label="Resultado esperado"
          layout="feature"
          aspect="aspect-[16/10]"
        />
        <p
          data-reveal
          className="mt-6 font-mono text-[10px] tracking-[0.28em] text-ma-orange"
        >
          ENTREGA · PROYECTO COMPLETO
        </p>
      </section>
    </RevealArticle>
  );
}
