import Image from "next/image";
import Link from "next/link";
import { HOME_SERVICES, type ServiceId } from "@/lib/homeServices";

type Pillar = { title: string; text: string; points: string[]; image: string; alt: string };
type ServiceContent = {
  title: string;
  intro: string;
  promise: string;
  scope: string[];
  pillars: Pillar[];
  closing: string;
};
const CONTENT: Record<ServiceId, ServiceContent> = {
  construccion: {
    title: "Del plano a la realidad.",
    intro: "Ejecutamos obras nuevas, adecuaciones y remodelaciones con planificación, control técnico y atención al detalle. Cada etapa tiene un propósito: convertir el diseño en un espacio seguro, funcional y bien terminado.",
    promise: "Coordinamos el proyecto de principio a fin para que las decisiones de alcance, tiempo, costo y calidad avancen bajo un mismo criterio.",
    scope: ["Obra nueva y ampliaciones", "Adecuaciones y remodelaciones", "Obras civiles y acabados"],
    pillars: [
      { title: "Planificación y preparación", text: "Antes de iniciar, revisamos el alcance y las condiciones del proyecto. Organizamos recursos y definimos una ruta de ejecución clara.", points: ["Revisión de planos y especificaciones", "Presupuesto y programación", "Logística, seguridad y preparación del sitio"], image: "construccion/07_vaciado_concreto.webp", alt: "Trabajo de cimentación y vaciado de concreto" },
      { title: "Ejecución y supervisión", text: "Coordinamos equipos, materiales y actividades en obra. El seguimiento permanente permite resolver interferencias y controlar cada avance.", points: ["Cimentaciones y estructura", "Redes e instalaciones", "Control de calidad y avance"], image: "construccion/08_montaje_vigas.webp", alt: "Montaje de la estructura durante la construcción" },
      { title: "Acabados y entrega", text: "Integramos los elementos que dan identidad y funcionalidad al espacio. Cerramos la obra con revisión técnica y una entrega organizada.", points: ["Fachadas, pisos y pintura", "Carpintería, iluminación y urbanismo", "Revisión final y entrega"], image: "construccion/12_edificio_construccion.webp", alt: "Edificio en etapa avanzada de construcción" },
    ],
    closing: "Construimos con orden, comunicación y presencia técnica para que el resultado responda a lo proyectado.",
  },
  mantenimiento: {
    title: "Cuidamos lo que has construido.",
    intro: "Conservamos la seguridad, la imagen y la vida útil de edificaciones e infraestructura. Intervenimos cubiertas, fachadas, acabados e instalaciones con soluciones acordes a cada necesidad.",
    promise: "Partimos de una evaluación técnica para atender la causa del deterioro, priorizar recursos y reducir afectaciones en la operación cotidiana.",
    scope: ["Fachadas y trabajo en alturas", "Cubiertas e impermeabilización", "Adecuaciones y reparaciones locativas"],
    pillars: [
      { title: "Diagnóstico técnico", text: "Inspeccionamos la edificación, documentamos hallazgos e identificamos los puntos que requieren atención inmediata o programada.", points: ["Inspección visual y técnica", "Identificación de causas y riesgos", "Informe de prioridades y alcance"], image: "mantenimiento/15_inspeccion_estructural.webp", alt: "Inspección de los elementos de la edificación" },
      { title: "Mantenimiento preventivo", text: "Programamos actividades periódicas para anticipar el deterioro, preservar los acabados y mantener en buen estado los sistemas constructivos.", points: ["Limpieza y conservación de fachadas", "Revisión de cubiertas y sellos", "Planes periódicos de intervención"], image: "mantenimiento/16_mantenimiento_cubierta.webp", alt: "Mantenimiento de cubierta" },
      { title: "Mantenimiento correctivo", text: "Atendemos daños existentes con una solución definida y una ejecución controlada, cuidando el entorno y la continuidad del inmueble.", points: ["Reparación de filtraciones y fisuras", "Reposición de acabados deteriorados", "Verificación posterior a la intervención"], image: "mantenimiento/14_limpieza_altura.webp", alt: "Intervención y limpieza de fachada en altura" },
    ],
    closing: "Cuidar una edificación es proteger su desempeño, la seguridad de quienes la usan y el valor de la inversión.",
  },
  "servicios-profesionales": {
    title: "Ideas que se convierten en proyecto.",
    intro: "Escuchamos lo que imaginas y lo traducimos en un proyecto claro, viable y documentado. Integramos diseño, visualización y coordinación técnica para acompañar tus decisiones antes y durante la obra.",
    promise: "Convertimos las necesidades del cliente en información precisa para reducir dudas, anticipar interferencias y construir con una visión compartida.",
    scope: ["Diseño arquitectónico", "Modelado y visualización 3D", "Coordinación y documentación técnica"],
    pillars: [
      { title: "Diseño y planeación", text: "Analizamos el programa, el contexto, la normativa y la viabilidad para desarrollar una propuesta funcional y coherente con los objetivos del proyecto.", points: ["Levantamiento de necesidades", "Concepto y anteproyecto", "Criterios funcionales y técnicos"], image: "servicios-profesionales/02_disenando.webp", alt: "Desarrollo de planos arquitectónicos" },
      { title: "Visualización y documentación", text: "Representamos el proyecto para facilitar decisiones y producimos la información necesaria para cotizar, coordinar y ejecutar.", points: ["Modelado y visualización 3D", "Planos y detalles constructivos", "Especificaciones y cantidades"], image: "servicios-profesionales/05_maqueta.webp", alt: "Maqueta para visualizar un proyecto arquitectónico" },
      { title: "Coordinación y acompañamiento", text: "Integramos las disciplinas del proyecto y acompañamos la interpretación de la documentación durante la ejecución.", points: ["Coordinación interdisciplinaria", "Revisión de compatibilidades", "Acompañamiento técnico en obra"], image: "servicios-profesionales/04_coordinacion_tecnica.webp", alt: "Equipo coordinando las disciplinas del proyecto" },
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
      <section className="service-overview" aria-labelledby="enfoque-servicio"><div><p className="section-label">Nuestro enfoque</p><h2 id="enfoque-servicio">Un proceso claro en cada etapa.</h2><p>{content.promise}</p></div><ul>{content.scope.map(item => <li key={item}>{item}</li>)}</ul></section>
      <div className="service-grid detail-grid">{content.pillars.map((pillar, index) => <section key={pillar.title} className="detail-card"><div className="detail-image"><Image src={`/assets/servicios/${pillar.image}`} alt={pillar.alt} fill sizes="(max-width: 700px) 100vw, 33vw" priority={index === 0} className="object-cover" /></div><div className="detail-copy"><p className="section-label">0{index + 1}</p><h2>{pillar.title}</h2><p>{pillar.text}</p><ul>{pillar.points.map(point => <li key={point}>{point}</li>)}</ul></div></section>)}</div>
      <blockquote className="service-closing">{content.closing}</blockquote>
      <nav className="related-services" aria-label="Otros servicios"><p>También acompañamos tu proyecto en:</p>{HOME_SERVICES.filter(item => item.id !== serviceId).map(item => <Link key={item.id} className="text-link" href={item.href}>{item.label} <span aria-hidden>→</span></Link>)}</nav>
    </div>
  </main>;
}
