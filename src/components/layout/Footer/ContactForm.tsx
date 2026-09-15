"use client";

import type { FormEvent } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      "Hola, Marco Arquitectónico. Me gustaría recibir asesoría para mi proyecto.",
      `Nombre: ${String(data.get("name") ?? "").trim()}`,
      `Email: ${String(data.get("email") ?? "").trim()}`,
      `Teléfono: ${String(data.get("phone") ?? "").trim()}`,
      `Mensaje: ${String(data.get("message") ?? "").trim()}`,
    ].join("\n\n");
    window.location.assign(getWhatsAppUrl(message));
  }

  return <form className="client-contact-form" onSubmit={submit} aria-label="Consulta sobre tu proyecto">
    <label htmlFor="contact-name">Nombre<input id="contact-name" name="name" autoComplete="name" required maxLength={120} /></label>
    <label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200} /></label>
    <label htmlFor="contact-phone">Teléfono<input id="contact-phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} /></label>
    <label htmlFor="contact-message">Mensaje<textarea id="contact-message" name="message" required maxLength={2000} rows={4} /></label>
    <p>Al continuar, se abrirá WhatsApp con tu consulta lista para enviar.</p>
    <button type="submit">Continuar en WhatsApp ↗</button>
  </form>;
}
