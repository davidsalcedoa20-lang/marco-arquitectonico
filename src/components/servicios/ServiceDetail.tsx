import Image from "next/image";
import Link from "next/link";
import { HOME_SERVICES, type ServiceId } from "@/lib/homeServices";

type Pillar = { title: string; text: string; points: string[]; image: string; alt: string };
type ServiceContent = {
  title: string;
  intro: string;
  promise: string;
  scope: string[];
  applicationsTitle: string;
  applications: { title: string; text: string }[];
  pillars: Pillar[];
  closing: string;
};
const CONTENT: Record<ServiceId, ServiceContent> = {
  construccion: {
    title: "Del plano a la realidad.",
    intro: "Construimos proyectos de infraestructura civil y arquitectónica que mejoran la forma de vivir y trabajar. Unimos arquitectura e ingeniería civil para crear espacios equilibrados, desde vivienda campestre y hoteles hasta bodegas industriales, locales comerciales y oficinas.",
    promise: "Coordinamos el proyecto de principio a fin para que las decisiones de alcance, tiempo, costo y calidad avancen bajo un mismo criterio.",
    scope: ["Obra nueva y ampliaciones", "Adecuaciones y remodelaciones", "Obras civiles y acabados"],
    applicationsTitle: "Espacios para vivir, trabajar y producir.",
    applications: [
      { title: "Vivienda y hotelería", text: "Proyectos de vivienda campestre y espacios hoteleros que integran confort, funcionalidad y las necesidades de quienes los habitan." },
      { title: "Industria y almacenamiento", text: "Bodegas industriales que relacionan el espacio, las personas y los equipos para responder a los procesos de producción y almacenamiento." },
      { title: "Comercio y oficinas", text: "Remodelación de locales comerciales y adecuación de oficinas abiertas, con una distribución acorde con la actividad de cada compañía." },
    ],
    pillars: [
      { title: "Planificación y preparación", text: "Antes de iniciar, revisamos el alcance y las condiciones del proyecto. Organizamos recursos y definimos una ruta de ejecución clara.", points: ["Revisión de planos y especificaciones", "Presupuesto y programación", "Logística, seguridad y preparación del sitio"], image: "construccion/07_vaciado_concreto.webp", alt: "Trabajo de cimentación y vaciado de concreto" },
      { title: "Ejecución y supervisión", text: "Coordinamos equipos, materiales y actividades en obra. El seguimiento permanente permite resolver interferencias y controlar cada avance.", points: ["Cimentaciones y estructura", "Redes e instalaciones", "Control de calidad y avance"], image: "construccion/08_montaje_vigas.webp", alt: "Montaje de la estructura durante la construcción" },
      { title: "Acabados y entrega", text: "Integramos los elementos que dan identidad y funcionalidad al espacio. Cerramos la obra con revisión técnica y una entrega organizada.", points: ["Fachadas, pisos y pintura", "Carpintería, iluminación y urbanismo", "Revisión final y entrega"], image: "construccion/12_edificio_construccion.webp", alt: "Edificio en etapa avanzada de construcción" },
    ],
    closing: "Construimos identidad: espacios que cuidan tu bienestar y dan forma a tu legado.",
  },
  mantenimiento: {
    title: "Cuidamos lo que has construido.",
    intro: "Mantenimiento de cubiertas y fachadas enfocado en el bienestar y la seguridad de tu propiedad horizontal. Protegemos las superficies expuestas a la intemperie y atendemos el deterioro de sus acabados para conservar tu patrimonio.",
    promise: "Partimos de una evaluación técnica para atender la causa del deterioro, priorizar recursos y reducir afectaciones en la operación cotidiana.",
    scope: ["Fachadas y trabajo en alturas", "Cubiertas e impermeabilización", "Adecuaciones y reparaciones locativas"],
    applicationsTitle: "Protección para tu propiedad horizontal.",
    applications: [
      { title: "Cubiertas y terrazas", text: "Intervenciones de mantenimiento e impermeabilización según el estado de la superficie, para atender humedades y proteger los espacios que resguardan." },
      { title: "Fachadas y estructuras", text: "Cuidado de ladrillo, bloques de cemento y piedra natural o artificial. Tratamos el deterioro de los acabados y las eflorescencias según el diagnóstico." },
      { title: "Zonas comunes y de trabajo", text: "Conservación de parqueaderos, plazoletas, oficinas y áreas compartidas para mejorar el bienestar y la seguridad de quienes utilizan la edificación." },
    ],
    pillars: [
      { title: "Diagnóstico técnico", text: "Inspeccionamos la edificación, documentamos hallazgos e identificamos los puntos que requieren atención inmediata o programada.", points: ["Inspección visual y técnica", "Identificación de causas y riesgos", "Informe de prioridades y alcance"], image: "mantenimiento/15_inspeccion_estructural.webp", alt: "Inspección de los elementos de la edificación" },
      { title: "Mantenimiento preventivo", text: "Programamos actividades periódicas para anticipar el deterioro, preservar los acabados y mantener en buen estado los sistemas constructivos.", points: ["Limpieza y conservación de fachadas", "Revisión de cubiertas y sellos", "Planes periódicos de intervención"], image: "mantenimiento/16_mantenimiento_cubierta.webp", alt: "Mantenimiento de cubierta" },
      { title: "Mantenimiento correctivo", text: "Atendemos daños existentes con una solución definida y una ejecución controlada, cuidando el entorno y la continuidad del inmueble.", points: ["Reparación de filtraciones y fisuras", "Reposición de acabados deteriorados", "Verificación posterior a la intervención"], image: "mantenimiento/14_limpieza_altura.webp", alt: "Intervención y limpieza de fachada en altura" },
    ],
    closing: "Cuidar una edificación es proteger su desempeño, la seguridad de quienes la usan y el valor de la inversión.",
  },
  "servicios-profesionales": {
    title: "Respaldo profesional para tu proyecto.",
    intro: "Consultoría, interventoría y dirección de proyectos de infraestructura civil y arquitectónica. Nuestro equipo integra arquitectura e ingeniería para planificar, coordinar y controlar el desarrollo de tu proyecto de acuerdo con su diseño y presupuesto.",
    promise: "Acompañamos las decisiones del proyecto y verificamos que su ejecución corresponda con los diseños y las especificaciones técnicas definidas.",
    scope: ["Consultoría y diseño", "Interventoría técnica", "Dirección de proyectos"],
    applicationsTitle: "Diseños que responden a cada necesidad.",
    applications: [
      { title: "Hogar y espacios habitables", text: "Propuestas que relacionan las necesidades de uso, la estética y las soluciones técnicas para hacer del proyecto un espacio habitable." },
      { title: "Industria", text: "Planificación de infraestructura de acuerdo con su función, sus requerimientos de operación y el presupuesto previsto." },
      { title: "Ambientes corporativos", text: "Coordinación de las decisiones arquitectónicas y técnicas para responder a la forma de trabajar de cada organización." },
    ],
    pillars: [
      { title: "Consultoría y diseño", text: "Definimos las necesidades de espacios habitables y las traducimos en una propuesta arquitectónica que integra criterios estéticos y técnicos. La planificación considera el alcance y el presupuesto del proyecto.", points: ["Análisis de necesidades y planificación", "Diseño arquitectónico y visualización", "Documentación y especificaciones técnicas"], image: "servicios-profesionales/02_disenando.webp", alt: "Desarrollo de planos arquitectónicos" },
      { title: "Interventoría", text: "Revisamos el proceso constructivo en relación con los diseños y las especificaciones técnicas. El seguimiento permite identificar desviaciones y sustentar las decisiones que requiere la obra.", points: ["Revisión de diseños y especificaciones", "Seguimiento técnico de la ejecución", "Verificación de calidad y avances"], image: "servicios-profesionales/03_revision_planos.webp", alt: "Revisión técnica de los planos del proyecto" },
      { title: "Dirección de proyectos", text: "Coordinamos las disciplinas y las actividades que intervienen en el proyecto. Organizamos su desarrollo de acuerdo con la planificación y el presupuesto, dando continuidad a las decisiones durante la ejecución.", points: ["Coordinación de arquitectura e ingenierías", "Organización y seguimiento del proyecto", "Control del proceso constructivo"], image: "servicios-profesionales/04_coordinacion_tecnica.webp", alt: "Equipo coordinando las disciplinas del proyecto" },
    ],
    closing: "Un proyecto bien documentado permite tomar mejores decisiones y llevar la idea a la obra con mayor claridad.",
  },
};
export function ServiceDetail({ serviceId }: { serviceId: ServiceId }) {
  const content = CONTENT[serviceId];
  const service = HOME_SERVICES.find(item => item.id === serviceId)!;
  return <main id="contenido" className="service-detail">
    <div className="page-container">
      <nav className="breadcrumbs" aria-label="Ruta de navegación"><Link href="/">Inicio</Link><span aria-hidden>/</span><Link href="/servicios">Servicios</Link><span aria-hidden>/</span><span aria-current="page">{service.label}</span></nav>
      <header className="service-heading"><p className="section-label">{service.label}</p><h1>{content.title}</h1><p>{content.intro}</p></header>
      <section className="service-overview" aria-labelledby="enfoque-servicio"><div><p className="section-label">Nuestro enfoque</p><h2 id="enfoque-servicio">Acompañamiento para tu proyecto.</h2><p>{content.promise}</p></div><ul>{content.scope.map(item => <li key={item}>{item}</li>)}</ul></section>
      <div className="service-grid detail-grid">{content.pillars.map((pillar, index) => <section key={pillar.title} className="detail-card"><div className="detail-image"><Image src={`/assets/servicios/${pillar.image}`} alt={pillar.alt} fill sizes="(max-width: 700px) 100vw, 33vw" priority={index === 0} className="object-cover" /></div><div className="detail-copy"><p className="section-label">0{index + 1}</p><h2>{pillar.title}</h2><p>{pillar.text}</p><ul>{pillar.points.map(point => <li key={point}>{point}</li>)}</ul></div></section>)}</div>
      <section className="service-applications" aria-labelledby="applications-title">
        <p className="section-label">Dónde te acompañamos</p>
        <h2 id="applications-title">{content.applicationsTitle}</h2>
        <div className="service-grid">{content.applications.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>
      <blockquote className="service-closing">{content.closing}</blockquote>
      <nav className="related-services" aria-label="Otros servicios"><p>También acompañamos tu proyecto en:</p>{HOME_SERVICES.filter(item => item.id !== serviceId).map(item => <Link key={item.id} className="text-link" href={item.href}>{item.label} <span aria-hidden>→</span></Link>)}</nav>
    </div>
  </main>;
}
