"use client";

import { useState, type FormEvent } from "react";

const roles = [
  { id: "factory", icon: "▦", title: "أصحاب المصانع", en: "Manufacturers", text: "اعرض قدراتك الإنتاجية ومنتجاتك، واستكشف فرص الوصول إلى أسواق وعملاء جدد.", tone: "sage" },
  { id: "trader", icon: "↗", title: "التجار والموزعون", en: "Traders & Distributors", text: "اكتشف مصادر توريد ومنتجات جديدة، وابنِ علاقات تجارية تناسب نشاطك.", tone: "sand" },
  { id: "supplier", icon: "◇", title: "الموردون", en: "Suppliers", text: "عرّف السوق بمنتجاتك ومجالات التوريد، واستقبل استفسارات وطلبات الأسعار عند تفعيل الخدمة.", tone: "sage" },
  { id: "affiliate", icon: "◎", title: "المسوقون بالعمولة", en: "Affiliate Marketers", text: "استكشف منتجات قابلة للتسويق، وانضم إلى برامج العمولة عند إطلاقها واعتماد شروطها.", tone: "peach" },
  { id: "consumer", icon: "⌕", title: "المستهلكون", en: "Consumers", text: "تعرّف على منتجات من قطاعات متعددة، وتواصل مع البائع لمعرفة التفاصيل المتاحة.", tone: "sand" },
];

const sectors = [
  { title: "التغليف والتعبئة", en: "Packaging", image: "photo-1605600659873-d808a13e4d9a" },
  { title: "الأغذية والمشروبات", en: "Food & Beverage", image: "photo-1547592180-85f173990554" },
  { title: "الأدوات المنزلية", en: "Home & Living", image: "photo-1556228720-195a672e8a03" },
  { title: "الإلكترونيات", en: "Electronics", image: "photo-1498049794561-7780e7231661" },
  { title: "مواد البناء والصناعة", en: "Industrial & Building", image: "photo-1504307651254-35680f356dfd" },
  { title: "الزراعة ومستلزماتها", en: "Agriculture", image: "photo-1500382017468-9049fed747ef" },
];

const workflow = [
  { number: "01", title: "اختر دورك", text: "حدد إن كنت مصنعًا أو تاجرًا أو موردًا أو مسوقًا أو مستهلكًا." },
  { number: "02", title: "اكتشف المنتجات والشركاء", text: "تعرّف على القطاعات والفرص المناسبة لاحتياجاتك." },
  { number: "03", title: "اطلب عرض سعر أو تواصل", text: "تعتمد المعاملات على الاستفسار والتواصل المباشر؛ لا يوجد دفع داخل المنصة معلن هنا." },
];

export default function HomePage() {
  const [role, setRole] = useState("factory");
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", role: "factory", sector: "", details: "", consent: false });

  function update(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const record = {
      "Created locally": new Date().toLocaleString("ar-EG"),
      "Contact name": form.name.trim(),
      "Company or brand": form.company.trim(),
      "Phone": form.phone.trim(),
      "Email": form.email.trim(),
      "Role": roles.find((item) => item.id === form.role)?.title ?? form.role,
      "Sector": form.sector,
      "Details": form.details.trim(),
      "Consent": form.consent ? "Yes" : "No",
    };
    const quote = (value: string) => '"' + value.replace(/"/g, '""') + '"';
    const csv = "\uFEFF" + [Object.keys(record), Object.values(record)].map((row) => row.map((value) => quote(String(value))).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "KVRAT-partner-interest.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setNotice("تم إنشاء الملف وتنزيله على جهازك فقط. لم تُرسل البيانات إلى KVRAT.ai ولم تُحفظ مركزيًا. لإيصال اهتمامك إلى الفريق، ستحتاج إلى إرسال الملف يدويًا عبر قناة رسمية عند إعلانها.");
  }

  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="KVRAT.ai home">
          <span className="brand-mark" aria-hidden="true"><span>K</span></span>
          <span className="brand-word">KVRAT<span>.ai</span><small>Business Marketplace</small></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#sectors">القطاعات <small>Industries</small></a>
          <a href="#community">من نخدم <small>Who it's for</small></a>
          <a href="#how-it-works">آلية العمل <small>How it works</small></a>
        </nav>
        <div className="header-actions"><a className="language-link" href="#top" aria-label="Arabic and English">عربي <span>/</span> EN</a><a className="header-cta" href="#join">انضم إلى المنظومة <span>↗</span></a></div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><i /> منظومة تجارية متعددة القطاعات <span className="eyebrow-en">A connected business ecosystem</span></span>
          <h1>من يصنع، ومن يورد، ومن يبيع — <span>يلتقي هنا.</span></h1>
          <p className="hero-lead">KVRAT.ai تربط أصحاب المصانع والتجار والموردين والمسوقين بالعمولة والمستهلكين، لتسهيل اكتشاف المنتجات وبناء العلاقات التجارية عبر قطاعات متعددة.</p>
          <p className="hero-sub">Connecting manufacturers, suppliers, traders, affiliate marketers and consumers.</p>
          <div className="hero-actions"><a className="button button-primary" href="#community">اكتشف المنظومة <span>←</span></a><a className="button button-secondary" href="#join">سجّل اهتمامك <span>↗</span></a></div>
          <div className="hero-meta"><span><b>01</b> B2B · تجارة الأعمال</span><span><b>02</b> B2C · منتجات المستهلكين</span></div>
        </div>
        <div className="hero-art" role="img" aria-label="Factory and logistics operations">
          <div className="hero-photo" />
          <div className="photo-wash" />
          <div className="floating-note note-top"><span className="note-icon">▦</span><span><b>من المصنع إلى السوق</b><small>From factory to market</small></span></div>
          <div className="floating-note note-bottom"><span className="note-icon note-icon-sand">↗</span><span><b>علاقات تجارية أوضح</b><small>Better business connections</small></span></div>
          <div className="image-caption">PRODUCTS · PEOPLE · POSSIBILITIES</div>
        </div>
      </section>

      <section className="audience-ribbon" aria-label="Marketplace audience"><span>Manufacturers</span><i /> <span>Suppliers</span><i /> <span>Traders</span><i /> <span>Affiliate marketers</span><i /> <span>Consumers</span></section>

      <section className="section audience-section" id="community">
        <div className="section-heading section-heading-row"><div><span className="eyebrow">مساحة لكل دور <span className="eyebrow-en">Built for every role</span></span><h2>ما الذي تبحث عنه في KVRAT.ai؟</h2></div><p>اختر المسار الأقرب إليك. يمكنك الانضمام بأكثر من صفة وفق طبيعة نشاطك.</p></div>
        <div className="audience-grid">{roles.map((item) => <article className="audience-card" key={item.id}><div className={"audience-icon " + item.tone}>{item.icon}</div><div className="audience-title"><h3>{item.title}</h3><span>{item.en}</span></div><p>{item.text}</p><button type="button" className="text-link" onClick={() => { setRole(item.id); setForm((current) => ({ ...current, role: item.id })); document.getElementById("join")?.scrollIntoView({ behavior: "smooth" }); }}>اختر هذا المسار <span>←</span></button></article>)}</div>
      </section>

      <section className="section sector-section" id="sectors">
        <div className="section-heading section-heading-row"><div><span className="eyebrow">فرص عبر قطاعات متعددة <span className="eyebrow-en">Across industries</span></span><h2>اكتشف عوالم المنتجات</h2></div><p>نبدأ بمنظومة واسعة قابلة للتوسع؛ وتُضاف المنتجات والفئات الفعلية وفق جاهزية الموردين وخدمات المنصة.</p></div>
        <div className="sector-grid">{sectors.map((sector) => <article className="sector-card" key={sector.en}><div className="sector-photo" style={{ backgroundImage: "url(https://images.unsplash.com/" + sector.image + "?auto=format&fit=crop&w=720&q=80)" }} /><div className="sector-label"><h3>{sector.title}</h3><span>{sector.en}</span></div><span className="sector-arrow">↗</span></article>)}</div>
      </section>

      <section className="statement-band"><div className="statement-inner"><span className="eyebrow eyebrow-light">A more connected marketplace</span><h2>فرص أكبر تبدأ <span>بعلاقة مباشرة.</span></h2><p>اكتشف المنتجات، تعرّف على الشركاء، واطلب عروض الأسعار. تجربة KVRAT.ai تتطور تدريجيًا، ونوضح دائمًا ما هو متاح فعليًا.</p><a className="button button-light" href="#how-it-works">كيف تعمل المنصة؟ <span>←</span></a></div><div className="statement-decoration" aria-hidden="true"><span>k</span><i /><i /><i /></div></section>

      <section className="section how-section" id="how-it-works">
        <div className="section-heading"><span className="eyebrow">بخطوات واضحة <span className="eyebrow-en">Simple by design</span></span><h2>من الاكتشاف إلى التواصل</h2><p>نموذج مبدئي يركز على التعارف التجاري وطلبات عروض الأسعار، دون الإيحاء بأن الدفع أو الطلبات الرقمية مكتملة.</p></div>
        <div className="steps-grid">{workflow.map((step) => <article className="step-card" key={step.number}><span className="step-number">{step.number}</span><div className="step-rule" /><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="join-band" id="join"><div><span className="eyebrow">شارك في بناء المنظومة <span className="eyebrow-en">Join the ecosystem</span></span><h2>هل لديك منتج أو نشاط تجاري؟</h2><p>سجّل اهتمامك الأولي، وحدد دورك وقطاعك. ستُحفظ نسخة من البيانات كملف CSV على جهازك فقط.</p></div><a className="button button-primary" href="#interest-form">ابدأ تسجيل الاهتمام <span>←</span></a></section>

      <section className="section form-section" id="interest-form">
        <div className="form-intro"><span className="eyebrow">تسجيل اهتمام أولي <span className="eyebrow-en">Early interest</span></span><h2>لنبدأ بالتعارف.</h2><p>هذا النموذج يجهز ملفًا محليًا على جهازك، ولا يرسل البيانات تلقائيًا إلى فريق KVRAT.ai. لذلك لا تعتبر عملية التنزيل تسجيلًا مستلمًا من المنصة.</p><div className="privacy-note"><span>i</span><p><b>الشفافية أولًا</b><br />لا توجد هنا قاعدة بيانات متصلة أو إرسال خلفي للنموذج. لا تشارك الملف إلا عبر قناة رسمية موثوقة عند إعلانها.</p></div><div className="form-english">A simple first step for manufacturers, suppliers, traders, affiliate marketers and consumers.</div></div>
        <form className="interest-form" onSubmit={handleSubmit}>
          <div className="form-top"><div><span>PARTNER PROFILE</span><h3>بيانات التواصل والنشاط</h3></div><small>الحقول ذات * مطلوبة</small></div>
          <div className="field-grid">
            <label>الاسم الكامل <em>*</em><input required value={form.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" placeholder="اسم الشخص المسؤول" /></label>
            <label>الشركة أو العلامة التجارية <em>*</em><input required value={form.company} onChange={(e) => update("company", e.target.value)} autoComplete="organization" placeholder="اسم النشاط التجاري" /></label>
            <label>رقم الهاتف <em>*</em><input required type="tel" dir="ltr" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" placeholder="+20 ..." /></label>
            <label>البريد الإلكتروني <span>(اختياري)</span><input type="email" dir="ltr" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" placeholder="name@company.com" /></label>
            <label className="field-full">دورك في المنظومة <em>*</em><select required value={form.role} onChange={(e) => update("role", e.target.value)}>{roles.map((item) => <option value={item.id} key={item.id}>{item.title} — {item.en}</option>)}</select></label>
            <label className="field-full">القطاع أو نوع المنتجات <span>(اختياري)</span><input value={form.sector} onChange={(e) => update("sector", e.target.value)} placeholder="مثل: التغليف، الأغذية، الإلكترونيات..." /></label>
            <label className="field-full">معلومات إضافية <span>(اختياري)</span><textarea rows={3} value={form.details} onChange={(e) => update("details", e.target.value)} placeholder="عرّفنا باحتياجك أو منتجاتك أو نموذج عملك." /></label>
          </div>
          <label className="consent-option"><input type="checkbox" required checked={form.consent} onChange={(e) => update("consent", e.target.checked)} /><span>أوافق على إنشاء ملف CSV محلي يتضمن البيانات التي أدخلتها. أفهم أن الملف لن يُرسل إلى KVRAT.ai تلقائيًا. <em>*</em></span></label>
          <button className="button button-primary submit-button" type="submit">تنزيل بيانات الاهتمام CSV <span>↓</span></button>
          {notice && <p className="form-notice" role="status" aria-live="polite">{notice}</p>}
          <p className="form-footnote">الملف يُنشأ على جهازك فقط. لا تتضمن هذه النسخة إرسالًا للخادم أو حفظًا مركزيًا أو تفعيلًا لبرنامج عمولات أو دفع إلكتروني.</p>
        </form>
      </section>

      <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark"><span>K</span></span><span className="brand-word">KVRAT<span>.ai</span><small>Business Marketplace</small></span></a><p>منظومة تجارية متعددة القطاعات تربط الأعمال والمستهلكين.</p><div className="footer-links"><a href="#sectors">القطاعات</a><a href="#community">من نخدم</a><a href="#how-it-works">آلية العمل</a><a href="#join">انضم إلينا</a></div><small className="copyright">© {new Date().getFullYear()} KVRAT.ai · جميع الحقوق محفوظة</small></footer>
    </main>
  );
}
