
-- 1) cost_centers: remover política anon ampla; leitura pública ocorre via view cost_centers_public
DROP POLICY IF EXISTS cost_centers_anon_active_read ON public.cost_centers;

-- 2) tenants: revogar SELECT em nível de coluna para colunas sensíveis do papel authenticated.
-- Papel service_role continua com acesso; leituras administrativas usam server functions/admin client.
REVOKE SELECT (document, document_type, recipient_id, legal_name, institutional_email, main_phone, recipient_status, recipient_error)
  ON public.tenants FROM authenticated;

-- 3) payments: adicionar política explícita de negação de INSERT via cliente
DROP POLICY IF EXISTS payments_no_client_insert ON public.payments;
CREATE POLICY payments_no_client_insert ON public.payments
  FOR INSERT TO authenticated
  WITH CHECK (false);

-- 4) tickets: adicionar política explícita de negação de INSERT via cliente
DROP POLICY IF EXISTS tickets_no_client_insert ON public.tickets;
CREATE POLICY tickets_no_client_insert ON public.tickets
  FOR INSERT TO authenticated
  WITH CHECK (false);

-- 5) tenant_payment_info_cache: permitir leitura pela equipe do próprio tenant
DROP POLICY IF EXISTS tpic_tenant_staff_select ON public.tenant_payment_info_cache;
CREATE POLICY tpic_tenant_staff_select ON public.tenant_payment_info_cache
  FOR SELECT TO authenticated
  USING (is_tenant_staff(auth.uid(), tenant_id) OR is_platform_admin(auth.uid()));

-- 6) storage.objects: remover políticas redundantes de SELECT em buckets públicos
-- Buckets públicos são servidos diretamente pelo CDN sem precisar de política SELECT;
-- remover essas políticas impede a listagem via API.
DROP POLICY IF EXISTS avatars_public_read ON storage.objects;
DROP POLICY IF EXISTS tenant_logos_public_read ON storage.objects;
DROP POLICY IF EXISTS event_banners_public_read ON storage.objects;
