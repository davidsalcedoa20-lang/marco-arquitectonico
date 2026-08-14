"use client";

import { ScrollFrameArticle } from "@/components/scroll-frames/ScrollFrameArticle";
import { MantenimientoArticle } from "@/components/servicios/MantenimientoArticle";
import { MantenimientoAct2 } from "@/components/servicios/MantenimientoAct2";

export default function MantenimientoPage() {
  return (
    <main className="bg-ma-black">
      <ScrollFrameArticle
        sequenceId="mantenimiento"
        buildingScale={1.0}
        animationPortion={0.48}
        mobileStillSrc="/assets/frames/mantenimiento/frame_0201.webp"
      >
        <MantenimientoArticle />
      </ScrollFrameArticle>

      <div id="acto-2" className="relative z-20">
        <MantenimientoAct2 />
      </div>
    </main>
  );
}
