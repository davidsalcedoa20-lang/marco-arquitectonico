export type ServiceId =
  | "mantenimiento"
  | "construccion"
  | "servicios-profesionales";

export type HomeService = {
  id: ServiceId;
  index: string;
  label: string;
  title: string;
  titleAccent: string;
  description: string;
  href: string;
  cta: string;
  tagline: string;
};

/** Orden jerárquico solicitado por el cliente: Construcción > Mantenimiento > Servicios Profesionales. */
export const HOME_SERVICES: HomeService[] = [
  {
    id: "construccion",
    index: "01",
    label: "Construcción",
    title: "Del plano a la",
    titleAccent: "realidad.",
    description:
      "Obras civiles y arquitectónicas para vivienda, hoteles, bodegas, locales comerciales y oficinas. Construimos espacios que responden a tu proyecto.",
    href: "/servicios/construccion",
    cta: "Ver más",
    tagline: "Planificar · Ejecutar · Entregar",
  },
  {
    id: "mantenimiento",
    index: "02",
    label: "Mantenimiento",
    title: "Soluciones que construyen",
    titleAccent: "valor.",
    description:
      "Cuidado de cubiertas y fachadas para propiedad horizontal. Protegemos los espacios de la intemperie y el deterioro para conservar tu patrimonio.",
    href: "/servicios/mantenimiento",
    cta: "Ver más",
    tagline: "Cubiertas · Fachadas · Propiedad horizontal",
  },
  {
    id: "servicios-profesionales",
    index: "03",
    label: "Servicios profesionales",
    title: "Ideas que se vuelven",
    titleAccent: "proyecto.",
    description:
      "Consultoría, interventoría y dirección de proyectos. Integramos diseño, planificación y control técnico para llevar tu proyecto a la obra.",
    href: "/servicios/servicios-profesionales",
    cta: "Ver más",
    tagline: "Consultoría · Interventoría · Dirección",
  },
];

export const SERVICE_COUNT = HOME_SERVICES.length;
