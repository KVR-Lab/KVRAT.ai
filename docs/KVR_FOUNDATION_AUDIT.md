# KVR Foundation Audit

**Audit date:** 2026-10-25  
**Baseline branch:** `main`  
**Baseline commit:** `8ce90e8e320bfd316b43ec0e69edab16f692243e`  
**Working branch:** `foundation/execution-boundaries-2026-10-25`  
**Audit mode:** Remote repository inspection; local build/test execution unavailable in the current runtime  
**Status:** Implementation is on an isolated draft pull request. GitHub Actions run [40229251112](https://github.com/KVR-Lab/KVRAT.ai/actions/runs/40229251112) completed successfully for the branch head `ee72eb2732487c7418119acfc6c1181d7aed44f6`; build and configured Jest test steps both report success. Local execution and end-to-end route verification remain unavailable.

## 1. Repository and environment baseline

- The repository inspected was [KVR-Lab/KVRAT.ai](https://github.com/KVR-Lab/KVRAT.ai), default branch `main`.
- The baseline commit was [`8ce90e8e320bfd316b43ec0e69edab16f692243e`](https://github.com/KVR-Lab/KVRAT.ai/commit/8ce90e8e320bfd316b43ec0e69edab16f692243e), message: `Fix supplier email validation and notes line breaks (#17)`.
- GitHub returned a non-truncated tree with 2,314 entries for that commit.
- The root `package.json` names the package `kvr-core`; the README title is `KVR-Core` and describes KVRAT.ai as an intelligent application powered by KVR-Core. This supports a same-repository monorepo relationship at this revision, not proof that the two products have identical boundaries.
- The requested alternative `Bobdedoxrx/kvr-core` returned HTTP 404 through the active GitHub connection. GitHub's response does not distinguish a nonexistent repository from a private or otherwise inaccessible repository, so its relationship to this repository remains **UNKNOWN**.
- No checkout of either target repository exists in the available local runtime. The environment has Git 2.47.3 and Node.js 22.16.0; pnpm is not installed. A direct `git ls-remote` attempt failed because the runtime could not resolve `github.com`. Therefore local `git status`, local branch/worktree status, build, and test commands could not be run.
- The original directive's final text after `What should be implement…` could not be recovered from repository search. The complete requirements visible in the task are used; the missing continuation has not been invented.

## 2. Confirmed findings from the baseline

### 2.1 Privileged execution endpoints had no visible authorization boundary

Evidence reviewed:

- [`src/main.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/main.ts) creates the Nest application, configures CORS, and listens on port 4000; no global authorization guard is configured there.
- [`src/app.module.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/app.module.ts) imports the Tool, Agent, Projects, Runtime, Knowledge, Memory, Security, and Control Plane modules.
- [`src/tools/tool.controller.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/tools/tool.controller.ts) dispatches a request-selected tool and forwards request-supplied arguments.
- [`src/tools/tool.registry.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/tools/tool.registry.ts) registers `terminal.run`, `file.read`, `file.write`, and `file.list`.
- [`src/tools/builtin/terminal.tool.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/tools/builtin/terminal.tool.ts) invokes `execSync(command)` with a caller-supplied command.
- [`src/tools/builtin/file.tool.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/tools/builtin/file.tool.ts) reads, writes, and lists caller-supplied paths.
- [`src/agent/agent.controller.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/agent/agent.controller.ts) forwards the request body to the agent pipeline. [`src/agent/agent.pipeline.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/agent/agent.pipeline.ts) routes `task.tool` to the ToolRouter and `task.shell` to PowerShell command execution.
- [`src/chat/chat.service.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/chat/chat.service.ts) maps messages beginning with `/ps ` to a shell task.
- A repository code search for `UseGuards`, `APP_GUARD`, and `AuthGuard` returned no results. This is corroborating evidence, not proof that every possible deployment-level perimeter was examined.
- Network reachability in a deployed environment was not verified. The confirmed finding is missing application-level authorization in reviewed route implementations, with risk dependent on exposure.

### 2.2 Task/runtime lifecycle is incomplete

- [`src/planner/planner.service.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/planner/planner.service.ts) keeps its queue in an in-memory array.
- [`src/tasks/task.queue.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/tasks/task.queue.ts) also keeps tasks in memory; it is not the same queue consumed by `RuntimeLoop`.
- [`src/runtime/runtime.loop.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/runtime/runtime.loop.ts) creates IDs using `Date.now()`, dispatches plans, and executes results without an enclosing error-to-task-state transition or durable task record.
- [`src/runtime/runtime.service.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/runtime/runtime.service.ts) reports `running: true` and creates a new `startedAt` value on every status request.
- [`src/gateway/health.controller.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/gateway/health.controller.ts) returns fixed `agent`, `memory`, and `runtime` booleans; [`src/runtime/runtime.engine.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/runtime/runtime.engine.ts) returns input inside a generic success result rather than demonstrating real task execution.
- These are source-level findings; end-to-end runtime behavior was not executed.

### 2.3 Persistence is fragmented

- `TaskQueue`, `StorageService`, and `MemoryStore` hold data in process memory.
- `MemoryService` separately persists JSON to `data/memory.json`.
- No unified durable task lifecycle (queued/running/completed/failed, result, error, recovery) was found in the reviewed path. It would be inaccurate to claim that every memory implementation is ephemeral.

### 2.4 Knowledge provenance is missing from the simple loader

[`src/knowledge/knowledge.service.ts`](https://github.com/KVR-Lab/KVRAT.ai/blob/8ce90e8e320bfd316b43ec0e69edab16f692243e/src/knowledge/knowledge.service.ts) recursively loads Markdown files under `docs` and exposes name/path/content without classifying document authority, approval status, freshness, or historical status. Runtime precedence is not enforced by this service.

### 2.5 CI workflow path was not discoverable as a GitHub Actions workflow

- The baseline tree contains `github/workflows/ci.yml`, not the required `.github/workflows/ci.yml` path.
- The root `.github` entry was a tracked blob containing only a newline, which conflicts with creating a nested `.github/workflows` directory unless relocated.
- The GitHub Actions API returned `total_count: 0` workflow runs at the time of baseline inspection. After the workflow was restored on the feature branch, run [40229251112](https://github.com/KVR-Lab/KVRAT.ai/actions/runs/40229251112) completed successfully.
- These findings are consistent with CI not being activated by the checked-in workflow path. The absence of runs alone does not prove every possible repository Actions setting.

## 3. Changes in this branch

The branch introduces a shared, fail-closed execution-key guard and tests for its decision logic. The guard accepts only a server-configured `KVR_EXECUTION_API_KEY` of at least 32 UTF-8 bytes, requires the `x-kvr-execution-key` header, and compares equal-length values using a timing-safe comparison. No key value or production secret is committed.

The guard is attached to internal/privileged controller surfaces for tools, agents, chat/command execution, planning, project management, KVRAT project file operations, memory, knowledge, security/vault access, identity status, and control-plane actions. Some controller files are not registered by the current `AppModule`/module metadata; they were guarded defensively, but their effective route registration remains unverified.

This key is shared technical access control, **not** user identity, RBAC, per-action human approval, or an approval ledger. The current UI/client integration has not been changed to send this header because embedding a privileged key in browser code would disclose it. Runtime use therefore requires a trusted server-side caller or a proper authenticated/session-backed control plane.

The workflow was copied to the canonical `.github/workflows/ci.yml` path with setup order corrected. The original `github/workflows/ci.yml` file was preserved. The newline-only root `.github` placeholder was relocated byte-for-byte to `docs/archive/root-dot-github-placeholder.txt` so a valid workflow directory can exist.

## 4. Verification status

- Workflow run [40229119186](https://github.com/KVR-Lab/KVRAT.ai/actions/runs/40229119186) installed dependencies and passed `pnpm build`, but its test command failed because the extra `--` made Jest treat `--runInBand` as a test-path pattern. The workflow command was corrected to `pnpm test --runInBand`.

- GitHub Actions run [40229008219](https://github.com/KVR-Lab/KVRAT.ai/actions/runs/40229008219) failed during pnpm setup because the action input and root `package.json` both specified pnpm versions. The workflow was corrected to derive the pinned version from `package.json`.

- Guard unit tests were added; they have **not** been run locally.
- Build, lint, unit tests, and e2e tests could not be run in the current container because no checkout is present, pnpm is unavailable, and direct GitHub network access fails at DNS resolution.
- The canonical GitHub Actions workflow is intended to run build and unit tests on the review pull request. Its actual outcome must be checked before considering this patch verified.
- No production deployment or production secret change was performed.


## Post-merge state update — 2026-10-26

This addendum updates the live state; it does not rewrite the historical pre-merge findings above.

- PR #18 is closed and merged at `2026-10-26T09:03:10Z`: [PR #18](https://github.com/KVR-Lab/KVRAT.ai/pull/18).
- Merge commit: [`1e24c680074aa07cee9ddef3f3dbf10838d1bf1f`](https://github.com/KVR-Lab/KVRAT.ai/commit/1e24c680074aa07cee9ddef3f3dbf10838d1bf1f).
- Final PR head: `de0f1c7b61b337226e2cfe4199bb14b13d6c1942`. Earlier verification run 40278460138 was for `b621ec177044c221a25b06319d188eb281914a6e`; it must not be represented as a check on the final head or merge commit.
- The newest commit returned by repository commit search was the merge commit. Because a direct `refs/heads/main` lookup is not exposed in the available connector actions, current main-ref equality is **BLOCKED pending explicit confirmation**.
- PR #18 introduced the execution-key guard and unit tests, added controller-level decorators to the reviewed sensitive controllers, and restored the canonical workflow at `.github/workflows/ci.yml`. The PR changed 23 paths; see the PR changed-files view for the exact list.
- The source-level finding remains: `GET /projects/kvrat/docs` invokes `writeReport()`. No code change has been made to correct it in this addendum.
- No HTTP integration suite was executed here. No evidence currently establishes coverage of every active route, alternate path, denied-request side effects, key lifecycle, production exposure, or production runtime behavior.
- **Current security conclusion: BLOCKED.** The successful CI run proves only that the configured steps succeeded on the SHA that run tested; it does not prove production security or complete route coverage.
