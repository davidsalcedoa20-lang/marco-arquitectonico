import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const MAX_SIZE = 15 * 1024 * 1024;

async function getAuthorizedClient() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Debes iniciar sesión.", status: 401 } as const;
  const { data: admin } = await supabase.from("site_admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) return { error: "Esta cuenta no tiene permisos de administración.", status: 403 } as const;
  return { supabase, user } as const;
}

function refreshSite() {
  revalidateTag("site-media");
  revalidatePath("/", "page");
}

export async function POST(request: Request) {
  const auth = await getAuthorizedClient();
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const form = await request.formData();
  const assetKey = String(form.get("assetKey") || "");
  const altText = String(form.get("altText") || "").trim();
  const fileValue = form.get("file");
  const file = fileValue instanceof File && fileValue.size ? fileValue : null;
  if (!assetKey || !altText) return NextResponse.json({ error: "Faltan datos de la imagen." }, { status: 400 });
  if (file && (!ALLOWED_TYPES.has(file.type) || file.size > MAX_SIZE)) return NextResponse.json({ error: "Usa una imagen JPG, PNG, WebP o AVIF de máximo 15 MB." }, { status: 400 });

  const { data: previous, error: lookupError } = await auth.supabase.from("site_media_assets").select("*").eq("asset_key", assetKey).single();
  if (lookupError || !previous) return NextResponse.json({ error: "La imagen seleccionada no existe." }, { status: 404 });

  let currentUrl = previous.current_url as string | null;
  let storagePath = previous.storage_path as string | null;
  if (file) {
    const extension = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "webp";
    const nextPath = `${assetKey}/${Date.now()}.${extension}`;
    const { error: uploadError } = await auth.supabase.storage.from("site-media").upload(nextPath, file, { cacheControl: "31536000", upsert: false, contentType: file.type });
    if (uploadError) return NextResponse.json({ error: `No fue posible subir la imagen: ${uploadError.message}` }, { status: 400 });
    currentUrl = auth.supabase.storage.from("site-media").getPublicUrl(nextPath).data.publicUrl;
    storagePath = nextPath;
  }

  const { data: asset, error: updateError } = await auth.supabase.from("site_media_assets").update({ alt_text: altText, current_url: currentUrl, storage_path: storagePath, updated_by: auth.user.id, updated_at: new Date().toISOString() }).eq("asset_key", assetKey).select().single();
  if (updateError) {
    if (file && storagePath) await auth.supabase.storage.from("site-media").remove([storagePath]);
    return NextResponse.json({ error: `No fue posible publicar: ${updateError.message}` }, { status: 400 });
  }
  if (file && previous.storage_path && previous.storage_path !== storagePath) await auth.supabase.storage.from("site-media").remove([previous.storage_path]);
  refreshSite();
  return NextResponse.json({ asset });
}

export async function DELETE(request: Request) {
  const auth = await getAuthorizedClient();
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const { assetKey } = await request.json() as { assetKey?: string };
  if (!assetKey) return NextResponse.json({ error: "Falta identificar la imagen." }, { status: 400 });
  const { data: previous } = await auth.supabase.from("site_media_assets").select("storage_path").eq("asset_key", assetKey).single();
  const { data: asset, error } = await auth.supabase.from("site_media_assets").update({ current_url: null, storage_path: null, updated_by: auth.user.id, updated_at: new Date().toISOString() }).eq("asset_key", assetKey).select().single();
  if (error) return NextResponse.json({ error: `No fue posible restaurar: ${error.message}` }, { status: 400 });
  if (previous?.storage_path) await auth.supabase.storage.from("site-media").remove([previous.storage_path]);
  refreshSite();
  return NextResponse.json({ asset });
}
