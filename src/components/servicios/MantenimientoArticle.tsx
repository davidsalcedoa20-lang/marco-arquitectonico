"use client";

import { RevealArticle } from "@/components/scroll-frames/RevealArticle";
import {
  EditorialImage,
  EditorialImagePair,
} from "@/components/servicios/EditorialImage";

const IMG = "/assets/servicios/mantenimiento";

/** Two-size type system for this page: HEADING for h1/h2, BODY for everything else. */
const HEADING =
  "text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-ma-black";
const BODY = "text-[16px] leading-[1.8] text-ma-black/65";
const LABEL =
  "font-mono text-[16px] font-semibold tracking-[0.06em] text-ma-orange";

/** Editorial Act 1 copy — continuous document flow, no slide swapping. Organized in three pillars per brand guidance. */
export function MantenimientoArticle() {
  return (
    <RevealArticle className="editorial">
      {/* Hero */}
      <header className="pb-16 pt-4 md:pb-28 md:pt-8">
        <p data-reveal className={`mb-6 ${LABEL}`}>
          Servicio · Mantenimiento
        </p>
        <h1 data-reveal className={HEADING}>
          Cuidamos la obra
          <br />
          después de entregarla.
        </h1>
        <p data-reveal className={`mt-8 ${BODY}`}>
          El mantenimiento no es un accesorio: es la continuidad del
          proyecto, con el mismo rigor técnico de principio a fin.
        </p>
        <EditorialImage
          src={`${IMG}/13_mantenimiento_fachada.webp`}
          alt="Mantenimiento de fachada en altura"
          label="Proceso"
          layout="feature"
          aspect="aspect-[16/10]"
        />
      </header>

      {/* El valor del mantenimiento */}
      <section className="border-t border-black/8 py-14 md:py-24">
        <p data-reveal className={`mb-5 ${LABEL}`}>
          El valor del mantenimiento
        </p>
        <h2 data-reveal className={HEADING}>
          Preservar es también construir.
        </h2>
        <p data-reveal className={`mt-8 ${BODY}`}>
          Una infraestructura bien mantenida conserva su desempeño, su
          seguridad y su valor en el tiempo. En Marco Arquitectónico tratamos
          cada intervención como una extensión natural del diseño y la
          construcción originales — sin improvisar, con el mismo rigor que
          exigimos en obra nueva.
        </p>
        <EditorialImage
          src={`${IMG}/18_mantenimiento_preventivo.webp`}
          alt="Mantenimiento preventivo en cubierta"
          label="Implementación"
          layout="offset-end"
        />
      </section>

      {/* Los tres pilares: Diagnóstico, Preventivo, Correctivo */}
      <section className="border-t border-black/8 py-14 md:py-24">
        <p data-reveal className={`mb-5 ${LABEL}`}>
          Nuestro proceso
        </p>
        <h2 data-reveal className={HEADING}>
          Tres pilares, un mismo estándar.
        </h2>

        {/* 01 Diagnóstico */}
        <div className="mt-14">
          <p data-reveal className={`mb-4 ${LABEL}`}>
            01 · Diagnóstico técnico
          </p>
          <p data-reveal className={BODY}>
            Evaluamos instalaciones, acabados, sistemas constructivos y puntos
            críticos para detectar riesgos antes de que se conviertan en
            fallas. Cada hallazgo se documenta con prioridades claras y una
            ruta de acción medible.
          </p>
          <EditorialImagePair
            left={{
              src: `${IMG}/15_inspeccion_estructural.webp`,
              alt: "Inspección estructural del edificio",
              label: "Supervisión",
            }}
            right={{
              src: `${IMG}/17_inspeccion_ventanales.webp`,
              alt: "Inspección de ventanales y envolvente",
              label: "Desarrollo",
            }}
          />
        </div>

        {/* 02 Preventivo */}
        <div className="mt-16 border-t border-black/8 pt-14">
          <p data-reveal className={`mb-4 ${LABEL}`}>
            02 · Mantenimiento preventivo
          </p>
          <p data-reveal className={BODY}>
            Diseñamos planes periódicos que reducen deterioro, evitan paradas
            operativas y protegen la inversión a largo plazo. La prevención no
            es un costo adicional: es la forma más eficiente de conservar
            calidad, seguridad y estética.
          </p>
          <EditorialImage
            src={`${IMG}/16_mantenimiento_cubierta.webp`}
            alt="Mantenimiento de cubierta e impermeabilización"
            label="Proceso"
            layout="offset-start"
          />
        </div>

        {/* 03 Correctivo */}
        <div className="mt-16 border-t border-black/8 pt-14">
          <p data-reveal className={`mb-4 ${LABEL}`}>
            03 · Mantenimiento correctivo
          </p>
          <p data-reveal className={BODY}>
            Cuando aparece una falla, actuamos con foco: diagnóstico
            confirmado, solución técnica adecuada y ejecución controlada para
            restaurar el desempeño sin afectar el resto del proyecto.
          </p>
          <EditorialImage
            src={`${IMG}/14_limpieza_altura.webp`}
            alt="Intervención y limpieza en altura"
            label="Ejecución"
            layout="offset-end"
            aspect="aspect-[16/11]"
          />
        </div>
      </section>

      {/* Cierre: alcance, beneficios y compromiso — un solo bloque */}
      <section className="border-t border-black/8 py-14 md:py-24">
        <p data-reveal className={`mb-5 ${LABEL}`}>
          Compromiso con la calidad
        </p>
        <h2 data-reveal className={HEADING}>
          La misma exigencia. Cada intervención.
        </h2>
        <p data-reveal className={`mt-8 ${BODY}`}>
          Nuestro compromiso es simple: intervenir con precisión, respetar el
          proyecto original y entregar resultados que perduren. Cuando la
          restauración del edificio se completa, la historia no termina:
          comienza la continuidad.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          {[
            "Fachadas",
            "Cubiertas",
            "Impermeabilización",
            "Pintura",
            "Zonas comunes",
            "Acabados",
          ].map((title) => (
            <span
              key={title}
              data-reveal
              className={`rounded-full border border-black/10 bg-black/[0.015] px-5 py-2.5 transition-colors duration-500 hover:border-ma-orange/50 ${BODY} !leading-none !text-ma-black`}
            >
              {title}
            </span>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            {
              t: "Mayor vida útil",
              d: "Cada ciclo de mantenimiento extiende el desempeño del activo.",
            },
            {
              t: "Menor riesgo operativo",
              d: "Detectamos y corregimos fallas antes de que escalen.",
            },
            {
              t: "Valor preservado",
              d: "La calidad espacial y constructiva se mantiene en el tiempo.",
            },
          ].map((b) => (
            <div
              key={b.t}
              data-reveal
              className="border-l border-ma-orange/40 pl-5"
            >
              <p className={`${BODY} font-semibold !text-ma-black`}>{b.t}</p>
              <p className={`mt-2 ${BODY}`}>{b.d}</p>
            </div>
          ))}
        </div>

        <a
          data-reveal
          href="#acto-2"
          className="group mt-14 inline-flex flex-col gap-2"
        >
          <span
            className={`flex items-center gap-3 font-semibold tracking-[0.06em] !text-ma-black ${BODY} !leading-none`}
          >
            Continuar
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </span>
          <span className="relative h-px w-full overflow-hidden bg-black/15">
            <span className="absolute inset-y-0 left-0 w-0 bg-ma-orange transition-all duration-500 group-hover:w-full" />
          </span>
        </a>
      </section>
    </RevealArticle>
  );
}
