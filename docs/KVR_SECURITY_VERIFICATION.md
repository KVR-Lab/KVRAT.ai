# KVR Security Verification Gate — PR #18

**Review date:** 2026-10-26  
**Repository:** `KVR-Lab/KVRAT.ai`  
**PR:** [#18](https://github.com/KVR-Lab/KVRAT.ai/pull/18) — open, draft, not merged  
**Branch:** `foundation/execution-boundaries-2026-10-25`  
**Verified head at review start:** `b621ec177044c221a25b06319d188eb281914a6e`  
**Base:** `main` at `8ce90e8e320bfd316b43ec0e69edab16f692243e`  
**Decision:** **BLOCKED — do not merge.** This review did not merge, deploy, or modify application code.

## 1. Scope and evidence

The live PR metadata confirms that the head SHA still equals the expected `b621ec177044c221a25b06319d188eb281914a6e`, the base remains `main`, and the PR is open/draft/unmerged. The current workflow run [40278460138](https://github.com/KVR-Lab/KVRAT.ai/actions/runs/40278460138) is for that exact head and reports success for dependency installation, build, and the configured Jest test command. This is CI evidence, not route-level security integration evidence.

Reviewed files include `src/main.ts`, `src/app.module.ts`, `src/security/execution-access.guard.ts`, its unit test, the changed controller files listed below, `.github/workflows/ci.yml`, and the current implementation register. There is no local checkout in the available execution environment, so no local integration test, isolated HTTP test server, or independent test command was run. No real command, filesystem mutation, secret import, or production service was invoked.

Status meanings: **PASS** = direct evidence and relevant test; **FAIL** = confirmed defect; **BLOCKED** = not sufficiently verified; **NOT APPLICABLE** = reason stated.

## 2. Entry-point inventory

The repository contains more than one path into similar capabilities. A class-level decorator in a source file is not proof that all route registrations or indirect paths are protected. The list below is the inventory of high-risk controller surfaces found in the reviewed application modules and PR files; it is not a claim that every route in the repository has been exhaustively proven reachable or unreachable.

| Controller / route prefix | HTTP method and route | Target / operation | Risk | Guard in source / chain position | Alternate-path concern | Verification |
|---|---|---|---|---|---|---|
| `ToolController` `/tools` | GET `/`, POST `/execute` | List and dispatch registered tools; registry includes terminal and file tools | Critical | Class-level `@RequireExecutionKey()` before controller handler | Agent pipeline and AI/command routes may invoke tools/shell independently | **BLOCKED** — guard unit only; no HTTP test |
| `AgentController` `/agent` | POST `/execute` | Agent service/pipeline | Critical | Class-level guard | Chat, AI, planner, executor, command/orchestrator paths may overlap | **BLOCKED** |
| `AiController` `/ai` | POST `/ask`, POST `/execute` | AI ask and command execution | Critical | Class-level guard | Confirm whether `execute` reaches shell/tool executor and whether another controller exposes same service | **BLOCKED** |
| `ChatController` `/chat` | POST `/` | Chat service; prior source review found `/ps ` can become shell task | Critical | Class-level guard | `/control/chat`, agent, command, executor, and orchestrator paths | **BLOCKED** |
| `PlannerController` `/planner` | GET `/`, POST `/plan` | Queue status and plan creation | High | Class-level guard | Runtime/task queue and orchestrator routes need full route map | **BLOCKED** |
| `BootstrapController` `/bootstrap` | GET `/` | Bootstrap routine | High | Class-level guard | Side effects and safe/idempotent behavior not tested | **BLOCKED** |
| `ControlPlaneController` `/control` | GET overview/health/projects/agents/runtime/commands/dashboard/connect/logs/memory/settings; POST chat/agent/start/agent/stop/project/open | Operations, agent control, project actions, internal data | Critical | Class-level guard | Potential duplicate control-center, system, runtime, scheduler, and orchestrator entry points | **BLOCKED** |
| `ProjectsController` `/projects` | GET, POST, GET `:id`, PATCH `:id`, DELETE `:id` | Project registry CRUD | High | Class-level guard | Project registry/runtime modules may expose adjacent operations | **BLOCKED** |
| `KvratController` `/projects/kvrat` | GET status/docs; POST docs/write | Status and report/file writing | High | Class-level guard | `docs` GET calls `writeReport()` and therefore appears side-effecting despite GET semantics | **FAIL** — unsafe HTTP semantic confirmed in source; no runtime test |
| `KnowledgeController` `/knowledge` | GET /, GET search, GET stats, POST reload | Read/search/reload knowledge | High | Class-level guard | Separate `src/modules/knowledge/knowledge.controller.ts` has POST `/knowledge/load`; duplicate prefix/module registration unresolved | **BLOCKED** |
| `modules/KnowledgeController` `/knowledge` | POST `/load` | Load project knowledge | High | Class-level guard in source | Whether module is imported/route is active not established; duplicate controller class/prefix | **BLOCKED** |
| `MemoryController` `/memory` | GET /, DELETE / | Read and clear memory | High | Class-level guard | Control-plane memory endpoint and other memory services | **BLOCKED** |
| `SecurityController` `/security` | GET `/scan` | Scans hard-coded `D:\\` path | High | Class-level guard | Scanner service and other security routes not comprehensively traced | **BLOCKED** |
| `VaultController` `/security/vault` | POST `/import` | Encrypt/import file by caller-supplied source and name | Critical | Class-level guard | File/vault services may be reachable through other modules | **BLOCKED** |
| `IdentityController` `/identity` | GET `/status` | Identity status/load | High | Class-level guard | Security and identity service callers not exhaustively traced | **BLOCKED** |
| Runtime, executor, command, workspace, storage, scheduler, orchestrator, system, control-center, project-runtime/registry and gateway routes | Exact route set not fully resolved in this remote pass | Potential command execution, file access, task execution, settings, administration, or background privileged work | High to critical | Not assumed protected based on unrelated guards; route/module files require systematic enumeration | Alternate paths are a primary unresolved risk | **BLOCKED** |

**Count rule:** 16 controller/prefix surfaces are explicitly inventoried above, including one duplicate knowledge-controller surface; the final row groups additional route families whose exact count and active registration are unresolved. Therefore this is **not** a complete numeric count of all sensitive routes. The exact total and pass count are **BLOCKED**, not inferred from the number of guarded files.

## 3. Guard implementation review

File: [`src/security/execution-access.guard.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/foundation/execution-boundaries-2026-10-25/src/security/execution-access.guard.ts)  
Unit tests: [`src/security/execution-access.guard.spec.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/foundation/execution-boundaries-2026-10-25/src/security/execution-access.guard.spec.ts)

| Requirement | Result | Evidence / limitation |
|---|---|---|
| Missing server key denied | **PASS (unit-level)** | Unit test expects false when env var is absent |
| Missing request header denied | **PASS (unit-level)** | Unit test checks missing header |
| Wrong key denied | **PASS (unit-level)** | Same-length mismatched key test |
| Weak configured key denied | **PASS (limited policy check)** | Checks UTF-8 byte length >= 32; this is not proof of entropy/randomness |
| Invalid header shape denied | **PASS (unit-level)** | Array-valued header rejected |
| Timing-resistant equality for equal-length buffers | **PASS (source review)** | Uses Node `timingSafeEqual` after equal byte-length check |
| Avoids direct secret logging/echo | **PASS (source review, narrow scope)** | Guard itself does not log or return either key; whole-system log/error handling not dynamically tested |
| No default key hard-coded in guard | **PASS (source review)** | Reads `process.env.KVR_EXECUTION_API_KEY`; no fallback constant |
| Fail closed when missing/whitespace-padded/short key | **PASS (source review + unit coverage for missing/short)** | Whitespace rejection is source-reviewed but not explicitly tested |
| Invalid/unicode/oversized key behavior | **BLOCKED** | No comprehensive tests for malformed Unicode, excessively large header, or configuration entropy |
| Guard ordering and all active routes | **BLOCKED** | Class-level `UseGuards` appears before handlers in Nest request lifecycle, but active route registration and every alternate route were not exercised |
| Key generation, storage, rotation, consumer delivery | **BLOCKED** | No documented key-generation/rotation workflow or verified trusted server-side consumer was found in this review |
| Browser/client cannot receive key | **BLOCKED** | No frontend bundle/production env scan or deployed client inspection performed; PR notes correctly warn not to embed it |
| Authorization beyond possession of shared key | **NOT APPLICABLE to this guard** | It is a shared-key gate, not identity, RBAC, capability scoping, or per-operation approval |

**Important limitation:** a minimum length of 32 UTF-8 bytes is not a key-generation policy. The secret should be generated from a cryptographically secure random source, kept in a server-side secret manager/environment, never prefixed with `NEXT_PUBLIC_`, never logged, and rotated through an operational procedure. That procedure and the trusted caller path are not proven by this PR.

## 4. Integration-test gate

No new integration tests were run in this review. The current CI job ran the existing configured build and Jest suite successfully for the verified head, but the PR adds only guard unit tests, not HTTP-level tests proving that actual routes reject/accept requests and prevent side effects.

| Case | Actual test evidence in this review | Status |
|---|---|---|
| No credential → deny | Guard unit test exists; CI suite passed | **PASS (guard unit only)** |
| Wrong credential → deny | Guard unit test exists; CI suite passed | **PASS (guard unit only)** |
| Correct credential → allow | Guard unit test exists; CI suite passed | **PASS (guard unit only)** |
| Unprivileged authenticated identity → deny | No identity/RBAC model in this guard | **NOT APPLICABLE to current guard; required before user-facing privileged access** |
| Alternate route to same operation | No HTTP/e2e route matrix executed | **BLOCKED** |
| Invalid body/query/path data | No route integration matrix executed | **BLOCKED** |
| Rejected request causes no side effect | No isolated HTTP tests with spies/fakes and state assertions executed | **BLOCKED** |
| Terminal/file/vault/scan routes safely isolated | No integration harness run; real tools were not invoked | **BLOCKED** |

A suitable follow-up test suite must use a test-only random key and mocked/fake service providers, start the Nest app in test mode, assert 401/403-style denial before handler invocation, and verify fake side-effect counters remain unchanged. The authorized case should prove only the fake service is called. Do not run these tests against production credentials or real terminal/filesystem/vault services.

## 5. Trust boundaries

- `src/main.ts` starts the Nest API on port 4000 and configures CORS for localhost origins. This source configuration does not prove the deployment is loopback-only or that a network perimeter blocks external callers.
- The shared execution key is appropriate only between trusted server-side components over a protected channel. It is not acceptable to put this key in a browser, public app bundle, or user-downloadable client.
- No verified server-side proxy/BFF or authenticated session flow was found that allows the public UI to invoke privileged actions without seeing the shared key.
- If UI access is required, use a server-side boundary that authenticates the user and authorizes the operation, then calls the internal API with the secret held only on the server. This is an architectural recommendation, not an implementation made in this review.
- Do not introduce a new RBAC model or alter public API contracts as part of this gate without separate design/review.

## 6. Confirmed defects and blockers

1. **FAIL — side-effecting GET:** `GET /projects/kvrat/docs` invokes `writeReport()`. Change to a mutation-safe method only in a separately reviewed compatibility-aware patch; no code change was made here.
2. **BLOCKED — route inventory incomplete:** additional route families in the root module and imported modules need controller-by-controller enumeration and active route resolution.
3. **BLOCKED — alternate-path coverage:** overlapping tool, agent, chat, AI, command, executor, planner, runtime, and control-plane paths have not been proven to share one enforced policy.
4. **BLOCKED — route integration tests absent:** unit tests cover the guard decision function, not HTTP routing, handler non-invocation, or side-effect absence.
5. **BLOCKED — key operations:** secure generation, storage, rotation, deployment configuration, and trusted consumers are undocumented/unverified.
6. **BLOCKED — authorization semantics:** a single shared key does not distinguish users, actions, tenants, or human approval.
7. **BLOCKED — input/path safety:** route DTO validation and filesystem containment for file/vault/report paths were not comprehensively tested in this gate.

## 7. Decision table

| Gate | Status |
|---|---|
| Expected PR head SHA and base verified | **PASS** |
| PR remains open, draft, unmerged | **PASS** |
| CI build and configured tests for exact head | **PASS** — [run 40278460138](https://github.com/KVR-Lab/KVRAT.ai/actions/runs/40278460138) |
| Guard unit behavior for missing/wrong/matching/weak key | **PASS (unit scope only)** |
| All sensitive routes enumerated and active registrations resolved | **BLOCKED** |
| Alternate paths shown to be protected | **BLOCKED** |
| HTTP integration tests for deny/allow and no side effects | **BLOCKED** |
| Key never exposed to browser/consumer | **BLOCKED** |
| Key generation/storage/rotation verified | **BLOCKED** |
| No side-effecting GET routes | **FAIL** |
| Final merge readiness | **BLOCKED — DO NOT MERGE** |

## 8. Next acceptance milestone

1. Produce a complete route map from all imported Nest modules and controller decorators; resolve duplicate `/knowledge` controllers and identify active routes.
2. Add isolated HTTP integration tests for every sensitive route and every known alternate path, using test-only credentials and fake providers only.
3. Prove denial occurs before any side effect and authorized calls hit only test doubles.
4. Fix or formally justify the side-effecting GET route, including compatibility impact.
5. Document secure key generation, secret storage, rotation, and the server-side consumer; inspect client bundles and env naming for leakage.
6. Re-run CI after any new commit and verify that the run's `head_sha` equals the final PR head.
7. Re-review the complete diff. Keep PR #18 open and unmerged until all blockers are resolved.
