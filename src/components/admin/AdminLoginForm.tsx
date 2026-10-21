"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setMessage("No fue posible iniciar sesión. Revisa el correo y la contraseña."); setBusy(false); return; }
    window.location.assign("/admin");
  }

  return <section className="admin-login-card">
    <div className="admin-brand-mark">M</div>
    <p className="admin-eyebrow">Marco Arquitectónico</p>
    <h1>Acceso al panel</h1>
    <p>Gestiona de forma segura el contenido y las imágenes del sitio.</p>
    <form onSubmit={submit}>
      <label>Correo electrónico<input name="email" type="email" required autoComplete="email" /></label>
      <label>Contraseña<input name="password" type="password" minLength={6} required autoComplete="current-password" /></label>
      {message && <p className="admin-form-message" role="status">{message}</p>}
      <button className="admin-primary-button" disabled={busy}>{busy ? "Procesando…" : "Ingresar"}</button>
    </form>
    <Link href="/">← Volver al sitio</Link>
  </section>;
}
