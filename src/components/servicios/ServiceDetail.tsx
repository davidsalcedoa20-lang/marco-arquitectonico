import Image from "next/image";
import Link from "next/link";
import { HOME_SERVICES, type ServiceId } from "@/lib/homeServices";

type Pillar = { title: string; text: string; image: string; alt: string };
const CONTENT: Record<ServiceId, { title: string; intro: string; pillars: Pillar[] }> = {
  construccion: {
    title: "Del plano a la realidad.",
    intro: "Construimos y adecuamos espacios con planificación, control técnico y atención al detalle. Cada etapa tiene un propósito: entregar una obra que responda a tus necesidades.",
    pillars: [
      { title: "Planificación y cimentación", text: "Estudiamos el proyecto, definimos presupuesto y cronograma, y ejecutamos las bases con verificación técnica.", image: "construccion/07_vaciado_concreto.webp", alt: "Trabajo de cimentación y vaciado de concreto" },
      { title: "Estructura y supervisión", text: "Coordinamos personal y materiales, desarrollamos la estructura y supervisamos el avance, la calidad y la seguridad de la obra.", image: "construccion/08_montaje_vigas.webp", alt: "Montaje de la estructura durante la construcción" },
      { title: "Acabados y entrega", text: "Integramos fachadas, pisos e instalaciones. Revisamos cada detalle para entregar espacios funcionales y duraderos.", image: "construccion/12_edificio_construccion.webp", alt: "Edificio en etapa avanzada de construcción" },
    ],
  },
  mantenimiento: {
    title: "Cuidamos lo que has construido.",
    intro: "Conservamos la seguridad, la imagen y la vida útil de tus espacios. Intervenimos cubiertas, fachadas e instalaciones con soluciones acordes a cada necesidad.",
    pillars: [
      { title: "Diagnóstico técnico", text: "Inspeccionamos el estado de la edificación, identificamos puntos críticos y priorizamos las intervenciones necesarias.", image: "mantenimiento/15_inspeccion_estructural.webp", alt: "Inspección de los elementos de la edificación" },
      { title: "Mantenimiento preventivo", text: "Programamos el cuidado de cubiertas, fachadas e instalaciones para anticipar el deterioro y conservar su funcionamiento.", image: "mantenimiento/16_mantenimiento_cubierta.webp", alt: "Mantenimiento de cubierta" },
      { title: "Mantenimiento correctivo", text: "Atendemos daños y deterioros con una solución técnica definida y una ejecución controlada, cuidando el conjunto del edificio.", image: "mantenimiento/14_limpieza_altura.webp", alt: "Intervención y limpieza de fachada en altura" },
    ],
  },
  "servicios-profesionales": {
    title: "Ideas que se convierten en proyecto.",
    intro: "Escuchamos lo que imaginas y lo traducimos en un proyecto claro. Integramos diseño, visualización y coordinación técnica para acompañar tus decisiones.",
    pillars: [
      { title: "Diseño y planeación", text: "Analizamos las necesidades, el contexto y la viabilidad del proyecto para desarrollar una propuesta funcional y coherente.", image: "servicios-profesionales/02_disenando.webp", alt: "Desarrollo de planos arquitectónicos" },
      { title: "Visualización y documentación", text: "Damos forma a la propuesta con modelos 3D, planos y especificaciones que permiten comprenderla antes de construir.", image: "servicios-profesionales/05_maqueta.webp", alt: "Maqueta para visualizar un proyecto arquitectónico" },
      { title: "Coordinación y acompañamiento", text: "Integramos arquitectura, estructura e instalaciones, y resolvemos las necesidades técnicas durante la ejecución.", image: "servicios-profesionales/04_coordinacion_tecnica.webp", alt: "Equipo coordinando las disciplinas del proyecto" },
    ],
  },
};
export function ServiceDetail({ serviceId }: { serviceId: ServiceId }) {
  const content = CONTENT[serviceId];
  const service = HOME_SERVICES.find(item => item.id === serviceId)!;
  return <main id="contenido" className="service-detail">
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Ruta de navegación"><Link href="/">Inicio</Link><span aria-hidden>/</span><Link href="/servicios">Servicios</Link><span aria-hidden>/</span><span aria-current="page">{service.label}</span></nav>
      <header className="service-heading"><p className="section-label">{service.label}</p><h1>{content.title}</h1><p>{content.intro}</p></header>
      <div className="service-grid detail-grid">{content.pillars.map((pillar, index) => <section key={pillar.title} className="detail-card"><div className="detail-image"><Image src={`/assets/servicios/${pillar.image}`} alt={pillar.alt} fill sizes="(max-width: 700px) 100vw, 33vw" priority={index === 0} className="object-cover" /></div><div className="detail-copy"><p className="section-label">0{index + 1}</p><h2>{pillar.title}</h2><p>{pillar.text}</p></div></section>)}</div>
      <nav className="related-services" aria-label="Otros servicios"><p>También acompañamos tu proyecto en:</p>{HOME_SERVICES.filter(item => item.id !== serviceId).map(item => <Link key={item.id} className="text-link" href={item.href}>{item.label} <span aria-hidden>→</span></Link>)}</nav>
    </div>
  </main>;
}
