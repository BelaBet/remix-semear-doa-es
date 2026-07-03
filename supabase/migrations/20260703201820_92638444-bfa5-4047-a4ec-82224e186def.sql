-- 1. Convert public views to security_invoker so they honor caller's RLS.
ALTER VIEW public.cost_centers_public       SET (security_invoker = true);
ALTER VIEW public.subscription_plans_public SET (security_invoker = true);
ALTER VIEW public.tenants_public            SET (security_invoker = true);

-- 2. Drop broad anon SELECT on cost_centers (exposed split percentages).
DROP POLICY IF EXISTS cost_centers_anon_public_select ON public.cost_centers;

-- 3. Narrow anon access via column-level GRANTs + tight RLS policies
--    so the *_public views keep working for unauthenticated visitors,
--    but sensitive columns are never reachable.

-- cost_centers: expose only safe columns to anon
REVOKE SELECT ON public.cost_centers FROM anon;
GRANT SELECT (id, tenant_id, name, slug, type, description, qr_code_url, display_order, is_active)
  ON public.cost_centers TO anon;
CREATE POLICY cost_centers_anon_active_read
  ON public.cost_centers FOR SELECT TO anon
  USING (is_active = true);

-- tenants: expose only public-safe columns to anon
REVOKE SELECT ON public.tenants FROM anon;
GRANT SELECT (id, name, slug, logo_url, primary_color, secondary_color, accent_color,
              custom_domain, tagline, cover_photo_url, active, deleted_at)
  ON public.tenants TO anon;
CREATE POLICY tenants_anon_public_read
  ON public.tenants FOR SELECT TO anon
  USING (deleted_at IS NULL AND active = true);

-- subscription_plans: expose only public catalog columns to anon
REVOKE SELECT ON public.subscription_plans FROM anon;
GRANT SELECT (id, code, name, monthly_price, sort_order, active)
  ON public.subscription_plans TO anon;
CREATE POLICY subscription_plans_anon_public_read
  ON public.subscription_plans FOR SELECT TO anon
  USING (active = true);

-- 4. Explicit SELECT policy on tenant_bank_account for clarity (matches ALL policy scope).
CREATE POLICY bank_staff_select
  ON public.tenant_bank_account FOR SELECT TO authenticated
  USING (public.is_tenant_staff(auth.uid(), tenant_id) OR public.is_platform_admin(auth.uid()));

-- 5. Revoke EXECUTE on SECURITY DEFINER helper functions from anon/authenticated.
--    RLS policies invoke these as part of the query and don't require EXECUTE grant.
REVOKE EXECUTE ON FUNCTION public.is_tenant_staff(uuid, uuid)                 FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_tenant_pix_key(uuid)                    FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.seed_tenant_pending_documents(uuid)         FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.current_tenant_id()                         FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_platform_admin(uuid)                     FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_platform_role(uuid, public.platform_role) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, uuid, public.app_role)       FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_email_registered(text)                   FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.recompute_tenant_compliance(uuid)           FROM anon, authenticated, PUBLIC;

-- 6. Prevent listing of public storage buckets. Public objects remain reachable
--    via their /object/public/... URLs because the bucket flag is public=true;
--    dropping the broad SELECT policies only blocks LIST/enumerate calls.
DROP POLICY IF EXISTS "Public read tenant logos"              ON storage.objects;
DROP POLICY IF EXISTS "Avatar images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS event_banners_public_read               ON storage.objects;