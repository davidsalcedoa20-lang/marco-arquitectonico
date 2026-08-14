import type { ServiceId } from "@/lib/homeServices";

export type ServiceBgPair = {
  a: string;
  b: string;
};

/** Served from public/ — originals live in img/Logo/ (*3 → webp) */
export const HOME_BACKGROUNDS: Record<ServiceId, ServiceBgPair> = {
  mantenimiento: {
    a: "/assets/home/mantenimiento3.webp",
    b: "/assets/home/mantenimiento3.webp",
  },
  construccion: {
    a: "/assets/home/construccion3.webp",
    b: "/assets/home/construccion3.webp",
  },
  "servicios-profesionales": {
    a: "/assets/home/servicios_profesionales3.webp",
    b: "/assets/home/servicios_profesionales3.webp",
  },
};

/** Unique URLs for preload (one image per service). */
export const ALL_HOME_BG_URLS = [
  ...new Set(
    Object.values(HOME_BACKGROUNDS).flatMap((p) => [p.a, p.b]),
  ),
];
