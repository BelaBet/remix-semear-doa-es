-- Revoke EXECUTE on SECURITY DEFINER functions from PUBLIC/anon/authenticated.
-- Trigger functions and RLS helpers do not need to be callable via the API.
-- Keep is_email_registered callable by anon (used by signup form).

REVOKE EXECUTE ON FUNCTION public.is_tenant_staff(uuid, uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_super_admin() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_tenant_pix_key(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.current_tenant_id() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.trg_recompute_compliance() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.seed_tenant_pending_documents(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_platform_admin(uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_platform_role(uuid, public.platform_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.is_email_registered(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.cost_centers_protect_sensitive() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_critical_action() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.grant_super_admin_seed() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.recompute_tenant_compliance(uuid) FROM PUBLIC, anon, authenticated;

-- is_email_registered is intentionally callable by anon/authenticated for the signup email-check flow.
GRANT EXECUTE ON FUNCTION public.is_email_registered(text) TO anon, authenticated;