"use client";

import { HeroSection } from "@/components/quienes-somos/HeroSection";
import { EvolucionSection } from "@/components/quienes-somos/EvolucionSection";
import { TimelineSection } from "@/components/quienes-somos/TimelineSection";
import { ComoTrabajamosSection } from "@/components/quienes-somos/ComoTrabajamosSection";
import { ImpactoSection } from "@/components/quienes-somos/ImpactoSection";
import { FilosofiaSection } from "@/components/quienes-somos/FilosofiaSection";
import { useSiteContent } from "@/components/content/SiteContentProvider";


export function QuienesSomosPage() {
  const { settings } = useSiteContent();
  return (
    <main id="contenido" className="about-page bg-white text-ma-black">
      <HeroSection />
      <EvolucionSection />
      {settings.showTimeline && <TimelineSection />}
      <ComoTrabajamosSection />
      <ImpactoSection />
      <FilosofiaSection />

    </main>
  );
}

