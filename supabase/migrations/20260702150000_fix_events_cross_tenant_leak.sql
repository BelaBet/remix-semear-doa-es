-- CORREÇÃO DE ISOLAMENTO ENTRE INSTITUIÇÕES: a policy events_public_active_select
-- estava TO anon, authenticated — ou seja, qualquer usuário LOGADO (staff ou membro
-- de qualquer instituição) conseguia ler os eventos de TODAS as instituições da
-- plataforma via consulta direta à tabela, não só os da própria instituição.
-- O app sempre filtrava por tenant_id na tela (church-page.tsx), mas isso é só
-- conveniência de exibição — a política de RLS é que é a barreira de segurança
-- real, e ela permitia mais do que deveria.
--
-- Restrita para TO anon apenas (necessário para a página pública de doação, que
-- não tem sessão). Usuários autenticados passam a depender só das policies já
-- corretamente restritas por tenant: events_staff_all (staff) e
-- events_tenant_select (membro aprovado do próprio tenant).
DROP POLICY IF EXISTS "events_public_active_select" ON public.events;

CREATE POLICY "events_public_active_select"
ON public.events
FOR SELECT
TO anon
USING (status <> 'draft'::event_status);
