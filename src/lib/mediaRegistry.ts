export type MediaSection =
  | "Marca"
  | "Inicio"
  | "Mantenimiento"
  | "Construcción"
  | "Servicios profesionales"
  | "Clientes";

export type MediaRegistryItem = {
  assetKey: string;
  section: MediaSection;
  label: string;
  altText: string;
  defaultUrl: string;
  sortOrder: number;
};

const serviceImages = [
  ["mantenimiento-fachada-casco-reflejo.webp", "Mantenimiento", "Mantenimiento de fachada"],
  ["mantenimiento-cubierta-casco.webp", "Mantenimiento", "Mantenimiento de cubierta"],
  ["mantenimiento-impermeabilizacion-fachada.webp", "Mantenimiento", "Impermeabilización de fachada"],
  ["mantenimiento-cubierta-aeropuerto.webp", "Mantenimiento", "Mantenimiento de cubierta de aeropuerto"],
  ["mantenimiento-sendero-peatonal.webp", "Mantenimiento", "Mantenimiento de sendero peatonal"],
  ["mantenimiento-terrazas-cubiertas.webp", "Mantenimiento", "Impermeabilización de terrazas"],
  ["mantenimiento-fachada-altura.webp", "Mantenimiento", "Mantenimiento de fachada en altura"],
  ["mantenimiento-cubierta-fibrocemento.webp", "Mantenimiento", "Mantenimiento de cubierta de fibrocemento"],
  ["construccion-bodega.webp", "Construcción", "Construcción de bodega"],
  ["construccion-casa-campestre.webp", "Construcción", "Construcción de casa campestre"],
  ["construccion-cubierta-deportiva.webp", "Construcción", "Construcción de cubierta deportiva"],
  ["construccion-plaza-comercial.webp", "Construcción", "Construcción de plaza comercial"],
  ["construccion-pergola-madera.webp", "Construcción", "Construcción de pérgola en madera"],
  ["construccion-estructura-mezanine.webp", "Construcción", "Construcción de estructura y mezanine"],
  ["construccion-oficina-minimalista.webp", "Construcción", "Remodelación de oficina"],
  ["construccion-fachada-alucobond.webp", "Construcción", "Construcción de fachada en Alucobond"],
  ["profesional-equipo.webp", "Servicios profesionales", "Equipo de servicios profesionales"],
  ["profesional-diseno-casa.webp", "Servicios profesionales", "Diseño arquitectónico de casa"],
  ["profesional-diseno-interior.webp", "Servicios profesionales", "Diseño de interiores"],
  ["profesional-edificio.webp", "Servicios profesionales", "Diseño de edificio"],
  ["profesional-casa-campestre.webp", "Servicios profesionales", "Diseño de casa campestre"],
  ["profesional-diseno-volumetrico.webp", "Servicios profesionales", "Diseño volumétrico"],
  ["profesional-diseno-mobiliario.webp", "Servicios profesionales", "Diseño de mobiliario"],
  ["profesional-gerencia-obra.webp", "Servicios profesionales", "Gerencia de obra"],
] as const;

const clientLogos = [
  "01_cusezar.png", "02_hotel_city_bog_106.png", "03_embajada_finlandia.png",
  "04_edificio_tierra_firme.png", "05_paloquemao.png", "06_pintuco.png",
  "07_prosperidad_social.png", "08_embajada_polonia.png", "09_byd.png",
  "10_industrias_argos.png", "11_bulevar_42.png", "12_artecma.png",
  "13_cafam.png", "14_argos.png", "15_sika.png", "16_cosechas.png",
  "17_abril_constructora.png", "18_sodimac_homecenter.png",
] as const;

const slug = (value: string) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/\.[^.]+$/, "")
  .replace(/[^a-zA-Z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .toLowerCase();

export const mediaRegistry: MediaRegistryItem[] = [
  { assetKey: "marca-logo-principal", section: "Marca", label: "Logotipo principal", altText: "Marco Arquitectónico S.A.S.", defaultUrl: "/brand/marco-arquitectonico-completo.jpeg", sortOrder: 0 },
  { assetKey: "inicio-bienvenida", section: "Inicio", label: "Portada de bienvenida", altText: "Bienvenidos a Marco Arquitectónico", defaultUrl: "/quienes_somos/cierre.webp", sortOrder: 0 },
  { assetKey: "inicio-construyendo-bienestar", section: "Inicio", label: "Construyendo tu bienestar", altText: "Proyecto de Marco Arquitectónico", defaultUrl: "/quienes_somos/hero.webp", sortOrder: 1 },
  ...serviceImages.map(([filename, section, label], index) => ({
    assetKey: `${slug(section)}-${slug(filename)}`,
    section,
    label,
    altText: label,
    defaultUrl: `/assets/servicios/cliente/${filename}`,
    sortOrder: index,
  })),
  ...clientLogos.map((filename, index) => ({
    assetKey: `cliente-${slug(filename)}`,
    section: "Clientes" as const,
    label: filename.replace(/^\d+_/, "").replace(/\.[^.]+$/, "").replace(/_/g, " "),
    altText: filename.replace(/^\d+_/, "").replace(/\.[^.]+$/, "").replace(/_/g, " "),
    defaultUrl: `/img-transparent/${filename}`,
    sortOrder: index,
  })),
];

export const mediaRegistryByUrl = new Map(mediaRegistry.map((item) => [item.defaultUrl, item]));
