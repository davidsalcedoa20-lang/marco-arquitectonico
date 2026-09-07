"use client";

import Image from "next/image";

type Layout = "full" | "half" | "offset-start" | "offset-end" | "feature";

type Props = {
  src: string;
  alt: string;
  /** Small process label — e.g. Proceso, Ejecución, Resultado esperado */
  label?: string;
  layout?: Layout;
  priority?: boolean;
  className?: string;
  /** Aspect ratio class — default 4/3 */
  aspect?: string;
};

const layoutClass: Record<Layout, string> = {
  full: "w-full",
  half: "w-full md:w-[78%] md:max-w-[22rem]",
  "offset-start": "w-full md:mr-auto md:w-[86%] md:max-w-[26rem]",
  "offset-end": "w-full md:ml-auto md:w-[86%] md:max-w-[26rem]",
  feature: "w-full md:w-[94%]",
};

/**
 * Narrative image inside service articles.
 * Uses data-reveal so RevealArticle animates it with the editorial flow.
 */
export function EditorialImage({
  src,
  alt,
  label,
  layout = "full",
  priority = false,
  className = "",
  aspect = "aspect-[4/3]",
}: Props) {
  return (
    <figure
      data-reveal
      className={`editorial-figure my-8 md:my-14 ${layoutClass[layout]} ${className}`}
    >
      {label ? (
        <figcaption className="mb-4 font-mono text-[16px] font-semibold tracking-[0.06em] text-ma-orange">
          {label}
        </figcaption>
      ) : null}
      <div
        className={`relative ${aspect} overflow-hidden rounded-[20px] bg-white/[0.03] shadow-[0_16px_48px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.07]`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 92vw, 40vw"
          className="object-cover"
          loading={priority ? undefined : "lazy"}
          priority={priority}
          quality={75}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090909]/35 via-transparent to-[#090909]/12"
        />
      </div>
    </figure>
  );
}

type PairProps = {
  left: Omit<Props, "layout" | "className">;
  right: Omit<Props, "layout" | "className">;
  className?: string;
};

/** Two-up composition for desktop rhythm; stacks on mobile. */
export function EditorialImagePair({ left, right, className = "" }: PairProps) {
  return (
    <div
      data-reveal
      className={`editorial-figure my-10 grid grid-cols-1 gap-4 md:my-14 md:grid-cols-2 md:gap-5 ${className}`}
    >
      {[left, right].map((img) => (
        <div key={img.src} className="min-w-0">
          {img.label ? (
            <p className="mb-4 font-mono text-[16px] font-semibold tracking-[0.06em] text-ma-orange">
              {img.label}
            </p>
          ) : null}
          <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] bg-white/[0.03] shadow-[0_16px_48px_rgba(0,0,0,0.5)] ring-1 ring-white/[0.07] sm:aspect-[4/5]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 92vw, 20vw"
              className="object-cover"
              loading="lazy"
              quality={75}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090909]/35 via-transparent to-[#090909]/12"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
