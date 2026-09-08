"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HOME_SERVICES } from "@/lib/homeServices";
import { HOME_BACKGROUNDS } from "@/lib/homeBackgrounds";

export function HomeHub() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => setActive(i => (i + 1) % HOME_SERVICES.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);
  return (
    <section className="corporate-home" aria-labelledby="home-title">
      <div className="corporate-hero">
        <div className="corporate-intro">
          <p className="section-label">Bienvenidos a Marco Arquitectónico</p>
          <h1 id="home-title">Construimos <span>tu bienestar.</span></h1>
          <p>Construcción, mantenimiento y servicios profesionales para mejorar tu calidad de vida. Un equipo de arquitectura e ingeniería civil acompaña tu hogar, tu empresa y tu propiedad horizontal.</p>
          <a href="#servicios-inicio" className="text-link">Explora nuestros servicios <span aria-hidden>↓</span></a>
        </div>
        <div className="corporate-carousel" role="region" aria-roledescription="carrusel" aria-label="Nuestros servicios en imágenes">
          {HOME_SERVICES.map((service, index) => (
            <div key={service.id} className={`corporate-slide ${index === active ? "is-active" : ""}`} aria-hidden={index !== active}>
              <Image src={HOME_BACKGROUNDS[service.id].a} alt={`Imagen de ${service.label.toLowerCase()}`} fill priority={index === 0} sizes="(max-width: 900px) 100vw, 55vw" className="object-cover" />
              <div className="carousel-caption"><p>{service.label}</p><span>{service.tagline}</span></div>
            </div>
          ))}
          <div className="carousel-controls">
            <div className="carousel-dots">{HOME_SERVICES.map((service, index) => <button key={service.id} type="button" aria-label={`Mostrar ${service.label.toLowerCase()}`} aria-pressed={index === active} onClick={() => { setActive(index); setPaused(true); }}><span /></button>)}</div>
            {(!mounted || !reduceMotion) && <button type="button" className="carousel-pause" onClick={() => setPaused(value => !value)} aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"}>{paused ? "Reanudar" : "Pausar"}</button>}
          </div>
        </div>
      </div>
      <div id="servicios-inicio" className="service-grid">
        {HOME_SERVICES.map(service => <Link className="service-card" key={service.id} href={service.href}><span className="section-label">{service.index}</span><h2>{service.label}</h2><p>{service.description}</p><span className="text-link">Conocer servicio <span aria-hidden>→</span></span></Link>)}
      </div>
    </section>
  );
}
