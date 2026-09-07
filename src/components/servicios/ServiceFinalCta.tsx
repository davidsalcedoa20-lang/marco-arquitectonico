type Props = {
  ctaTitle?: string;
  ctaBody?: string;
  mailSubject?: string;
};

/** Two-size type system: HEADING for h1/h2, BODY for everything else. */
const HEADING =
  "text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-ma-black";
const BODY = "text-[16px] leading-[1.8] text-ma-black/65";
const LABEL =
  "font-mono text-[16px] font-semibold tracking-[0.06em] text-ma-orange";

/**
 * Closing CTA for service pages (after Act 1 content). Static — no scroll-driven motion.
 */
export function ServiceFinalCta({
  ctaTitle = "Construyamos su próximo proyecto.",
  ctaBody = "Desde la planificación hasta la entrega, acompañamos cada etapa con precisión técnica y compromiso con la calidad.",
  mailSubject = "Construcci%C3%B3n",
}: Props = {}) {
  return (
    <section
      className="relative border-t border-black/8 bg-white"
      data-act="service-cta"
    >
      <div className="mx-auto flex min-h-[50vh] max-w-[1200px] flex-col justify-center px-6 py-28 md:px-10 md:py-40 lg:px-14">
        <div>
          <p className={`mb-5 ${LABEL}`}>Siguiente paso</p>
          <h2 className={`max-w-3xl ${HEADING}`}>{ctaTitle}</h2>
          <p className={`mt-8 max-w-xl ${BODY}`}>{ctaBody}</p>
          <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href={`mailto:contacto@marcoarquitectonico.com?subject=Cotizaci%C3%B3n%20${mailSubject}`}
              className={`inline-flex items-center justify-center bg-ma-orange px-8 py-4 font-semibold tracking-[0.06em] !text-ma-black transition-opacity duration-500 hover:opacity-90 ${BODY} !leading-none`}
            >
              Solicitar cotización
            </a>
            <a
              href={`mailto:contacto@marcoarquitectonico.com?subject=Asesor%C3%ADa%20${mailSubject}`}
              className="group inline-flex flex-col gap-2"
            >
              <span
                className={`flex items-center gap-3 font-semibold tracking-[0.06em] !text-ma-black ${BODY} !leading-none`}
              >
                Hablar con un asesor
                <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                  →
                </span>
              </span>
              <span className="relative h-px w-full overflow-hidden bg-black/15">
                <span className="absolute inset-y-0 left-0 w-0 bg-ma-orange transition-all duration-500 group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
