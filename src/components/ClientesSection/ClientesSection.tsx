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
    .replace(/_/g, " ");
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
            <p className={styles.eyebrow}>
              NUESTROS CLIENTES
              <span className={styles.eyebrowLine} aria-hidden />
            </p>
            <h2 id="clientes-heading" className={styles.title}>
              CLIENTES QUE CONFÍAN
              <br />
              EN <span className={styles.titleAccent}>NUESTRO TRABAJO</span>
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
            Construyendo identidad, porque creemos en tus propósitos, por eso te
            ayudamos a construirlos.
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
