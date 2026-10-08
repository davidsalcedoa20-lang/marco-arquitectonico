"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function AdminLoginForm() {
  const [mode, setMode] = useState<"login" | "setup">("login");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true); setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const setupToken = String(form.get("setupToken") || "").trim();
    const supabase = createClient();

    if (mode === "setup") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) { setMessage(error.message); setBusy(false); return; }
      if (!data.session) {
        setMessage("Revisa tu correo, confirma la cuenta y luego inicia sesión usando también el código de activación.");
        setBusy(false); return;
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setMessage("No fue posible iniciar sesión. Revisa el correo y la contraseña."); setBusy(false); return; }
    }

    if (setupToken) {
      const { error } = await supabase.rpc("claim_site_admin", { bootstrap_token: setupToken });
      if (error) { setMessage("El código de activación no es válido o el administrador ya fue configurado."); setBusy(false); return; }
    }
    window.location.assign("/admin");
  }

  return <section className="admin-login-card">
    <div className="admin-brand-mark">M</div>
    <p className="admin-eyebrow">Marco Arquitectónico</p>
    <h1>{mode === "login" ? "Acceso al panel" : "Activar administrador"}</h1>
    <p>Gestiona de forma segura todas las imágenes publicadas en el sitio.</p>
    <form onSubmit={submit}>
      <label>Correo electrónico<input name="email" type="email" required autoComplete="email" /></label>
      <label>Contraseña<input name="password" type="password" minLength={8} required autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>
      {mode === "setup" && <label>Código de activación<input name="setupToken" type="text" required autoComplete="off" /></label>}
      {mode === "login" && <label className="admin-optional-token">Código de activación <span>(solo para el primer acceso)</span><input name="setupToken" type="text" autoComplete="off" /></label>}
      {message && <p className="admin-form-message" role="status">{message}</p>}
      <button className="admin-primary-button" disabled={busy}>{busy ? "Procesando…" : mode === "login" ? "Ingresar" : "Crear cuenta administradora"}</button>
    </form>
    <button className="admin-text-button" onClick={() => { setMessage(""); setMode(mode === "login" ? "setup" : "login"); }}>
      {mode === "login" ? "Configurar el primer administrador" : "Ya tengo una cuenta"}
    </button>
    <Link href="/">← Volver al sitio</Link>
  </section>;
}
