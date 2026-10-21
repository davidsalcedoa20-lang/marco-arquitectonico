import { contentKeyMap, defaultSiteContent, type SiteContent, type SiteContentRow } from "@/lib/siteContent";

export async function getSiteContent(): Promise<SiteContent> {
  const result: SiteContent = structuredClone(defaultSiteContent);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return result;
  try {
    const response = await fetch(`${url}/rest/v1/site_content?select=content_key,value`, { headers: { apikey: key, Authorization: `Bearer ${key}` }, next: { revalidate: 60, tags: ["site-content"] } });
    if (!response.ok) return result;
    const rows = await response.json() as Array<Pick<SiteContentRow, "content_key" | "value">>;
    for (const row of rows) {
      const property = contentKeyMap[row.content_key];
      if (property && row.value !== null) (result as unknown as Record<string, unknown>)[property] = row.value;
    }
  } catch { return result; }
  return result;
}
