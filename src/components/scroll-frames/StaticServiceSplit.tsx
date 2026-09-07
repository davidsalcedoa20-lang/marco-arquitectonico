"use client";

import type { ReactNode } from "react";
import { MobileServiceVisual } from "@/components/mobile/MobileServiceVisual";

type Props = {
  children: ReactNode;
  imageSrc: string;
  imageAlt: string;
  imageLabel?: string;
  variant?: "editorial" | "cinematic";
  className?: string;
};

/**
 * Static two-column article layout: text | image.
 * Replaces the scroll-scrubbed sticky-frame animation with a plain image —
 * no scroll-driven motion, same split used on mobile now used at every size.
 */
export function StaticServiceSplit({
  children,
  imageSrc,
  imageAlt,
  imageLabel,
  variant = "editorial",
  className = "",
}: Props) {
  const cinematic = variant === "cinematic";

  return (
    <section
      className={`relative bg-ma-black ${className}`}
      data-variant={variant}
    >
      <div className="flex flex-col md:flex-row md:items-start">
        <article
          className={`relative z-10 w-full px-5 pt-24 pb-10 sm:px-6 md:pb-24 ${
            cinematic
              ? "bg-ma-black md:w-[43.5%] md:shrink-0 md:pr-6 lg:pl-14 lg:pr-4 xl:pl-16"
              : "bg-white md:w-[45%] md:shrink-0 md:px-8 lg:px-10 xl:px-12"
          }`}
        >
          <div
            className={`mx-auto w-full md:mx-0 ${
              cinematic ? "max-w-[48rem]" : "max-w-[52rem]"
            }`}
          >
            {children}
          </div>
        </article>

        <div className="relative z-10 w-full px-5 pb-12 sm:px-6 md:flex-1 md:px-0 md:pt-24 md:pr-8 md:pb-24 lg:pr-14">
          <MobileServiceVisual
            src={imageSrc}
            alt={imageAlt}
            label={imageLabel}
            priority
          />
        </div>
      </div>
    </section>
  );
}
