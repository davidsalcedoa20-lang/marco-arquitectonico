"use client";

import { motion } from "framer-motion";
import styles from "./clientes.module.css";

type Props = {
  src: string;
  alt: string;
  index: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function ClienteCard({ src, alt, index }: Props) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        ease,
        delay: 0.12 + index * 0.045,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.logo}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </motion.article>
  );
}
