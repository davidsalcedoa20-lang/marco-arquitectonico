import type { Metadata } from "next";
import "./globals.css";
import "./client-review.css";
import "./client-presentation.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { MediaProvider } from "@/components/media/MediaProvider";
import { getMediaOverrides } from "@/lib/getMediaOverrides";
import { getSiteContent } from "@/lib/getSiteContent";
import { SiteContentProvider } from "@/components/content/SiteContentProvider";


const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcoarquitectonico.com";

const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marco Arquitectónico | Construcción, mantenimiento y servicios profesionales",
    template: "%s | Marco Arquitectónico",
  },
  description:
    "Nuestra compañía está enfocada en mejorar tu calidad de vida. Construcción, mantenimiento y servicios profesionales.",
  keywords: [
    "arquitectura",
    "construcción",
    "mantenimiento",
    "diseño arquitectónico",
    "Marco Arquitectónico",
  ],
  authors: [{ name: "Marco Arquitectónico" }],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl,
    siteName: "Marco Arquitectónico",
    title: "Marco Arquitectónico | Construcción, mantenimiento y servicios profesionales",
    description:
      "Nuestra compañía está enfocada en mejorar tu calidad de vida. Construcción, mantenimiento y servicios profesionales.",
    images: [
      {
        url: "/brand/marco-arquitectonico-completo.jpeg",
        width: 712,
        height: 193,
        alt: "Marco Arquitectónico",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Marco Arquitectónico | Construcción, mantenimiento y servicios profesionales",
    description:
      "Nuestra compañía está enfocada en mejorar tu calidad de vida. Construcción, mantenimiento y servicios profesionales.",
    images: ["/brand/marco-arquitectonico-completo.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/brand/marco-arquitectonico-simbolo.jpeg",
    apple: "/brand/marco-arquitectonico-simbolo.jpeg",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSiteContent();
  return {
    ...baseMetadata,
    title: { default: seo.title, template: "%s | Marco Arquitectónico" },
    description: seo.description,
    keywords: seo.keywords.split(",").map((item) => item.trim()).filter(Boolean),
    openGraph: { ...baseMetadata.openGraph, title: seo.title, description: seo.description, images: [{ url: seo.shareImage, alt: "Marco Arquitectónico" }] },
    twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [seo.shareImage] },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [overrides, content] = await Promise.all([getMediaOverrides(), getSiteContent()]);
  return (
    <html lang="es">
      <body className="bg-white font-sans text-ma-black antialiased">
        <MediaProvider overrides={overrides}><SiteContentProvider content={content}><SiteChrome>{children}</SiteChrome></SiteContentProvider></MediaProvider>
      </body>
    </html>
  );
}

