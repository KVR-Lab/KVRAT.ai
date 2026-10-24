import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SupplierLeadInput = {
  fullName?: unknown;
  companyName?: unknown;
  phone?: unknown;
  companyType?: unknown;
  governorate?: unknown;
  categories?: unknown;
  privacyConsent?: unknown;
  contactConsent?: unknown;
};

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let body: SupplierLeadInput;
  try {
    body = (await request.json()) as SupplierLeadInput;
  } catch {
    return NextResponse.json({ error: "صيغة البيانات غير صحيحة." }, { status: 400 });
  }

  const fullName = cleanText(body.fullName, 120);
  const companyName = cleanText(body.companyName, 160);
  const phone = cleanText(body.phone, 40);
  const companyType = cleanText(body.companyType, 80) || null;
  const governorate = cleanText(body.governorate, 80) || null;
  const categories = Array.isArray(body.categories)
    ? body.categories.filter((item): item is string => typeof item === "string").slice(0, 20).map((item) => item.slice(0, 120))
    : [];

  if (!fullName || !companyName || !phone) {
    return NextResponse.json({ error: "يرجى إدخال اسم المسؤول واسم الشركة ورقم الهاتف." }, { status: 400 });
  }
  if (phone.length < 7 || !/[0-9٠-٩۰-۹]/.test(phone)) {
    return NextResponse.json({ error: "يرجى إدخال رقم هاتف صحيح للتواصل." }, { status: 400 });
  }
  if (body.privacyConsent !== true) {
    return NextResponse.json({ error: "يلزم الموافقة على استخدام البيانات للتواصل بشأن التسجيل." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { error: "خدمة حفظ البيانات غير مهيأة بعد. يرجى المحاولة لاحقًا." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/supplier_leads`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        full_name: fullName,
        company_name: companyName,
        phone,
        company_type: companyType,
        governorate,
        categories,
        privacy_consent: true,
        contact_consent: body.contactConsent === true,
        status: "new",
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Supplier lead storage failed with status:", response.status);
      return NextResponse.json(
        { error: "تعذر حفظ البيانات الآن. حاول مرة أخرى لاحقًا." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "تعذر الاتصال بخدمة حفظ البيانات. حاول مرة أخرى لاحقًا." },
      { status: 502 },
    );
  }
}
