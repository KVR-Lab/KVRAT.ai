# Database Architecture

**Project:** BKVRAT.aiOB Platform
**Version:** 1.0
**Status:** Architecture Specification

---

# Purpose

تحدد هذه الوثيقة البنية الرسمية لقواعد البيانات في منصة **KVRAT.ai**، وآلية تخزين البيانات، وإدارة العلاقات، وسياسات الأداء، والأمان، والنسخ الاحتياطي، مع ضمان قابلية التوسع والاعتمادية.

---

# Design Principles

* PostgreSQL as Primary Database
* ACID Compliance
* Normalized Data Model
* Strong Referential Integrity
* Secure by Default
* High Availability
* Scalable Architecture
* Backup First
* Migration Driven
* Audit Friendly

---

# Technology Stack

| Component       | Technology         |
| --------------- | ------------------ |
| Database Engine | PostgreSQL 17      |
| ORM             | TypeORM            |
| Cache           | Redis 7            |
| Migration Tool  | TypeORM Migrations |
| Connection Pool | PostgreSQL Pool    |
| Container       | Docker             |

---

# High-Level Architecture

```text
                Applications
                     │
                     ▼
              TypeORM Repository
                     │
                     ▼
             PostgreSQL Database
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
 Business Data   Audit Data    System Data
                     │
                     ▼
                 Redis Cache
```

---

# Database Responsibilities

The database is responsible for:

* Persistent storage
* Transactions
* Relationships
* Data integrity
* Security
* Auditing
* Reporting support

---

# Main Schemas

```text
public
system
audit
ai
analytics
```

---

# Core Entities

## Users

Stores platform users.

Main Fields

* id
* email
* password_hash
* first_name
* last_name
* status
* created_at
* updated_at

---

## Organizations

Stores organizations.

Main Fields

* id
* name
* slug
* owner_id
* created_at

---

## Workspaces

Stores collaborative workspaces.

---

## Projects

Stores projects.

---

## Tasks

Stores project tasks.

---

## Documents

Stores uploaded documents and metadata.

---

## AI Conversations

Stores AI conversations.

---

## AI Messages

Stores conversation messages.

---

## AI Memory

Stores long-term memory records.

---

## Audit Logs

Stores security and operational events.

---

## System Settings

Stores platform configuration values.

---

# Entity Relationships

```text
Organization
      │
      ├────────── Users
      │
      ├────────── Workspaces
      │
      └────────── Projects
                     │
                     ├──── Tasks
                     ├──── Documents
                     └──── AI Conversations
```

---

# Naming Conventions

Tables

* snake_case
* plural names

Examples

* users
* organizations
* projects
* tasks
* audit_logs

Columns

* snake_case

Primary Keys

* id (UUID)

Foreign Keys

* *_id

Timestamps

* created_at
* updated_at
* deleted_at

---

# UUID Strategy

Every primary entity shall use UUID identifiers.

Benefits

* Global uniqueness
* Easier replication
* Better distributed architecture support

---

# Soft Delete

Entities supporting deletion shall use:

```text
deleted_at
```

instead of permanent deletion whenever possible.

---

# Transactions

Transactions are mandatory for:

* User registration
* Organization creation
* Project creation
* Billing operations
* AI billing records
* Critical updates

---

# Indexing Strategy

Indexes shall exist for:

* Primary Keys
* Foreign Keys
* Email
* Slug
* Status
* Created Date
* Updated Date

Additional indexes may be added after performance analysis.

---

# Redis Responsibilities

Redis is responsible for:

* Session Cache
* API Cache
* Rate Limiting
* Queue Storage
* Distributed Locks
* Temporary AI Context

Redis is **not** the system of record.

---

# Migrations

All schema changes must be applied using TypeORM migrations.

Direct database modifications are prohibited.

---

# Backup Strategy

Daily Backups

* Full database backup

Hourly Backups

* Incremental backups

Retention

* Daily backups: 30 days
* Weekly backups: 12 weeks
* Monthly backups: 12 months

---

# Security

* Encrypted connections
* Least privilege access
* Environment-based credentials
* Password hashing
* Row ownership validation
* Audit logging

Sensitive data shall never be stored in plain text.

---

# Performance

Performance targets include:

* Efficient indexing
* Query optimization
* Connection pooling
* Read caching
* Pagination
* Lazy loading where appropriate

---

# Scalability

Future scalability includes:

* Read replicas
* Database partitioning
* Sharding (if required)
* Multi-region deployment
* Managed cloud database services

---

# Disaster Recovery

Recovery objectives:

* Automatic backups
* Point-in-time recovery
* Automated restoration procedures
* Regular recovery testing

---

# Monitoring

Database monitoring shall include:

* CPU usage
* Memory usage
* Active connections
* Slow queries
* Lock detection
* Disk usage
* Replication status

---

# Future Enhancements

* Multi-tenant schema isolation
* Database encryption at rest
* Read replica clusters
* Analytics warehouse
* Data lake integration

---

# Related Documents

* BACKEND_ARCHITECTURE.md
* SYSTEM_ARCHITECTURE.md
* SECURITY_ARCHITECTURE.md
* REQUIREMENTS.md
* MASTER_CONSTITUTION.md
