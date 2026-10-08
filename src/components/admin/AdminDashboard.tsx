"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export type AdminMediaAsset = {
  asset_key: string; section: string; label: string; alt_text: string;
  default_url: string; current_url: string | null; storage_path: string | null;
  sort_order: number; updated_at: string;
};

const sections = ["Todas", "Marca", "Inicio", "Mantenimiento", "Construcción", "Servicios profesionales", "Clientes"];

export function AdminDashboard({ initialAssets, email }: { initialAssets: AdminMediaAsset[]; email: string }) {
  const [view, setView] = useState<"images" | "settings">("images");
  const [accountEmail, setAccountEmail] = useState(email);
  const [accountNotice, setAccountNotice] = useState("");
  const [accountBusy, setAccountBusy] = useState(false);
  const [assets, setAssets] = useState(initialAssets);
  const [filter, setFilter] = useState("Todas");
  const [selectedKey, setSelectedKey] = useState(initialAssets[0]?.asset_key ?? "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [altText, setAltText] = useState(initialAssets[0]?.alt_text ?? "");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => filter === "Todas" ? assets : assets.filter((asset) => asset.section === filter), [assets, filter]);
  const selected = assets.find((asset) => asset.asset_key === selectedKey) ?? assets[0];

  function select(asset: AdminMediaAsset) {
    setSelectedKey(asset.asset_key); setAltText(asset.alt_text); setFile(null); setPreview(null); setNotice("");
  }

  function chooseFile(next: File | null) {
    if (preview) URL.revokeObjectURL(preview);
    setFile(next); setPreview(next ? URL.createObjectURL(next) : null);
  }

  async function publish(event: FormEvent) {
    event.preventDefault(); if (!selected) return;
    setBusy(true); setNotice("");
    const body = new FormData(); body.set("assetKey", selected.asset_key); body.set("altText", altText); if (file) body.set("file", file);
    const response = await fetch("/api/admin/media", { method: "POST", body });
    const result = await response.json();
    if (!response.ok) { setNotice(result.error || "No fue posible publicar el cambio."); setBusy(false); return; }
    setAssets((items) => items.map((item) => item.asset_key === result.asset.asset_key ? result.asset : item));
    setFile(null); setPreview(null); setNotice("Cambios publicados correctamente."); setBusy(false);
  }

  async function restore() {
    if (!selected || !window.confirm("¿Restaurar la imagen original de esta sección?")) return;
    setBusy(true); setNotice("");
    const response = await fetch("/api/admin/media", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ assetKey: selected.asset_key }) });
    const result = await response.json();
    if (!response.ok) { setNotice(result.error || "No fue posible restaurar la imagen."); setBusy(false); return; }
    setAssets((items) => items.map((item) => item.asset_key === result.asset.asset_key ? result.asset : item));
    setAltText(result.asset.alt_text); setFile(null); setPreview(null); setNotice("Imagen original restaurada."); setBusy(false);
  }

  async function logout() { await createClient().auth.signOut(); window.location.assign("/admin/login"); }

  async function updateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAccountBusy(true); setAccountNotice("");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const nextEmail = String(form.get("accountEmail") || "").trim();
    const nextPassword = String(form.get("accountPassword") || "");
    const attributes: { email?: string; password?: string } = {};
    if (nextEmail && nextEmail !== accountEmail) attributes.email = nextEmail;
    if (nextPassword) attributes.password = nextPassword;
    if (!attributes.email && !attributes.password) {
      setAccountNotice("No hay cambios para guardar."); setAccountBusy(false); return;
    }
    const { data, error } = await createClient().auth.updateUser(attributes, {
      emailRedirectTo: `${window.location.origin}/admin`,
    });
    if (error) {
      setAccountNotice(error.message); setAccountBusy(false); return;
    }
    if (data.user.email) setAccountEmail(data.user.email);
    formElement.reset();
    setAccountNotice(attributes.email
      ? "Cambio solicitado. Confirma el mensaje enviado al correo nuevo; la contraseña ya quedó actualizada si también la cambiaste."
      : "Contraseña actualizada correctamente.");
    setAccountBusy(false);
  }
  if (!selected) return <main className="admin-empty">No hay imágenes configuradas.</main>;
  const selectedUrl = preview || selected.current_url || selected.default_url;

  return <main className="admin-shell">
    <aside className="admin-sidebar">
      <div><div className="admin-brand-mark">M</div><strong>Marco Arquitectónico</strong><span>Panel administrativo</span></div>
      <nav><button className={view === "images" ? "is-active" : ""} onClick={() => setView("images")}>▧ Imágenes</button><button className={view === "settings" ? "is-active" : ""} onClick={() => setView("settings")}>⚙ Ajustes</button><Link href="/" target="_blank">↗ Ver sitio</Link></nav>
      <div className="admin-account"><span>{accountEmail}</span><button onClick={logout}>Cerrar sesión</button></div>
    </aside>
    {view === "images" ? <section className="admin-content" id="imagenes">
      <header><div><p className="admin-eyebrow">Contenido del sitio</p><h1>Gestión de imágenes</h1><p>Reemplaza cualquier imagen y publícala sin modificar código.</p></div><span className="admin-status">● Sitio publicado</span></header>
      <div className="admin-tabs" role="tablist">{sections.map((section) => <button key={section} className={filter === section ? "is-active" : ""} onClick={() => setFilter(section)}>{section}</button>)}</div>
      <div className="admin-workspace">
        <div className="admin-grid">{filtered.map((asset) => <button className={`admin-media-card${selected.asset_key === asset.asset_key ? " is-selected" : ""}`} key={asset.asset_key} onClick={() => select(asset)}>
          <span className="admin-card-image"><Image src={asset.current_url || asset.default_url} alt={asset.alt_text} fill sizes="260px" unoptimized={Boolean(asset.current_url)} /></span>
          <span className="admin-card-section">{asset.section}</span><strong>{asset.label}</strong><small>{asset.current_url ? "Imagen personalizada" : "Imagen original"}</small>
        </button>)}</div>
        <form className="admin-editor" onSubmit={publish}>
          <div className="admin-editor-heading"><div><p className="admin-eyebrow">Editar imagen</p><h2>{selected.label}</h2></div>{selected.current_url && <button type="button" className="admin-reset" onClick={restore}>Restaurar original</button>}</div>
          <div className="admin-preview"><Image src={selectedUrl} alt={altText} fill sizes="420px" unoptimized={Boolean(preview || selected.current_url)} /></div>
          <label className="admin-upload">Arrastra una imagen aquí o <span>selecciona un archivo</span><input type="file" accept="image/png,image/jpeg,image/webp,image/avif" onChange={(event) => chooseFile(event.target.files?.[0] ?? null)} /></label>
          <label>Texto alternativo<textarea value={altText} onChange={(event) => setAltText(event.target.value)} maxLength={160} required /></label>
          <div className="admin-quality">✓ Optimización automática <small>La imagen se adapta a cada pantalla.</small></div>
          {notice && <p className="admin-notice" role="status">{notice}</p>}
          <button className="admin-primary-button" disabled={busy || (!file && altText === selected.alt_text)}>{busy ? "Publicando…" : "Publicar cambios"}</button>
        </form>
      </div>
    </section> : <section className="admin-content" id="ajustes">
      <header><div><p className="admin-eyebrow">Seguridad de la cuenta</p><h1>Ajustes</h1><p>Cambia el acceso cuando entregues el panel al cliente.</p></div></header>
      <form className="admin-settings-card" onSubmit={updateAccount}>
        <div><h2>Datos de acceso</h2><p>Correo actual: <strong>{accountEmail}</strong></p></div>
        <label>Nuevo correo electrónico<input name="accountEmail" type="email" placeholder="correo@cliente.com" autoComplete="email" /></label>
        <label>Nueva contraseña<input name="accountPassword" type="password" minLength={6} placeholder="Mínimo 6 caracteres" autoComplete="new-password" /></label>
        <p className="admin-settings-help">Puedes cambiar solo uno de los dos datos. Al cambiar el correo, Supabase solicitará confirmarlo por seguridad.</p>
        {accountNotice && <p className="admin-notice" role="status">{accountNotice}</p>}
        <button className="admin-primary-button" disabled={accountBusy}>{accountBusy ? "Guardando…" : "Guardar cambios"}</button>
      </form>
    </section>}
  </main>;
}
