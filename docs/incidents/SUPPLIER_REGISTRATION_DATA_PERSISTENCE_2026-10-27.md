# Supplier Registration Persistence Incident — 2026-10-27

## Status at investigation time

**Classification: PARTIALLY_FIXED — root cause is confirmed and a code/migration patch is prepared on a review branch, but production remains unremediated until the migration and application are approved, applied, deployed, and verified end-to-end.**

## Production evidence

- Latest inspected Vercel production deployment: `dpl_HkuQa7fkNC8n1zzLwV4vZqqnV8H8`.
- Deployment source ref/SHA: `main` / `1e24c680074aa07cee9ddef3f3dbf10838d1bf1f`.
- The deployed form submits to `POST /api/suppliers`. Exact-path checks found no `/api/supplier-registration` or `/api/supplier-leads` route in the inspected main revision.
- Production environment contains `SUPABASE_URL` and `SUPABASE_ANON_KEY`. The URL matches the inspected Supabase project, and the configured key matches its active legacy anon key. No key values are recorded here.
- Supabase project `uiekcrowevzkybqrcloj` contains `public.suppliers` with RLS enabled and 4 existing rows at inspection. No `supplier_leads` table was found in the public schema.
- The only policy returned for `public.suppliers` was `supplier_public_insert_with_consent`, an INSERT policy for role `anon`.
- The existing policy required `company_name` length >= 2, `business_type` length >= 1, and `governorate` length >= 2. The live form marks all three optional; the API sends empty strings or NULL when omitted.
- An effective-privilege query returned: `anon_can_insert=false`, `anon_can_select=false`, `anon_can_update=false`, `anon_can_delete=false`, `anon_schema_usage=true`. An RLS INSERT policy does not itself grant SQL INSERT permission; the public role had no effective INSERT grant.
- Supabase edge logs recorded `POST /rest/v1/suppliers` at `2026-10-27T13:46:37.204Z`, HTTP 401, with PostgREST proxy error code `42501` (insufficient privilege). No request body or vendor data was copied into this report.
- Vercel's grouped production errors show `Supplier registration insert failed { status: 401 }` 15 times on `/api/suppliers` from 2026-10-25 17:41 UTC through 2026-10-27 13:46 UTC. An older, different deployment also logged missing environment variables on `/api/supplier-registration`; that is not the endpoint in the inspected current form.

## Root cause

The form reaches the current API and the intended Supabase project. The write is denied by database permissions: the `anon` role has no effective INSERT grant. Even after adding that grant, the existing RLS predicate would still reject the ordinary optional-first form when company name, business type, or governorate is blank. Both database grant and policy alignment are addressed in the review migration; this is not a message-only fix.

## Remediation in this branch

1. Add `submission_id uuid` with a nullable unique index so existing rows are unchanged and retries for the same form attempt are idempotent.
2. Grant `anon` INSERT on only the columns used by the endpoint; do not grant SELECT, UPDATE, or DELETE. Keep the RLS check on required contact fields and consent, permit the profile fields already marked optional, and constrain category values and field lengths.
3. Make the page reuse one generated submission UUID through retries, and reset it after success or when the user edits the form.
4. Validate the UUID and body size on the server, require the WhatsApp value that the page marks required, and use PostgREST `resolution=ignore-duplicates` against the unique submission key.
5. Preserve the existing generic failure message and continue returning success only after a successful/idempotent database response.

## Verification gate

After review/approval, apply `supabase/migrations/20261027180000_fix_supplier_registration_insert_policy.sql` to the intended Supabase project, then deploy the matching application commit through the approved release process. Verify:

- A valid synthetic registration with optional fields blank returns success and creates exactly one row.
- The same `submission_id` submitted again returns an idempotent success and does not create a second row.
- Missing/invalid submission ID, missing WhatsApp/consent, invalid email/URL, invalid categories, and oversized request bodies are rejected and create no row.
- `anon` can insert valid registrations but cannot SELECT, UPDATE, or DELETE supplier rows.
- A Supabase query by the synthetic `submission_id` confirms the persisted record, after which an authorized administrative deletion removes only that synthetic record and a follow-up query confirms its absence.
- The test is repeated through the public deployed page after deployment, not just against the API or a preview.

## Known remaining limitation

A request-body size cap (16 KiB) is in the code patch. A **durable rate limit is not configured or verified**. The project’s active Vercel Firewall configuration lookup returned “config not found”; implementing reliable distributed rate limiting requires an approved Vercel Firewall rule or a shared rate-limit store. Do not substitute an in-memory serverless counter and call it reliable.

## Current verification state

- Root cause evidence: **confirmed**.
- Application and migration patch: **on draft PR #21**.
- GitHub Actions run `40529549455`: **success** for install, root build, root tests, and supplier API regression tests on commit `c497c71f7cf5506d358e1d8d9fd8ffb0954175a1`.
- Vercel preview deployment `dpl_95QeSveXz6nkhLvzRuPfepJiWXa5`: **READY**; optimized build completed without build error events.
- Migration applied to live Supabase: **no**. The live migration history still contains only `add_supplier_registration_profile_fields` and `secure_supplier_registration`.
- Synthetic record inserted: **no**.
- Public deployed end-to-end persistence verified: **no**.
- Production deployment or database policy was changed during investigation: **no**.
- Durable request-count rate limiting: **not configured**; see known limitation above.

Do not classify the incident as fixed until a registration from the deployed form has a corresponding confirmed row in the correct Supabase project.


## Remaining control gap: request-count rate limiting

The branch enforces a 16 KiB request-body limit and idempotency for repeated submissions with the same key. A reliable per-IP/request-count limit is **not** yet configured. The inspected Vercel firewall configuration endpoint returned `Config not found`; I did not create or overwrite live firewall settings without approval. Before treating security hardening as complete, configure/review a Vercel Firewall rate-limit rule scoped to `POST /api/suppliers` (or approve another shared rate-limit service). An in-memory limit would not be reliable across serverless instances and was not represented as a durable solution.
