"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const media = (name: string) => `/brand/presentacion/${name}`;
type Slide = { image: string; title: string; text: string };
function Carousel({ slides, welcome = false, label }: { slides: Slide[]; welcome?: boolean; label: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || hover || reduced) return;
    const timer = window.setInterval(() => setActive(i => (i + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, hover, reduced, slides.length]);
  return <section className={`client-carousel ${welcome ? "welcome-carousel" : ""}`} aria-label={label} aria-roledescription="carrusel" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocusCapture={() => setHover(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHover(false); }}>
    <div className="client-slide-track" style={{ transform: `translateX(-${active * 100}%)` }}>
      {slides.map((slide, index) => <div className="client-slide" key={slide.image} aria-hidden={active !== index}>
        <Image src={slide.image} alt={slide.title} fill sizes="100vw" priority={welcome && index === 0} />
        <div className="client-slide-shade" />
        <div className="client-slide-copy">{welcome && index === 0 ? <h1>{slide.title}</h1> : <p className="slide-title">{slide.title}</p>}<p>{slide.text}</p></div>
      </div>)}
    </div>
    <div className="client-carousel-controls"><button aria-label="Imagen anterior" onClick={() => setActive(i => (i - 1 + slides.length) % slides.length)}>←</button><span aria-live={paused || hover || reduced ? "polite" : "off"}>{active + 1} / {slides.length}</span><button aria-label="Imagen siguiente" onClick={() => setActive(i => (i + 1) % slides.length)}>→</button><button aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"} aria-pressed={paused} onClick={() => setPaused(p => !p)}>{paused ? "▶" : "Ⅱ"}</button></div>
  </section>;
}

const services = [
  { id: "mantenimiento", title: "Mantenimiento de cubiertas y fachadas", subtitle: "Propiedad horizontal", images: ["image5.jpeg", "image6.jpeg", "image7.jpg", "image8.jpeg"], captions: ["Fachadas", "Cubiertas", "Propiedad horizontal", "Impermeabilización"], promise: "Protege y garantiza tu patrimonio.", paragraphs: ["Mantenimientos enfocados en mejorar el bienestar y seguridad para tu propiedad horizontal.", "Protección para fachadas, cubiertas y estructuras expuestas a la intemperie, de ladrillo, bloques de cemento, piedras naturales o artificiales, terrazas, parqueaderos, plazoletas y demás, para reducir y eliminar las eflorescencias y el deterioro de su acabado tanto interior como exterior.", "Para garantizar el bienestar, construyendo e impermeabilizando la seguridad para resguardar tu hogar, zonas comunes, zonas de trabajo y oficinas, que harán de tu unidad un gran lugar para vivir."] },
  { id: "construccion", title: "Construcción de obras civiles y arquitectónicas", subtitle: "Vivienda campestre, hoteles, bodegas industriales, remodelación de locales comerciales y oficina abierta.", images: ["image13.jpg", "image10.jpeg", "image11.jpeg", "image12.jpeg", "image9.png"], captions: ["Vivienda campestre", "Bodegas industriales", "Hoteles", "Oficina abierta", "Infraestructura civil"], promise: "Construyendo tu bienestar y experiencias para contar.", paragraphs: ["Construcción de proyectos de infraestructura civil y arquitectónica. Construyendo identidad.", "Para mejorar la producción y el almacenamiento de las compañías, para garantizar un bienestar humano con una óptima integración entre la espacialidad, el colaborador y las máquinas, mejorando la tranquilidad y nuestra libertad, para una vida sin igual, que marca un precedente en tu hogar.", "Garantizar la estabilidad de tu legado, construyendo espacios equilibrados, gracias a la unión de la arquitectura y la ingeniería civil que harán de tu proyecto un gran lugar para vivir."] },
  { id: "servicios-profesionales", title: "Servicios profesionales", subtitle: "Consultoría, interventoría y dirección de proyectos de infraestructura civil y arquitectónica.", images: ["image17.jpg", "image14.jpeg", "image15.jpeg", "image16.jpeg"], captions: ["Consultoría e interventoría", "Diseño arquitectónico", "Dirección de proyectos", "Ingeniería civil"], promise: "Arquitectura e ingeniería civil.", paragraphs: ["Conformada por un equipo de trabajo profesional de la construcción, arquitectura e ingeniería civil.", "Consolidar proyectos de infraestructura que serán desarrollados de acuerdo con la planificación y acorde con su presupuesto, de la mano de la arquitectura y de ingeniería civil y ambiental.", "El diseño debe satisfacer las necesidades de espacios habitables para tu proyecto, tanto en lo estético como en lo tecnológico, para tu hogar, industria y ambientes corporativos.", "Para coordinar y controlar que el proceso constructivo se edifique en concordancia con los diseños y especificaciones técnicas determinadas."] },
];

export function ClientLanding({ logos }: { logos: string[] }) {
  return <>
    <div id="inicio" className="client-welcome"><Carousel welcome label="Bienvenida" slides={[
      { image: media("image13.jpg"), title: "Bienvenidos", text: "Nuestra compañía está enfocada en mejorar tu calidad de vida." },
      { image: media("image17.jpg"), title: "Servicios profesionales", text: "Consultoría, interventoría y dirección de proyectos." },
      { image: media("image7.jpg"), title: "Conservar tu patrimonio", text: "Mantenimientos enfocados en mejorar el bienestar y seguridad para tu propiedad horizontal." },
      { image: media("image14.jpeg"), title: "Construyendo tu bienestar", text: "Y experiencias para contar." },
      { image: media("image10.jpeg"), title: "Construcción", text: "Planificar, ejecutar y entregar." },
    ]} /></div>
    <section id="servicios" className="client-intro page-container"><p className="section-label">Construcción + Mantenimiento + Servicios profesionales</p><h2>Conformada por un equipo de trabajo profesional de la construcción, arquitectura e ingeniería civil.</h2><div className="client-service-links">{[services[1], services[0], services[2]].map((service, index) => <a key={service.id} href={`#${service.id}`}><span>0{index + 1}</span><h3>{service.id === "construccion" ? "Construcción" : service.id === "mantenimiento" ? "Mantenimientos" : service.title}</h3><span aria-hidden="true">↗</span></a>)}</div></section>
    {services.map(service => <section id={service.id} className="client-service-section" key={service.id}><div className="page-container client-service-heading"><h2>{service.title}</h2><p>{service.subtitle}</p></div><Carousel label={service.title} slides={service.images.map((name, i) => ({ image: media(name), title: service.captions[i], text: service.subtitle }))} /><div className="page-container client-service-copy"><h3>{service.promise}</h3><div>{service.paragraphs.map(p => <p key={p}>{p}</p>)}</div></div></section>)}
    <section id="clientes" className="page-container client-trust"><p className="section-label">Construyendo identidad</p><h2>Clientes que confían en nuestro trabajo</h2><p>Porque creemos en tus propósitos, por eso te ayudamos a construirlos.</p><div className="client-logo-strip" tabIndex={0} aria-label="Clientes; desplázate horizontalmente para ver todos los logos">{logos.map(src => { const name = src.split("/").pop()!.replace(/^\d+_/, "").replace(/\.[^.]+$/, "").replace(/_/g, " "); return <figure key={src}><Image src={src} alt={name} width={200} height={100} /><figcaption>{name}</figcaption></figure>; })}</div></section>
  </>;
}
