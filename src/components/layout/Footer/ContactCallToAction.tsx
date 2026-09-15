import { getWhatsAppUrl } from "@/lib/whatsapp";

export function ContactCallToAction() {
  return <section className="client-contact-cta" aria-labelledby="contact-cta-title">
    <span className="contact-cta-eyebrow">Estamos para ayudarte</span>
    <h3 id="contact-cta-title">Cuéntanos qué necesitas. Juntos damos el primer paso.</h3>
    <p>Ya sea construir, renovar o cuidar tu inmueble, queremos escuchar tu idea y ayudarte a encontrar la mejor solución.</p>
    <a href={getWhatsAppUrl("Hola, Marco Arquitectónico. Quiero conversar con un asesor sobre mi proyecto.")} target="_blank" rel="noopener noreferrer">
      Conversemos por WhatsApp con un asesor <span aria-hidden="true">↗</span>
    </a>
  </section>;
}

