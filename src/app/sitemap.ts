import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcoarquitectonico.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/quienes-somos",
    "/servicios",
    "/servicios/mantenimiento",
    "/servicios/construccion",
    "/servicios/servicios-profesionales",
  ];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
