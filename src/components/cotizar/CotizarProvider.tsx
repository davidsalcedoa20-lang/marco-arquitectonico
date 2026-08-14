"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type CotizarContextValue = {
  open: () => void;
  close: () => void;
};

const CotizarContext = createContext<CotizarContextValue | null>(null);

export function useCotizar() {
  const ctx = useContext(CotizarContext);
  if (!ctx) {
    throw new Error("useCotizar must be used within CotizarProvider");
  }
  return ctx;
}

const ease = [0.22, 1, 0.36, 1] as const;

type Phase = "idle" | "ready" | "connecting";

export function CotizarProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const titleId = useId();

  const openCotizar = useCallback(() => {
    setPhase("ready");
    setOpen(true);
  }, []);

  const closeCotizar = useCallback(() => {
    setOpen(false);
    setPhase("idle");
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase !== "connecting") closeCotizar();
    };
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, phase, closeCotizar]);

  const continueToWhatsApp = useCallback(() => {
    if (phase === "connecting") return;
    setPhase("connecting");

    window.setTimeout(() => {
      window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
      setOpen(false);
      setPhase("idle");
    }, 1000);
  }, [phase]);

  return (
    <CotizarContext.Provider
      value={{ open: openCotizar, close: closeCotizar }}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.div
            className="cotizar-overlay fixed inset-0 z-[100] flex items-center justify-center px-[5vw] py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            role="presentation"
            onClick={() => {
              if (phase !== "connecting") closeCotizar();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="cotizar-card relative w-full max-w-[560px] px-8 py-10 sm:px-12 sm:py-12"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Cerrar"
                onClick={closeCotizar}
                disabled={phase === "connecting"}
                className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center text-white/35 transition-colors duration-300 hover:text-white/70 disabled:opacity-30 sm:top-6 sm:right-6 sm:h-8 sm:w-8"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <AnimatePresence mode="wait">
                {phase === "connecting" ? (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35, ease }}
                    className="flex min-h-[280px] flex-col items-center justify-center text-center"
                  >
                    <ConnectingPulse />
                    <p className="mt-8 font-mono text-[11px] tracking-[0.28em] text-white/55">
                      Conectando con un asesor...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="flex flex-col items-center text-center"
                  >
                    <ConversationIllustration />

                    <h2
                      id={titleId}
                      className="mt-10 text-[clamp(1.55rem,3.2vw,1.85rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-white"
                    >
                      Hablemos de tu proyecto.
                    </h2>

                    <p className="mt-5 max-w-[26rem] text-[14px] leading-[1.7] text-white/50 sm:text-[15px]">
                      Un asesor de Marco Arquitectónico te atenderá
                      personalmente por WhatsApp para conocer tu idea y
                      orientarte desde el primer momento.
                    </p>

                    <p className="mt-8 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-white/40">
                      <span
                        className="cotizar-status-dot inline-block h-1.5 w-1.5 rounded-full"
                        aria-hidden
                      />
                      Asesor disponible ahora
                    </p>

                    <button
                      type="button"
                      onClick={continueToWhatsApp}
                      className="cotizar-wa-btn mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[11px] font-medium tracking-[0.2em] sm:w-auto sm:min-w-[280px]"
                    >
                      Continuar a WhatsApp
                      <span aria-hidden>→</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CotizarContext.Provider>
  );
}

function ConversationIllustration() {
  return (
    <svg
      width="160"
      height="72"
      viewBox="0 0 160 72"
      fill="none"
      aria-hidden
      className="opacity-90"
    >
      {/* Soft ambient glow */}
      <ellipse
        cx="80"
        cy="40"
        rx="54"
        ry="22"
        fill="url(#cotizarGlow)"
        opacity="0.55"
      />

      {/* Client silhouette */}
      <circle cx="36" cy="22" r="8" stroke="#9ec5ff" strokeWidth="1.2" />
      <path
        d="M22 52c2.5-12 10-18 14-18s11.5 6 14 18"
        stroke="#9ec5ff"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Architect silhouette */}
      <circle cx="124" cy="22" r="8" stroke="#f57c00" strokeWidth="1.2" />
      <path
        d="M110 52c2.5-12 10-18 14-18s11.5 6 14 18"
        stroke="#f57c00"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Architectural plan between them */}
      <rect
        x="62"
        y="24"
        width="36"
        height="28"
        rx="1.5"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1"
      />
      <path
        d="M68 32h24M68 38h24M68 44h14"
        stroke="rgba(158,197,255,0.45)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M74 28v20M86 28v12"
        stroke="rgba(245,124,0,0.35)"
        strokeWidth="1"
      />

      {/* Conversation hint */}
      <path
        d="M72 14h16a6 6 0 0 1 6 6v2a6 6 0 0 1-6 6H80l-5 5v-5h-3a6 6 0 0 1-6-6v-2a6 6 0 0 1 6-6z"
        stroke="rgba(255,255,255,0.28)"
        strokeWidth="1"
      />
      <circle cx="78" cy="22" r="1.1" fill="rgba(255,255,255,0.4)" />
      <circle cx="84" cy="22" r="1.1" fill="rgba(255,255,255,0.4)" />
      <circle cx="90" cy="22" r="1.1" fill="rgba(255,255,255,0.4)" />

      <defs>
        <radialGradient id="cotizarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(100,150,210,0.2)" />
          <stop offset="100%" stopColor="rgba(100,150,210,0)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function ConnectingPulse() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <span className="cotizar-pulse absolute inset-0 rounded-full" />
      <span className="cotizar-pulse cotizar-pulse--delay absolute inset-2 rounded-full" />
      <span className="relative h-2.5 w-2.5 rounded-full bg-[#8eb8e8]/60" />
    </div>
  );
}
