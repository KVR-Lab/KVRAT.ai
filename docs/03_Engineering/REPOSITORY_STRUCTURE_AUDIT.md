# KVRAT.ai Repository Structure Audit & Landing Page Update

**Date:** 2026-10-24  
**Branch:** `feat/supplier-landing-workflow`  
**Scope:** Safe first-stage structure documentation and supplier landing-page repair.

## Verified findings

- The repository root identifies the project as **KVR-Core**, the foundation intended to power applications including KVRAT.ai.
- The root workspace declares `apps/*` and `packages/*` as pnpm workspace members.
- The web application currently lives at `apps/kvr-web`, using Next.js App Router under `apps/kvr-web/src/app`.
- The existing root page file `apps/kvr-web/src/app/page.tsx` ended abruptly at `function SectionTitle` despite containing supplier form state and Egyptian supplier-category lists. It was not a complete compilable page.
- The web app has its own `pnpm-lock.yaml` and `pnpm-workspace.yaml`, in addition to root workspace/package-management files. This is a configuration inconsistency to investigate, not something to delete without testing.
- The current page path is the root route of the KVR web app, whose wider repository also contains dashboard-oriented routes. Confirm the intended deployment target before treating this app as the public production landing page.
- No confirmed supplier-registration persistence endpoint was identified during this scoped inspection. The revised form therefore explicitly warns that data is not submitted or stored yet; it does not fabricate a successful registration.

## Changes in this branch

1. Replaced the truncated root page with a responsive Arabic supplier landing page.
2. Preserved the project identity colors: orange `#F97316`, blue `#123B66`, and dark slate typography.
3. Added the requested supplier workflow: account/data entry, management review and possible document checks, product/price/image preparation, conditional product review, then customer visibility and quote/contact requests.
4. Kept the registration form as a front-end-only form and made its current non-persistence explicit.
5. Replaced unrelated green/gold global theme variables with the established orange/blue brand palette.

## Safe next steps (not performed in this change)

- Confirm the intended Vercel project/root directory and whether `apps/kvr-web` is the correct public landing-page deployment target.
- Define the supplier-registration API, database schema, validation, spam protection, consent/privacy policy, and secure document-upload flow before enabling real submissions.
- Resolve the nested pnpm workspace/lockfile situation after checking CI and deployment behavior.
- Inventory duplicate-looking folders and scripts before moving or deleting anything.
- Run install, lint, type-check, and production build in a reproducible environment; this GitHub-only edit did not execute those commands.
