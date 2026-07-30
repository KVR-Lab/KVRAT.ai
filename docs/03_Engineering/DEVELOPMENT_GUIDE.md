# Development Guide

**Project:** BOB Platform
**Version:** 1.0
**Status:** Engineering Guide

---

# Purpose

يوضح هذا الدليل كيفية إعداد بيئة التطوير، تشغيل النظام، تنظيم سير العمل، والمساهمة في تطوير منصة **BOB** بطريقة موحدة ومتوافقة مع معايير المشروع.

---

# Target Audience

* Backend Developers
* Frontend Developers
* AI Engineers
* DevOps Engineers
* QA Engineers
* Technical Writers

---

# Technology Stack

| Component        | Technology     |
| ---------------- | -------------- |
| Runtime          | Node.js 20 LTS |
| Package Manager  | npm Workspaces |
| Backend          | NestJS         |
| Frontend         | Next.js        |
| Database         | PostgreSQL 17  |
| Cache            | Redis 7        |
| ORM              | TypeORM        |
| Containerization | Docker         |
| Language         | TypeScript     |

---

# Repository Structure

```text
BOB/
│
├── apps/
│   ├── studio-api/
│   └── studio-web/
│
├── packages/
│   ├── ai/
│   ├── config/
│   ├── engine/
│   ├── shared/
│   ├── types/
│   └── ui/
│
├── docs/
├── docker/
├── scripts/
├── storage/
├── config/
└── core/
```

---

# Prerequisites

Install:

* Node.js 20 LTS
* Git
* Docker Desktop
* Visual Studio Code
* PostgreSQL (optional when using Docker)
* Redis (optional when using Docker)

---

# Initial Setup

Clone repository

```bash
git clone <repository-url>
cd BOB
```

Install dependencies

```bash
npm install
```

---

# Environment Configuration

Create:

```text
.env
```

Example

```text
NODE_ENV=development

PORT=4000

DATABASE_URL=postgres://postgres:postgres@localhost:5432/bob

REDIS_HOST=localhost

REDIS_PORT=6379

JWT_SECRET=change-me

OPENAI_API_KEY=
```

Secrets must never be committed.

---

# Docker Environment

Start services

```bash
docker compose up -d
```

Check containers

```bash
docker ps
```

Stop services

```bash
docker compose down
```

---

# Install Dependencies

Workspace

```bash
npm install
```

Single application

```bash
npm install --workspace apps/studio-api
```

---

# Running Backend

Development

```bash
npm run start:dev --workspace apps/studio-api
```

Production

```bash
npm run build --workspace apps/studio-api

npm run start --workspace apps/studio-api
```

---

# Running Frontend

Development

```bash
npm run dev --workspace apps/studio-web
```

Production

```bash
npm run build --workspace apps/studio-web

npm run start --workspace apps/studio-web
```

---

# Building

Entire workspace

```bash
npm run build
```

Specific project

```bash
npm run build --workspace apps/studio-api
```

---

# Testing

Run all tests

```bash
npm test
```

Run backend tests

```bash
npm test --workspace apps/studio-api
```

Run E2E

```bash
npm run test:e2e --workspace apps/studio-api
```

Coverage

```bash
npm run test:cov --workspace apps/studio-api
```

---

# Linting

Run lint

```bash
npm run lint
```

Auto-fix

```bash
npm run lint -- --fix
```

---

# Formatting

Format project

```bash
npm run format
```

---

# Development Workflow

1. Pull latest changes.
2. Create a feature branch.
3. Implement the feature.
4. Write tests.
5. Run lint.
6. Run build.
7. Commit changes.
8. Open Pull Request.
9. Code Review.
10. Merge after approval.

---

# Branch Strategy

```text
main
develop
feature/*
bugfix/*
release/*
hotfix/*
```

---

# Commit Convention

Examples

```text
feat: add AI gateway

fix: resolve JWT validation

refactor: simplify project service

docs: update architecture

test: add health controller tests

chore: upgrade dependencies
```

---

# Creating a New Module

Generate module

```bash
nest generate module modules/example
```

Generate service

```bash
nest generate service modules/example
```

Generate controller

```bash
nest generate controller modules/example
```

---

# Project Structure Rules

Each module should contain:

```text
controller

service

dto

entities

repositories

interfaces

tests
```

---

# Coding Standards

Every contribution must:

* Follow SOLID principles.
* Use dependency injection.
* Keep controllers lightweight.
* Place business logic in services.
* Validate all incoming data.
* Avoid duplicated code.

---

# Documentation Rules

Every new feature should update:

* API documentation
* Architecture documents (if applicable)
* User documentation (when required)
* Changelog

---

# Logging

Log:

* Application startup
* Errors
* Warnings
* Business events

Never log:

* Passwords
* Tokens
* Secrets
* Personal data

---

# Debugging

Useful commands

```bash
docker logs bob-postgres

docker logs bob-redis

docker ps

npm run start:dev
```

---

# Database

After schema changes:

```bash
npm run migration:generate

npm run migration:run
```

---

# Security Checklist

Before every merge:

* No hardcoded secrets.
* Input validation completed.
* Authentication verified.
* Authorization verified.
* Dependencies updated.
* No debug code.

---

# Pull Request Checklist

* Feature works correctly.
* Tests pass.
* Build succeeds.
* Documentation updated.
* No lint errors.
* Code reviewed.

---

# Common Problems

## Port already in use

Check:

```bash
netstat -ano
```

---

## Docker not running

Start Docker Desktop

Verify:

```bash
docker info
```

---

## Database unavailable

Check containers

```bash
docker ps
```

Restart

```bash
docker compose restart
```

---

## Dependencies corrupted

Clean installation

```bash
rm -rf node_modules

npm install
```

---

# Best Practices

* Commit frequently.
* Keep pull requests small.
* Write self-documenting code.
* Prefer composition over inheritance.
* Keep functions focused.
* Document architectural decisions.

---

# Related Documents

* CODING_STANDARDS.md
* API_GUIDELINES.md
* SYSTEM_ARCHITECTURE.md
* BACKEND_ARCHITECTURE.md
* DATABASE_ARCHITECTURE.md
* MASTER_CONSTITUTION.md
