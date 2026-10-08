"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CotizarProvider } from "@/components/cotizar/CotizarProvider";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return <>{children}</>;

  return (
    <SmoothScroll>
      <CotizarProvider>
        <Header />
        {children}
        <Footer />
      </CotizarProvider>
    </SmoothScroll>
  );
}
