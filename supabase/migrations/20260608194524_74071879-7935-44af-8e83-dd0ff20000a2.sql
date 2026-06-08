
-- 1) tenants_public: enforce caller's privileges/RLS
ALTER VIEW public.tenants_public SET (security_invoker = true);

-- 2) impersonation_sessions: restrict UPDATE
DROP POLICY IF EXISTS imp_self_update ON public.impersonation_sessions;
CREATE POLICY imp_admin_update ON public.impersonation_sessions
  FOR UPDATE
  TO authenticated
  USING (public.is_platform_admin(auth.uid()) AND impersonator_id = auth.uid())
  WITH CHECK (public.is_platform_admin(auth.uid()) AND impersonator_id = auth.uid());

-- 3) realtime.messages: add explicit tenant ownership check for group topics
DROP POLICY IF EXISTS "Authenticated can read realtime topics they own" ON realtime.messages;

CREATE POLICY "Authenticated can read realtime topics they own"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  (realtime.topic() = ('notifications:' || (auth.uid())::text))
  OR (
    realtime.topic() LIKE 'group_members:%'
    AND EXISTS (
      SELECT 1
      FROM public.group_members gm
      JOIN public.groups g ON g.id = gm.group_id
      WHERE (gm.group_id)::text = split_part(realtime.topic(), ':', 2)
        AND gm.profile_id = auth.uid()
        AND g.tenant_id = public.current_tenant_id()
    )
  )
  OR (
    realtime.topic() LIKE 'messages:tenant:%'
    AND split_part(realtime.topic(), ':', 3) = (public.current_tenant_id())::text
    AND EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid()
        AND p.tenant_id = public.current_tenant_id()
        AND p.status = 'approved'::public.profile_status
    )
  )
  OR (realtime.topic() = ('messages:user:' || (auth.uid())::text))
  OR (
    realtime.topic() LIKE 'messages:group:%'
    AND EXISTS (
      SELECT 1
      FROM public.group_members gm
      JOIN public.groups g ON g.id = gm.group_id
      WHERE (gm.group_id)::text = split_part(realtime.topic(), ':', 3)
        AND gm.profile_id = auth.uid()
        AND g.tenant_id = public.current_tenant_id()
    )
  )
  OR (
    realtime.topic() LIKE '%:staff:%'
    AND public.is_tenant_staff(auth.uid(), (NULLIF(split_part(realtime.topic(), ':', 3), ''))::uuid)
  )
);
