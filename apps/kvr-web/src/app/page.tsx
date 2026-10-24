"use client";

import { useState, type FormEvent } from "react";

const categories = [
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
];

const governorates = [
  "القاهرة", "الجيزة", "الإسكندرية", "القليوبية", "الشرقية", "الغربية",
  "المنوفية", "الدقهلية", "البحيرة", "كفر الشيخ", "دمياط", "بورسعيد",
  "الإسماعيلية", "السويس", "شمال سيناء", "جنوب سيناء", "الفيوم",
  "بني سويف", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر", "أسوان",
  "البحر الأحمر", "الوادي الجديد", "مطروح",
];

const companyTypes = ["مصنع", "شركة توريدات", "مورد", "تاجر جملة", "موزع", "مستورد", "وكيل تجاري", "ورشة أو منشأة إنتاج", "أخرى"];

const workflow = [
  { number: "01", title: "أنشئ حسابك وأدخل بياناتك", text: "ابدأ بإنشاء حساب مورد، ثم أدخل بيانات التواصل ونشاط شركتك ومجالات التوريد." },
  { number: "02", title: "مراجعة البيانات", text: "قد يتواصل فريق KVRAT.ai للتحقق من البيانات أو طلب مستندات داعمة عند الحاجة." },
  { number: "03", title: "أضف منتجاتك", text: "جهّز أسماء المنتجات وأسعارها وصورها وتفاصيل التوريد." },
  { number: "04", title: "مراجعة المنتجات", text: "تُراجع المنتجات وفق سياسة النشر المعتمدة قبل إتاحتها، إذا كانت الموافقة مطلوبة." },
  { number: "05", title: "تواصل مع العملاء", text: "تظهر المنتجات المنشورة للعملاء، ويمكنهم طلب الأسعار والتواصل مع المورد." },
];

export default function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({
    fullName: "", companyName: "", companyType: "", phone: "", whatsapp: "",
    email: "", governorate: "", city: "", website: "", products: "",
    coverage: "", notes: "", privacyConsent: false, contactConsent: false,
  });

  function update(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("واجهة التسجيل جاهزة، لكن لم يتم إرسال بياناتك أو حفظها بعد لأن خدمة التسجيل الخلفية لم تُربط بهذا النموذج. لن نعرض تأكيد تسجيل غير حقيقي.");
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="KVRAT.ai الصفحة الرئيسية">
          <span className="brand-mark">K</span>
          <span>KVRAT<span className="brand-dot">.ai</span><small>منظومة أعمال مترابطة</small></span>
        </a>
        <nav className="main-nav" aria-label="التنقل الرئيسي">
          <a href="#how-it-works">آلية العمل</a>
          <a href="#for-suppliers">للموردين</a>
          <a href="#register">سجّل اهتمامك</a>
        </nav>
        <a className="header-cta" href="#register">انضم كمورد <span aria-hidden="true">←</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> بوابتك إلى سوق توريدات أكثر اتصالًا</span>
          <h1>خلّي منتجاتك أقرب<br />لـ <span>العميل المناسب.</span></h1>
          <p className="hero-lead">KVRAT.ai تعمل على بناء منصة تربط المصانع والموردين والتجار بالعملاء في منظومة واحدة، بدايةً من قطاعات أدوات ومستلزمات التعبئة والتغليف.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#register">ابدأ تسجيل بيانات شركتك <span aria-hidden="true">←</span></a>
            <a className="button button-secondary" href="#how-it-works">اعرف آلية العمل</a>
          </div>
          <div className="hero-points">
            <span><i>✓</i> بيانات شركتك ومنتجاتك</span>
            <span><i>✓</i> تواصل مباشر عند الحاجة</span>
            <span><i>✓</i> خطوات واضحة قبل النشر</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="تصور بصري لمنظومة الموردين والمنتجات">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="visual-core"><span className="core-k">K</span><b>KVRAT.ai</b><small>Business Network</small></div>
          <div className="float-card float-card-top"><span className="float-icon orange-icon">▦</span><span><b>الموردون</b><small>مصانع · موزعون · تجار</small></span></div>
          <div className="float-card float-card-right"><span className="float-icon blue-icon">◇</span><span><b>كتالوج المنتجات</b><small>صور وأسعار وتفاصيل</small></span></div>
          <div className="float-card float-card-bottom"><span className="float-icon orange-icon">↗</span><span><b>طلبات الأسعار</b><small>قنوات تواصل أوضح</small></span></div>
          <span className="visual-tag">منظومة واحدة، فرص أكثر</span>
        </div>
      </section>

      <section className="trust-strip" aria-label="مجالات المنصة">
        <span>مصانع</span><b>·</b><span>موردون</span><b>·</b><span>تجار جملة</span><b>·</b><span>موزعون</span><b>·</b><span>مستلزمات التعبئة والتغليف</span>
      </section>

      <section className="section workflow-section" id="how-it-works">
        <div className="section-heading">
          <span className="eyebrow">رحلة المورد على المنصة</span>
          <h2>من بيانات شركتك إلى <span>عرض منتجاتك</span></h2>
          <p>خطوات منظمة تساعد على تجهيز ملف المورد والمنتجات قبل إتاحتها للعملاء.</p>
        </div>
        <div className="workflow-grid">
          {workflow.map((step) => (
            <article className="workflow-card" key={step.number}>
              <div className="step-top"><span className="step-number">{step.number}</span><span className="step-line" /></div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <p className="workflow-note"><span>!</span> إتاحة المنتجات وآلية الموافقة النهائية تخضعان لسياسات التشغيل التي تعتمدها المنصة عند الإطلاق.</p>
      </section>

      <section className="supplier-band" id="for-suppliers">
        <div><span className="eyebrow eyebrow-light">للمصانع والموردين والتجار</span><h2>عرّفنا بنشاطك الآن،<br />واستعد للخطوة التالية.</h2></div>
        <p>سجّل بيانات شركتك ومجالات التوريد. تساعدنا المعلومات على فهم احتياجاتك والتواصل معك بشأن مراحل تجهيز المنصة وفرص عرض المنتجات مستقبلًا.</p>
        <a className="button button-white" href="#register">تسجيل بيانات المورد <span aria-hidden="true">←</span></a>
      </section>

      <section className="section form-section" id="register">
        <div className="form-intro">
          <span className="eyebrow">تسجيل اهتمام الموردين</span>
          <h2>ابدأ بملف شركتك</h2>
          <p>املأ البيانات الأساسية بدقة. الحقول المعلّمة بنجمة مطلوبة، ويمكنك إضافة تفاصيل المنتجات والتغطية الجغرافية لمساعدتنا على فهم نشاطك.</p>
          <div className="form-aside">
            <div className="aside-icon">01</div><div><b>بيانات واضحة</b><p>اسم الشركة ووسائل التواصل ونوع النشاط.</p></div>
          </div>
          <div className="form-aside">
            <div className="aside-icon">02</div><div><b>مجالات التوريد</b><p>اختر الفئات التي تناسب منتجاتك وخدماتك.</p></div>
          </div>
          <div className="form-aside">
            <div className="aside-icon">03</div><div><b>الخطوة التالية</b><p>سيتم توضيح مسار المراجعة والتسجيل النهائي عند تفعيل الخدمة.</p></div>
          </div>
        </div>

        <form className="supplier-form" onSubmit={handleSubmit}>
          <div className="form-heading"><div><span className="form-kicker">SUPPLIER PROFILE</span><h3>بيانات المورد أو الشركة</h3></div><span className="required-note">* حقول مطلوبة</span></div>
          <div className="field-grid">
            <label>اسم المسؤول <em>*</em><input required value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="الاسم بالكامل" autoComplete="name" /></label>
            <label>اسم الشركة أو المصنع <em>*</em><input required value={form.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder="الاسم التجاري" autoComplete="organization" /></label>
            <label>نوع النشاط <em>*</em><select required value={form.companyType} onChange={(e) => update("companyType", e.target.value)}><option value="">اختر نوع النشاط</option>{companyTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>رقم الهاتف <em>*</em><input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="01xxxxxxxxx" autoComplete="tel" dir="ltr" /></label>
            <label>رقم واتساب<input type="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="إن كان مختلفًا" dir="ltr" /></label>
            <label>البريد الإلكتروني<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@company.com" autoComplete="email" dir="ltr" /></label>
            <label>المحافظة <em>*</em><select required value={form.governorate} onChange={(e) => update("governorate", e.target.value)}><option value="">اختر المحافظة</option>{governorates.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>المدينة أو المنطقة<input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="المدينة / المنطقة الصناعية" /></label>
            <label className="field-full">الموقع الإلكتروني أو صفحة الشركة<input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} placeholder="https://" dir="ltr" /></label>
          </div>

          <div className="form-divider" />
          <div className="subsection-title"><h4>مجالات ومنتجات التوريد</h4><p>اختر مجالًا واحدًا على الأقل إن أمكن.</p></div>
          <div className="category-grid">
            {categories.map((category) => <label className="check-option" key={category}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={(e) => setSelectedCategories((current) => e.target.checked ? [...current, category] : current.filter((item) => item !== category))} /><span className="custom-check">✓</span><span>{category}</span></label>)}
          </div>
          <div className="field-grid field-grid-bottom">
            <label className="field-full">أهم المنتجات أو الخدمات<input value={form.products} onChange={(e) => update("products", e.target.value)} placeholder="اكتب أسماء المنتجات أو خطوط الإنتاج الرئيسية" /></label>
            <label>نطاق التغطية أو التوزيع<input value={form.coverage} onChange={(e) => update("coverage", e.target.value)} placeholder="مثال: جميع محافظات مصر" /></label>
            <label>ملاحظات إضافية<input value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="الطاقة الإنتاجية، الحد الأدنى للطلب..." /></label>
          </div>
          <div className="consent-list">
            <label><input type="checkbox" required checked={form.privacyConsent} onChange={(e) => update("privacyConsent", e.target.checked)} /><span>أقر بصحة البيانات التي أدخلتها، وأوافق على استخدامها للتواصل بشأن تسجيل الموردين وفق سياسة الخصوصية عند نشرها. <em>*</em></span></label>
            <label><input type="checkbox" checked={form.contactConsent} onChange={(e) => update("contactConsent", e.target.checked)} /><span>أوافق على التواصل معي بخصوص استكمال ملف المورد ومنتجاته.</span></label>
          </div>
          <button className="button button-primary submit-button" type="submit">مراجعة بيانات النموذج <span aria-hidden="true">←</span></button>
          {notice && <p className="form-notice" role="status">{notice}</p>}
          <p className="form-footnote">تنبيه: النموذج في هذه النسخة واجهة أولية فقط؛ لم يتم توصيله بخدمة خلفية لحفظ البيانات بعد.</p>
        </form>
      </section>

      <footer className="site-footer">
        <a className="brand brand-footer" href="#top"><span className="brand-mark">K</span><span>KVRAT<span className="brand-dot">.ai</span><small>Build Once, Scale Forever</small></span></a>
        <p>منظومة أعمال تربط الموردين بالفرص.</p>
        <a href="#top">العودة إلى الأعلى ↑</a>
        <small>© {new Date().getFullYear()} KVRAT.ai · جميع الحقوق محفوظة</small>
      </footer>
    </main>
  );
}
