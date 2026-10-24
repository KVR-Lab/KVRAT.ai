import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const registrationSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  contactRole: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(7).max(30),
  whatsapp: z.string().trim().min(7).max(30),
  city: z.string().trim().min(2).max(120),
  companyName: z.string().trim().max(180).optional().default(""),
  companyType: z.string().trim().max(100).optional().default(""),
  email: z.union([z.string().trim().email().max(254), z.literal("")]).optional().default(""),
  governorate: z.string().trim().max(100).optional().default(""),
  website: z.union([z.string().trim().url().max(500), z.literal("")]).optional().default(""),
  products: z.string().trim().max(3000).optional().default(""),
  productCategories: z.array(z.string().trim().max(120)).max(40).optional().default([]),
  coverage: z.string().trim().max(500).optional().default(""),
  notes: z.string().trim().max(3000).optional().default(""),
  privacyConsent: z.literal(true),
  contactConsent: z.boolean().optional().default(false),
});

const json = (message: string, status: number) =>
  NextResponse.json({ ok: status < 400, message }, { status });

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json("صيغة الطلب غير مدعومة.", 415);
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json("تعذر قراءة البيانات. راجع الحقول وحاول مرة أخرى.", 400);
  }

  const parsed = registrationSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: "راجع الحقول المطلوبة وصحة أرقام التواصل والموافقة.", errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("Supplier registration is not configured: missing server-side Supabase environment variables.");
    return json("التسجيل غير متاح مؤقتًا. لم يتم حفظ البيانات؛ حاول لاحقًا.", 503);
  }

  const data = parsed.data;
  const row = {
    contact_person: data.fullName,
    contact_role: data.contactRole,
    company_name: data.companyName,
    business_type: data.companyType,
    phone: data.phone,
    whatsapp: data.whatsapp,
    email: data.email || null,
    governorate: data.governorate,
    city: data.city,
    website: data.website || null,
    products: data.products,
    product_categories: data.productCategories,
    coverage: data.coverage,
    notes: data.notes,
    privacy_consent: data.privacyConsent,
    contact_consent: data.contactConsent,
  };

  try {
    const baseUrl = supabaseUrl.replace(/\/+$/, "");
    const response = await fetch(`${baseUrl}/rest/v1/suppliers`, {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(row),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Supplier registration database request failed:", response.status, detail.slice(0, 500));
      return json("تعذر حفظ التسجيل في الوقت الحالي. لم يتم تأكيد التسجيل؛ حاول لاحقًا.", 502);
    }

    return json("تم استلام بياناتك وحفظها بنجاح. سيتواصل معك فريق KVRAT.ai عند الحاجة.", 201);
  } catch (error) {
    console.error("Supplier registration request failed:", error instanceof Error ? error.message : "unknown error");
    return json("حدث خطأ أثناء الاتصال بقاعدة البيانات. لم يتم تأكيد التسجيل؛ حاول لاحقًا.", 502);
  }
}
