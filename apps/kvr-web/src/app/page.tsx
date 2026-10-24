"use client";

import { useState, type FormEvent } from "react";

type Lang = "ar" | "en";

const content = {
  ar: {
    navCatalog: "الكتالوج", navBusiness: "لمن المنصة؟", navSteps: "كيف تعمل", navRegister: "سجّل كمورد",
    badge: "منظومة متخصصة في منتجات التغليف",
    titleA: "كل احتياجات التغليف،", titleB: "في شبكة أعمال واحدة.",
    intro: "KVRAT.ai تربط المصانع والموردين والموزعين بالمشترين والشركات والأفراد — لتسهيل اكتشاف المنتجات وطلب عروض الأسعار والتواصل التجاري.",
    cta: "سجّل شركتك مجانًا", secondary: "استكشف فئات المنتجات",
    b2b: "للشركات والموزعين", b2c: "للمستهلكين", network: "للمصانع والموردين",
    catalogEyebrow: "اكتشف المنتجات", catalogTitle: "فئات تغليف لكل نشاط", catalogText: "تعرّف على المجالات التي تستهدف المنصة جمع مورديها في مكان واحد. الصور توضيحية، وتُعرض المنتجات الفعلية بعد اعتماد بيانات الموردين.",
    products: [
      { name: "العبوات البلاستيكية", desc: "عبوات، جراكن، زجاجات وأغطية", tag: "عبوات وحاويات", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85" },
      { name: "التغليف الورقي والكرتوني", desc: "علب كرتون، أكياس ورقية ومواد حماية", tag: "ورقي وكرتون", image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?auto=format&fit=crop&w=900&q=85" },
      { name: "ماكينات وخطوط التعبئة", desc: "معدات التعبئة والتغليف وخطوط الإنتاج", tag: "ماكينات", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85" },
      { name: "الأكياس والشنط", desc: "أكياس مرنة وشنط تجارية وحلول حمل", tag: "أكياس", image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=85" },
      { name: "الاسترتش والشرنك", desc: "أفلام تغليف وحماية وتثبيت الشحنات", tag: "أفلام تغليف", image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=85" },
      { name: "الطباعة والملصقات", desc: "ملصقات تعريفية وطباعة العبوات", tag: "طباعة", image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=900&q=85" },
    ],
    businessEyebrow: "من نخدم", businessTitle: "مصممة لاحتياجات سلسلة التغليف", factoryTitle: "المصانع", factoryText: "اعرض قدراتك الإنتاجية وفئات منتجاتك وتواصل مع فرص توريد مناسبة.", supplierTitle: "الموردون والموزعون", supplierText: "اجمع بيانات المنتجات ومجالات التغطية لتسهيل وصول المشترين إليك.", buyerTitle: "الشركات والمشترون", buyerText: "اكتشف فئات المنتجات واطلب عروض أسعار من الموردين المناسبين.", consumerTitle: "المستهلكون", consumerText: "تعرّف على المنتجات المتاحة وطرق الشراء والتواصل لدى المورد.",
    stepsEyebrow: "خطوات واضحة", stepsTitle: "من تسجيل الشركة إلى طلب السعر", step1: "سجّل بيانات شركتك", step1Text: "أدخل بيانات النشاط والتواصل ومجالات التوريد.", step2: "أكمل ملف المنتجات", step2Text: "أضف الأسماء والمواصفات والصور والأسعار عند تفعيل ملف المنتجات.", step3: "تواصل تجاريًا", step3Text: "يمكن للمشترين طلب عرض سعر والتواصل مع المورد وفق القنوات المتاحة.",
    formEyebrow: "انضم إلى شبكة الموردين", formTitle: "عرّفنا بشركتك", formText: "املأ بيانات الاهتمام الأولية. هذه النسخة تتيح تنزيل البيانات كملف CSV على جهازك؛ لا ترسل البيانات إلى خادم KVRAT.ai تلقائيًا.",
    contactName: "اسم المسؤول", company: "اسم المصنع أو الشركة", type: "نوع النشاط", phone: "رقم الهاتف", whatsapp: "واتساب", email: "البريد الإلكتروني", governorate: "المحافظة", city: "المدينة / المنطقة الصناعية", website: "الموقع أو صفحة الشركة", categoriesLabel: "مجالات المنتجات", productsLabel: "المنتجات أو المواصفات الرئيسية", coverage: "نطاق التوزيع", notes: "ملاحظات إضافية", choose: "اختر", required: "مطلوب", privacy: "أؤكد صحة البيانات وأوافق على استخدامها للتواصل بشأن اهتمامي بالتسجيل.", submit: "تنزيل بيانات التسجيل (CSV)", privacyNote: "لا يُعد تنزيل الملف تسجيلًا مستلمًا لدى KVRAT.ai. أرسل الملف يدويًا فقط عبر قناة رسمية موثوقة عند إعلانها.",
    types: ["مصنع", "مورد", "شركة توريدات", "تاجر جملة", "موزع", "مستورد", "وكيل تجاري", "أخرى"],
    governorates: ["القاهرة","الجيزة","الإسكندرية","القليوبية","الشرقية","الغربية","المنوفية","الدقهلية","البحيرة","كفر الشيخ","دمياط","بورسعيد","الإسماعيلية","السويس","الفيوم","بني سويف","المنيا","أسيوط","سوهاج","قنا","الأقصر","أسوان","مطروح","البحر الأحمر","شمال سيناء","جنوب سيناء","الوادي الجديد"],
    success: "تم تجهيز ملف CSV وتنزيله على جهازك. لم تُرسل البيانات إلى خادم.",
    footer: "منظومة رقمية لاكتشاف منتجات التغليف والتواصل التجاري.", top: "العودة للأعلى",
  },
  en: {
    navCatalog: "Catalog", navBusiness: "Who it's for", navSteps: "How it works", navRegister: "Join as supplier",
    badge: "A network focused on packaging products",
    titleA: "Packaging essentials,", titleB: "connected in one network.",
    intro: "KVRAT.ai connects factories, suppliers and distributors with business buyers and consumers to discover products, request quotations and start commercial conversations.",
    cta: "Register your company", secondary: "Explore product categories",
    b2b: "For businesses & distributors", b2c: "For consumers", network: "For factories & suppliers",
    catalogEyebrow: "Explore products", catalogTitle: "Packaging categories for every business", catalogText: "Explore the supplier categories planned for one network. Images are illustrative; actual listings depend on verified supplier data.",
    products: [
      { name: "Plastic containers", desc: "Bottles, jerrycans, containers and caps", tag: "Containers", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85" },
      { name: "Paper & carton packaging", desc: "Cartons, paper bags and protective materials", tag: "Paper & carton", image: "https://images.unsplash.com/photo-1605600659873-d808a13e4d9a?auto=format&fit=crop&w=900&q=85" },
      { name: "Filling & packaging machinery", desc: "Packaging equipment and production lines", tag: "Machinery", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85" },
      { name: "Bags & sacks", desc: "Flexible bags, retail bags and carry solutions", tag: "Bags", image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=900&q=85" },
      { name: "Stretch & shrink film", desc: "Wrapping film for protection and load stability", tag: "Films", image: "https://images.unsplash.com/photo-1607166452427-7e4477079cb9?auto=format&fit=crop&w=900&q=85" },
      { name: "Printing & labels", desc: "Product labels and packaging print services", tag: "Printing", image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?auto=format&fit=crop&w=900&q=85" },
    ],
    businessEyebrow: "Who we serve", businessTitle: "Built around the packaging supply chain", factoryTitle: "Factories", factoryText: "Present production capabilities, product categories and supply opportunities.", supplierTitle: "Suppliers & distributors", supplierText: "Showcase product lines and coverage to help buyers find you.", buyerTitle: "Business buyers", buyerText: "Explore categories and request quotations from relevant suppliers.", consumerTitle: "Consumers", consumerText: "Discover products and learn how to contact or purchase from suppliers.",
    stepsEyebrow: "A clear process", stepsTitle: "From company profile to quotation", step1: "Register your company", step1Text: "Share your business details, contact information and supply categories.", step2: "Prepare product listings", step2Text: "Add names, specifications, images and prices when listings are enabled.", step3: "Start a business conversation", step3Text: "Buyers can request quotations and contact suppliers through available channels.",
    formEyebrow: "Join the supplier network", formTitle: "Tell us about your company", formText: "Complete the initial interest form. This version downloads a CSV file to your device; it does not automatically send data to a KVRAT.ai server.",
    contactName: "Contact person", company: "Factory or company name", type: "Business type", phone: "Phone number", whatsapp: "WhatsApp", email: "Email", governorate: "Governorate", city: "City / industrial area", website: "Website or company page", categoriesLabel: "Product categories", productsLabel: "Key products or specifications", coverage: "Distribution coverage", notes: "Additional notes", choose: "Choose", required: "Required", privacy: "I confirm the information is accurate and consent to being contacted about supplier registration.", submit: "Download registration data (CSV)", privacyNote: "Downloading the file does not submit a registration to KVRAT.ai. Only share it manually through an official trusted channel when announced.",
    types: ["Factory", "Supplier", "Supply company", "Wholesaler", "Distributor", "Importer", "Commercial agent", "Other"],
    governorates: ["Cairo","Giza","Alexandria","Qalyubia","Sharqia","Gharbia","Monufia","Dakahlia","Beheira","Kafr El Sheikh","Damietta","Port Said","Ismailia","Suez","Faiyum","Beni Suef","Minya","Assiut","Sohag","Qena","Luxor","Aswan","Matrouh","Red Sea","North Sinai","South Sinai","New Valley"],
    success: "Your CSV file has been prepared and downloaded to your device. No data was sent to a server.",
    footer: "A digital network for packaging product discovery and business connections.", top: "Back to top",
  },
} as const;

const categoryKeys = ["Plastic packaging", "Paper & carton", "Packaging machinery", "Bags & sacks", "Stretch & shrink film", "Printing & labels", "Glass containers", "Raw materials", "Other"];

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("ar");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [form, setForm] = useState({ contactName: "", company: "", type: "", phone: "", whatsapp: "", email: "", governorate: "", city: "", website: "", products: "", coverage: "", notes: "", privacy: false });
  const t = content[lang];
  const isArabic = lang === "ar";

  function update(field: keyof typeof form, value: string | boolean) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const rows = [
      ["field", "value"],
      ...Object.entries(form).map(([key, value]) => [key, String(value)]),
      ["categories", selectedCategories.join("; ")],
      ["language", lang],
      ["createdAt", new Date().toISOString()],
    ];
    const csv = "\uFEFF" + rows.map((row) => row.map((value) => '"' + value.replace(/"/g, '""') + '"').join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kvrat-supplier-interest.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setNotice(t.success);
  }

  return (
    <main dir={isArabic ? "rtl" : "ltr"} lang={lang} className={isArabic ? "landing is-rtl" : "landing is-ltr"}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="KVRAT.ai home">
          <span className="brand-mark">K</span><span className="brand-word">KVRAT<span>.ai</span><small>{isArabic ? "شبكة أعمال التغليف" : "Packaging business network"}</small></span>
        </a>
        <nav className="main-nav" aria-label={isArabic ? "التنقل الرئيسي" : "Main navigation"}>
          <a href="#catalog">{t.navCatalog}</a><a href="#audience">{t.navBusiness}</a><a href="#steps">{t.navSteps}</a>
        </nav>
        <div className="header-actions">
          <button className="language-toggle" type="button" onClick={() => { setLang(isArabic ? "en" : "ar"); setNotice(""); }} aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}>{isArabic ? "EN" : "عربي"}</button>
          <a className="header-cta" href="#register">{t.navRegister} <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" />{t.badge}</span>
          <h1>{t.titleA}<br /><span>{t.titleB}</span></h1>
          <p className="hero-lead">{t.intro}</p>
          <div className="hero-actions"><a className="button button-primary" href="#register">{t.cta} <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="#catalog">{t.secondary}</a></div>
          <div className="hero-audiences"><span>{t.b2b}</span><span>{t.b2c}</span><span>{t.network}</span></div>
        </div>
        <div className="hero-visual" aria-label={isArabic ? "تصور شبكة منتجات التغليف" : "Packaging product network illustration"}>
          <div className="visual-glow" />
          <div className="hero-product hero-product-main"><img src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=85" alt={isArabic ? "عبوات ومنتجات" : "Packaging containers"} /><span className="product-chip">{isArabic ? "منتجات التغليف" : "Packaging products"}</span></div>
          <div className="hero-float hero-float-top"><span className="float-symbol orange">↗</span><span><b>{isArabic ? "شبكة الموردين" : "Supplier network"}</b><small>{isArabic ? "مصانع · موزعون · تجار" : "Factories · distributors · traders"}</small></span></div>
          <div className="hero-float hero-float-bottom"><span className="float-symbol blue">⌕</span><span><b>{isArabic ? "طلب عرض سعر" : "Request a quote"}</b><small>{isArabic ? "تواصل تجاري مباشر" : "Direct business contact"}</small></span></div>
          <span className="visual-caption">KVRAT.ai / PACKAGING NETWORK</span>
        </div>
      </section>

      <section className="value-strip"><span>B2B</span><i /> <span>{isArabic ? "مصانع وموردون" : "Factories & suppliers"}</span><i /><span>B2C</span><i /><span>{isArabic ? "كتالوج متخصص" : "Focused catalog"}</span><i /><span>{isArabic ? "طلبات عروض أسعار" : "Quotation requests"}</span></section>

      <section className="section catalog-section" id="catalog">
        <div className="section-heading"><span className="eyebrow">{t.catalogEyebrow}</span><h2>{t.catalogTitle}</h2><p>{t.catalogText}</p></div>
        <div className="catalog-grid">{t.products.map((product) => <article className="catalog-card" key={product.name}><div className="catalog-image"><img src={product.image} alt={product.name} loading="lazy" /><span>{product.tag}</span></div><div className="catalog-copy"><h3>{product.name}</h3><p>{product.desc}</p><a href="#register">{isArabic ? "استفسر عن التوريد" : "Ask about supply"} <span aria-hidden="true">↗</span></a></div></article>)}</div>
        <p className="catalog-disclaimer">{isArabic ? "الكتالوج يعرض فئات توضيحية وليس عروض بيع مؤكدة. توافر المنتجات والأسعار يتوقف على الموردين والبيانات التي يتم اعتمادها." : "This catalog shows illustrative categories, not confirmed offers. Availability and pricing depend on suppliers and approved listings."}</p>
      </section>

      <section className="section audience-section" id="audience">
        <div className="section-heading"><span className="eyebrow">{t.businessEyebrow}</span><h2>{t.businessTitle}</h2></div>
        <div className="audience-grid"><article><span className="audience-icon">01</span><h3>{t.factoryTitle}</h3><p>{t.factoryText}</p></article><article><span className="audience-icon">02</span><h3>{t.supplierTitle}</h3><p>{t.supplierText}</p></article><article><span className="audience-icon">03</span><h3>{t.buyerTitle}</h3><p>{t.buyerText}</p></article><article><span className="audience-icon">04</span><h3>{t.consumerTitle}</h3><p>{t.consumerText}</p></article></div>
      </section>

      <section className="steps-band" id="steps"><div className="section-heading"><span className="eyebrow">{t.stepsEyebrow}</span><h2>{t.stepsTitle}</h2></div><div className="steps-grid"><article><span>01</span><h3>{t.step1}</h3><p>{t.step1Text}</p></article><article><span>02</span><h3>{t.step2}</h3><p>{t.step2Text}</p></article><article><span>03</span><h3>{t.step3}</h3><p>{t.step3Text}</p></article></div></section>

      <section className="section form-section" id="register">
        <div className="form-intro"><span className="eyebrow">{t.formEyebrow}</span><h2>{t.formTitle}</h2><p>{t.formText}</p><div className="form-benefit"><b>{isArabic ? "بيانات منظمة" : "Structured details"}</b><span>{isArabic ? "معلومات النشاط والتواصل وفئات المنتجات في ملف واحد." : "Business, contact and product category details in one file."}</span></div><div className="form-benefit"><b>{isArabic ? "بدون تأكيد مضلل" : "No false confirmation"}</b><span>{isArabic ? "نوضح صراحةً أن البيانات لا تُرسل إلى الخادم في هذه النسخة." : "This version clearly states that data is not submitted to a server."}</span></div></div>
        <form className="supplier-form" onSubmit={handleSubmit}>
          <div className="form-heading"><div><span className="form-kicker">SUPPLIER PROFILE</span><h3>{isArabic ? "بيانات المصنع أو المورد" : "Factory or supplier details"}</h3></div><span className="required-note">* {t.required}</span></div>
          <div className="field-grid">
            <label>{t.contactName} <em>*</em><input required value={form.contactName} onChange={(e) => update("contactName", e.target.value)} autoComplete="name" /></label>
            <label>{t.company} <em>*</em><input required value={form.company} onChange={(e) => update("company", e.target.value)} autoComplete="organization" /></label>
            <label>{t.type} <em>*</em><select required value={form.type} onChange={(e) => update("type", e.target.value)}><option value="">{t.choose}</option>{t.types.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>{t.phone} <em>*</em><input required type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" dir="ltr" /></label>
            <label>{t.whatsapp}<input type="tel" value={form.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} dir="ltr" /></label>
            <label>{t.email}<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" dir="ltr" /></label>
            <label>{t.governorate}<select value={form.governorate} onChange={(e) => update("governorate", e.target.value)}><option value="">{t.choose}</option>{t.governorates.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>{t.city}<input value={form.city} onChange={(e) => update("city", e.target.value)} /></label>
            <label className="field-full">{t.website}<input type="url" value={form.website} onChange={(e) => update("website", e.target.value)} dir="ltr" placeholder="https://" /></label>
          </div>
          <div className="form-divider" /><div className="subsection-title"><h4>{t.categoriesLabel}</h4><p>{isArabic ? "يمكن اختيار أكثر من فئة" : "Select all that apply"}</p></div>
          <div className="category-grid">{categoryKeys.map((category, index) => <label className="check-option" key={category}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={(e) => setSelectedCategories((current) => e.target.checked ? [...current, category] : current.filter((item) => item !== category))} /><span className="custom-check">✓</span><span>{isArabic ? ["عبوات بلاستيكية","ورقي وكرتون","ماكينات تعبئة وتغليف","أكياس وشنط","استرتش وشرنك","طباعة وملصقات","عبوات زجاجية","خامات ومستلزمات","أخرى"][index] : category}</span></label>)}</div>
          <div className="field-grid field-grid-bottom"><label className="field-full">{t.productsLabel}<textarea rows={3} value={form.products} onChange={(e) => update("products", e.target.value)} /></label><label>{t.coverage}<input value={form.coverage} onChange={(e) => update("coverage", e.target.value)} /></label><label>{t.notes}<input value={form.notes} onChange={(e) => update("notes", e.target.value)} /></label></div>
          <label className="privacy-check"><input type="checkbox" required checked={form.privacy} onChange={(e) => update("privacy", e.target.checked)} /><span>{t.privacy} <em>*</em></span></label>
          <button className="button button-primary submit-button" type="submit">{t.submit} <span aria-hidden="true">↗</span></button>
          {notice && <p className="form-notice" role="status" aria-live="polite">{notice}</p>}
          <p className="form-footnote">{t.privacyNote}</p>
        </form>
      </section>

      <footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark">K</span><span className="brand-word">KVRAT<span>.ai</span><small>Packaging business network</small></span></a><p>{t.footer}</p><a href="#top">{t.top} ↑</a><small>© {new Date().getFullYear()} KVRAT.ai</small></footer>
    </main>
  );
}
