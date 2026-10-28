-- Align the public supplier insert policy with the actual first-step registration form.
-- Company name, business type, and governorate are optional in the UI and API.
-- Public visitors may INSERT only; no public SELECT/UPDATE/DELETE is granted here.
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
  and length(btrim(coalesce(company_name, ''))) <= 180
  and length(btrim(coalesce(business_type, ''))) <= 100
  and length(btrim(coalesce(governorate, ''))) <= 80
  and length(btrim(coalesce(whatsapp, ''))) <= 30
  and length(btrim(coalesce(email, ''))) <= 254
  and length(btrim(coalesce(website, ''))) <= 500
  and length(btrim(coalesce(products, ''))) <= 1000
  and length(btrim(coalesce(coverage, ''))) <= 300
  and length(btrim(coalesce(notes, ''))) <= 1200
);
