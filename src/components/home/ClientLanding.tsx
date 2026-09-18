"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useState } from "react";

// Curated and optimized client photography, including the requested safety edits.
const photography: Record<string, { src: string; position: string; mobile: string }> = {
  "image5.jpeg": { src: "cliente/mantenimiento-fachada-casco.webp", position: "50% 43%", mobile: "63% 40%" },
  "image6.jpeg": { src: "cliente/mantenimiento-cubierta-casco.webp", position: "50% 48%", mobile: "67% 42%" },
  "image7.jpg": { src: "cliente/mantenimiento-impermeabilizacion-fachada.webp", position: "50% 42%", mobile: "58% 40%" },
  "image8.jpeg": { src: "cliente/mantenimiento-cubierta-aeropuerto.webp", position: "50% 42%", mobile: "55% 40%" },
  "image13.jpg": { src: "cliente/construccion-bodega.webp", position: "50% 45%", mobile: "50% 42%" },
  "image10.jpeg": { src: "cliente/construccion-casa-campestre.webp", position: "50% 48%", mobile: "58% 42%" },
  "image11.jpeg": { src: "cliente/construccion-cubierta-deportiva.webp", position: "50% 43%", mobile: "50% 40%" },
  "image12.jpeg": { src: "cliente/construccion-plaza-comercial.webp", position: "50% 48%", mobile: "52% 43%" },
  "image17.jpg": { src: "cliente/profesional-equipo.webp", position: "50% 45%", mobile: "58% 43%" },
  "image14.jpeg": { src: "cliente/profesional-diseno-casa.webp", position: "50% 48%", mobile: "52% 42%" },
  "image15.jpeg": { src: "cliente/profesional-diseno-interior.webp", position: "50% 45%", mobile: "50% 43%" },
  "image16.jpeg": { src: "cliente/profesional-edificio.webp", position: "50% 48%", mobile: "50% 43%" },
};
const media = (name: string) => `/assets/servicios/${photography[name].src}`;
const clientNames: Record<string, string> = {
  "01_cusezar.png": "Cusezar",
  "02_hotel_city_bog_106.png": "Hotel City Bog 106",
  "03_embajada_finlandia.png": "Embajada de Finlandia",
  "04_edificio_tierra_firme.png": "Edificio Tierra Firme",
  "05_paloquemao.png": "Plaza de Paloquemao",
  "06_pintuco.png": "Pintuco",
  "07_prosperidad_social.png": "Prosperidad Social",
  "08_embajada_polonia.png": "Embajada de Polonia",
  "09_byd.png": "BYD",
  "10_industrias_argos.png": "Industrias Argos",
  "11_bulevar_42.png": "Bulevar 42",
  "12_artecma.png": "Artecma",
  "13_cafam.png": "Cafam",
  "14_argos.png": "Argos",
  "15_sika.png": "Sika",
  "16_cosechas.png": "Cosechas",
  "17_abril_constructora.png": "Abril Constructora",
  "18_sodimac_homecenter.png": "Sodimac Homecenter",
};
type Slide = { image: string; title: string; text: string };
function Carousel({ slides, welcome = false, label, subtitle }: { slides: Slide[]; welcome?: boolean; label: string; subtitle?: string }) {
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
      {slides.map((slide, index) => <div className="client-slide" key={slide.image} aria-hidden={active !== index} style={{ "--photo-position": Object.values(photography).find(photo => slide.image.endsWith(photo.src))?.position, "--photo-position-mobile": Object.values(photography).find(photo => slide.image.endsWith(photo.src))?.mobile } as CSSProperties}>
        <Image src={slide.image} alt={slide.title} fill quality={90} sizes="(max-width: 600px) 840px, (max-width: 2528px) 100vw, 2528px" priority={welcome && index === 0} />
        <div className="client-slide-shade" />
        {welcome && <div className="client-slide-copy">{index === 0 ? <h1>{slide.title}</h1> : <p className="slide-title">{slide.title}</p>}<p>{slide.text}</p></div>}
      </div>)}
    </div>
    {!welcome && <div className="client-slide-copy"><h2>{label}</h2><p>{subtitle}</p></div>}
    <div className="client-carousel-controls"><button aria-label="Imagen anterior" onClick={() => setActive(i => (i - 1 + slides.length) % slides.length)}>←</button><span aria-live={paused || hover || reduced ? "polite" : "off"}>{active + 1} / {slides.length}</span><button aria-label="Imagen siguiente" onClick={() => setActive(i => (i + 1) % slides.length)}>→</button><button aria-label={paused ? "Reanudar carrusel" : "Pausar carrusel"} aria-pressed={paused} onClick={() => setPaused(p => !p)}>{paused ? "▶" : "Ⅱ"}</button></div>
  </section>;
}

const services = [
  { id: "mantenimiento", title: "Mantenimiento de cubiertas y fachadas", subtitle: "Propiedad horizontal", images: ["image5.jpeg", "image6.jpeg", "image7.jpg", "image8.jpeg"], captions: ["Fachadas", "Cubiertas", "Mantenimiento preventivo", "Inspección de estructuras"], promise: "Protege y garantiza tu patrimonio.", paragraphs: ["Mantenimientos enfocados en mejorar el bienestar y seguridad para tu propiedad horizontal.", "Protección para fachadas, cubiertas y estructuras expuestas a la intemperie, de ladrillo, bloques de cemento, piedras naturales o artificiales, terrazas, parqueaderos, plazoletas y demás, para reducir y eliminar las eflorescencias y el deterioro de su acabado tanto interior como exterior.", "Para garantizar el bienestar, construyendo e impermeabilizando la seguridad para resguardar tu hogar, zonas comunes, zonas de trabajo y oficinas, que harán de tu unidad un gran lugar para vivir."] },
  { id: "construccion", title: "Construcción de obras civiles y arquitectónicas", subtitle: "Vivienda campestre, hoteles, bodegas industriales, remodelación de locales comerciales y oficina abierta.", images: ["image13.jpg", "image10.jpeg", "image11.jpeg", "image12.jpeg"], captions: ["Bodegas industriales", "Vivienda campestre", "Cubiertas y estructuras", "Proyectos comerciales"], promise: "Construyendo tu bienestar y experiencias para contar.", paragraphs: ["Construcción de proyectos de infraestructura civil y arquitectónica. Construyendo identidad.", "Para mejorar la producción y el almacenamiento de las compañías, para garantizar un bienestar humano con una óptima integración entre la espacialidad, el colaborador y las máquinas, mejorando la tranquilidad y nuestra libertad, para una vida sin igual, que marca un precedente en tu hogar.", "Garantizamos la estabilidad de tu legado, construyendo espacios equilibrados, gracias a la unión de la arquitectura y la ingeniería civil, que harán de tu proyecto un gran lugar para vivir."] },
  { id: "servicios-profesionales", title: "Servicios profesionales", subtitle: "Consultoría, interventoría y dirección de proyectos de infraestructura civil y arquitectónica.", images: ["image17.jpg", "image14.jpeg", "image15.jpeg", "image16.jpeg"], captions: ["Consultoría e interventoría", "Diseño arquitectónico", "Dirección de proyectos", "Ingeniería civil"], promise: "Arquitectura e ingeniería civil.", paragraphs: ["Conformada por un equipo de trabajo profesional de la construcción, arquitectura e ingeniería civil.", "Consolidar proyectos de infraestructura que serán desarrollados de acuerdo con la planificación y acorde con su presupuesto, de la mano de la arquitectura y de ingeniería civil y ambiental.", "El diseño debe satisfacer las necesidades de espacios habitables para tu proyecto, tanto en lo estético como en lo tecnológico, para tu hogar, industria y ambientes corporativos.", "Para coordinar y controlar que el proceso constructivo se edifique en concordancia con los diseños y especificaciones técnicas determinadas."] },
];

export function ClientLanding({ logos }: { logos: string[] }) {
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);
  useEffect(() => {
    if (!preview) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setPreview(null); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [preview]);

  return <>
    <div id="inicio" className="client-welcome"><Carousel welcome label="Bienvenida" slides={[
      { image: "/quienes_somos/cierre.webp", title: "Bienvenidos", text: "Nuestra compañía está enfocada en mejorar tu calidad de vida." },
      { image: media("image17.jpg"), title: "Servicios profesionales", text: "Consultoría, interventoría y dirección de proyectos." },
      { image: media("image7.jpg"), title: "Conservamos tu patrimonio", text: "Protegemos el bienestar y la seguridad de tu propiedad horizontal." },
      { image: "/quienes_somos/hero.webp", title: "Construyendo tu bienestar", text: "Y experiencias para contar." },
      { image: media("image10.jpeg"), title: "Construcción", text: "Planificar, ejecutar y entregar." },
    ]} /></div>
    <section id="servicios" className="client-intro">
      <div className="page-container">
        <h2><span>Servicios</span></h2>
        <p>Conformada por un equipo de trabajo profesional de la construcción, arquitectura e ingeniería civil.</p>
        <div className="client-service-links">{[services[1], services[0], services[2]].map(service => <a key={service.id} href={`#${service.id}`}>
          <div className="client-service-preview"><Image src={media(service.images[0])} alt={service.captions[0]} fill sizes="(max-width: 700px) 100vw, 33vw" /></div>
          <h3>{service.id === "construccion" ? "Construcción" : service.id === "mantenimiento" ? "Mantenimientos" : service.title}</h3>
        </a>)}</div>
      </div>
    </section>
    {services.map(service => <section id={service.id} className="client-service-section" key={service.id}>
      <Carousel label={service.title} subtitle={service.subtitle} slides={service.images.map((name, i) => ({ image: media(name), title: service.captions[i], text: service.subtitle }))} />
      <div className="client-service-detail">
        <div className="client-service-copy">
          <h3>{service.paragraphs[0]}</h3>
          <div className="client-service-paragraphs">
            {(service.id === "servicios-profesionales" ? [service.paragraphs[2], service.paragraphs[1], service.paragraphs[3]] : [service.paragraphs[2], service.paragraphs[1]]).map(p => <p key={p}>{p}</p>)}
            {service.id !== "servicios-profesionales" && <p className="client-service-promise">{service.promise}</p>}
          </div>
          <div className="client-detail-gallery">{service.images.slice(1).map((name, i) => <button className="client-image-button" type="button" key={name} onClick={() => setPreview({ src: media(name), alt: service.captions[i + 1] })} aria-label={`Ampliar imagen: ${service.captions[i + 1]}`}><Image src={media(name)} alt={service.captions[i + 1]} fill sizes="(max-width: 700px) 33vw, 17vw" /></button>)}</div>
        </div>
        <button className="client-detail-photo client-image-button" type="button" onClick={() => setPreview({ src: media(service.images[0]), alt: service.captions[0] })} aria-label={`Ampliar imagen: ${service.captions[0]}`}><Image src={media(service.images[0])} alt={service.captions[0]} fill quality={90} sizes="(max-width: 700px) 100vw, 54vw" /></button>
      </div>
    </section>)}
    <section id="clientes" className="client-trust"><div className="page-container">
      <h2>Clientes que confían en nuestro trabajo</h2>
      <p>Construyendo identidad, porque creemos en tus propósitos y te ayudamos a construirlos. Buscamos ser tu aliado, porque tú formas parte de nuestro legado.</p>
      <ClientLogos logos={logos} />
    </div></section>
    {preview && <div className="client-lightbox" role="dialog" aria-modal="true" aria-label={`Vista ampliada: ${preview.alt}`} onClick={() => setPreview(null)}>
      <button className="client-lightbox-close" type="button" onClick={() => setPreview(null)} aria-label="Cerrar imagen ampliada" autoFocus>×</button>
      <div className="client-lightbox-image" onClick={event => event.stopPropagation()}><Image src={preview.src} alt={preview.alt} fill quality={95} sizes="95vw" /></div>
    </div>}
  </>;
}

function ClientLogos({ logos }: { logos: string[] }) {
  const nameFor = (src: string) => {
    const filename = src.split("/").pop()!;
    return clientNames[filename] ?? filename.replace(/^\d+_/, "").replace(/\.[^.]+$/, "").replace(/_/g, " ");
  };
  const repeated = [...logos, ...logos];
  return <div className="client-logo-marquee" aria-label="Nuestros clientes">
    <div className="client-logo-track">{repeated.map((src, index) => {
      const name = nameFor(src);
      const duplicate = index >= logos.length;
      return <figure key={`${src}-${duplicate ? "copy" : "original"}`} aria-hidden={duplicate || undefined}><Image src={src} alt={duplicate ? "" : name} width={200} height={100} /><figcaption>{name}</figcaption></figure>;
    })}</div>
  </div>;
}
