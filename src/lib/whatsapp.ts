export const WHATSAPP_PHONE = "573187993331";

export const WHATSAPP_DEFAULT_MESSAGE = `Hola, Marco Arquitectónico.

Me gustaría recibir asesoría para mi proyecto.

Quisiera conocer más información sobre sus servicios.`;

export function getWhatsAppUrl(message = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
