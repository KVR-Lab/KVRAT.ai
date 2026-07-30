# Changelog

جميع التغييرات المهمة في مشروع **KVRAT.ai** يتم توثيقها في هذا الملف.

يعتمد هذا المشروع على مبادئ **Keep a Changelog** مع الالتزام بالإصدار الدلالي (Semantic Versioning).

---

# [Unreleased]

## Added

* إنشاء مستودع المشروع (Monorepo).
* إنشاء هيكل المجلدات الأساسي.
* إعداد بيئة Node.js 20.
* إضافة ملفات:

  * `.nvmrc`
  * `.npmrc`
  * `.editorconfig`
* إعداد Git للمشروع.
* إنشاء دستور المشروع:

  * `core/constitution/MASTER_CONSTITUTION.md`
* إنشاء هيكل التوثيق الرسمي.
* إنشاء تطبيق **studio-api** باستخدام NestJS.
* إنشاء تطبيق **studio-web**.
* إنشاء الوحدات (Modules):

  * AI
  * Command Center
  * Health
  * System
* إنشاء ملف `docker-compose.yml`.
* إعداد خدمات Docker.
* تشغيل PostgreSQL.
* تشغيل Redis.

## Infrastructure

* اعتماد Docker Compose كبيئة تشغيل محلية.
* اعتماد PostgreSQL كقاعدة البيانات الرئيسية.
* اعتماد Redis للتخزين المؤقت والرسائل.

## Documentation

* بدء إنشاء المرجع الرسمي للمشروع.
* اعتماد مجلد `docs` كمصدر رسمي للتوثيق.
* اعتماد مجلد `core/constitution` كمرجع للسياسات والدستور.

---

# [0.1.0] - 2026-07-04

## Initial Foundation

### Added

* إنشاء مشروع KVRAT.ai.
* إعداد بيئة التطوير.
* إنشاء أول Commit للمشروع.
* إعداد Docker.
* إنشاء البنية الأساسية للتطبيق.
* بدء كتابة الوثائق الرسمية.

---

## Versioning Policy

يتبع المشروع قواعد Semantic Versioning:

* MAJOR: تغييرات غير متوافقة.
* MINOR: إضافة ميزات جديدة.
* PATCH: إصلاحات وتحسينات.

---

## Change Categories

* Added
* Changed
* Deprecated
* Removed
* Fixed
* Security
* Performance
* Documentation
* Infrastructure

---

آخر تحديث:
2026-07-05
