
-- 1. Remove anonymous SELECT on tenants; anon must use tenants_public view instead
DROP POLICY IF EXISTS tenants_anon_public_read ON public.tenants;
REVOKE SELECT ON public.tenants FROM anon;

-- 2. Storage bucket SELECT policies (buckets are public by design)
DROP POLICY IF EXISTS "avatars_public_read" ON storage.objects;
CREATE POLICY "avatars_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

DROP POLICY IF EXISTS "tenant_logos_public_read" ON storage.objects;
CREATE POLICY "tenant_logos_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'tenant-logos');

DROP POLICY IF EXISTS "event_banners_public_read" ON storage.objects;
CREATE POLICY "event_banners_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-banners');
