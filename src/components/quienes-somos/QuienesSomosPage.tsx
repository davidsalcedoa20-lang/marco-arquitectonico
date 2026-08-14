"use client";

import { HeroSection } from "@/components/quienes-somos/HeroSection";
import { EvolucionSection } from "@/components/quienes-somos/EvolucionSection";
import { ComoTrabajamosSection } from "@/components/quienes-somos/ComoTrabajamosSection";
import { ImpactoSection } from "@/components/quienes-somos/ImpactoSection";
import { FilosofiaSection } from "@/components/quienes-somos/FilosofiaSection";
import { CtaSection } from "@/components/quienes-somos/CtaSection";

export function QuienesSomosPage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <HeroSection />
      <EvolucionSection />
      <ComoTrabajamosSection />
      <ImpactoSection />
      <FilosofiaSection />
      <CtaSection />
    </main>
  );
}
