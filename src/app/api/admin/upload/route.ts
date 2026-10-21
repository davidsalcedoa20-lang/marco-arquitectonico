import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const MAX_SIZE = 15 * 1024 * 1024;

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Debes iniciar sesión." }, { status: 401 });
  const { data: admin } = await supabase.from("site_admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) return NextResponse.json({ error: "Esta cuenta no tiene permisos." }, { status: 403 });
  const form = await request.formData(); const value = form.get("file");
  if (!(value instanceof File) || !value.size) return NextResponse.json({ error: "Selecciona una imagen." }, { status: 400 });
  if (!TYPES.has(value.type) || value.size > MAX_SIZE) return NextResponse.json({ error: "Usa JPG, PNG, WebP o AVIF de máximo 15 MB." }, { status: 400 });
  const extension = value.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "webp";
  const path = `content/${user.id}/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("site-media").upload(path, value, { cacheControl: "31536000", contentType: value.type, upsert: false });
  if (error) return NextResponse.json({ error: `No fue posible subir la imagen: ${error.message}` }, { status: 400 });
  return NextResponse.json({ url: supabase.storage.from("site-media").getPublicUrl(path).data.publicUrl });
}
