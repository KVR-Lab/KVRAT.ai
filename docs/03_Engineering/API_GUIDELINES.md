# API Guidelines

**Project:** BOB Platform
**Version:** 1.0
**Status:** Engineering Standard

---

# Purpose

تحدد هذه الوثيقة المعايير الرسمية لتصميم وتطوير وصيانة واجهات برمجة التطبيقات (APIs) في منصة **BOB** لضمان الاتساق، وقابلية التوسع، والأمان، وسهولة الاستخدام.

---

# API Philosophy

The BOB Platform APIs are:

* RESTful
* Versioned
* Predictable
* Secure
* Stateless
* Consistent
* Well Documented
* Backward Compatible

---

# Base URL

Development

```text id="r1h9p2"
http://localhost:4002/api
```

Production

```text id="e5m4zs"
https://api.bob-platform.com/api
```

---

# API Versioning

All endpoints must be versioned.

Example

```text id="m7y8qk"
/api/v1/projects
```

Future versions

```text id="a8v0tw"
/api/v2/projects
```

---

# Resource Naming

Use plural nouns.

Correct

```text id="g3u5hr"
/users
/projects
/tasks
/organizations
```

Avoid

```text id="w6d2lp"
/getUsers
/createTask
```

---

# HTTP Methods

| Method | Purpose            |
| ------ | ------------------ |
| GET    | Retrieve resources |
| POST   | Create resource    |
| PUT    | Replace resource   |
| PATCH  | Partial update     |
| DELETE | Remove resource    |

---

# Standard Endpoint Pattern

```text id="k1z8bx"
GET    /users
GET    /users/{id}

POST   /users

PUT    /users/{id}

PATCH  /users/{id}

DELETE /users/{id}
```

---

# HTTP Status Codes

Success

| Code | Meaning    |
| ---- | ---------- |
| 200  | OK         |
| 201  | Created    |
| 202  | Accepted   |
| 204  | No Content |

Client Errors

| Code | Meaning          |
| ---- | ---------------- |
| 400  | Bad Request      |
| 401  | Unauthorized     |
| 403  | Forbidden        |
| 404  | Not Found        |
| 409  | Conflict         |
| 422  | Validation Error |

Server Errors

| Code | Meaning               |
| ---- | --------------------- |
| 500  | Internal Server Error |
| 502  | Bad Gateway           |
| 503  | Service Unavailable   |

---

# Response Format

Success Response

```json
{
  "success": true,
  "data": {},
  "meta": {},
  "timestamp": "2026-07-05T00:00:00Z"
}
```

---

# Error Response

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed."
  },
  "timestamp": "2026-07-05T00:00:00Z"
}
```

---

# Pagination

Requests

```text id="p6l9yc"
GET /projects?page=1&limit=20
```

Response

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 250,
    "pages": 13
  }
}
```

---

# Filtering

Example

```text id="q0n4sf"
/projects?status=active
```

Multiple filters

```text id="z8r1ku"
/projects?status=active&owner=123
```

---

# Sorting

Ascending

```text id="d5j7wa"
/projects?sort=name
```

Descending

```text id="o4v3xp"
/projects?sort=-createdAt
```

---

# Searching

```text id="u8m2ce"
/projects?search=AI
```

---

# Authentication

Protected endpoints require JWT.

Header

```text id="n7g5iy"
Authorization: Bearer <access_token>
```

---

# Authorization

Role-based access control (RBAC).

Examples

* Admin
* Owner
* Manager
* Member
* Viewer

---

# Validation

Every request must be validated.

Validation includes:

* Required fields
* Data types
* Length
* Range
* Enum values
* Business rules

---

# DTO Usage

All request and response payloads must use DTOs.

Never expose database entities directly.

---

# Naming Conventions

JSON fields use camelCase.

Example

```json
{
  "projectName": "AI Platform",
  "createdAt": "2026-07-05T00:00:00Z"
}
```

---

# Date Format

Always use ISO 8601.

Example

```text id="v3k1qn"
2026-07-05T14:30:00Z
```

---

# Idempotency

The following methods must be idempotent:

* GET
* PUT
* DELETE

POST operations may support idempotency keys where appropriate.

---

# Rate Limiting

Default limits:

* Anonymous requests
* Authenticated requests
* Administrative APIs

Limits are configurable.

---

# Logging

Every request should log:

* Request ID
* User ID
* Endpoint
* Method
* Response Time
* Status Code

Sensitive information must never be logged.

---

# Error Codes

Standard application codes:

```text id="b5h9dt"
VALIDATION_ERROR
UNAUTHORIZED
FORBIDDEN
NOT_FOUND
CONFLICT
INTERNAL_ERROR
```

---

# Security Requirements

* HTTPS in production
* JWT authentication
* Input validation
* Output sanitization
* Rate limiting
* CORS configuration
* Secure headers
* Audit logging

---

# API Documentation

All endpoints must be documented using OpenAPI (Swagger).

Documentation should include:

* Description
* Parameters
* Request body
* Responses
* Error codes
* Authentication requirements
* Examples

---

# API Version Policy

Breaking changes require a new API version.

Non-breaking improvements may be added to the current version.

---

# Deprecation Policy

Deprecated endpoints must:

* Remain functional during the transition period.
* Be clearly documented.
* Include migration guidance.
* Announce the planned removal date.

---

# Performance Guidelines

* Minimize payload size.
* Support pagination.
* Avoid unnecessary nested objects.
* Optimize database queries.
* Cache frequently requested data.

---

# Testing Requirements

Every endpoint should have:

* Unit Tests
* Integration Tests
* Authorization Tests
* Validation Tests
* Error Handling Tests
* Performance Tests

---

# Engineering Rules

* Use Controllers only for HTTP handling.
* Business logic belongs in Services.
* Database access belongs in Repositories.
* Validate every request.
* Never expose internal implementation details.
* Maintain backward compatibility whenever possible.

---

# Related Documents

* BACKEND_ARCHITECTURE.md
* DATABASE_ARCHITECTURE.md
* SECURITY_GUIDELINES.md
* CODING_STANDARDS.md
* MASTER_CONSTITUTION.md
