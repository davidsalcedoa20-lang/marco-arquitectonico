"use client";

import { RevealArticle } from "@/components/scroll-frames/RevealArticle";
import {
  EditorialImage,
  EditorialImagePair,
} from "@/components/servicios/EditorialImage";

const IMG = "/assets/servicios/mantenimiento";

/** Editorial Act 1 copy — continuous document flow, no slide swapping */
export function MantenimientoArticle() {
  return (
    <RevealArticle className="editorial">
      {/* Hero */}
      <header className="pb-16 pt-4 md:pb-28 md:pt-8">
        <p
          data-reveal
          className="mb-6 font-mono text-[10px] tracking-[0.35em] text-ma-orange md:text-[11px]"
        >
          SERVICIO · MANTENIMIENTO
        </p>
        <h1
          data-reveal
          className="text-[clamp(2.4rem,4.5vw,3.75rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-white"
        >
          Cuidamos la obra
          <br />
          después de entregarla.
        </h1>
        <p
          data-reveal
          className="mt-8 text-[16px] leading-[1.75] text-white/60 md:text-[17px]"
        >
          El mantenimiento no es un accesorio: es la continuidad del proyecto.
          Mientras lees, el edificio a tu derecha se restaura — acompañando
          cada decisión técnica de principio a fin.
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
      <section className="border-t border-white/10 py-14 md:py-24">
        <p
          data-reveal
          className="mb-5 font-mono text-[10px] tracking-[0.32em] text-ma-orange"
        >
          EL VALOR DEL MANTENIMIENTO
        </p>
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Preservar es también construir.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Una infraestructura bien mantenida conserva su desempeño, su
          seguridad y su valor en el tiempo. En Marco Arquitectónico tratamos
          cada intervención como una extensión natural del diseño y la
          construcción originales.
        </p>
        <EditorialImage
          src={`${IMG}/18_mantenimiento_preventivo.webp`}
          alt="Mantenimiento preventivo en cubierta"
          label="Implementación"
          layout="offset-end"
        />
        <p
          data-reveal
          className="mt-2 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          No improvisamos. Observamos, planificamos y ejecutamos con el mismo
          rigor que exigimos en obra nueva.
        </p>
      </section>

      {/* Diagnóstico Técnico */}
      <section className="border-t border-white/10 py-14 md:py-24">
        <p
          data-reveal
          className="mb-5 font-mono text-[10px] tracking-[0.32em] text-ma-orange"
        >
          01 · DIAGNÓSTICO TÉCNICO
        </p>
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Inspección con criterio de ingeniería.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Evaluamos instalaciones, acabados, sistemas constructivos y puntos
          críticos para detectar riesgos antes de que se conviertan en fallas.
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
        <p
          data-reveal
          className="mt-2 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Cada hallazgo se documenta con prioridades claras, evidencias
          técnicas y una ruta de acción medible.
        </p>
        <ul className="mt-10 space-y-4">
          {[
            "Revisión estructural y de envolvente",
            "Estado de cubiertas e impermeabilización",
            "Instalaciones y zonas de alto desgaste",
            "Registro fotográfico y recomendaciones",
          ].map((item) => (
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
      </section>

      {/* Mantenimiento Preventivo */}
      <section className="border-t border-white/10 py-14 md:py-24">
        <p
          data-reveal
          className="mb-5 font-mono text-[10px] tracking-[0.32em] text-ma-orange"
        >
          02 · MANTENIMIENTO PREVENTIVO
        </p>
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Anticipar antes de reparar.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Diseñamos planes periódicos que reducen deterioro, evitan paradas
          operativas y protegen la inversión a largo plazo.
        </p>
        <EditorialImage
          src={`${IMG}/16_mantenimiento_cubierta.webp`}
          alt="Mantenimiento de cubierta e impermeabilización"
          label="Proceso"
          layout="offset-start"
        />
        <p
          data-reveal
          className="mt-2 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          La prevención no es un costo adicional: es la forma más eficiente de
          conservar calidad, seguridad y estética.
        </p>
      </section>

      {/* Mantenimiento Correctivo */}
      <section className="border-t border-white/10 py-14 md:py-24">
        <p
          data-reveal
          className="mb-5 font-mono text-[10px] tracking-[0.32em] text-ma-orange"
        >
          03 · MANTENIMIENTO CORRECTIVO
        </p>
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Intervención precisa cuando hace falta.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Cuando aparece una falla, actuamos con foco: diagnóstico confirmado,
          solución técnica adecuada y ejecución controlada para restaurar el
          desempeño sin afectar el resto del proyecto.
        </p>
        <EditorialImage
          src={`${IMG}/14_limpieza_altura.webp`}
          alt="Intervención y limpieza en altura"
          label="Ejecución"
          layout="offset-end"
          aspect="aspect-[16/11]"
        />
        <p
          data-reveal
          className="mt-2 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Coordinamos tiempos, materiales y supervisión para minimizar impacto
          en la operación del inmueble.
        </p>
      </section>

      {/* Tipos de intervención */}
      <section className="border-t border-white/10 py-14 md:py-24">
        <p
          data-reveal
          className="mb-5 font-mono text-[10px] tracking-[0.32em] text-ma-orange"
        >
          TIPOS DE INTERVENCIÓN
        </p>
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Un enfoque integral por especialidad.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            "Fachadas",
            "Cubiertas",
            "Impermeabilización",
            "Pintura",
            "Zonas comunes",
            "Acabados",
          ].map((title) => (
            <div
              key={title}
              data-reveal
              className="border border-white/10 px-5 py-5 transition-colors duration-500 hover:border-ma-orange/50"
            >
              <p className="text-[15px] tracking-[-0.01em] text-white">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="border-t border-white/10 py-14 md:py-24">
        <p
          data-reveal
          className="mb-5 font-mono text-[10px] tracking-[0.32em] text-ma-orange"
        >
          BENEFICIOS
        </p>
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          Lo que gana tu infraestructura.
        </h2>
        <div className="mt-12 space-y-10">
          {[
            {
              n: "01",
              t: "Mayor vida útil",
              d: "Cada ciclo de mantenimiento extiende el desempeño del activo.",
            },
            {
              n: "02",
              t: "Menor riesgo operativo",
              d: "Detectamos y corregimos fallas antes de que escalen.",
            },
            {
              n: "03",
              t: "Valor preservado",
              d: "La calidad espacial y constructiva se mantiene en el tiempo.",
            },
            {
              n: "04",
              t: "Procesos claros",
              d: "Planeación, ejecución y control con trazabilidad técnica.",
            },
          ].map((b) => (
            <div key={b.n} data-reveal className="border-l border-ma-orange/40 pl-5">
              <p className="font-mono text-[10px] tracking-[0.22em] text-ma-orange">
                {b.n}
              </p>
              <h3 className="mt-3 text-xl tracking-[-0.02em] text-white">{b.t}</h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-white/50">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compromiso con la calidad */}
      <section className="border-t border-white/10 py-14 md:py-24">
        <p
          data-reveal
          className="mb-5 font-mono text-[10px] tracking-[0.32em] text-ma-orange"
        >
          COMPROMISO CON LA CALIDAD
        </p>
        <h2
          data-reveal
          className="text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.1] font-semibold tracking-[-0.03em] text-white"
        >
          La misma exigencia. Cada intervención.
        </h2>
        <p
          data-reveal
          className="mt-8 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Nuestro compromiso es simple: intervenir con precisión, respetar el
          proyecto original y entregar resultados que perduren. Del diagnóstico
          a la entrega, cada etapa se ejecuta con claridad y responsabilidad.
        </p>
        <p
          data-reveal
          className="mt-6 text-[15px] leading-[1.8] text-white/55 md:text-[16px]"
        >
          Cuando la restauración del edificio se completa, la historia no
          termina: comienza la continuidad.
        </p>
        <a
          data-reveal
          href="#acto-2"
          className="group mt-12 inline-flex flex-col gap-2"
        >
          <span className="flex items-center gap-3 text-[11px] font-medium tracking-[0.24em] text-white">
            CONTINUAR
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">
              →
            </span>
          </span>
          <span className="relative h-px w-full overflow-hidden bg-white/20">
            <span className="absolute inset-y-0 left-0 w-0 bg-ma-orange transition-all duration-500 group-hover:w-full" />
          </span>
        </a>
      </section>
    </RevealArticle>
  );
}
