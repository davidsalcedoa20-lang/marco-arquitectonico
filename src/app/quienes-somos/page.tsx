import type { Metadata } from "next";
import { QuienesSomosPage } from "@/components/quienes-somos/QuienesSomosPage";

export const metadata: Metadata = {
  title: "Quiénes Somos | Marco Arquitectónico",
  description:
    "Arquitectura con propósito, construida desde la confianza. Conoce nuestro equipo, proceso y filosofía.",
};

export default function Page() {
  return <QuienesSomosPage />;
}
