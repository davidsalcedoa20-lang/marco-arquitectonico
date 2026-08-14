"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const METHOD = [
  "Inspección",
  "Diagnóstico",
  "Planeación",
  "Intervención",
  "Control de calidad",
  "Entrega",
];

const SERVICES = [
  { title: "Fachadas", desc: "Limpieza, reparación y protección de envolventes." },
  { title: "Cubiertas", desc: "Sellados, drenajes y conservación estructural." },
  { title: "Impermeabilización", desc: "Sistemas que preservan la integridad del inmueble." },
  { title: "Pintura", desc: "Acabados técnicos con durabilidad y criterio estético." },
  { title: "Zonas comunes", desc: "Mantenimiento integral de espacios compartidos." },
  { title: "Acabados", desc: "Renovación precisa de superficies y detalles." },
];

const WHY = [
  {
    n: "01",
    title: "Experiencia",
    body: "Trayectoria en proyectos de arquitectura, ingeniería y construcción con visión integral.",
  },
  {
    n: "02",
    title: "Calidad",
    body: "Estándares técnicos rigurosos en cada intervención, sin atajos ni improvisación.",
  },
  {
    n: "03",
    title: "Planeación",
    body: "Procesos organizados que optimizan tiempos, costos y continuidad operativa.",
  },
  {
    n: "04",
    title: "Seguridad",
    body: "Protocolos claros para proteger personas, activos y el valor del proyecto.",
  },
];

export function MantenimientoAct2() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      const reveal = root.querySelectorAll<HTMLElement>("[data-reveal]");
      reveal.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 48, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.35,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 55%",
              scrub: 1.1,
            },
          },
        );
      });

      const steps = root.querySelectorAll<HTMLElement>("[data-method-step]");
      steps.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0.15, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 1.2,
            },
            delay: i * 0.02,
          },
        );
      });

      const cards = root.querySelectorAll<HTMLElement>("[data-service-card]");
      cards.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "top 65%",
              scrub: 1,
            },
          },
        );
      });

      const why = root.querySelectorAll<HTMLElement>("[data-why]");
      why.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 58%",
              scrub: 1.15,
            },
          },
        );
      });

      const cta = root.querySelector<HTMLElement>("[data-cta]");
      if (cta) {
        gsap.fromTo(
          cta,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cta,
              start: "top 85%",
              end: "top 45%",
              scrub: 1.25,
            },
          },
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative bg-ma-black" data-act="2">
      {/* 01 Methodology */}
      <div className="mx-auto max-w-[1200px] px-6 py-32 md:px-10 md:py-40 lg:px-14">
        <div data-reveal className="max-w-3xl">
          <p className="mb-5 font-mono text-[10px] tracking-[0.35em] text-ma-orange">
            01 · NUESTRA METODOLOGÍA
          </p>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white">
            Un proceso claro.
            <br />
            Resultados medibles.
          </h2>
          <p className="mt-8 max-w-[42ch] text-[15px] leading-relaxed text-white/55 md:text-base">
            Cada mantenimiento sigue una secuencia técnica diseñada para reducir
            riesgos, organizar la ejecución y proteger el valor del activo.
          </p>
        </div>

        <ol className="mt-20 max-w-xl space-y-0 md:mt-28">
          {METHOD.map((step, i) => (
            <li key={step} data-method-step className="relative">
              <div className="flex items-baseline gap-6 py-5 md:gap-10 md:py-6">
                <span className="font-mono text-[11px] tracking-[0.2em] text-ma-orange">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-2xl tracking-[-0.02em] text-white md:text-3xl">
                  {step}
                </span>
              </div>
              {i < METHOD.length - 1 && (
                <div className="ml-[1.35rem] flex h-8 items-start md:ml-[1.55rem]">
                  <span className="block h-full w-px bg-gradient-to-b from-ma-orange/50 to-white/10" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* 02 Services */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-[1200px] px-6 py-32 md:px-10 md:py-40 lg:px-14">
          <div data-reveal className="max-w-3xl">
            <p className="mb-5 font-mono text-[10px] tracking-[0.35em] text-ma-orange">
              02 · SERVICIOS INCLUIDOS
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white">
              Intervenciones con criterio técnico.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-5">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                data-service-card
                className="group relative border border-white/10 bg-white/[0.02] p-7 transition-all duration-700 ease-out hover:border-ma-orange/70 hover:bg-white/[0.04] md:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ma-orange transition-transform duration-700 ease-out group-hover:scale-x-100" />
                <h3 className="text-lg tracking-[-0.01em] text-white md:text-xl">
                  {s.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/50 transition-colors duration-500 group-hover:text-white/65">
                  {s.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* 03 Why us */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-[1200px] px-6 py-32 md:px-10 md:py-40 lg:px-14">
          <div data-reveal className="max-w-3xl">
            <p className="mb-5 font-mono text-[10px] tracking-[0.35em] text-ma-orange">
              03 · ¿POR QUÉ ELEGIRNOS?
            </p>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white">
              Cuatro principios.
              <br />
              Una sola forma de trabajar.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-2 md:gap-x-16 md:gap-y-20">
            {WHY.map((item) => (
              <div key={item.n} data-why className="border-t border-white/10 pt-8">
                <p className="font-mono text-[11px] tracking-[0.28em] text-ma-orange">
                  {item.n}
                </p>
                <h3 className="mt-5 text-3xl tracking-[-0.03em] text-white md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-6 max-w-[36ch] text-[15px] leading-relaxed text-white/55">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 04 Philosophy */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-[1200px] px-6 py-36 md:px-10 md:py-48 lg:px-14">
          <div data-reveal className="max-w-4xl">
            <p className="mb-6 font-mono text-[10px] tracking-[0.35em] text-ma-orange">
              04 · COMPROMISO
            </p>
            <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-white">
              Compromiso con cada proyecto.
            </h2>
            <div className="mt-12 max-w-2xl space-y-8 text-[16px] leading-[1.75] text-white/55 md:mt-16 md:text-[18px]">
              <p>
                En Marco Arquitectónico entendemos el mantenimiento como una
                extensión natural del diseño y la construcción. No intervenimos
                para improvisar: intervenimos para preservar.
              </p>
              <p>
                Cada decisión se apoya en diagnóstico técnico, planeación
                rigurosa y ejecución controlada. Así protegemos la inversión,
                alargamos la vida útil de los activos y mantenemos la calidad
                espacial que el proyecto mereció desde el primer trazo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="border-t border-white/5">
        <div
          data-cta
          className="mx-auto flex min-h-[80vh] max-w-[1200px] flex-col justify-center px-6 py-36 md:px-10 md:py-48 lg:px-14"
        >
          <p className="mb-6 font-mono text-[10px] tracking-[0.35em] text-ma-orange">
            SIGUIENTE PASO
          </p>
          <h2 className="max-w-4xl text-[clamp(2.4rem,6vw,5rem)] leading-[1.02] font-semibold tracking-[-0.035em] text-white">
            Protejamos el valor de su infraestructura.
          </h2>
          <p className="mt-10 max-w-xl text-[16px] leading-relaxed text-white/55 md:text-[18px]">
            Cuéntenos el estado actual de su proyecto. Diseñaremos un plan de
            mantenimiento con precisión técnica, claridad de proceso y
            ejecución confiable.
          </p>
          <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href="mailto:contacto@marcoarquitectonico.com?subject=Cotizaci%C3%B3n%20Mantenimiento"
              className="inline-flex items-center justify-center bg-ma-orange px-8 py-4 text-[11px] font-medium tracking-[0.22em] text-ma-black transition-opacity duration-500 hover:opacity-90"
            >
              SOLICITAR COTIZACIÓN
            </a>
            <a
              href="mailto:contacto@marcoarquitectonico.com?subject=Asesor%C3%ADa%20Mantenimiento"
              className="group inline-flex flex-col gap-2"
            >
              <span className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] text-white">
                HABLAR CON UN ASESOR
                <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
              <span className="relative h-px w-full overflow-hidden bg-white/20">
                <span className="absolute inset-y-0 left-0 w-0 bg-ma-orange transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
