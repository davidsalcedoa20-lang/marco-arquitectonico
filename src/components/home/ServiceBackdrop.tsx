"use client";

import { motion } from "framer-motion";
import type { ServiceId } from "@/lib/homeServices";
import { HOME_BACKGROUNDS } from "@/lib/homeBackgrounds";
import { usePreloadHomeImages } from "@/hooks/usePreloadHomeImages";

type Props = {
  activeId: ServiceId;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Full-bleed service photography only.
 * Soft crossfade between services (~700ms). No decorative overlays.
 */
export function ServiceBackdrop({ activeId }: Props) {
  usePreloadHomeImages();

  return (
    <div className="home-backdrop pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#070707]" />

      {(Object.keys(HOME_BACKGROUNDS) as ServiceId[]).map((id) => {
        const pair = HOME_BACKGROUNDS[id];
        const on = id === activeId;
        return (
          <motion.div
            key={id}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: on ? 1 : 0 }}
            transition={{ duration: 0.7, ease }}
            aria-hidden={!on}
          >
            <div
              className="home-backdrop-photo absolute inset-0"
              style={{ backgroundImage: `url(${pair.a})` }}
            />
            <div
              className="home-backdrop-photo home-backdrop-photo--secondary absolute inset-0"
              style={{ backgroundImage: `url(${pair.b})` }}
            />
          </motion.div>
        );
      })}

      <div className="home-hub-readability absolute inset-0" aria-hidden />
    </div>
  );
}
