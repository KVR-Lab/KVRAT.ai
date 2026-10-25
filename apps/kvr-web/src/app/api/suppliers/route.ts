import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedCategories = new Set([
  "أدوات ومستلزمات التغليف",
  "ماكينات وخطوط التعبئة والتغليف",
  "العبوات البلاستيكية",
  "العبوات الكرتونية والورقية",
  "الأكياس والشنط",
  "مواد التعبئة والتغليف",
  "الاسترتش والشرنك",
  "الطباعة والملصقات",
  "الزجاجات والبرطمانات",
  "مستلزمات المصانع والمواد الخام",
  "منتجات أخرى",
]);

function cleanText(value: unknown): string | null {
  return typeof value === "string" ? value.trim() : null;
}

function validLength(value: string, min: number, max: number): boolean {
  return value.length >= min && value.length <= max;
}

export async function POST(request: Request) {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return NextResponse.json(
      { error: "خدمة حفظ بيانات الموردين غير مهيأة بعد. لم يتم تأكيد التسجيل." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "بيانات الطلب غير صالحة." }, { status: 400 });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "تعذر قراءة بيانات النموذج." }, { status: 400 });
  }

  const contactPerson = cleanText(body.contactPerson);
  const companyName = cleanText(body.companyName);
  const businessType = cleanText(body.businessType);
  const phone = cleanText(body.phone);
  const governorate = cleanText(body.governorate);

  if (
    !contactPerson ||
    !companyName ||
    !businessType ||
    !phone ||
    !governorate ||
    !validLength(contactPerson, 2, 180) ||
    !validLength(companyName, 2, 180) ||
    !validLength(businessType, 1, 100) ||
    !validLength(phone, 7, 30) ||
    !validLength(governorate, 2, 80)
  ) {
    return NextResponse.json(
      { error: "راجع الحقول المطلوبة وتأكد من إدخال بيانات صحيحة." },
      { status: 400 },
    );
  }

  if (body.privacyConsent !== true) {
    return NextResponse.json(
      { error: "يلزم الإقرار بصحة البيانات والموافقة على استخدامها للتواصل بشأن التسجيل." },
      { status: 400 },
    );
  }

  const whatsapp = cleanText(body.whatsapp) ?? "";
  const email = cleanText(body.email) ?? "";
  const city = cleanText(body.city) ?? "";
  const website = cleanText(body.website) ?? "";
  const products = cleanText(body.products) ?? "";
  const coverage = cleanText(body.coverage) ?? "";
  const notes = cleanText(body.notes) ?? "";

  if (
    !validLength(whatsapp, 0, 30) ||
    !validLength(email, 0, 254) ||
    !validLength(city, 0, 120) ||
    !validLength(website, 0, 500) ||
    !validLength(products, 0, 1000) ||
    !validLength(coverage, 0, 300) ||
    !validLength(notes, 0, 1000)
  ) {
    return NextResponse.json(
      { error: "أحد الحقول يتجاوز الطول المسموح به." },
      { status: 400 },
    );
  }

  if (!email || !validLength(email, 5, 254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "البريد الإلكتروني مطلوب، وأدخل عنوانًا صحيحًا." }, { status: 400 });
  }

  if (website) {
    try {
      const parsedWebsite = new URL(website);
      if (parsedWebsite.protocol !== "http:" && parsedWebsite.protocol !== "https:") {
        throw new Error("Invalid protocol");
      }
    } catch {
      return NextResponse.json(
        { error: "أدخل رابطًا يبدأ بـ https:// أو http://." },
        { status: 400 },
      );
    }
  }

  const categories = Array.isArray(body.productCategories)
    ? body.productCategories.filter(
        (category): category is string =>
          typeof category === "string" && allowedCategories.has(category),
      )
    : [];

  const record = {
    company_name: companyName,
    contact_person: contactPerson,
    business_type: businessType,
    phone,
    whatsapp: whatsapp || null,
    email: email || null,
    governorate,
    city: city || null,
    website: website || null,
    products: products || null,
    product_categories: [...new Set(categories)],
    coverage: coverage || null,
    notes: notes || null,
    privacy_consent: true,
    contact_consent: body.contactConsent === true,
  };

  try {
    const response = await fetch(supabaseUrl + "/rest/v1/suppliers", {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: "Bearer " + anonKey,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(record),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Supplier registration insert failed", {
        status: response.status,
      });
      return NextResponse.json(
        { error: "تعذر حفظ البيانات حاليًا. لم يتم تأكيد التسجيل؛ حاول مرة أخرى لاحقًا." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "تعذر الاتصال بخدمة حفظ البيانات. لم يتم تأكيد التسجيل." },
      { status: 502 },
    );
  }
}
