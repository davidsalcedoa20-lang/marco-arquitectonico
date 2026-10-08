import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import "../admin.css";

export const metadata: Metadata = { title: "Acceso administrativo", robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  return <main className="admin-login-shell"><AdminLoginForm /></main>;
}
