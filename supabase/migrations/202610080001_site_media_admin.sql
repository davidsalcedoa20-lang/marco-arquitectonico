create extension if not exists pgcrypto with schema extensions;
create schema if not exists private;

create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.site_media_assets (
  asset_key text primary key,
  section text not null,
  label text not null,
  alt_text text not null,
  default_url text not null unique,
  current_url text,
  storage_path text,
  sort_order integer not null default 0,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create table if not exists public.site_media_history (
  id bigint generated always as identity primary key,
  asset_key text not null,
  previous_url text,
  next_url text,
  changed_by uuid references auth.users(id) on delete set null,
  changed_at timestamptz not null default now()
);

create table if not exists private.admin_bootstrap (
  token_hash text primary key,
  created_at timestamptz not null default now()
);

insert into private.admin_bootstrap(token_hash)
values ('4c2fdd89a29c0d28eaf2bafa9636f1a081e09731acc203a1118e78a12ed9f840')
on conflict do nothing;

create or replace function private.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists(select 1 from public.site_admins where user_id = (select auth.uid()));
$$;

revoke all on function private.is_site_admin() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_site_admin() to authenticated;

create or replace function public.claim_site_admin(bootstrap_token text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare expected_hash text;
begin
  if (select auth.uid()) is null then raise exception 'authentication required'; end if;
  if exists(select 1 from public.site_admins) then return false; end if;
  select token_hash into expected_hash from private.admin_bootstrap limit 1;
  if expected_hash is null or expected_hash <> pg_catalog.encode(extensions.digest(pg_catalog.convert_to(bootstrap_token, 'UTF8'), 'sha256'), 'hex') then return false; end if;
  insert into public.site_admins(user_id, email) values ((select auth.uid()), coalesce((select auth.jwt()->>'email'), 'administrador'));
  delete from private.admin_bootstrap;
  return true;
end;
$$;

revoke all on function public.claim_site_admin(text) from public, anon;
grant execute on function public.claim_site_admin(text) to authenticated;

create or replace function private.record_media_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if old.current_url is distinct from new.current_url then
    insert into public.site_media_history(asset_key, previous_url, next_url, changed_by)
    values (new.asset_key, old.current_url, new.current_url, (select auth.uid()));
  end if;
  return new;
end;
$$;

drop trigger if exists record_site_media_change on public.site_media_assets;
create trigger record_site_media_change after update on public.site_media_assets
for each row execute function private.record_media_change();

alter table public.site_admins enable row level security;
alter table public.site_media_assets enable row level security;
alter table public.site_media_history enable row level security;

drop policy if exists "Admins read own membership" on public.site_admins;
create policy "Admins read own membership" on public.site_admins for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Public reads media" on public.site_media_assets;
create policy "Public reads media" on public.site_media_assets for select to anon, authenticated using (true);
drop policy if exists "Admins insert media" on public.site_media_assets;
create policy "Admins insert media" on public.site_media_assets for insert to authenticated with check ((select private.is_site_admin()));
drop policy if exists "Admins update media" on public.site_media_assets;
create policy "Admins update media" on public.site_media_assets for update to authenticated using ((select private.is_site_admin())) with check ((select private.is_site_admin()));
drop policy if exists "Admins delete media" on public.site_media_assets;
create policy "Admins delete media" on public.site_media_assets for delete to authenticated using ((select private.is_site_admin()));
drop policy if exists "Admins read history" on public.site_media_history;
create policy "Admins read history" on public.site_media_history for select to authenticated using ((select private.is_site_admin()));

grant select on public.site_media_assets to anon, authenticated;
grant insert, update, delete on public.site_media_assets to authenticated;
grant select on public.site_admins to authenticated;
grant select on public.site_media_history to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-media', 'site-media', true, 15728640, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public reads site media" on storage.objects;
create policy "Public reads site media" on storage.objects for select to anon, authenticated using (bucket_id = 'site-media');
drop policy if exists "Admins upload site media" on storage.objects;
create policy "Admins upload site media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and (select private.is_site_admin()));
drop policy if exists "Admins update site media" on storage.objects;
create policy "Admins update site media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and (select private.is_site_admin())) with check (bucket_id = 'site-media' and (select private.is_site_admin()));
drop policy if exists "Admins delete site media" on storage.objects;
create policy "Admins delete site media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and (select private.is_site_admin()));

-- MEDIA_SEED_VALUES
insert into public.site_media_assets(asset_key, section, label, alt_text, default_url, sort_order) values
('marca-logo-principal','Marca','Logotipo principal','Marco Arquitectónico S.A.S.','/brand/marco-arquitectonico-completo.jpeg','0'),
('inicio-bienvenida','Inicio','Portada de bienvenida','Bienvenidos a Marco Arquitectónico','/quienes_somos/cierre.webp','0'),
('inicio-construyendo-bienestar','Inicio','Construyendo tu bienestar','Proyecto de Marco Arquitectónico','/quienes_somos/hero.webp','1'),
('mantenimiento-mantenimiento-fachada-casco-reflejo','Mantenimiento','Mantenimiento de fachada','Mantenimiento de fachada','/assets/servicios/cliente/mantenimiento-fachada-casco-reflejo.webp','0'),
('mantenimiento-mantenimiento-cubierta-casco','Mantenimiento','Mantenimiento de cubierta','Mantenimiento de cubierta','/assets/servicios/cliente/mantenimiento-cubierta-casco.webp','1'),
('mantenimiento-mantenimiento-impermeabilizacion-fachada','Mantenimiento','Impermeabilización de fachada','Impermeabilización de fachada','/assets/servicios/cliente/mantenimiento-impermeabilizacion-fachada.webp','2'),
('mantenimiento-mantenimiento-cubierta-aeropuerto','Mantenimiento','Mantenimiento de cubierta de aeropuerto','Mantenimiento de cubierta de aeropuerto','/assets/servicios/cliente/mantenimiento-cubierta-aeropuerto.webp','3'),
('mantenimiento-mantenimiento-sendero-peatonal','Mantenimiento','Mantenimiento de sendero peatonal','Mantenimiento de sendero peatonal','/assets/servicios/cliente/mantenimiento-sendero-peatonal.webp','4'),
('mantenimiento-mantenimiento-terrazas-cubiertas','Mantenimiento','Impermeabilización de terrazas','Impermeabilización de terrazas','/assets/servicios/cliente/mantenimiento-terrazas-cubiertas.webp','5'),
('mantenimiento-mantenimiento-fachada-altura','Mantenimiento','Mantenimiento de fachada en altura','Mantenimiento de fachada en altura','/assets/servicios/cliente/mantenimiento-fachada-altura.webp','6'),
('mantenimiento-mantenimiento-cubierta-fibrocemento','Mantenimiento','Mantenimiento de cubierta de fibrocemento','Mantenimiento de cubierta de fibrocemento','/assets/servicios/cliente/mantenimiento-cubierta-fibrocemento.webp','7'),
('construccion-construccion-bodega','Construcción','Construcción de bodega','Construcción de bodega','/assets/servicios/cliente/construccion-bodega.webp','8'),
('construccion-construccion-casa-campestre','Construcción','Construcción de casa campestre','Construcción de casa campestre','/assets/servicios/cliente/construccion-casa-campestre.webp','9'),
('construccion-construccion-cubierta-deportiva','Construcción','Construcción de cubierta deportiva','Construcción de cubierta deportiva','/assets/servicios/cliente/construccion-cubierta-deportiva.webp','10'),
('construccion-construccion-plaza-comercial','Construcción','Construcción de plaza comercial','Construcción de plaza comercial','/assets/servicios/cliente/construccion-plaza-comercial.webp','11'),
('construccion-construccion-pergola-madera','Construcción','Construcción de pérgola en madera','Construcción de pérgola en madera','/assets/servicios/cliente/construccion-pergola-madera.webp','12'),
('construccion-construccion-estructura-mezanine','Construcción','Construcción de estructura y mezanine','Construcción de estructura y mezanine','/assets/servicios/cliente/construccion-estructura-mezanine.webp','13'),
('construccion-construccion-oficina-minimalista','Construcción','Remodelación de oficina','Remodelación de oficina','/assets/servicios/cliente/construccion-oficina-minimalista.webp','14'),
('construccion-construccion-fachada-alucobond','Construcción','Construcción de fachada en Alucobond','Construcción de fachada en Alucobond','/assets/servicios/cliente/construccion-fachada-alucobond.webp','15'),
('servicios-profesionales-profesional-equipo','Servicios profesionales','Equipo de servicios profesionales','Equipo de servicios profesionales','/assets/servicios/cliente/profesional-equipo.webp','16'),
('servicios-profesionales-profesional-diseno-casa','Servicios profesionales','Diseño arquitectónico de casa','Diseño arquitectónico de casa','/assets/servicios/cliente/profesional-diseno-casa.webp','17'),
('servicios-profesionales-profesional-diseno-interior','Servicios profesionales','Diseño de interiores','Diseño de interiores','/assets/servicios/cliente/profesional-diseno-interior.webp','18'),
('servicios-profesionales-profesional-edificio','Servicios profesionales','Diseño de edificio','Diseño de edificio','/assets/servicios/cliente/profesional-edificio.webp','19'),
('servicios-profesionales-profesional-casa-campestre','Servicios profesionales','Diseño de casa campestre','Diseño de casa campestre','/assets/servicios/cliente/profesional-casa-campestre.webp','20'),
('servicios-profesionales-profesional-diseno-volumetrico','Servicios profesionales','Diseño volumétrico','Diseño volumétrico','/assets/servicios/cliente/profesional-diseno-volumetrico.webp','21'),
('servicios-profesionales-profesional-diseno-mobiliario','Servicios profesionales','Diseño de mobiliario','Diseño de mobiliario','/assets/servicios/cliente/profesional-diseno-mobiliario.webp','22'),
('servicios-profesionales-profesional-gerencia-obra','Servicios profesionales','Gerencia de obra','Gerencia de obra','/assets/servicios/cliente/profesional-gerencia-obra.webp','23'),
('cliente-01-cusezar','Clientes','cusezar','cusezar','/img-transparent/01_cusezar.png','0'),
('cliente-02-hotel-city-bog-106','Clientes','hotel city bog 106','hotel city bog 106','/img-transparent/02_hotel_city_bog_106.png','1'),
('cliente-03-embajada-finlandia','Clientes','embajada finlandia','embajada finlandia','/img-transparent/03_embajada_finlandia.png','2'),
('cliente-04-edificio-tierra-firme','Clientes','edificio tierra firme','edificio tierra firme','/img-transparent/04_edificio_tierra_firme.png','3'),
('cliente-05-paloquemao','Clientes','paloquemao','paloquemao','/img-transparent/05_paloquemao.png','4'),
('cliente-06-pintuco','Clientes','pintuco','pintuco','/img-transparent/06_pintuco.png','5'),
('cliente-07-prosperidad-social','Clientes','prosperidad social','prosperidad social','/img-transparent/07_prosperidad_social.png','6'),
('cliente-08-embajada-polonia','Clientes','embajada polonia','embajada polonia','/img-transparent/08_embajada_polonia.png','7'),
('cliente-09-byd','Clientes','byd','byd','/img-transparent/09_byd.png','8'),
('cliente-10-industrias-argos','Clientes','industrias argos','industrias argos','/img-transparent/10_industrias_argos.png','9'),
('cliente-11-bulevar-42','Clientes','bulevar 42','bulevar 42','/img-transparent/11_bulevar_42.png','10'),
('cliente-12-artecma','Clientes','artecma','artecma','/img-transparent/12_artecma.png','11'),
('cliente-13-cafam','Clientes','cafam','cafam','/img-transparent/13_cafam.png','12'),
('cliente-14-argos','Clientes','argos','argos','/img-transparent/14_argos.png','13'),
('cliente-15-sika','Clientes','sika','sika','/img-transparent/15_sika.png','14'),
('cliente-16-cosechas','Clientes','cosechas','cosechas','/img-transparent/16_cosechas.png','15'),
('cliente-17-abril-constructora','Clientes','abril constructora','abril constructora','/img-transparent/17_abril_constructora.png','16'),
('cliente-18-sodimac-homecenter','Clientes','sodimac homecenter','sodimac homecenter','/img-transparent/18_sodimac_homecenter.png','17')
on conflict (asset_key) do update set section=excluded.section, label=excluded.label, default_url=excluded.default_url, sort_order=excluded.sort_order;
