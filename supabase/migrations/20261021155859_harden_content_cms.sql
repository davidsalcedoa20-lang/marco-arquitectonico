create index if not exists site_content_updated_by_idx on public.site_content(updated_by);

-- The first administrator is already active. Remove the one-time bootstrap RPC
-- so no privileged setup function remains exposed through the Data API.
drop function if exists public.claim_site_admin(text);
delete from private.admin_bootstrap;
