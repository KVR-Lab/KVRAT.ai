-- Supplier registration persistence fix.
-- Evidence: production POST /rest/v1/suppliers was rejected with PostgREST 42501.
-- The existing table had an INSERT RLS policy but no INSERT SQL grant for anon.
-- The old policy also required optional company/business/governorate fields.
-- Existing supplier rows are preserved. A nullable unique submission key enables retries.

begin;

alter table public.suppliers
  add column if not exists submission_id uuid;

create unique index if not exists suppliers_submission_id_key
  on public.suppliers (submission_id);

grant usage on schema public to anon;

-- Column-level INSERT grant only: anon cannot set id/created_at and has no read,
-- update, or delete grant from this migration.
grant insert (
  submission_id,
  company_name,
  contact_person,
  business_type,
  phone,
  whatsapp,
  email,
  city,
  products,
  notes,
  governorate,
  website,
  product_categories,
  coverage,
  privacy_consent,
  contact_consent
) on table public.suppliers to anon;

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

    -- Optional in the current form: blank/null is valid; upper bounds remain enforced.
    and length(btrim(coalesce(company_name, ''))) <= 180
    and length(btrim(coalesce(business_type, ''))) <= 100
    and length(btrim(coalesce(governorate, ''))) <= 80

    and (
      nullif(btrim(coalesce(email, '')), '') is null
      or (
        length(btrim(email)) between 5 and 254
        and btrim(email) ~ '^[^[:space:]@]+@[^[:space:]@]+[.][^[:space:]@]+$'
      )
    )
    and (
      nullif(btrim(coalesce(website, '')), '') is null
      or (
        length(btrim(website)) <= 500
        and btrim(website) ~ '^https?://[^[:space:]]+$'
      )
    )
    and length(btrim(coalesce(products, ''))) <= 1000
    and length(btrim(coalesce(coverage, ''))) <= 300
    and cardinality(coalesce(product_categories, array[]::text[])) <= 11
    and coalesce(product_categories, array[]::text[]) <@ array[
      'أدوات ومستلزمات التغليف',
      'ماكينات وخطوط التعبئة والتغليف',
      'العبوات البلاستيكية',
      'العبوات الكرتونية والورقية',
      'الأكياس والشنط',
      'مواد التعبئة والتغليف',
      'الاسترتش والشرنك',
      'الطباعة والملصقات',
      'الزجاجات والبرطمانات',
      'مستلزمات المصانع والمواد الخام',
      'منتجات أخرى'
    ]::text[]
  );

notify pgrst, 'reload schema';

commit;
