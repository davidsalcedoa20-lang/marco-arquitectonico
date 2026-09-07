"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  /** Optional muted looping video instead of a still */
  videoSrc?: string;
  priority?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Lightweight mobile replacement for scroll-synced WebGL / frames / video scrub.
 * Fade + soft translate only — no scroll scrubbing, no WebGL.
 */
export function MobileServiceVisual({
  src,
  alt,
  label,
  className = "",
  videoSrc,
  priority = false,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease }}
      className={`relative w-full overflow-hidden rounded-[20px] bg-white/[0.03] shadow-[0_16px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.07] ${className}`}
    >
      {label ? (
        <p className="absolute top-4 left-4 z-[2] rounded-full bg-black/35 px-3 py-1.5 font-mono text-[12px] font-semibold tracking-[0.24em] text-ma-orange backdrop-blur-sm">
          {label}
        </p>
      ) : null}

      <div className="relative aspect-[4/5] w-full sm:aspect-[16/11]">
        {videoSrc ? (
          <video
            src={videoSrc}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            playsInline
            autoPlay
            loop
            preload="metadata"
            controls={false}
            aria-label={alt}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            quality={72}
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090909]/55 via-transparent to-[#090909]/2"
        />
      </div>
    </motion.div>
  );
}
