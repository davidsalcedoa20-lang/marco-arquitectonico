/** Two-size type system for this page: HEADING for h1/h2, BODY for everything else. */
const HEADING =
  "text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-ma-black";
const BODY = "text-[16px] leading-[1.8] text-ma-black/65";
const LABEL =
  "font-mono text-[16px] font-semibold tracking-[0.06em] text-ma-orange";

const METHOD = [
  "Inspección",
  "Diagnóstico",
  "Planeación",
  "Intervención",
  "Control de calidad",
  "Entrega",
];

const WHY = [
  {
    n: "01",
    title: "Experiencia",
    body: "Trayectoria en proyectos de arquitectura, ingeniería y construcción con visión integral.",
  },
  {
    n: "02",
    title: "Calidad y planeación",
    body: "Estándares técnicos rigurosos y procesos organizados que optimizan tiempos, costos y continuidad operativa.",
  },
  {
    n: "03",
    title: "Seguridad",
    body: "Protocolos claros para proteger personas, activos y el valor del proyecto.",
  },
];

export function MantenimientoAct2() {
  return (
    <section className="relative bg-white" data-act="2">
      {/* 01 Methodology */}
      <div className="mx-auto max-w-[1200px] px-6 py-32 md:px-10 md:py-40 lg:px-14">
        <div className="max-w-3xl">
          <p className={`mb-5 ${LABEL}`}>01 · Nuestra metodología</p>
          <h2 className={HEADING}>
            Un proceso claro.
            <br />
            Resultados medibles.
          </h2>
          <p className={`mt-8 max-w-[42ch] ${BODY}`}>
            Cada mantenimiento sigue una secuencia técnica diseñada para reducir
            riesgos, organizar la ejecución y proteger el valor del activo.
          </p>
        </div>

        <ol className="mt-20 max-w-xl space-y-0 md:mt-28">
          {METHOD.map((step, i) => (
            <li key={step} className="relative">
              <div className="flex items-baseline gap-6 py-5 md:gap-10 md:py-6">
                <span className={`${LABEL} !tracking-[0.1em]`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`${BODY} !text-ma-black`}>{step}</span>
              </div>
              {i < METHOD.length - 1 && (
                <div className="ml-[1.35rem] flex h-8 items-start md:ml-[1.55rem]">
                  <span className="block h-full w-px bg-gradient-to-b from-ma-orange/50 to-black/10" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* 02 Why us */}
      <div className="border-t border-black/8">
        <div className="mx-auto max-w-[1200px] px-6 py-32 md:px-10 md:py-40 lg:px-14">
          <div className="max-w-3xl">
            <p className={`mb-5 ${LABEL}`}>02 · ¿Por qué elegirnos?</p>
            <h2 className={HEADING}>
              Tres principios.
              <br />
              Una sola forma de trabajar.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-3 md:gap-x-10 md:gap-y-16">
            {WHY.map((item) => (
              <div key={item.n} className="border-t border-black/10 pt-8">
                <p className={LABEL}>{item.n}</p>
                <p className={`mt-4 ${BODY} font-semibold !text-ma-black`}>
                  {item.title}
                </p>
                <p className={`mt-3 ${BODY}`}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 03 Philosophy */}
      <div className="border-t border-black/8">
        <div className="mx-auto max-w-[1200px] px-6 py-36 md:px-10 md:py-48 lg:px-14">
          <div className="max-w-4xl">
            <p className={`mb-6 ${LABEL}`}>03 · Compromiso</p>
            <h2 className={HEADING}>Compromiso con cada proyecto.</h2>
            <div className={`mt-12 max-w-2xl space-y-8 md:mt-16 ${BODY}`}>
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
      <div className="border-t border-black/8">
        <div className="mx-auto flex min-h-[80vh] max-w-[1200px] flex-col justify-center px-6 py-36 md:px-10 md:py-48 lg:px-14">
          <p className={`mb-6 ${LABEL}`}>Siguiente paso</p>
          <h2 className={`max-w-4xl ${HEADING}`}>
            Protejamos el valor de su infraestructura.
          </h2>
          <p className={`mt-10 max-w-xl ${BODY}`}>
            Cuéntenos el estado actual de su proyecto. Diseñaremos un plan de
            mantenimiento con precisión técnica, claridad de proceso y
            ejecución confiable.
          </p>
          <div className="mt-14 flex flex-col gap-5 sm:flex-row sm:items-center">
            <a
              href="mailto:contacto@marcoarquitectonico.com?subject=Cotizaci%C3%B3n%20Mantenimiento"
              className={`inline-flex items-center justify-center bg-ma-orange px-8 py-4 font-semibold tracking-[0.06em] !text-ma-black ${BODY} !leading-none`}
            >
              Solicitar cotización
            </a>
            <a
              href="mailto:contacto@marcoarquitectonico.com?subject=Asesor%C3%ADa%20Mantenimiento"
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
