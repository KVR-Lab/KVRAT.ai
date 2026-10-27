-- Fix the supplier registration INSERT path without exposing supplier records.
-- Public callers receive INSERT only; RLS limits rows to the registration form contract.
-- The nullable unique key leaves historical records untouched and makes retries idempotent.

begin;

alter table public.suppliers
  add column if not exists submission_id uuid;

create unique index if not exists suppliers_submission_id_key
  on public.suppliers (submission_id);

grant usage on schema public to anon;
grant insert on table public.suppliers to anon;

drop policy if exists supplier_public_insert_with_consent on public.suppliers;

create policy supplier_public_insert_with_consent
  on public.suppliers
  for insert
  to anon
  with check (
    submission_id is not null
    and privacy_consent is true
    and length(btrim(coalesce(contact_person, ''))) between 2 and 180
    and length(btrim(coalesce(phone, ''))) between 7 and 30
    and length(btrim(coalesce(whatsapp, ''))) between 7 and 30
    and length(btrim(coalesce(city, ''))) between 2 and 120
    and length(btrim(coalesce(notes, ''))) between 1 and 1200
    and length(btrim(coalesce(company_name, ''))) <= 180
    and length(btrim(coalesce(business_type, ''))) <= 100
    and length(btrim(coalesce(governorate, ''))) <= 80
    and length(btrim(coalesce(email, ''))) <= 254
    and length(btrim(coalesce(website, ''))) <= 500
    and length(btrim(coalesce(products, ''))) <= 1000
    and length(btrim(coalesce(coverage, ''))) <= 300
    and cardinality(coalesce(product_categories, array[]::text[])) <= 11
  );

notify pgrst, 'reload schema';

commit;
