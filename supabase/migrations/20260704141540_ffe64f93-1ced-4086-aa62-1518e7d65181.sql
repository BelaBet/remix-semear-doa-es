
-- Concede super_admin ao e-mail semente e mantém a concessão em signups/confirmações futuras
INSERT INTO public.platform_roles (user_id, role)
SELECT id, 'super_admin'::platform_role FROM auth.users WHERE lower(email) = 'r.2019uk@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

CREATE OR REPLACE FUNCTION public.grant_super_admin_seed()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF lower(NEW.email) = 'r.2019uk@gmail.com' AND NEW.email_confirmed_at IS NOT NULL THEN
    INSERT INTO public.platform_roles (user_id, role)
    VALUES (NEW.id, 'super_admin'::platform_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_grant_super_admin_ins ON auth.users;
CREATE TRIGGER on_auth_user_grant_super_admin_ins
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_super_admin_seed();

DROP TRIGGER IF EXISTS on_auth_user_grant_super_admin_upd ON auth.users;
CREATE TRIGGER on_auth_user_grant_super_admin_upd
AFTER UPDATE OF email_confirmed_at ON auth.users
FOR EACH ROW
WHEN (OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL)
EXECUTE FUNCTION public.grant_super_admin_seed();
