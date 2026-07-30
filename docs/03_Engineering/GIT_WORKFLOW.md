# Git Workflow

**Project:** BOB Platform
**Version:** 1.0
**Status:** Engineering Standard

---

# Purpose

This document defines the official Git workflow for the BOB Platform. It standardizes branching, commits, pull requests, code reviews, releases, and version management to ensure a predictable and maintainable development process.

---

# Objectives

* Maintain a clean Git history.
* Enable parallel development.
* Reduce merge conflicts.
* Protect production code.
* Support CI/CD pipelines.
* Ensure traceability of every change.

---

# Repository Structure

```text
main
develop
feature/*
bugfix/*
hotfix/*
release/*
docs/*
refactor/*
experiment/*
```

---

# Branch Definitions

## main

Purpose

* Production-ready code.
* Protected branch.
* Always deployable.

Rules

* No direct commits.
* Merge only through Pull Requests.
* All CI checks must pass.

---

## develop

Purpose

Main integration branch.

Rules

* Receives completed features.
* Used for integration testing.
* Must remain stable.

---

## feature

Naming

```text
feature/user-authentication
feature/project-management
feature/ai-gateway
feature/dashboard
```

Rules

* Created from `develop`.
* One feature per branch.
* Deleted after merge.

---

## bugfix

Naming

```text
bugfix/login-validation
bugfix/token-refresh
bugfix/docker-config
```

Rules

* Created from `develop`.
* Merged back into `develop`.

---

## hotfix

Naming

```text
hotfix/security-patch
hotfix/database-fix
```

Rules

* Created from `main`.
* Merged into both `main` and `develop`.

---

## release

Naming

```text
release/v1.0.0
release/v1.1.0
release/v2.0.0
```

Purpose

Prepare production releases.

---

## docs

Naming

```text
docs/api-guidelines
docs/master-constitution
docs/architecture-update
```

Purpose

Documentation updates only.

---

# Development Workflow

## 1. Update Local Repository

```bash
git checkout develop
git pull origin develop
```

---

## 2. Create Feature Branch

```bash
git checkout -b feature/new-module
```

---

## 3. Implement Changes

Typical workflow

```bash
git status
git add .
git commit -m "feat: add new module"
```

Commit frequently with focused changes.

---

## 4. Synchronize with Develop

```bash
git checkout develop
git pull origin develop

git checkout feature/new-module
git merge develop
```

Resolve conflicts before continuing.

---

## 5. Push Branch

```bash
git push -u origin feature/new-module
```

---

## 6. Open Pull Request

Target branch:

```text
develop
```

Include:

* Description
* Scope
* Screenshots (if applicable)
* Testing notes
* Related issues

---

## 7. Code Review

Review checklist

* Architecture
* Readability
* Performance
* Security
* Testing
* Documentation

---

## 8. Merge

Preferred strategy

```text
Squash and Merge
```

Alternative

```text
Merge Commit
```

Avoid unnecessary merge commits.

---

# Commit Message Convention

Format

```text
<type>: <description>
```

---

## feat

```text
feat: add authentication module
```

---

## fix

```text
fix: resolve JWT validation bug
```

---

## docs

```text
docs: update architecture guide
```

---

## refactor

```text
refactor: simplify AI service
```

---

## test

```text
test: add health controller tests
```

---

## style

```text
style: format source files
```

---

## perf

```text
perf: optimize database queries
```

---

## build

```text
build: update Docker configuration
```

---

## chore

```text
chore: upgrade dependencies
```

---

# Branch Protection

The following branches must be protected:

* main
* develop

Restrictions

* No force push.
* No direct commits.
* Pull Request required.
* Review required.
* Passing CI required.

---

# Pull Request Checklist

Before requesting review:

* Build passes.
* Tests pass.
* Lint passes.
* Documentation updated.
* No debug code.
* No commented code.
* Secrets removed.

---

# Merge Conflict Resolution

Recommended process

```bash
git fetch origin

git merge origin/develop
```

Resolve conflicts manually.

Verify build.

Run tests.

Commit resolution.

---

# Versioning

Semantic Versioning

```text
MAJOR.MINOR.PATCH
```

Examples

```text
1.0.0

1.1.0

1.1.1

2.0.0
```

---

# Tags

Create release tag

```bash
git tag v1.0.0

git push origin v1.0.0
```

---

# Release Process

1. Freeze development.
2. Create release branch.
3. Execute testing.
4. Fix release issues.
5. Merge into main.
6. Tag release.
7. Merge back into develop.
8. Deploy.

---

# Emergency Hotfix Process

```text
main
   │
   ├── hotfix/security
   │
   ├── merge → main
   │
   └── merge → develop
```

---

# Git Ignore Rules

Never commit:

```text
node_modules/

dist/

coverage/

.env

.env.local

logs/

storage/uploads/

*.log
```

---

# Binary Files

Avoid committing:

* Build artifacts
* Temporary files
* IDE cache
* Database dumps
* Generated assets

Large binary assets should be stored outside Git when appropriate.

---

# Recommended Daily Workflow

```text
Pull latest changes

Create feature branch

Develop

Commit frequently

Push branch

Open Pull Request

Code Review

Merge

Delete feature branch
```

---

# Recovery Commands

Undo last commit (keep changes)

```bash
git reset --soft HEAD~1
```

Discard last commit

```bash
git reset --hard HEAD~1
```

Restore file

```bash
git restore <file>
```

View history

```bash
git log --oneline --graph --decorate
```

---

# Best Practices

* Keep commits small and focused.
* Write meaningful commit messages.
* Rebase or merge regularly.
* Never commit secrets.
* Review before merging.
* Delete merged branches.
* Keep `main` deployable at all times.
* Keep documentation synchronized with code changes.

---

# Related Documents

* DEVELOPMENT_GUIDE.md
* CODING_STANDARDS.md
* API_GUIDELINES.md
* MASTER_CONSTITUTION.md
* CHANGELOG.md
