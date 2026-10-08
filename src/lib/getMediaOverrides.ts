export type MediaOverrideMap = Record<string, string>;

export async function getMediaOverrides(): Promise<MediaOverrideMap> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return {};

  try {
    const response = await fetch(
      `${url}/rest/v1/site_media_assets?select=default_url,current_url&current_url=not.is.null`,
      {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
        next: { revalidate: 60, tags: ["site-media"] },
      },
    );
    if (!response.ok) return {};
    const rows = await response.json() as Array<{ default_url: string; current_url: string | null }>;
    return Object.fromEntries(rows.filter((row) => row.current_url).map((row) => [row.default_url, row.current_url!]))
  } catch {
    return {};
  }
}
