import type { Metadata } from "next";
import "./globals.css";
import "./client-review.css";
import "./client-landing.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CotizarProvider } from "@/components/cotizar/CotizarProvider";


const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcoarquitectonico.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marco Arquitectónico | Del plano a la realidad",
    template: "%s | Marco Arquitectónico",
  },
  description:
    "Diseñamos, construimos e intervenimos proyectos con altos estándares de calidad, precisión y compromiso.",
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
    title: "Marco Arquitectónico | Del plano a la realidad",
    description:
      "Diseñamos, construimos e intervenimos proyectos con altos estándares de calidad, precisión y compromiso.",
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
    title: "Marco Arquitectónico | Del plano a la realidad",
    description:
      "Diseñamos, construimos e intervenimos proyectos con altos estándares de calidad, precisión y compromiso.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-white font-sans text-ma-black antialiased">
        <SmoothScroll>
          <CotizarProvider>
            <Header />
            {children}
            <Footer />
          </CotizarProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}

