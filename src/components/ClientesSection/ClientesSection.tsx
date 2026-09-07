"use client";

import { motion } from "framer-motion";
import { ClienteCard } from "./ClienteCard";
import styles from "./clientes.module.css";

type Props = {
  logos: string[];
};

const ease = [0.22, 1, 0.36, 1] as const;

function logoAlt(src: string) {
  const file = src.split("/").pop() ?? "cliente";
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, letter => letter.toUpperCase());
}

export function ClientesSection({ logos }: Props) {
  if (logos.length === 0) return null;

  return (
    <section
      className={styles.section}
      aria-labelledby="clientes-heading"
      data-section="clientes"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease }}
          >
            <h2 id="clientes-heading" className={styles.title}>
              Clientes que confían
              <br />
              en <span className={styles.titleAccent}>nuestro trabajo</span>
            </h2>
          </motion.div>

          <div className={styles.divider} aria-hidden />

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease, delay: 0.12 }}
          >
            Organizaciones públicas y privadas que han confiado su
            infraestructura a nuestro rigor técnico, cumplimiento y compromiso
            de largo plazo.
          </motion.p>
        </header>

        <div className={styles.grid}>
          {logos.map((src, index) => (
            <ClienteCard
              key={src}
              src={src}
              alt={logoAlt(src)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

