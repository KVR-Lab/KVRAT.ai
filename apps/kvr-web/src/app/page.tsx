 "use client";

import { useState } from "react";

const BRAND = {
  orange: "#F97316",
  blue: "#123B66",
  dark: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  light: "#F8FAFC",
};

const categories = [
  "أدوات ومستلزمات التغليف",
  "ماكينات وخطوط التعبئة والتغليف",
  "العبوات البلاستيكية",
  "العبوات الكرتونية والورقية",
  "الأكياس والشنط",
  "مواد التعبئة والتغليف",
  "الاسترتش والشرنك",
  "الطباعة والتغليف",
  "الملصقات والليبل",
  "الزجاجات والبرطمانات",
  "مستلزمات المصانع",
  "المواد الخام",
  "منتجات أخرى",
];

const governorates = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "القليوبية",
  "الشرقية",
  "الغربية",
  "المنوفية",
  "الدقهلية",
  "البحيرة",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "شمال سيناء",
  "جنوب سيناء",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر",
  "الوادي الجديد",
  "مطروح",
];

const companyTypes = [
  "مصنع",
  "شركة توريدات",
  "مورد",
  "تاجر جملة",
  "موزع",
  "مستورد",
  "وكيل تجاري",
  "ورشة أو منشأة إنتاج",
  "أخرى",
];

const supplyTypes = [
  "تصنيع محلي",
  "تجارة وتوريد",
  "استيراد",
  "تصنيع وتوريد",
];

const initialForm = {
  fullName: "",
  companyName: "",
  companyType: "",
  phone: "",
  whatsapp: "",
  email: "",
  governorate: "",
  city: "",
  address: "",
  website: "",
  facebook: "",
  categories: [] as string[],
  products: "",
  brands: "",
  productionCapacity: "",
  coverage: "",
  minimumOrder: "",
  yearsInBusiness: "",
  supplyType: "",
  notes: "",
  privacyConsent: false,
  contactConsent: false,
};

type SupplierForm = typeof initialForm;

function SectionTitle
