import styles from "./clientes.module.css";

type Props = {
  src: string;
  alt: string;
  index: number;
};

export function ClienteCard({ src, alt }: Props) {
  return (
    <article
      className={styles.card}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.logo}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      <p className={styles.clientName}>{alt}</p>
    </article>
  );
}

