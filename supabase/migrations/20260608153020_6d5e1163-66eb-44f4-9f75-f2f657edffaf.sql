ALTER TABLE public.payments
  ADD COLUMN IF NOT EXISTS donation_amount INTEGER,
  ADD COLUMN IF NOT EXISTS ticketto_fee INTEGER,
  ADD COLUMN IF NOT EXISTS split_platform_amount INTEGER,
  ADD COLUMN IF NOT EXISTS split_seller_amount INTEGER,
  ADD COLUMN IF NOT EXISTS platform_recipient_id TEXT,
  ADD COLUMN IF NOT EXISTS seller_recipient_id TEXT;

ALTER TABLE public.tenant_payment_settings
  ADD COLUMN IF NOT EXISTS pagarme_recipient_id TEXT;