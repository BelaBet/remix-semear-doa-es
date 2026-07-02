-- Restringe edição da Chave PIX (tenant_payment_settings) somente ao
-- super admin da plataforma. Antes, qualquer admin da própria instituição
-- também podia INSERT/UPDATE/DELETE via has_role(..., 'admin'). A leitura
-- (SELECT) continua liberada para staff da instituição — a chave PIX
-- continua visível para eles, só não editável.
DROP POLICY IF EXISTS tps_admin_modify ON public.tenant_payment_settings;

CREATE POLICY tps_platform_admin_modify ON public.tenant_payment_settings
  FOR ALL
  USING (public.is_platform_admin(auth.uid()))
  WITH CHECK (public.is_platform_admin(auth.uid()));
