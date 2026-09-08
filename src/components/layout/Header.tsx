"use client";
import { BrandLogo } from "@/components/layout/BrandLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
const LINKS = [{ href: "/#inicio", label: "Inicio" }, { href: "/#servicios", label: "Servicios" }, { href: "/#clientes", label: "Clientes" }, { href: "/#contacto", label: "Contacto" }];
export function Header() {
  const pathname = usePathname();
  const open = () => { window.location.href = getWhatsAppUrl(); };
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <header className="corporate-header">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="corporate-header-inner">
      <Link href="/" className="corporate-brand" onClick={() => setMenuOpen(false)} aria-label="Marco Arquitectónico, inicio"><BrandLogo priority /></Link>
      <nav className="desktop-nav" aria-label="Navegación principal">{LINKS.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href || (link.href === "/servicios" && pathname.startsWith("/servicios/")) ? "page" : undefined}>{link.label}</Link>)}</nav>
      <div className="header-actions"><button type="button" className="primary-button whatsapp-button" aria-label="Cotizar proyecto por WhatsApp" onClick={() => { setMenuOpen(false); open(); }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.1-4.4A8.5 8.5 0 1 1 20 11.5Z"/><path d="M8 7.5c0 4.4 4 8.2 8 8l1-2.3-2.7-1-1 1c-1.8-.7-2.7-1.6-3.4-3.4l1-1L10 6.5Z"/></svg><span className="desktop-quote">WhatsApp</span></button><button type="button" className="menu-toggle" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? "×" : "☰"}</button></div>
    </div>
    {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil">{LINKS.map(link => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>}
  </header>;
}
