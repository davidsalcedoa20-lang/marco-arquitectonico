import Link from "next/link";
import { HOME_SERVICES } from "@/lib/homeServices";
export default function ServiciosPage() {
  return <main id="contenido" className="service-detail"><div className="page-container"><header className="service-heading"><p className="section-label">Nuestros servicios</p><h1>Un equipo para cada etapa de tu proyecto.</h1><p>Construcción, mantenimiento y servicios profesionales. Encuentra el acompañamiento que necesitas para transformar una idea, intervenir un espacio o cuidar tu infraestructura.</p></header><div className="service-grid">{HOME_SERVICES.map(service => <Link className="service-card" key={service.id} href={service.href}><span className="section-label">{service.index}</span><h2>{service.label}</h2><p>{service.description}</p><span className="text-link">Conocer servicio <span aria-hidden>→</span></span></Link>)}</div></div></main>;
}
