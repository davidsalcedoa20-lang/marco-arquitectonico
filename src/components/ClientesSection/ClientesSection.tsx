import { ClienteCard } from "./ClienteCard";
import styles from "./clientes.module.css";

type Props = {
  logos: string[];
};

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
          <div>
            <h2 id="clientes-heading" className={styles.title}>
              Clientes que confían
              <br />
              en <span className={styles.titleAccent}>nuestro trabajo</span>
            </h2>
          </div>

          <div className={styles.divider} aria-hidden />

          <p className={styles.description}>
            Organizaciones públicas y privadas que han confiado su
            infraestructura a nuestro rigor técnico, cumplimiento y compromiso
            de largo plazo.
          </p>
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

