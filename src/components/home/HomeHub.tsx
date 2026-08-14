"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  HOME_SERVICES,
  type ServiceId,
} from "@/lib/homeServices";
import { useCotizar } from "@/components/cotizar/CotizarProvider";
import { ServiceBackdrop } from "./ServiceBackdrop";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeHub() {
  const [activeId, setActiveId] = useState<ServiceId>("mantenimiento");
  const active =
    HOME_SERVICES.find((s) => s.id === activeId) ?? HOME_SERVICES[0];
  const { open: openCotizar } = useCotizar();

  const onSelect = useCallback((id: ServiceId) => {
    setActiveId(id);
  }, []);

  return (
    <section className="home-hub relative h-[100dvh] w-full overflow-hidden bg-[#070707]">
      <ServiceBackdrop activeId={activeId} />

      <div className="relative z-10 flex h-full flex-col px-5 pt-[4.5rem] pb-5 sm:px-6 md:px-10 md:pt-20 md:pb-6 lg:px-14">
        <div className="grid min-h-0 flex-1 grid-cols-1 items-center gap-5 overflow-y-auto overscroll-contain lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-10 lg:overflow-visible xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.75fr)]">
          <div className="relative max-w-xl pointer-events-auto lg:max-w-none">
            <p className="mb-4 font-mono text-[10px] tracking-[0.38em] text-ma-orange md:mb-5 md:text-[11px]">
              SERVICIOS
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease }}
              >
                <h1 className="text-[clamp(1.85rem,7vw,3.7rem)] leading-[1.05] font-semibold tracking-[-0.04em] text-white md:text-[clamp(2.2rem,4.4vw,3.7rem)] md:leading-[1.0]">
                  {active.title}{" "}
                  <span className="text-ma-orange">{active.titleAccent}</span>
                </h1>
                <p className="mt-5 max-w-[34rem] text-[14px] leading-[1.75] text-white/55 md:mt-9 md:text-[16px] md:leading-[1.8]">
                  {active.description}
                </p>
                <Link
                  href={active.href}
                  className="group mt-7 inline-flex min-h-11 items-center gap-3 text-[11px] font-medium tracking-[0.24em] text-ma-orange transition-opacity hover:opacity-80 md:mt-10"
                >
                  {active.cta}
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex flex-col justify-center gap-0 pointer-events-auto lg:justify-self-end lg:w-full lg:max-w-md">
            {HOME_SERVICES.map((s) => {
              const on = s.id === activeId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelect(s.id)}
                  className={`group min-h-12 border-l py-4 pl-4 text-left transition-all duration-500 sm:pl-5 md:min-h-0 md:py-6 ${
                    on
                      ? "border-ma-orange"
                      : "border-white/10 hover:border-white/25"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`font-mono text-[10px] tracking-[0.28em] ${
                          on ? "text-ma-orange" : "text-white/30"
                        }`}
                      >
                        {s.index}
                      </p>
                      <p
                        className={`mt-2 text-[13px] tracking-[0.14em] transition-colors duration-500 md:text-[14px] ${
                          on ? "text-white" : "text-white/40"
                        }`}
                      >
                        {s.label}
                      </p>
                      <AnimatePresence>
                        {on && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 max-w-[22rem] overflow-hidden text-[13px] leading-relaxed text-white/45"
                          >
                            {s.description.slice(0, 110)}…
                          </motion.p>
                        )}
                      </AnimatePresence>
                      {on && (
                        <Link
                          href={s.href}
                          className="mt-4 inline-flex text-[10px] tracking-[0.22em] text-ma-orange"
                          onClick={(e) => e.stopPropagation()}
                        >
                          VER MÁS →
                        </Link>
                      )}
                    </div>
                    <ServiceIcon id={s.id} active={on} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-20 mt-auto flex flex-col gap-3 border-t border-white/10 pt-4 pointer-events-auto sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-5">
          <p className="font-mono text-[9px] leading-relaxed tracking-[0.16em] text-white/40 md:text-[10px] md:tracking-[0.2em]">
            ¿TIENES UN PROYECTO EN MENTE?{" "}
            <span className="text-white/70">
              ESTAMOS LISTOS PARA HACERLO REALIDAD.
            </span>
          </p>
          <button
            type="button"
            onClick={openCotizar}
            className="home-cta-solid inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-7 py-3 text-[10px] font-medium tracking-[0.22em] sm:w-auto"
          >
            HABLEMOS DE TU PROYECTO
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({ id, active }: { id: ServiceId; active: boolean }) {
  const stroke = active ? "#f57c00" : "rgba(255,255,255,0.25)";
  if (id === "mantenimiento") {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="14" cy="14" r="10" stroke={stroke} strokeWidth="1.2" />
        <path
          d="M10 15.5l2.2 2.2L18.5 11"
          stroke={stroke}
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    );
  }
  if (id === "construccion") {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M8 22V10l6-4 6 4v12" stroke={stroke} strokeWidth="1.2" />
        <path d="M14 6v16M8 14h12" stroke={stroke} strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="6" y="6" width="16" height="16" stroke={stroke} strokeWidth="1.2" />
      <path d="M6 12h16M12 6v16" stroke={stroke} strokeWidth="1.2" />
    </svg>
  );
}
