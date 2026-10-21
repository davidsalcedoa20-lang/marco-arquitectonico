import { ContactCallToAction } from "./ContactCallToAction";
import { useSiteContent } from "@/components/content/SiteContentProvider";

export function Footer() {
  const { contact, homeCopy, settings } = useSiteContent();
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;
  const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&z=16&output=embed`;
  return <footer id="contacto" className="corporate-footer">
    <div className="page-container">
      <div className="footer-heading"><h2>{contact.heading}</h2></div>
      <div className="client-contact-layout">
        <address className="client-contact">
          <h3>Contacto</h3>
          <dl>
            <dt>Dirección</dt><dd><a href={mapUrl} target="_blank" rel="noopener noreferrer">{contact.address}</a></dd>
            <dt>Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd>
            <dt>Celular</dt><dd><a href={`tel:${contact.phone.replace(/\s/g, "")}`}>{contact.phone}</a></dd>
            {contact.hours && <><dt>Horario</dt><dd>{contact.hours}</dd></>}
          </dl>
          {(contact.instagram || contact.facebook || contact.linkedin) && <div className="client-social-links">{contact.instagram && <a href={contact.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>}{contact.facebook && <a href={contact.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>}{contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>}</div>}
        </address>
        <ContactCallToAction />
      </div>
    </div>
    <p className="client-final-promise">{homeCopy.footerPromise}</p>
    {settings.showMap && <><iframe className="client-map" title={`Ubicación: ${contact.address}`} src={mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a className="client-map-link" href={mapUrl} target="_blank" rel="noopener noreferrer">Ver ubicación en Google Maps ↗</a></>}
    <div className="footer-credits"><p><a className="footer-admin-link" href="/admin/login">© {new Date().getFullYear()} Marco Arquitectónico.</a></p><a href="https://nexaorigin.com/" target="_blank" rel="noopener noreferrer">Diseño y desarrollo: Nexa Digital Studio</a></div>
  </footer>;
}
