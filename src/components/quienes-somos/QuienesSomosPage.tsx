"use client";

import { HeroSection } from "@/components/quienes-somos/HeroSection";
import { EvolucionSection } from "@/components/quienes-somos/EvolucionSection";
import { ComoTrabajamosSection } from "@/components/quienes-somos/ComoTrabajamosSection";
import { ImpactoSection } from "@/components/quienes-somos/ImpactoSection";
import { FilosofiaSection } from "@/components/quienes-somos/FilosofiaSection";


export function QuienesSomosPage() {
  return (
    <main id="contenido" className="about-page bg-white text-ma-black">
      <HeroSection />
      <EvolucionSection />
      <ComoTrabajamosSection />
      <ImpactoSection />
      <FilosofiaSection />

    </main>
  );
}

