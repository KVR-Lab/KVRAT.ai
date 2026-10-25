# KVR Foundation Changelog

## 2026-10-25 — Foundational execution boundary and CI discovery

**Baseline:** `8ce90e8e320bfd316b43ec0e69edab16f692243e` (`main`)  
**Working branch:** `foundation/execution-boundaries-2026-10-25`

### Added
- `src/security/execution-access.guard.ts`: fail-closed guard and decorator using a server-side execution key.
- `src/security/execution-access.guard.spec.ts`: unit tests for missing, weak, absent, mismatched, array-valued, and matching key cases.
- `docs/KVR_FOUNDATION_AUDIT.md`: evidence-based audit, baseline, risks, and verification limitations.
- `docs/KVR_IMPLEMENTATION_REGISTER.md`: feature status and remaining acceptance criteria.
- Canonical `.github/workflows/ci.yml` workflow file.
- `docs/archive/root-dot-github-placeholder.txt`, preserving the original newline-only `.github` blob exactly.

### Changed
- Added `@RequireExecutionKey()` to reviewed privileged controller surfaces that expose tool execution, agent/chat execution, control-plane operations, project mutations, memory/knowledge control, security/identity access, or KVRAT project file generation.
- Reordered CI setup so pnpm is installed before Node's pnpm cache setup.
- Preserved the original `github/workflows/ci.yml` copy rather than deleting it.

### Validation
- No local project build, lint, unit test, or e2e test was run: the current container has no checkout, pnpm is not installed, and GitHub DNS resolution failed.
- The GitHub Actions result from the review branch is the next verification source.
- No production deployment, production secret change, or merge to `main` was performed.

### Security and compatibility notes
- Configure `KVR_EXECUTION_API_KEY` only in a trusted server environment; use a random value of at least 32 UTF-8 bytes with no leading/trailing whitespace.
- Trusted callers must send it in the `x-kvr-execution-key` header. Do not put the key in a public browser bundle or a `NEXT_PUBLIC_*` variable.
- The guard provides shared-key route authorization only. It does not supply RBAC, individual identity, per-operation human approval, or durable audit records.
