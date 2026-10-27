# Incident: Supplier registration persistence failure

**Date:** 2026-10-27  
**Application:** `apps/kvr-web`  
**Live route:** `POST /api/suppliers`  
**Production deployment observed in logs:** `dpl_HkuQa7fkNC8n1zzLwV4vZqqnV8H8`  
**Deployment commit:** `1e24c680074aa07cee9ddef3f3dbf10838d1bf1f`  
**Status:** Root cause identified; code and SQL migration prepared on a separate branch. **Not deployed and not yet end-to-end verified.**

## Evidence and root cause

1. Vercel runtime error telemetry shows **15** occurrences of `Supplier registration insert failed { status: 401 }` on `/api/suppliers`; the most recent was `2026-10-27T13:46:36Z`.
2. The corresponding Supabase PostgreSQL log at `2026-10-27T13:46:38.245Z` reports: `new row violates row-level security policy for table "suppliers"`. This is direct evidence that the insert was rejected by RLS.
3. The current UI marks company/factory name, activity type, and governorate as optional (`apps/kvr-web/src/app/page.tsx`, the registration fields), and the API maps blank values to `""` or `null` (`apps/kvr-web/src/app/api/suppliers/route.ts`).
4. The active policy `supplier_public_insert_with_consent` instead requires `company_name` length 2–180, `business_type` length 1–100, and `governorate` length 2–80. That contradicts the UI/API contract and rejects legitimate minimal registrations.
5. Database privilege inspection also returned `has_table_privilege('anon','public.suppliers','INSERT') = false`. The fix therefore explicitly grants only `INSERT` to `anon`; it does not grant SELECT, UPDATE, or DELETE. The current schema grants no public table read/update/delete access.
6. Vercel's configured `SUPABASE_URL` matches the Supabase project's URL and `SUPABASE_ANON_KEY` matches that project's active legacy anon key. The evidence points to policy/privilege configuration, not a URL mismatch. No secret values are included in this report.
7. The database has 4 supplier rows, with the newest existing row timestamped `2026-10-25 15:11:49Z`. This count is not proof of what any individual failed submit contained.

## Change prepared on the isolated branch

Branch: `fix/supplier-registration-rls-2026-10-27`

- Add `supabase/migrations/20261027160000_fix_supplier_registration_rls.sql`: grant insert-only access to `anon` and redefine the INSERT policy so it enforces required contact name, phone, city and consent while treating company name, activity type, and governorate as optional. It retains size limits, optional email/URL validation, and the category allowlist.
- Update `apps/kvr-web/src/app/api/suppliers/route.ts`: cap request payloads at 16 KiB, cap the final persisted notes field at 1,000 characters, and log only the upstream HTTP status plus a stable database error code (no contact fields, request body, or secrets).
- Add isolated mocked API tests under `apps/kvr-web/src/app/api/suppliers/route.spec.ts` and a dedicated Jest config.
- Update GitHub Actions to run the supplier API test suite.

## Important verification boundary

The tests mock the Supabase REST endpoint; they do **not** prove that the migration has been applied to a real database. This repository does not currently provide evidence that this migration is automatically deployed by CI. The migration must be reviewed and applied to the intended Supabase project through the approved database-migration procedure. After that, run a synthetic end-to-end registration in an approved environment and confirm exactly one row appears in `public.suppliers` before closing the incident.

Current classification: **PARTIALLY_FIXED** in the isolated branch; production registration remains **unverified** until migration application and end-to-end verification.
