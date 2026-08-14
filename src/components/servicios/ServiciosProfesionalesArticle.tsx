"use client";

import { RevealArticle } from "@/components/scroll-frames/RevealArticle";
import {
  EditorialImage,
} from "@/components/servicios/EditorialImage";

const IMG = "/assets/servicios/servicios-profesionales";

export function ServiciosProfesionalesArticle() {
  return (
    <RevealArticle className="editorial editorial-cinematic">
      {/* Sección 1 */}
      <header className="flex min-h-0 flex-col justify-center py-14 md:min-h-[88vh] md:py-28">
        <p
          data-reveal
          className="mb-8 font-mono text-[10px] tracking-[0.38em] text-ma-orange md:mb-10 md:text-[11px]"
        >
          SERVICIOS PROFESIONALES
        </p>
        <h1
          data-reveal
          className="text-[clamp(2.75rem,5vw,4.25rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-white"
        >
          Todo comienza con
          <br />
          una <span className="text-ma-orange">conversación.</span>
        </h1>
        <p
          data-reveal
          className="mt-12 max-w-[40rem] text-[17px] leading-[1.85] text-white/65 md:mt-14 md:text-[18px]"
        >
          Cada proyecto nace mucho antes del primer plano o del inicio de la
          obra. Escuchamos las necesidades del cliente, analizamos el entorno,
          comprendemos los objetivos y transformamos cada requerimiento en una
          visión clara y alcanzable.
        </p>
        <EditorialImage
          src={`${IMG}/01_servicios_reunion_cliente.webp`}
          alt="Reunión de definición del proyecto con el cliente"
          label="Proceso"
          layout="feature"
          aspect="aspect-[16/10]"
        />
        <p
          data-reveal
          className="mt-2 max-w-[40rem] text-[17px] leading-[1.85] text-white/50 md:text-[18px]"
        >
          En esta etapa definimos el propósito del proyecto y sentamos las bases
          para tomar decisiones acertadas desde el primer momento.
        </p>
      </header>

      {/* Sección 2 */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/[0.06] py-14 md:min-h-[88vh] md:py-32">
        <h2
          data-reveal
          className="text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white"
        >
          Diseñar también significa prever.
        </h2>
        <p
          data-reveal
          className="mt-12 max-w-[40rem] text-[16px] leading-[1.85] text-white/60 md:mt-14 md:text-[17px]"
        >
          Antes de dibujar una sola línea estudiamos el terreno, las normativas,
          la funcionalidad de los espacios, la orientación, la iluminación
          natural y la viabilidad técnica del proyecto.
        </p>
        <EditorialImage
          src={`${IMG}/02_disenando.webp`}
          alt="Proceso de diseño arquitectónico sobre el tablero"
          label="Diseño"
          layout="offset-end"
        />
        <p
          data-reveal
          className="mt-2 max-w-[40rem] text-[16px] leading-[1.85] text-white/50 md:text-[17px]"
        >
          Cada decisión se toma con un objetivo claro: optimizar recursos y
          reducir riesgos durante la construcción.
        </p>
        <ul className="mt-14 space-y-5 md:mt-16">
          {[
            "Análisis del proyecto",
            "Planeación",
            "Normativa",
            "Cronograma",
            "Viabilidad técnica",
          ].map((item) => (
            <li
              key={item}
              data-reveal
              className="flex gap-5 text-[16px] leading-relaxed text-white/70"
            >
              <span className="mt-2.5 h-px w-7 shrink-0 bg-ma-orange/70" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Sección 3 */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/[0.06] py-14 md:min-h-[88vh] md:py-32">
        <h2
          data-reveal
          className="text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white"
        >
          Las ideas comienzan a tomar forma.
        </h2>
        <p
          data-reveal
          className="mt-12 max-w-[40rem] text-[16px] leading-[1.85] text-white/60 md:mt-14 md:text-[17px]"
        >
          Convertimos los conceptos en planos arquitectónicos precisos mediante
          un proceso de diseño que integra funcionalidad, estética y eficiencia.
        </p>
        <EditorialImage
          src={`${IMG}/03_revision_planos.webp`}
          alt="Revisión de planos arquitectónicos"
          label="Desarrollo"
          layout="offset-start"
        />
        <p
          data-reveal
          className="mt-2 max-w-[40rem] text-[16px] leading-[1.85] text-white/50 md:text-[17px]"
        >
          Cada espacio se desarrolla cuidadosamente para responder tanto a las
          necesidades actuales como al crecimiento futuro del proyecto.
        </p>
      </section>

      {/* Sección 4 */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/[0.06] py-14 md:min-h-[88vh] md:py-32">
        <h2
          data-reveal
          className="text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white"
        >
          Antes de construir, ya puedes verlo.
        </h2>
        <p
          data-reveal
          className="mt-12 max-w-[40rem] text-[16px] leading-[1.85] text-white/60 md:mt-14 md:text-[17px]"
        >
          Generamos representaciones tridimensionales y visualizaciones
          arquitectónicas que permiten comprender el proyecto antes de iniciar
          la obra.
        </p>
        <EditorialImage
          src={`${IMG}/05_maqueta.webp`}
          alt="Maqueta y visualización del proyecto"
          label="Diseño"
          layout="feature"
          aspect="aspect-[16/11]"
        />
        <p
          data-reveal
          className="mt-2 max-w-[40rem] text-[16px] leading-[1.85] text-white/50 md:text-[17px]"
        >
          Esto facilita la toma de decisiones, reduce cambios durante la
          ejecución y brinda una visión completa del resultado final.
        </p>
      </section>

      {/* Sección 5 */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/[0.06] py-14 md:min-h-[88vh] md:py-32">
        <h2
          data-reveal
          className="text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white"
        >
          Cada detalle queda definido.
        </h2>
        <p
          data-reveal
          className="mt-12 max-w-[40rem] text-[16px] leading-[1.85] text-white/60 md:mt-14 md:text-[17px]"
        >
          Elaboramos la documentación técnica necesaria para que el proyecto
          pueda ejecutarse con precisión.
        </p>
        <EditorialImage
          src={`${IMG}/06_materiales.webp`}
          alt="Selección y especificación de materiales"
          label="Implementación"
          layout="offset-end"
        />
        <p
          data-reveal
          className="mt-2 max-w-[40rem] text-[16px] leading-[1.85] text-white/50 md:text-[17px]"
        >
          Planos constructivos, especificaciones, detalles, cuantificaciones y
          documentación coordinada permiten que cada profesional trabaje sobre
          la misma información.
        </p>
      </section>

      {/* Sección 6 */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/[0.06] py-14 md:min-h-[88vh] md:py-32">
        <h2
          data-reveal
          className="text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white"
        >
          Cada disciplina trabaja como una sola.
        </h2>
        <p
          data-reveal
          className="mt-12 max-w-[40rem] text-[16px] leading-[1.85] text-white/60 md:mt-14 md:text-[17px]"
        >
          Arquitectura, estructura, instalaciones eléctricas, hidráulicas y
          demás especialidades deben funcionar en perfecta armonía.
        </p>
        <EditorialImage
          src={`${IMG}/04_coordinacion_tecnica.webp`}
          alt="Coordinación técnica multidisciplinaria"
          label="Supervisión"
          layout="offset-start"
        />
        <p
          data-reveal
          className="mt-2 max-w-[40rem] text-[16px] leading-[1.85] text-white/50 md:text-[17px]"
        >
          Nuestro trabajo consiste en coordinar cada componente para garantizar
          que el proyecto avance sin interferencias ni improvisaciones.
        </p>
      </section>

      {/* Sección 7 */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/[0.06] py-14 md:min-h-[88vh] md:py-32">
        <h2
          data-reveal
          className="text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white"
        >
          Permanecemos presentes durante todo el proceso.
        </h2>
        <p
          data-reveal
          className="mt-12 max-w-[40rem] text-[16px] leading-[1.85] text-white/60 md:mt-14 md:text-[17px]"
        >
          Nuestro compromiso no termina con la entrega de los planos.
        </p>
        <p
          data-reveal
          className="mt-8 max-w-[40rem] text-[16px] leading-[1.85] text-white/50 md:text-[17px]"
        >
          Acompañamos el desarrollo del proyecto, resolvemos inquietudes
          técnicas y brindamos el respaldo necesario para que cada etapa se
          ejecute conforme a lo planificado.
        </p>
      </section>

      {/* Sección 8 */}
      <section className="flex min-h-0 flex-col justify-center border-t border-white/[0.06] py-14 md:min-h-[88vh] md:py-32">
        <h2
          data-reveal
          className="text-[clamp(2rem,3.6vw,3.1rem)] leading-[1.08] font-semibold tracking-[-0.035em] text-white"
        >
          Un proyecto sólido comienza con una excelente planificación.
        </h2>
        <p
          data-reveal
          className="mt-12 max-w-[40rem] text-[16px] leading-[1.85] text-white/60 md:mt-14 md:text-[17px]"
        >
          Los mejores edificios no nacen por casualidad. Son el resultado de
          decisiones acertadas, procesos rigurosos y un equipo comprometido con
          cada detalle.
        </p>
        <p
          data-reveal
          className="mt-8 max-w-[40rem] text-[16px] leading-[1.85] text-white/50 md:text-[17px]"
        >
          En Marco Arquitectónico convertimos ideas en proyectos viables,
          funcionales y preparados para construirse con seguridad, precisión y
          calidad.
        </p>
      </section>
    </RevealArticle>
  );
}
