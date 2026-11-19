"use client";

import { useMemo, useState, type FormEvent } from "react";
import { catalogSectors, catalogProductCount } from "../data/catalog";

const categories = [
  "أدوات ومستلزمات التغليف", "ماكينات وخطوط التعبئة والتغليف", "العبوات البلاستيكية",
  "العبوات الكرتونية والورقية", "الأكياس والشنط", "مواد التعبئة والتغليف",
  "الاسترتش والشرنك", "الطباعة والملصقات", "الزجاجات والبرطمانات",
  "مستلزمات المصانع والمواد الخام", "منتجات أخرى",
];
const governorates = ["القاهرة","الجيزة","الإسكندرية","القليوبية","الشرقية","الغربية","المنوفية","الدقهلية","البحيرة","كفر الشيخ","دمياط","بورسعيد","الإسماعيلية","السويس","شمال سيناء","جنوب سيناء","الفيوم","بني سويف","المنيا","أسيوط","سوهاج","قنا","الأقصر","أسوان","البحر الأحمر","الوادي الجديد","مطروح"];
const companyTypes = ["مصنع","شركة توريدات","مورد","تاجر جملة","موزع","مستورد","وكيل تجاري","ورشة أو منشأة إنتاج","أخرى"];
const journey = [
  ["01","ملف مورد واضح","سجّل بيانات التواصل الأساسية فقط، وأكمل بقية التفاصيل عندما تكون مستعدًا."],
  ["02","مراجعة البيانات","قد يتواصل فريق KVRAT.ai للتحقق من البيانات وتحديد احتياجات التوريد."],
  ["03","تجهيز المنتجات","أضف المنتجات والأسعار والصور لاحقًا عند تفعيل أدوات الموردين."],
  ["04","إدارة الطلبات","جهّز ملف شركتك للتعامل مع طلبات الأسعار والتواصل التجاري."],
];

export default function HomePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [catalogQuery, setCatalogQuery] = useState("");
  const filteredCatalog = useMemo(() => catalogSectors.map(sector => ({ ...sector, products: sector.products.filter(product => `${product} ${sector.name}`.includes(catalogQuery.trim())) })).filter(sector => sector.products.length > 0), [catalogQuery]);
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ fullName:"", jobTitle:"", companyName:"", companyType:"", phone:"", whatsapp:"", email:"", governorate:"", city:"", website:"", products:"", coverage:"", notes:"", privacyConsent:false, contactConsent:false });
  function update(field: keyof typeof form, value: string | boolean) { setForm(current => ({...current,[field]:value})); }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (isSubmitting) return; setIsSubmitting(true); setNotice("");
    try {
      const response = await fetch("/api/suppliers",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        contactPerson:form.fullName, jobTitle:form.jobTitle, companyName:form.companyName, businessType:form.companyType,
        phone:form.phone, whatsapp:form.whatsapp, email:form.email, governorate:form.governorate, city:form.city,
        website:form.website, products:form.products, productCategories:selectedCategories, coverage:form.coverage,
        notes:form.notes, privacyConsent:form.privacyConsent, contactConsent:form.contactConsent
      })});
      const result = await response.json().catch(()=>null);
      if (!response.ok) { setNotice(typeof result?.error==="string" ? result.error : "تعذر حفظ البيانات حاليًا. لم يتم تأكيد التسجيل؛ حاول مرة أخرى لاحقًا."); return; }
      setNotice("تم حفظ بياناتك بنجاح. سيقوم فريق KVRAT.ai بمراجعتها والتواصل معك عند الحاجة.");
      setForm({fullName:"",jobTitle:"",companyName:"",companyType:"",phone:"",whatsapp:"",email:"",governorate:"",city:"",website:"",products:"",coverage:"",notes:"",privacyConsent:false,contactConsent:false}); setSelectedCategories([]);
    } catch { setNotice("تعذر الاتصال بخدمة التسجيل. لم يتم تأكيد الحفظ؛ حاول مرة أخرى لاحقًا."); }
    finally { setIsSubmitting(false); }
  }
  return <main id="top">
    <header className="site-header">
      <a className="header-cta" href="#register">انضم كمورد <span>←</span></a>
      <a className="brand" href="#top" aria-label="KVRAT.ai الصفحة الرئيسية"><span className="brand-word">KVRAT<span>.ai</span><small>منظومة أعمال مترابطة</small></span><span className="brand-symbol">K</span></a>
    </header>
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow"><i/>تحت إشراف وإدارة K.V.R الدولية</span>
        <p className="hero-brand">KVRAT.ai</p>
        <h1>نربط الأسواق<br/>ونمكّن التجارة.</h1>
        <p className="hero-lead">سوق رقمي يربط المصانع والموردين والمستوردين والموزعين والتجار والعملاء بمنتجات من قطاعات متعددة. اكتشف مصادر التوريد، تعرّف على المنتجات، وابنِ فرصًا تجارية جديدة من مكان واحد. نبدأ من السوق المصري ونتوسع تدريجيًا.</p>
        <div className="hero-actions"><a className="button button-primary" href="#catalog">اكتشف المنتجات <span>←</span></a><a className="button button-secondary" href="#register">انضم كمورد أو تاجر</a></div>
        <div className="hero-points"><span><i>✓</i> 10 قطاعات تجارية مستهدفة</span><span><i>✓</i> 200 فئة منتج</span><span><i>✓</i> B2B وB2C</span></div>
      </div>
      <div className="hero-visual" aria-label="تصور بصري لمنظومة KVRAT.ai">
        <div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/>
        <div className="visual-core"><span className="core-k">K</span><b>KVRAT.ai</b><small>BUSINESS NETWORK</small></div>
        <div className="float-card float-card-top"><span className="float-icon">▦</span><span><b>شبكة الموردين</b><small>مصانع · موزعون · تجار</small></span></div>
        <div className="float-card float-card-left"><span className="float-icon">◇</span><span><b>كتالوج متعدد القطاعات</b><small>منتجات ومصادر توريد متنوعة</small></span></div>
        <div className="float-card float-card-bottom"><span className="float-icon">↗</span><span><b>KFB للشحن</b><small>تصور لإدارة الشحن والتسليم</small></span></div>
        <span className="visual-tag">SUPPLY · COMMERCE · DELIVERY</span>
      </div>
    </section>
    <section className="trust-strip"><span>10 قطاعات</span><b>·</b><span>200 فئة منتج مستهدفة</span><b>·</b><span>B2B</span><b>·</b><span>B2C</span><b>·</b><span>شبكة الموردين</span><b>·</b><span>سلاسل الإمداد</span></section>
    <section className="section catalog-section" id="catalog">
      <div className="section-heading">
        <span className="eyebrow">دليل المنتجات والقطاعات</span>
        <h2>اكتشف ما تبحث عنه، <span>في سوق واحد</span></h2>
        <p>كتالوج القطاعات المستهدفة على KVRAT.ai، من مستلزمات التغليف والمواد الخام إلى المنتجات الغذائية والمنزلية والمنسوجات. يتم نشر المنتجات والعروض الفعلية بعد انضمام الموردين ومراجعة بياناتها.</p>
      </div>
      <div className="catalog-toolbar">
        <label className="catalog-search">
          <span aria-hidden="true">⌕</span>
          <input value={catalogQuery} onChange={event => setCatalogQuery(event.target.value)} placeholder="ابحث عن منتج أو قطاع..." aria-label="ابحث عن منتج أو قطاع" />
          {catalogQuery && <button type="button" onClick={() => setCatalogQuery("")}>مسح</button>}
        </label>
        <span className="catalog-total">{catalogProductCount} فئة منتج ضمن {catalogSectors.length} قطاعات</span>
      </div>
      {filteredCatalog.length > 0 ? <div className="catalog-grid">
        {filteredCatalog.map((sector, index) => <article className="catalog-card" key={sector.name}>
          <div className="catalog-card-head"><span className="catalog-icon">{sector.icon}</span><span className="catalog-count">{sector.products.length} منتج</span></div>
          <h3>{sector.name}</h3>
          <p>منتجات ومستلزمات ومصادر توريد ضمن هذا القطاع.</p>
          <details open={Boolean(catalogQuery)}>
            <summary>{catalogQuery ? "نتائج البحث" : "استعرض المنتجات"} <span>＋</span></summary>
            <ul>{sector.products.map(product => <li key={product}>{product}</li>)}</ul>
          </details>
        </article>)}
      </div> : <p className="catalog-empty">لا توجد نتائج مطابقة. جرّب كلمة بحث أخرى.</p>}
      <p className="catalog-disclaimer">تنويه: هذه الفئات تمثل نطاق الكتالوج المستهدف، ولا تعني أن جميع المنتجات متاحة للبيع حاليًا. توافر كل منتج يعتمد على انضمام المورد واعتماد بياناته ونشر عرضه.</p>
    </section>
    <section className="section" id="early-access">
      <div className="section-heading"><span className="eyebrow">شركاء المرحلة الأولى</span><h2>حوّل منتجاتك إلى فرص تجارية مع <span>KVRAT.ai</span></h2><p>نستهدف بناء شبكة موردين تغطي قطاعات متعددة، وتساعد المصانع والشركات على عرض منتجاتها والوصول إلى مشترين جدد مع تطور خدمات المنصة.</p></div>
      <div className="workflow-grid three">
        <article className="workflow-card"><span className="step-number">01</span><h3>اعرض منتجاتك</h3><p>جهّز بيانات شركتك والمنتجات التي توفرها لتكون مؤهلًا للظهور ضمن القطاع المناسب بعد مراجعة الملف.</p></article>
        <article className="workflow-card"><span className="step-number">02</span><h3>وصول إلى قطاعات متنوعة</h3><p>عرّف المشترين بنشاطك ومنتجاتك، وساعدهم على اكتشاف مصادر التوريد المناسبة لاحتياجاتهم.</p></article>
        <article className="workflow-card"><span className="step-number">03</span><h3>نمو تدريجي ومنظم</h3><p>تتوسع المنصة في القطاعات والمنتجات والخدمات وفق جاهزية الموردين والوظائف التشغيلية المعتمدة.</p></article>
      </div>
    </section>
    <section className="section features-section" id="platform-features">
      <div className="section-heading"><span className="eyebrow">منظومة مترابطة</span><h2>من اكتشاف المنتج إلى <span>فرصة التوريد</span></h2><p>منظومة تستهدف ربط المنتجات بمصادرها، وجمع أطراف التجارة في رحلة أكثر وضوحًا.</p></div>
      <div className="workflow-grid three">
        <article className="workflow-card"><span className="step-number">K</span><h3>كتالوج متعدد القطاعات</h3><p>تصنيف المنتجات حسب القطاعات لتسهيل اكتشافها والوصول إلى الموردين، مع نشر العروض بعد مراجعتها.</p><div className="mini-flow">مصنع · مورد · تاجر · عميل</div></article>
        <article className="workflow-card"><span className="step-number">B2B / B2C</span><h3>شبكة الأعمال والتجارة</h3><p>ربط المصانع والموردين والمستوردين والموزعين وتجار الجملة والتجزئة والعملاء ضمن شبكة واحدة.</p></article>
        <article className="workflow-card"><span className="step-number">KFB</span><h3>KFB للخدمات اللوجستية</h3><p>مسار تطوير مستهدف لدعم الشحن والتسليم وربط أطراف التوريد. خدمات KFB التشغيلية تخضع لمراحل التطوير والإطلاق.</p></article>
      </div>
    </section>
    <section className="section journey-section" id="how-it-works">
      <div className="section-heading"><span className="eyebrow">رحلة الانضمام</span><h2>من تسجيل الشركة إلى <span>عرض المنتجات</span></h2><p>مسار تدريجي لتجهيز ملفك التجاري وإضافة منتجاتك وفق جاهزية أدوات المنصة.</p></div>
      <div className="workflow-grid four">{journey.map(item=><article className="workflow-card" key={item[0]}><span className="step-number">{item[0]}</span><h3>{item[1]}</h3><p>{item[2]}</p></article>)}</div>
    </section>
    <section className="supplier-band" id="for-suppliers"><div><span className="eyebrow eyebrow-light">للمصانع والموردين والمستوردين والتجار</span><h2>منتجاتك تستحق سوقًا أوسع.<br/>ابدأ بتجهيز ملفك التجاري.</h2></div><p>نحتاج في التسجيل الأولي إلى وسيلة تواصل واسم المسؤول ووظيفته والمدينة. بقية البيانات اختيارية لتقليل وقت التسجيل.</p><a className="button button-white" href="#register">ابدأ التسجيل <span>←</span></a></section>
    <section className="section form-section" id="register">
      <div className="form-intro"><span className="eyebrow">تسجيل اهتمام الموردين</span><h2>ابدأ من هنا.</h2><p>نموذج مختصر لتسجيل بياناتك الأساسية. الحقول ذات العلامة * فقط مطلوبة، ويمكنك ترك بقية الحقول فارغة واستكمالها لاحقًا.</p>
        <div className="form-aside"><span className="aside-icon">01</span><div><b>الحد الأدنى المطلوب</b><p>اسم المسؤول، وظيفته، الهاتف، واتساب، والمدينة.</p></div></div>
        <div className="form-aside"><span className="aside-icon">02</span><div><b>خصوصية البيانات</b><p>لن نعرض نجاح التسجيل إلا بعد تأكيد حفظه في قاعدة البيانات.</p></div></div>
        <div className="form-aside"><span className="aside-icon">03</span><div><b>استكمال لاحق</b><p>الشركة والنشاط والمنتجات والتغطية حقول اختيارية.</p></div></div>
      </div>
      <form className="supplier-form" onSubmit={handleSubmit}>
        <div className="form-heading"><div><span className="form-kicker">SUPPLIER PROFILE</span><h3>بيانات التواصل الأساسية</h3></div><span className="required-note">* مطلوب</span></div>
        <div className="field-grid">
          <label>اسم المسؤول <em>*</em><input required value={form.fullName} onChange={e=>update("fullName",e.target.value)} placeholder="الاسم بالكامل" autoComplete="name"/></label>
          <label>الوظيفة / المسمى الوظيفي <em>*</em><input required value={form.jobTitle} onChange={e=>update("jobTitle",e.target.value)} placeholder="مثال: مدير المبيعات"/></label>
          <label>رقم الهاتف <em>*</em><input required type="tel" value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="01xxxxxxxxx" autoComplete="tel" dir="ltr"/></label>
          <label>رقم واتساب <em>*</em><input required type="tel" value={form.whatsapp} onChange={e=>update("whatsapp",e.target.value)} placeholder="رقم واتساب للتواصل" dir="ltr"/></label>
          <label>المدينة <em>*</em><input required value={form.city} onChange={e=>update("city",e.target.value)} placeholder="المدينة أو المنطقة الصناعية"/></label>
          <label>المحافظة <span className="optional">اختياري</span><select value={form.governorate} onChange={e=>update("governorate",e.target.value)}><option value="">المحافظة</option>{governorates.map(x=><option key={x}>{x}</option>)}</select></label>
          <label>اسم الشركة أو المصنع <span className="optional">اختياري</span><input value={form.companyName} onChange={e=>update("companyName",e.target.value)} placeholder="اسم الشركة أو المصنع"/></label>
          <label>نوع النشاط <span className="optional">اختياري</span><select value={form.companyType} onChange={e=>update("companyType",e.target.value)}><option value="">اختر إن رغبت</option>{companyTypes.map(x=><option key={x}>{x}</option>)}</select></label>
          <label>البريد الإلكتروني <span className="optional">اختياري</span><input type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="name@company.com" autoComplete="email" dir="ltr"/></label>
          <label className="field-full">الموقع الإلكتروني أو صفحة الشركة <span className="optional">اختياري</span><input type="url" value={form.website} onChange={e=>update("website",e.target.value)} placeholder="https://" dir="ltr"/></label>
        </div>
        <div className="form-divider"/><div className="subsection-title"><h4>مجالات التوريد <span className="optional">اختياري</span></h4><p>يمكنك تجاوز هذا القسم الآن.</p></div>
        <div className="category-grid">{categories.map(category=><label className="check-option" key={category}><input type="checkbox" checked={selectedCategories.includes(category)} onChange={e=>setSelectedCategories(current=>e.target.checked?[...current,category]:current.filter(x=>x!==category))}/><span className="custom-check">✓</span><span>{category}</span></label>)}</div>
        <div className="field-grid field-grid-bottom">
          <label className="field-full">أهم المنتجات أو الخدمات <span className="optional">اختياري</span><input value={form.products} onChange={e=>update("products",e.target.value)} placeholder="اكتب المنتجات أو الخدمات"/></label>
          <label>نطاق التغطية أو التوزيع <span className="optional">اختياري</span><input value={form.coverage} onChange={e=>update("coverage",e.target.value)} placeholder="مثال: جميع محافظات مصر"/></label>
          <label>ملاحظات إضافية <span className="optional">اختياري</span><input value={form.notes} onChange={e=>update("notes",e.target.value)} placeholder="أي تفاصيل إضافية"/></label>
        </div>
        <div className="consent-list"><label><input type="checkbox" required checked={form.privacyConsent} onChange={e=>update("privacyConsent",e.target.checked)}/><span>أقر بصحة البيانات وأوافق على استخدامها للتواصل بشأن تسجيل الموردين. <em>*</em></span></label><label><input type="checkbox" checked={form.contactConsent} onChange={e=>update("contactConsent",e.target.checked)}/><span>أوافق على التواصل معي بخصوص استكمال ملف المورد ومنتجاته.</span></label></div>
        <button className="button button-primary submit-button" type="submit" disabled={isSubmitting}>{isSubmitting?"جارٍ حفظ البيانات...":"إرسال وتسجيل البيانات"} <span>←</span></button>
        {notice&&<p className="form-notice" role="status">{notice}</p>}
        <p className="form-footnote">تُرسل البيانات إلى خادم KVRAT.ai وتُحفظ فقط إذا نجح الاتصال بقاعدة البيانات. لا تُدخل معلومات حساسة غير مطلوبة.</p>
      </form>
    </section>
    <footer className="site-footer"><a className="brand brand-footer" href="#top"><span className="brand-word">KVRAT<span>.ai</span><small>Business Network</small></span><span className="brand-symbol">K</span></a><p>KVRAT.ai · سوق رقمي متعدد القطاعات للتجارة والتوريد، تحت إشراف K.V.R.</p><a href="#top">العودة إلى الأعلى ↑</a><small>© {new Date().getFullYear()} KVRAT.ai · جميع الحقوق محفوظة</small></footer>
  </main>;
}
