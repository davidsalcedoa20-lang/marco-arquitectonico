"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
const CotizarContext = createContext<{ open: () => void; close: () => void } | null>(null);
export function useCotizar() {
  const context = useContext(CotizarContext);
  if (!context) throw new Error("useCotizar must be used within CotizarProvider");
  return context;
}
export function CotizarProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  useEffect(() => {
    if (!isOpen) { dialog.current?.close(); return; }
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);
  return <CotizarContext.Provider value={{ open, close }}>{children}
    <dialog ref={dialog} className="quote-dialog" aria-labelledby="quote-title" aria-describedby="quote-description" onCancel={close} onClose={close} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="quote-content"><button type="button" className="quote-close" onClick={close} aria-label="Cerrar cotización">×</button><p className="section-label">Cotizar proyecto</p><h2 id="quote-title">El primer paso para hacerlo realidad.</h2><p id="quote-description">Cuéntanos qué necesitas construir, diseñar o mantener. Continúa a WhatsApp para compartir tu idea con nuestro equipo.</p><a className="primary-button" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" onClick={close}>Continuar a WhatsApp <span aria-hidden>↗</span></a></div>
    </dialog>
  </CotizarContext.Provider>;
}
