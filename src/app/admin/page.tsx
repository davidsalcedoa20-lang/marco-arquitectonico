import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminDashboard, type AdminMediaAsset } from "@/components/admin/AdminDashboard";
import type { SiteContentRow } from "@/lib/siteContent";
import "./admin.css";

export const metadata: Metadata = { title: "Gestor de contenido", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: admin } = await supabase.from("site_admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) redirect("/admin/login?unauthorized=1");

  const [{ data, error }, { data: content, error: contentError }] = await Promise.all([
    supabase.from("site_media_assets").select("*").order("section").order("sort_order"),
    supabase.from("site_content").select("*").order("sort_order"),
  ]);
  if (error) throw new Error(`No fue posible cargar las imágenes: ${error.message}`);
  if (contentError) throw new Error(`No fue posible cargar el contenido: ${contentError.message}`);
  return <AdminDashboard initialAssets={(data ?? []) as AdminMediaAsset[]} initialContent={(content ?? []) as SiteContentRow[]} email={user.email ?? "Administrador"} />;
}
