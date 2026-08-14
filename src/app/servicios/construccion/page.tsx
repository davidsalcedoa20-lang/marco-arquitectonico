"use client";

import { ScrollConstructionExperience } from "@/components/construccion/ScrollConstructionExperience";
import { ConstruccionArticle } from "@/components/construccion/ConstruccionArticle";
import { ServiceFinalCta } from "@/components/servicios/ServiceFinalCta";

export default function ConstruccionPage() {
  return (
    <main className="bg-ma-black">
      <ScrollConstructionExperience animationPortion={0.48}>
        <ConstruccionArticle />
      </ScrollConstructionExperience>

      <div className="relative z-20">
        <ServiceFinalCta />
      </div>
    </main>
  );
}
