import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const KEYS = new Set(["home.copy","home.hero","contact.info","site.settings","site.seo","site.navigation","services.items","clients.items","projects.items"]);

async function authorize() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Debes iniciar sesión.", status: 401 } as const;
  const { data: admin } = await supabase.from("site_admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) return { error: "Esta cuenta no tiene permisos.", status: 403 } as const;
  return { supabase, user } as const;
}

function safeUrl(value: unknown) { return typeof value === "string" && (!value || value.startsWith("/") || /^https:\/\//i.test(value)); }
function safeImage(value: unknown) { return typeof value === "string" && (value.startsWith("/") || /^https:\/\/fqcatwbqqzcdwjqmesrx\.supabase\.co\/storage\/v1\/object\/public\/site-media\//i.test(value)); }
function stringsAreSafe(value: unknown): boolean {
  if (typeof value === "string") return value.length <= 2500;
  if (Array.isArray(value)) return value.length <= 40 && value.every(stringsAreSafe);
  if (value && typeof value === "object") return Object.keys(value).length <= 30 && Object.values(value).every(stringsAreSafe);
  return ["number", "boolean"].includes(typeof value) || value === null;
}

function validate(key: string, value: unknown): string | null {
  if (!stringsAreSafe(value) || JSON.stringify(value).length > 100000) return "El contenido supera los límites permitidos.";
  if (key === "home.hero") {
    if (!Array.isArray(value) || value.length < 1 || value.length > 10) return "El carrusel debe tener entre 1 y 10 imágenes.";
    if (value.some((item) => !item?.title || !safeImage(item.image))) return "Completa el título y sube una imagen válida en cada diapositiva.";
  }
  if (key === "site.settings") {
    const seconds = Number((value as { carouselSeconds?: number })?.carouselSeconds);
    if (seconds < 2 || seconds > 5) return "El carrusel debe avanzar entre 2 y 5 segundos.";
  }
  if (key === "site.seo") {
    const seo = value as { title?: string; description?: string; shareImage?: string };
    if (!seo.title || seo.title.length > 65 || !seo.description || seo.description.length > 160 || !safeImage(seo.shareImage)) return "El título SEO admite 65 caracteres y la descripción 160.";
  }
  if (key === "contact.info") {
    const contact = value as { email?: string; whatsapp?: string; instagram?: string; facebook?: string; linkedin?: string };
    if (!/^\S+@\S+\.\S+$/.test(contact.email || "")) return "Escribe un correo válido.";
    if (!/^\d{7,15}$/.test((contact.whatsapp || "").replace(/\D/g, ""))) return "Escribe un número de WhatsApp válido.";
    if (![contact.instagram, contact.facebook, contact.linkedin].every(safeUrl)) return "Las redes sociales deben usar enlaces HTTPS.";
  }
  if (key === "services.items") {
    if (!Array.isArray(value) || value.length > 12 || value.some((item) => !/^[a-z0-9-]+$/.test(item?.id || "") || !item?.title || !Array.isArray(item?.paragraphs) || (item?.images && (!Array.isArray(item.images) || item.images.some((image: unknown) => !safeImage(image)))) || (item?.galleryImages && (!Array.isArray(item.galleryImages) || item.galleryImages.some((image: unknown) => !safeImage(image)))))) return "Revisa los servicios: máximo 12 y usa imágenes válidas.";
  }
  if (key === "clients.items") {
    if (!Array.isArray(value) || value.length > 40 || value.some((item) => !item?.name || !safeImage(item?.logo) || !safeUrl(item?.url))) return "Revisa los clientes: máximo 40 y sube imágenes válidas.";
  }
  if (key === "projects.items") {
    if (!Array.isArray(value) || value.length > 30 || value.some((item) => !item?.id || !item?.title || !safeImage(item?.image))) return "Revisa los proyectos: máximo 30 y todos necesitan nombre e imagen válida.";
  }
  return null;
}

function refresh() { revalidateTag("site-content"); revalidatePath("/", "page"); revalidatePath("/", "layout"); }

export async function POST(request: Request) {
  const auth = await authorize();
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { contentKey, value, restore } = await request.json() as { contentKey?: string; value?: unknown; restore?: boolean };
  if (!contentKey || !KEYS.has(contentKey)) return NextResponse.json({ error: "Sección no válida." }, { status: 400 });
  const { data: current, error: currentError } = await auth.supabase.from("site_content").select("*").eq("content_key", contentKey).single();
  if (currentError || !current) return NextResponse.json({ error: "No se encontró la sección." }, { status: 404 });
  const nextValue = restore ? current.default_value : value;
  const validationError = validate(contentKey, nextValue);
  if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });
  const { error: historyError } = await auth.supabase.from("site_content_history").insert({ content_key: contentKey, previous_value: current.value, changed_by: auth.user.id });
  if (historyError) return NextResponse.json({ error: `No fue posible guardar el historial: ${historyError.message}` }, { status: 400 });
  const { data, error } = await auth.supabase.from("site_content").update({ value: nextValue, updated_by: auth.user.id, updated_at: new Date().toISOString() }).eq("content_key", contentKey).select().single();
  if (error) return NextResponse.json({ error: `No fue posible publicar: ${error.message}` }, { status: 400 });
  refresh();
  return NextResponse.json({ row: data });
}
