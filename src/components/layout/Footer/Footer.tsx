"use client";

import Image from "next/image";
import Link from "next/link";
import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useCotizar } from "@/components/cotizar/CotizarProvider";
import { FooterBlueprint } from "./FooterBlueprint";
import styles from "./footer.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="7.5" r="1" fill="currentColor" />
      <path
        d="M12 16V12.5C12 11.12 13.12 10 14.5 10C15.88 10 16 11.2 16 12.5V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Footer() {
  const { open } = useCotizar();

  return (
    <footer className={styles.footer} data-section="footer">
      <div className={styles.atmosphere} aria-hidden />
      <div className={styles.grain} aria-hidden />

      <FadeIn delay={0} className={styles.blueprintWrap}>
        <FooterBlueprint />
      </FadeIn>

      <div className={styles.inner}>
        <div className={styles.cta}>
          <FadeIn delay={0.15}>
            <p className={styles.eyebrow}>¿LISTO PARA CONSTRUIR</p>
          </FadeIn>
          <FadeIn delay={0.28}>
            <h2 className={styles.title}>
              EL SIGUIENTE{" "}
              <span className={styles.titleAccent}>PROYECTO</span>?
            </h2>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className={styles.lead}>
              Cada gran proyecto comienza con una conversación.
            </p>
          </FadeIn>
          <FadeIn delay={0.52}>
            <button type="button" className={styles.button} onClick={open}>
              <span className={styles.buttonGlow} aria-hidden />
              COTIZAR PROYECTO →
            </button>
          </FadeIn>
        </div>

        <FadeIn delay={0.62}>
          <div className={styles.divider}>
            <span className={styles.dividerDot} aria-hidden />
          </div>
        </FadeIn>

        <div className={styles.bottom}>
          <FadeIn delay={0.7} className={styles.brandBlock}>
            <div className={styles.brandRow}>
              <Image
                src="/logo.png"
                alt="Marco Arquitectónico"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className={styles.brandName}>MARCO ARQUITECTÓNICO</span>
            </div>
            <p className={styles.services}>
              ARQUITECTURA • CONSTRUCCIÓN • MANTENIMIENTO
            </p>
            <p className={styles.copy}>
              © 2026 Marco Arquitectónico.
              <br />
              Todos los derechos reservados.
            </p>
            <div className={styles.socials}>
              <a
                className={styles.social}
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <IconInstagram />
              </a>
              <a
                className={styles.social}
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <IconLinkedIn />
              </a>
              <a
                className={styles.social}
                href="mailto:contacto@marcoarquitectonico.com"
                aria-label="Correo"
              >
                <IconMail />
              </a>
            </div>
          </FadeIn>

          <div className={styles.bottomRule} aria-hidden />

          <FadeIn delay={0.82} className={styles.creditBlock}>
            <p className={styles.creditLabel}>DISEÑADO Y DESARROLLADO POR</p>
            <Link
              href="https://nexaorigin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.nexaLink}
              aria-label="NEXA Digital Studio"
            >
              <span className={styles.nexaMark}>NEXA</span>
              <span className={styles.nexaSub}>DIGITAL STUDIO</span>
            </Link>
          </FadeIn>
        </div>
      </div>
    </footer>
  );
}
