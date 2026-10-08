"use client";
import Image from "next/image";
import { useMediaUrl } from "@/components/media/MediaProvider";

/** Original artwork supplied in Correciones on 7 September 2026. */
export function BrandLogo({ priority = false }: { priority?: boolean }) {
  const mediaUrl = useMediaUrl();
  return (
    <Image
      className="brand-artwork"
      src={mediaUrl("/brand/marco-arquitectonico-completo.jpeg")}
      alt="Marco Arquitectónico S.A.S."
      width={712}
      height={193}
      sizes="(max-width: 359px) 150px, (max-width: 700px) 190px, 360px"
      priority={priority}
    />
  );
}
