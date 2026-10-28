-- Align the public supplier INSERT policy with the server-side registration contract.
-- Optional company name, business type, and governorate may be blank; required
-- contact person, phone, city, and privacy consent remain enforced by RLS.
-- Public visitors receive INSERT only; this does not grant SELECT/UPDATE/DELETE.

drop policy if exists supplier_public_insert_with_consent on public.suppliers;

create policy supplier_public_insert_with_consent
on public.suppliers
for insert
to anon
with check (
  privacy_consent is true
  and length(btrim(coalesce(contact_person, ''))) between 2 and 180
  and length(btrim(coalesce(phone, ''))) between 7 and 30
  and length(btrim(coalesce(city, ''))) between 2 and 120
  and (
    length(btrim(coalesce(company_name, ''))) = 0
    or length(btrim(coalesce(company_name, ''))) between 2 and 180
  )
  and (
    length(btrim(coalesce(business_type, ''))) = 0
    or length(btrim(coalesce(business_type, ''))) between 1 and 100
  )
  and (
    length(btrim(coalesce(governorate, ''))) = 0
    or length(btrim(coalesce(governorate, ''))) between 2 and 80
  )
  and length(btrim(coalesce(whatsapp, ''))) <= 30
  and length(coalesce(email, '')) <= 254
  and length(coalesce(website, '')) <= 500
  and length(coalesce(products, '')) <= 1000
  and length(coalesce(coverage, '')) <= 300
  and length(coalesce(notes, '')) <= 1200
  and coalesce(array_length(product_categories, 1), 0) <= 11
);
