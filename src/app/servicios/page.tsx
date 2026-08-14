import Link from "next/link";

const SERVICES = [
  {
    slug: "servicios-profesionales",
    label: "Servicios Profesionales",
    desc: "De la conversación al proyecto — planos, 3D y coordinación técnica.",
  },
  {
    slug: "construccion",
    label: "Construcción",
    desc: "Del plano a la entrega — el edificio evoluciona con el scroll.",
  },
  {
    slug: "mantenimiento",
    label: "Mantenimiento",
    desc: "Experiencia scroll cinematográfica — del diagnóstico a la continuidad.",
  },
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-ma-black px-6 pt-32 pb-24 md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1200px]">
        <p className="mb-4 font-mono text-[10px] tracking-[0.35em] text-ma-orange">
          SERVICIOS
        </p>
        <h1 className="max-w-3xl text-4xl tracking-[-0.02em] text-white md:text-6xl">
          Soluciones integrales para cada etapa del proyecto.
        </h1>
        <p className="mt-8 max-w-2xl text-ma-gray md:text-lg">
          Cada servicio se presenta como una experiencia visual continua —
          lectura editorial a la izquierda, evolución del proyecto a la derecha.
        </p>

        <ul className="mt-16 space-y-0 border-t border-white/10">
          {SERVICES.map((s) => (
            <li key={s.slug} className="border-b border-white/10">
              <Link
                href={`/servicios/${s.slug}`}
                className="group flex flex-col gap-2 py-8 transition-colors md:flex-row md:items-baseline md:justify-between"
              >
                <span className="text-2xl tracking-[-0.02em] text-white transition-colors group-hover:text-ma-orange md:text-3xl">
                  {s.label}
                </span>
                <span className="max-w-md text-sm text-ma-gray md:text-right">
                  {s.desc}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
