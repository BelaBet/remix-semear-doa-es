REVOKE EXECUTE ON FUNCTION public.cost_centers_protect_sensitive() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.handle_new_user()                 FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_critical_action()             FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.trg_recompute_compliance()        FROM anon, authenticated, PUBLIC;