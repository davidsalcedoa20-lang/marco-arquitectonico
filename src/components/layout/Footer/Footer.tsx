import Image from "next/image";
import Link from "next/link";
export function Footer() {
  return <footer className="corporate-footer"><div className="page-container">
    <div className="footer-heading"><h2>Espacios que reflejan tu identidad.</h2><p>Diseñamos, construimos y cuidamos lo que es importante para ti.</p></div>
    <div className="footer-grid">
      <div><Link href="/" className="corporate-brand"><Image src="/logo.png" alt="" width={80} height={80} /><span>Marco<br />Arquitectónico</span></Link><p>Arquitectura, construcción y mantenimiento.</p><a className="text-link" href="mailto:contacto@marcoarquitectonico.com">contacto@marcoarquitectonico.com</a></div>
      <nav aria-label="Servicios en el pie de página"><h3>Servicios</h3><Link href="/servicios/construccion">Construcción</Link><Link href="/servicios/mantenimiento">Mantenimiento</Link><Link href="/servicios/servicios-profesionales">Servicios profesionales</Link><Link href="/quienes-somos">Quiénes somos</Link></nav>
      <div><h3>Encuéntranos en Bogotá</h3><p>Cra. 16a #78-75, Bogotá, Colombia</p><iframe title="Ubicación de Marco Arquitectónico" src="https://www.google.com/maps?q=Cra.+16a+%2378-75,+Bogot%C3%A1,+Colombia&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Cra.+16a+%2378-75%2C+Bogot%C3%A1" target="_blank" rel="noopener noreferrer">Cómo llegar ↗</a></div>
    </div><div className="footer-credits"><p>© 2026 Marco Arquitectónico. Todos los derechos reservados.</p><a href="https://nexaorigin.com/" target="_blank" rel="noopener noreferrer">Diseño y desarrollo: Nexa Digital Studio</a></div>
  </div></footer>;
}
