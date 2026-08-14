"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCotizar } from "@/components/cotizar/CotizarProvider";

const ease = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { href: "/", label: "INICIO" },
  { href: "/quienes-somos", label: "QUIÉNES SOMOS" },
  { href: "/servicios", label: "SERVICIOS" },
] as const;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { open } = useCotizar();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className={`fixed inset-x-0 top-0 z-50 ${
          isHome
            ? "bg-transparent"
            : "border-b border-white/5 bg-ma-black/70 backdrop-blur-xl"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1800px] items-center justify-between px-5 sm:px-6 md:h-[72px] md:px-10 lg:px-14">
          <Link
            href="/"
            aria-label="Marco Arquitectónico — Inicio"
            className="group flex min-h-11 items-center gap-3"
          >
            <Image
              src="/logo.png"
              alt="Marco Arquitectónico"
              width={36}
              height={36}
              className="h-8 w-8 object-contain transition-opacity duration-300 group-hover:opacity-80 md:h-9 md:w-9"
              priority
            />
            <span className="hidden text-[10px] font-medium tracking-[0.24em] text-white sm:block md:text-[11px]">
              MARCO ARQUITECTÓNICO
            </span>
          </Link>

          {/* Desktop / tablet nav — unchanged behavior */}
          <nav className="hidden items-center gap-6 md:flex md:gap-8">
            <Link
              href="/quienes-somos"
              className="group relative text-[10px] font-medium tracking-[0.2em] text-white/75 transition-colors duration-300 hover:text-white md:text-[11px]"
            >
              QUIÉNES SOMOS
              <span
                className={`absolute -bottom-1 left-0 h-px bg-ma-orange transition-all duration-500 ${
                  pathname === "/quienes-somos"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <button
              type="button"
              onClick={open}
              className="home-cta-solid inline-flex min-h-11 items-center rounded-full px-5 py-2.5 text-[10px] font-medium tracking-[0.18em] md:px-6 md:text-[11px]"
            >
              COTIZAR PROYECTO
            </button>
          </nav>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={open}
              className="home-cta-solid inline-flex min-h-11 items-center rounded-full px-4 py-2 text-[9px] font-medium tracking-[0.16em]"
            >
              COTIZAR
            </button>
            <button
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/30"
            >
              <span className="relative block h-3.5 w-4">
                <span
                  className={`absolute left-0 h-px w-full bg-white transition-all duration-300 ${
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-px w-full bg-white transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-white transition-all duration-300 ${
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <button
              type="button"
              aria-label="Cerrar menú"
              className="absolute inset-0 bg-[#090909]/75 backdrop-blur-md"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              className="absolute inset-x-0 top-0 border-b border-white/10 bg-[#0a0a0a] px-6 pt-20 pb-10 shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
            >
              <ul className="space-y-1">
                {LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex min-h-12 items-center border-b border-white/5 text-[12px] font-medium tracking-[0.22em] transition-colors ${
                          active
                            ? "text-ma-orange"
                            : "text-white/75 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  open();
                }}
                className="home-cta-solid mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full text-[11px] font-medium tracking-[0.2em]"
              >
                COTIZAR PROYECTO
              </button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
