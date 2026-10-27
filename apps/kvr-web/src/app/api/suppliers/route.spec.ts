import { POST } from "./route";

const originalFetch = global.fetch;
const originalUrl = process.env.SUPABASE_URL;
const originalAnonKey = process.env.SUPABASE_ANON_KEY;

function requestWith(body: unknown, headers?: Record<string, string>) {
  return new Request("http://localhost/api/suppliers", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

const validMinimalSupplier = {
  contactPerson: "KVR Test Supplier",
  jobTitle: "Sales Manager",
  phone: "01012345678",
  whatsapp: "01012345678",
  city: "Benha",
  // The UI explicitly marks these as optional.
  companyName: "",
  businessType: "",
  governorate: "",
  email: "",
  website: "",
  products: "",
  productCategories: [],
  coverage: "",
  notes: "",
  privacyConsent: true,
  contactConsent: false,
};

describe("POST /api/suppliers", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    process.env.SUPABASE_URL = "https://test-project.supabase.co";
    process.env.SUPABASE_ANON_KEY = "test-only-anon-key-not-a-production-secret";
    mockFetch = jest.fn();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.SUPABASE_URL;
    else process.env.SUPABASE_URL = originalUrl;
    if (originalAnonKey === undefined) delete process.env.SUPABASE_ANON_KEY;
    else process.env.SUPABASE_ANON_KEY = originalAnonKey;
    jest.restoreAllMocks();
  });

  it("persists minimal registration when optional profile fields are blank", async () => {
    mockFetch.mockResolvedValue(new Response(null, { status: 201 }));
    const response = await POST(requestWith(validMinimalSupplier));

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ ok: true });
    expect(mockFetch).toHaveBeenCalledTimes(1);

    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://test-project.supabase.co/rest/v1/suppliers");
    expect(init.method).toBe("POST");
    const stored = JSON.parse(String(init.body));
    expect(stored.contact_person).toBe("KVR Test Supplier");
    expect(stored.phone).toBe("01012345678");
    expect(stored.city).toBe("Benha");
    expect(stored.company_name).toBe("");
    expect(stored.business_type).toBe("");
    expect(stored.governorate).toBeNull();
    expect(stored.privacy_consent).toBe(true);
  });

  it("rejects missing consent before calling the database", async () => {
    const response = await POST(requestWith({ ...validMinimalSupplier, privacyConsent: false }));

    expect(response.status).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("rejects invalid contact details before calling the database", async () => {
    const response = await POST(requestWith({ ...validMinimalSupplier, phone: "1" }));

    expect(response.status).toBe(400);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("rejects oversized declared request bodies before parsing", async () => {
    const request = requestWith(validMinimalSupplier, { "content-length": String(20 * 1024) });
    const response = await POST(request);

    expect(response.status).toBe(413);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("never reports success when Supabase rejects the insert, and logs only status/code", async () => {
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify({ code: "42501", message: "policy violation" }), {
        status: 403,
        headers: { "content-type": "application/json" },
      }),
    );
    const log = jest.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await POST(requestWith(validMinimalSupplier));

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      error: "تعذر حفظ البيانات حاليًا. لم يتم تأكيد التسجيل؛ حاول مرة أخرى لاحقًا.",
    });
    expect(log).toHaveBeenCalledWith("Supplier registration insert failed", {
      status: 403,
      code: "42501",
    });
    expect(JSON.stringify(log.mock.calls)).not.toContain(validMinimalSupplier.phone);
    expect(JSON.stringify(log.mock.calls)).not.toContain(process.env.SUPABASE_ANON_KEY);
  });
});
