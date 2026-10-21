import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useSiteContent } from "@/components/content/SiteContentProvider";

export function ContactCallToAction() {
  const { contact } = useSiteContent();
  return <section className="client-contact-cta" aria-labelledby="contact-cta-title">
    <span className="contact-cta-eyebrow">{contact.eyebrow}</span>
    <h3 id="contact-cta-title">{contact.ctaTitle}</h3>
    <p>{contact.ctaText}</p>
    <a href={getWhatsAppUrl(contact.whatsappMessage, contact.whatsapp)} target="_blank" rel="noopener noreferrer">
      {contact.ctaButton} <span aria-hidden="true">↗</span>
    </a>
  </section>;
}

