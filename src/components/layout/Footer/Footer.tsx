import { ContactCallToAction } from "./ContactCallToAction";

const mapUrl = "https://www.google.com/maps/search/?api=1&query=Carrera+18+78-74+Bogota";

export function Footer() {
  return <footer id="contacto" className="corporate-footer">
    <div className="page-container">
      <div className="footer-heading"><h2>Buscamos ser tu aliado, porque tú formas parte de nuestro legado.</h2></div>
      <div className="client-contact-layout">
        <address className="client-contact">
          <h3>Contacto</h3>
          <dl>
            <dt>Dirección</dt><dd><a href={mapUrl} target="_blank" rel="noopener noreferrer">Carrera 18 # 78-74, Bogotá</a></dd>
            <dt>Email</dt><dd><a href="mailto:mercadeo.arquitectonico@gmail.com">mercadeo.arquitectonico@gmail.com</a></dd>
            <dt>Celular</dt><dd><a href="tel:+573187993331">+57 318 799 3331</a></dd>
            <dt>Formas de pago</dt><dd>Efectivo, tarjeta de crédito y débito, transferencia, financiación, consignación.</dd>
          </dl>
        </address>
        <ContactCallToAction />
      </div>
    </div>
    <p className="client-final-promise">Protege y <span>garantiza</span> tu <span>patrimonio.</span></p>
    <iframe className="client-map" title="Ubicación: Carrera 18 # 78-74, Bogotá" src="https://maps.google.com/maps?q=Carrera%2018%20%2378-74%2C%20Bogota%2C%20Colombia&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
    <a className="client-map-link" href={mapUrl} target="_blank" rel="noopener noreferrer">Ver ubicación en Google Maps ↗</a>
    <div className="footer-credits"><p>© {new Date().getFullYear()} Marco Arquitectónico.</p><a href="https://nexaorigin.com/" target="_blank" rel="noopener noreferrer">Diseño y desarrollo: Nexa Digital Studio</a></div>
  </footer>;
}
