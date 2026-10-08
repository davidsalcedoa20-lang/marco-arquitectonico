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
  if (!selected) return <main className="admin-empty">No hay imágenes configuradas.</main>;
  const selectedUrl = preview || selected.current_url || selected.default_url;

  return <main className="admin-shell">
    <aside className="admin-sidebar">
      <div><div className="admin-brand-mark">M</div><strong>Marco Arquitectónico</strong><span>Panel administrativo</span></div>
      <nav><a className="is-active" href="#imagenes">▧ Imágenes</a><Link href="/" target="_blank">↗ Ver sitio</Link></nav>
      <div className="admin-account"><span>{email}</span><button onClick={logout}>Cerrar sesión</button></div>
    </aside>
    <section className="admin-content" id="imagenes">
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
    </section>
  </main>;
}
