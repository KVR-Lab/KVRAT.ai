-- Supplier intake is intentionally minimal: company, business type, and governorate are optional.
-- Keep public access insert-only; no SELECT, UPDATE, or DELETE privileges are granted here.
begin;

grant insert on table public.suppliers to anon;

drop policy if exists supplier_public_insert_with_consent on public.suppliers;

create policy supplier_public_insert_with_consent
on public.suppliers
for insert
to anon
with check (
  privacy_consent is true
  and char_length(btrim(coalesce(contact_person, ''))) between 2 and 180
  and char_length(btrim(coalesce(phone, ''))) between 7 and 30
  and char_length(btrim(coalesce(city, ''))) between 2 and 120

  and char_length(btrim(coalesce(company_name, ''))) <= 180
  and char_length(btrim(coalesce(business_type, ''))) <= 100
  and char_length(btrim(coalesce(governorate, ''))) <= 80
  and char_length(btrim(coalesce(whatsapp, ''))) <= 30
  and char_length(btrim(coalesce(email, ''))) <= 254
  and (
    btrim(coalesce(email, '')) = ''
    or btrim(email) ~* '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
  )
  and char_length(btrim(coalesce(website, ''))) <= 500
  and (
    btrim(coalesce(website, '')) = ''
    or btrim(website) ~* '^https?://'
  )
  and char_length(coalesce(products, '')) <= 1000
  and char_length(coalesce(coverage, '')) <= 300
  and char_length(coalesce(notes, '')) <= 1000
  and coalesce(cardinality(product_categories), 0) <= 11
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

commit;
