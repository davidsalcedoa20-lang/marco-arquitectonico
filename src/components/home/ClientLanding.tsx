"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { useMediaUrl } from "@/components/media/MediaProvider";
import { useSiteContent } from "@/components/content/SiteContentProvider";
import type { CmsClient } from "@/lib/siteContent";

// Curated and optimized client photography, including the requested safety edits.
const photography: Record<string, { src: string; position: string; mobile: string }> = {
  "image5.jpeg": { src: "cliente/mantenimiento-fachada-casco-reflejo.webp", position: "50% 43%", mobile: "63% 40%" },
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
  "image18.jpg": { src: "cliente/mantenimiento-sendero-peatonal.webp", position: "50% 48%", mobile: "50% 45%" },
  "image19.jpg": { src: "cliente/mantenimiento-terrazas-cubiertas.webp", position: "50% 48%", mobile: "50% 45%" },
  "image20.jpg": { src: "cliente/mantenimiento-fachada-altura.webp", position: "50% 48%", mobile: "50% 45%" },
  "image21.jpg": { src: "cliente/mantenimiento-cubierta-fibrocemento.webp", position: "50% 48%", mobile: "50% 45%" },
  "image22.jpg": { src: "cliente/construccion-pergola-madera.webp", position: "50% 48%", mobile: "50% 45%" },
  "image23.jpg": { src: "cliente/construccion-estructura-mezanine.webp", position: "50% 48%", mobile: "50% 45%" },
  "image24.jpg": { src: "cliente/construccion-oficina-minimalista.webp", position: "50% 48%", mobile: "50% 45%" },
  "image25.jpg": { src: "cliente/construccion-fachada-alucobond.webp", position: "50% 48%", mobile: "50% 45%" },
  "image26.jpg": { src: "cliente/profesional-casa-campestre.webp", position: "50% 48%", mobile: "50% 45%" },
  "image27.jpg": { src: "cliente/profesional-diseno-volumetrico.webp", position: "50% 48%", mobile: "50% 45%" },
  "image28.jpg": { src: "cliente/profesional-diseno-mobiliario.webp", position: "50% 48%", mobile: "50% 45%" },
  "image29.jpg": { src: "cliente/profesional-gerencia-obra.webp", position: "50% 48%", mobile: "50% 45%" },
};
const defaultMedia = (name: string) => `/assets/servicios/${photography[name].src}`;
type Slide = { image: string; title: string; text: string };

function useCarouselVisibility<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Carousel({ slides, welcome = false, label, subtitle, seconds = 2 }: { slides: Slide[]; welcome?: boolean; label: string; subtitle?: string; seconds?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(true);
  const { ref, visible } = useCarouselVisibility<HTMLElement>();
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!visible || paused || reduced) return;
    const timer = window.setInterval(() => setActive(i => (i + 1) % slides.length), seconds * 1000);
    return () => window.clearInterval(timer);
  }, [paused, reduced, seconds, slides.length, visible]);
  return <section ref={ref} className={`client-carousel ${welcome ? "welcome-carousel" : ""}`} aria-label={label} aria-roledescription="carrusel" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocusCapture={() => setHover(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHover(false); }}>
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

function ThumbnailTrain({ images, captions, label, onOpen, seconds = 2 }: { images: string[]; captions: string[]; label: string; onOpen: (image: string, caption: string) => void; seconds?: number }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(true);
  const { ref, visible: isVisible } = useCarouselVisibility<HTMLDivElement>();
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!isVisible || paused || reduced || images.length <= 3) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % images.length), seconds * 1000);
    return () => window.clearInterval(timer);
  }, [images.length, isVisible, paused, reduced, seconds]);

  const visible = Array.from({ length: Math.min(3, images.length) }, (_, offset) => {
    const index = (active + offset) % images.length;
    return { image: images[index], caption: captions[index], index };
  });

  return <div ref={ref} className="client-gallery-train" aria-label={`Galería de ${label}`} aria-roledescription="carrusel" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onFocusCapture={() => setHover(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setHover(false); }}>
    <div className="client-detail-gallery" key={active}>{visible.map(({ image, caption, index }) => <button className="client-image-button" type="button" key={`${image}-${index}`} onClick={() => onOpen(image, caption)} aria-label={`Ampliar imagen: ${caption}`}><Image src={image} alt={caption} fill sizes="(max-width: 700px) 30vw, 17vw" /></button>)}</div>
    {images.length > 3 && <div className="client-gallery-controls">
      <button type="button" aria-label={`Imágenes anteriores de ${label}`} onClick={() => setActive(index => (index - 1 + images.length) % images.length)}>←</button>
      <span aria-live={paused || hover || reduced ? "polite" : "off"}>{active + 1} / {images.length}</span>
      <button type="button" aria-label={`Imágenes siguientes de ${label}`} onClick={() => setActive(index => (index + 1) % images.length)}>→</button>
      <button type="button" aria-label={paused ? `Reanudar galería de ${label}` : `Pausar galería de ${label}`} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "▶" : "Ⅱ"}</button>
    </div>}
  </div>;
}

const serviceVisuals = [
  { id: "mantenimiento", title: "Mantenimiento de cubiertas y fachadas", subtitle: "Propiedad horizontal", images: ["image5.jpeg", "image6.jpeg", "image7.jpg", "image8.jpeg"], captions: ["Fachadas", "Cubiertas", "Mantenimiento preventivo", "Inspección de estructuras"], galleryImages: ["image6.jpeg", "image7.jpg", "image8.jpeg", "image18.jpg", "image19.jpg", "image20.jpg", "image21.jpg"], galleryCaptions: ["Mantenimiento de cubiertas", "Impermeabilización de fachadas", "Mantenimiento en cubiertas", "Senderos peatonales", "Impermeabilización de terrazas", "Mantenimiento de fachadas en altura", "Cubiertas de fibrocemento"], promise: "Protege y garantiza tu patrimonio.", paragraphs: ["Mantenimientos enfocados en mejorar el bienestar y seguridad para tu propiedad horizontal.", "Protección para fachadas, cubiertas y estructuras expuestas a la intemperie, de ladrillo, bloques de cemento, piedras naturales o artificiales, terrazas, parqueaderos, plazoletas y demás, para reducir y eliminar las eflorescencias y el deterioro de su acabado tanto interior como exterior.", "Para garantizar el bienestar, construyendo e impermeabilizando la seguridad para resguardar tu hogar, zonas comunes, zonas de trabajo y oficinas, que harán de tu unidad un gran lugar para vivir."] },
  { id: "construccion", title: "Construcción de obras civiles y arquitectónicas", subtitle: "Vivienda campestre, hoteles, bodegas industriales, remodelación de locales comerciales y oficina abierta.", images: ["image13.jpg", "image10.jpeg", "image11.jpeg", "image12.jpeg"], captions: ["Bodegas industriales", "Vivienda campestre", "Cubiertas y estructuras", "Proyectos comerciales"], galleryImages: ["image10.jpeg", "image11.jpeg", "image12.jpeg", "image22.jpg", "image23.jpg", "image24.jpg", "image25.jpg"], galleryCaptions: ["Vivienda campestre", "Cubiertas y estructuras", "Proyectos comerciales", "Pérgolas en madera", "Estructuras metálicas y mezanines", "Remodelación de oficinas", "Fachadas en Alucobond"], promise: "Construyendo tu bienestar y experiencias para contar.", paragraphs: ["Construcción de proyectos de infraestructura civil y arquitectónica. Construyendo identidad.", "Para mejorar la producción y el almacenamiento de las compañías, para garantizar un bienestar humano con una óptima integración entre la espacialidad, el colaborador y las máquinas, mejorando la tranquilidad y nuestra libertad, para una vida sin igual, que marca un precedente en tu hogar.", "Garantizamos la estabilidad de tu legado, construyendo espacios equilibrados, gracias a la unión de la arquitectura y la ingeniería civil, que harán de tu proyecto un gran lugar para vivir."] },
  { id: "servicios-profesionales", title: "Servicios profesionales", subtitle: "Consultoría, interventoría y dirección de proyectos de infraestructura civil y arquitectónica.", images: ["image17.jpg", "image14.jpeg", "image15.jpeg", "image16.jpeg"], captions: ["Consultoría e interventoría", "Diseño arquitectónico", "Dirección de proyectos", "Ingeniería civil"], galleryImages: ["image14.jpeg", "image15.jpeg", "image16.jpeg", "image26.jpg", "image27.jpg", "image28.jpg", "image29.jpg"], galleryCaptions: ["Diseño arquitectónico", "Diseño de interiores", "Diseño multifamiliar", "Casas campestres", "Diseño volumétrico", "Diseño de mobiliario", "Gerencia de obra"], promise: "Arquitectura e ingeniería civil.", paragraphs: ["Conformada por un equipo de trabajo profesional de la construcción, arquitectura e ingeniería civil.", "Consolidar proyectos de infraestructura que serán desarrollados de acuerdo con la planificación y acorde con su presupuesto, de la mano de la arquitectura y de ingeniería civil y ambiental.", "El diseño debe satisfacer las necesidades de espacios habitables para tu proyecto, tanto en lo estético como en lo tecnológico, para tu hogar, industria y ambientes corporativos.", "Para coordinar y controlar que el proceso constructivo se edifique en concordancia con los diseños y especificaciones técnicas determinadas."] },
];

export function ClientLanding() {
  const resolveMedia = useMediaUrl();
  const content = useSiteContent();
  const media = (name: string) => resolveMedia(defaultMedia(name));
  const serviceImage = (name: string) => name.startsWith("/") || name.startsWith("https://") ? resolveMedia(name) : media(name);
  const services = content.services.filter((service) => service.visible).map((service, index) => ({ ...(serviceVisuals.find((visual) => visual.id === service.id) ?? serviceVisuals[index % serviceVisuals.length]), ...service }));
  const [preview, setPreview] = useState<{ src: string; alt: string; kind?: "photo" | "logo" } | null>(null);
  useEffect(() => {
    if (!preview) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setPreview(null); };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [preview]);

  const hero = content.hero.filter((slide) => slide.visible).map((slide) => ({ ...slide, image: resolveMedia(slide.image) }));
  return <>
    {hero.length > 0 && <div id="inicio" className="client-welcome"><Carousel welcome label="Bienvenida" seconds={content.settings.carouselSeconds} slides={hero} /></div>}
    {content.settings.showServices && <>
      <section id="servicios" className="client-intro"><div className="page-container">
        <h2><span>{content.homeCopy.introTitle}</span></h2><p>{content.homeCopy.introText}</p>
        <div className="client-service-links">{services.map((service) => <a key={service.id} href={`#${service.id}`}><div className="client-service-preview"><Image src={serviceImage(service.images[0])} alt={service.captions[0]} fill sizes="(max-width: 700px) 100vw, 33vw" /></div><h3>{service.shortTitle}</h3></a>)}</div>
      </div></section>
      {services.map((service) => <section id={service.id} className="client-service-section" key={service.id}>
        <Carousel label={service.title} subtitle={service.subtitle} seconds={content.settings.carouselSeconds} slides={service.images.map((name, i) => ({ image: serviceImage(name), title: service.captions[i] || service.title, text: service.subtitle }))} />
        <div className="client-service-detail">
          <div className="client-service-copy"><h3>{service.intro}</h3><div className="client-service-paragraphs">{service.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{service.promise && <p className="client-service-promise">{service.promise}</p>}</div></div>
          <button className="client-detail-photo client-image-button" type="button" onClick={() => setPreview({ src: serviceImage(service.images[0]), alt: service.captions[0] || service.title })} aria-label={`Ampliar imagen: ${service.captions[0] || service.title}`}><Image src={serviceImage(service.images[0])} alt={service.captions[0] || service.title} fill quality={90} sizes="(max-width: 700px) 100vw, 54vw" /></button>
          <ThumbnailTrain images={service.galleryImages.map(serviceImage)} captions={service.galleryCaptions} label={service.title} seconds={content.settings.carouselSeconds} onOpen={(src, alt) => setPreview({ src, alt })} />
        </div>
      </section>)}
    </>}
    {content.settings.showProjects && content.projects.some((project) => project.published) && <section id="proyectos" className="client-projects"><div className="page-container"><h2>Proyectos</h2><div className="client-project-grid">{content.projects.filter((project) => project.published).map((project) => <article key={project.id}><button type="button" onClick={() => setPreview({ src: resolveMedia(project.image), alt: project.title })}><span className="client-project-image"><Image src={resolveMedia(project.image)} alt={project.title} fill sizes="(max-width: 700px) 100vw, 33vw" /></span></button><small>{[project.category, project.location, project.year].filter(Boolean).join(" · ")}</small><h3>{project.title}</h3><p>{project.description}</p></article>)}</div></div></section>}
    {content.settings.showClients && <section id="clientes" className="client-trust"><div className="page-container"><h2>{content.homeCopy.clientsTitle}</h2><p>{content.homeCopy.clientsText}</p><ClientLogos clients={content.clients.filter((client) => client.visible)} onOpen={(src, alt) => setPreview({ src, alt, kind: "logo" })} /></div></section>}
    {preview && <div className="client-lightbox" role="dialog" aria-modal="true" aria-label={`Vista ampliada: ${preview.alt}`} onClick={() => setPreview(null)}><button className="client-lightbox-close" type="button" onClick={() => setPreview(null)} aria-label="Cerrar imagen ampliada" autoFocus>×</button><div className={`client-lightbox-image ${preview.kind === "logo" ? "client-lightbox-logo" : ""}`} onClick={(event) => event.stopPropagation()}><Image src={preview.src} alt={preview.alt} fill quality={95} sizes={preview.kind === "logo" ? "80vw" : "95vw"} /></div></div>}
  </>;
}

function ClientLogos({ clients, onOpen }: { clients: CmsClient[]; onOpen: (src: string, alt: string) => void }) {
  const resolveMedia = useMediaUrl();
  const repeated = [...clients, ...clients];
  return <div className="client-logo-marquee" aria-label="Nuestros clientes"><div className="client-logo-track">{repeated.map((client, index) => {
    const src = resolveMedia(client.logo); const duplicate = index >= clients.length;
    return <figure key={`${client.logo}-${duplicate ? "copy" : "original"}`} aria-hidden={duplicate || undefined}><button className="client-logo-button" type="button" tabIndex={duplicate ? -1 : undefined} onClick={() => onOpen(src, client.name)} aria-label={duplicate ? undefined : `Ampliar logo de ${client.name}`}><Image src={src} alt={duplicate ? "" : client.name} width={320} height={190} /></button><figcaption>{client.url && !duplicate ? <a href={client.url} target="_blank" rel="noopener noreferrer">{client.name} ↗</a> : client.name}</figcaption></figure>;
  })}</div></div>;
}
