import type { Metadata } from "next";
import "./globals.css";
import "./client-review.css";
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
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Marco Arquitectónico",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Marco Arquitectónico | Del plano a la realidad",
    description:
      "Diseñamos, construimos e intervenimos proyectos con altos estándares de calidad, precisión y compromiso.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
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

