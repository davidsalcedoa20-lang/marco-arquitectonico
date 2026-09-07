"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCotizar } from "@/components/cotizar/CotizarProvider";
const LINKS = [{ href: "/", label: "Inicio" }, { href: "/quienes-somos", label: "Quiénes somos" }, { href: "/servicios", label: "Servicios" }];
export function Header() {
  const pathname = usePathname();
  const { open } = useCotizar();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return <header className="corporate-header">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="corporate-header-inner">
      <Link href="/" className="corporate-brand" onClick={() => setMenuOpen(false)} aria-label="Marco Arquitectónico, inicio"><Image src="/logo.png" alt="" width={80} height={80} priority /><span>Marco<br />Arquitectónico</span></Link>
      <nav className="desktop-nav" aria-label="Navegación principal">{LINKS.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href || (link.href === "/servicios" && pathname.startsWith("/servicios/")) ? "page" : undefined}>{link.label}</Link>)}</nav>
      <div className="header-actions"><button type="button" className="primary-button" onClick={() => { setMenuOpen(false); open(); }}><span className="desktop-quote">Cotizar proyecto</span><span className="mobile-quote">Cotizar</span></button><button type="button" className="menu-toggle" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(value => !value)}>{menuOpen ? "×" : "☰"}</button></div>
    </div>
    {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil">{LINKS.map(link => <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} aria-current={pathname === link.href ? "page" : undefined}>{link.label}</Link>)}</nav>}
  </header>;
}
