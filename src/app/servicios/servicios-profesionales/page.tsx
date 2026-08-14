"use client";

import { ScrollFrameArticle } from "@/components/scroll-frames/ScrollFrameArticle";
import { ServiciosProfesionalesArticle } from "@/components/servicios/ServiciosProfesionalesArticle";
import { ServiceFinalCta } from "@/components/servicios/ServiceFinalCta";

export default function ServiciosProfesionalesPage() {
  return (
    <main className="bg-ma-black">
      <ScrollFrameArticle
        sequenceId="servicios-profesionales"
        variant="cinematic"
        buildingScale={1.22}
        animationPortion={0.48}
      >
        <ServiciosProfesionalesArticle />
      </ScrollFrameArticle>

      <div className="relative z-20">
        <ServiceFinalCta
          ctaTitle="Hablemos de su próximo proyecto."
          ctaBody="Desde la primera conversación hasta la documentación ejecutiva, acompañamos cada decisión con claridad técnica y visión arquitectónica."
          mailSubject="Servicios%20Profesionales"
        />
      </div>
    </main>
  );
}
