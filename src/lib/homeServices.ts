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

export const HOME_SERVICES: HomeService[] = [
  {
    id: "mantenimiento",
    index: "01",
    label: "MANTENIMIENTO",
    title: "SOLUCIONES QUE CONSTRUYEN",
    titleAccent: "VALOR.",
    description:
      "Preservamos el desempeño y la vida útil de cada activo. Diagnóstico, intervención y continuidad con el mismo rigor de obra nueva.",
    href: "/servicios/mantenimiento",
    cta: "VER MÁS",
    tagline: "DISEÑAMOS · CONSTRUIMOS · CUIDAMOS",
  },
  {
    id: "construccion",
    index: "02",
    label: "CONSTRUCCIÓN",
    title: "DEL PLANO A LA",
    titleAccent: "REALIDAD.",
    description:
      "Ejecutamos cada etapa constructiva con precisión técnica: cimentación, estructura, cerramientos y entrega bajo control permanente.",
    href: "/servicios/construccion",
    cta: "VER MÁS",
    tagline: "PLANIFICAR · EJECUTAR · ENTREGAR",
  },
  {
    id: "servicios-profesionales",
    index: "03",
    label: "SERVICIOS PROFESIONALES",
    title: "IDEAS QUE SE VUELVEN",
    titleAccent: "PROYECTO.",
    description:
      "Desde la conversación inicial hasta la documentación ejecutiva: diseño, visualización 3D y coordinación interdisciplinaria.",
    href: "/servicios/servicios-profesionales",
    cta: "VER MÁS",
    tagline: "ESCUCHAR · DISEÑAR · COORDINAR",
  },
];

export const SERVICE_COUNT = HOME_SERVICES.length;
