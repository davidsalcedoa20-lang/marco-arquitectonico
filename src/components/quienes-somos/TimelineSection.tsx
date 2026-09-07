"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn } from "./FadeIn";

const MILESTONES = [
  {
    year: "Origen",
    title: "Una forma propia de hacer arquitectura",
    text: "La experiencia se construye proyecto a proyecto: escuchando al cliente, resolviendo necesidades reales y cuidando cada entrega.",
    image: "/assets/servicios/servicios-profesionales/01_servicios_reunion_cliente.webp",
    alt: "Reunión de definición de un proyecto con el cliente",
  },
  {
    year: "Hasta 2023",
    title: "Experiencia que se convierte en método",
    text: "La trayectoria acumulada fortalece una oferta que integra diseño, construcción y mantenimiento bajo una misma visión técnica.",
    image: "/assets/servicios/construccion/07_vaciado_concreto.webp",
    alt: "Vaciado de concreto en una cimentación",
  },
  {
    year: "2024",
    title: "Procesos más claros y coordinados",
    text: "El trabajo se organiza alrededor de la planificación, la coordinación entre disciplinas y el seguimiento permanente de cada etapa.",
    image: "/assets/servicios/construccion/08_montaje_vigas.webp",
    alt: "Montaje de vigas durante la construcción",
  },
  {
    year: "2025",
    title: "Una propuesta integral",
    text: "La empresa consolida sus tres líneas de servicio para acompañar proyectos desde la idea hasta la ejecución y su cuidado posterior.",
    image: "/assets/servicios/mantenimiento/16_mantenimiento_cubierta.webp",
    alt: "Mantenimiento preventivo de cubierta",
  },
  {
    year: "Hoy",
    title: "Construir confianza",
    text: "Marco Arquitectónico continúa transformando necesidades en espacios funcionales, duraderos y coherentes con la identidad de cada cliente.",
    image: "/assets/servicios/construccion/12_edificio_construccion.webp",
    alt: "Edificio terminado en etapa avanzada de construcción",
  },
] as const;

export function TimelineSection() {
  const [active, setActive] = useState(0);
  const current = MILESTONES[active];

  return (
    <section className="timeline-section" aria-labelledby="timeline-title">
      <div className="page-container">
        <FadeIn className="timeline-heading">
          <p className="section-label">Nuestra trayectoria</p>
          <h2 id="timeline-title">Una historia que sigue construyéndose.</h2>
          <p>Selecciona un momento de la línea de tiempo para ver el proyecto que lo representa.</p>
        </FadeIn>

        <div className="timeline-interactive">
          <ol className="timeline-list" role="tablist" aria-label="Línea de tiempo de la empresa">
            {MILESTONES.map((item, index) => (
              <li key={item.year}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  className={`timeline-card${index === active ? " is-active" : ""}`}
                  onClick={() => setActive(index)}
                >
                  <span className="timeline-year">{item.year}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </button>
              </li>
            ))}
          </ol>

          <div className="timeline-image" aria-hidden={false}>
            <Image
              key={current.image}
              src={current.image}
              alt={current.alt}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              className="object-cover"
              priority={active === 0}
            />
            <span className="timeline-image-tag">{current.year}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
