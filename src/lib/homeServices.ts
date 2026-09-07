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
      "Ejecutamos cada etapa constructiva con precisión técnica: cimentación, estructura, cerramientos y entrega bajo control permanente.",
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
      "Preservamos el desempeño y la vida útil de cada activo. Diagnóstico, intervención y continuidad con el mismo rigor de obra nueva.",
    href: "/servicios/mantenimiento",
    cta: "Ver más",
    tagline: "Diseñamos · Construimos · Cuidamos",
  },
  {
    id: "servicios-profesionales",
    index: "03",
    label: "Servicios profesionales",
    title: "Ideas que se vuelven",
    titleAccent: "proyecto.",
    description:
      "Desde la conversación inicial hasta la documentación ejecutiva: diseño, visualización 3D y coordinación interdisciplinaria.",
    href: "/servicios/servicios-profesionales",
    cta: "Ver más",
    tagline: "Escuchar · Diseñar · Coordinar",
  },
];

export const SERVICE_COUNT = HOME_SERVICES.length;
