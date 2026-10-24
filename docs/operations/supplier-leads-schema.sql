-- KVRAT.ai supplier-interest intake
-- Run this SQL in the Supabase SQL Editor for the project's database.
create table if not exists public.supplier_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company_name text not null,
  phone text not null,
  company_type text,
  governorate text,
  categories text[] not null default '{}',
  privacy_consent boolean not null default false check (privacy_consent = true),
  contact_consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.supplier_leads enable row level security;

-- Intentionally do not create anon/authenticated read or write policies.
-- The Next.js server route writes using SUPABASE_SERVICE_ROLE_KEY, which must
-- exist only as a server-side Vercel environment variable and never in NEXT_PUBLIC_*.
