"use client";
import { createContext, useContext, type ReactNode } from "react";
import { defaultSiteContent, type SiteContent } from "@/lib/siteContent";

const SiteContentContext = createContext<SiteContent>(defaultSiteContent);
export function SiteContentProvider({ content, children }: { content: SiteContent; children: ReactNode }) { return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>; }
export function useSiteContent() { return useContext(SiteContentContext); }
