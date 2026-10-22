 import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen antialiased selection:bg-[#EA580C] selection:text-white bg-[#F8FAFC] text-[#0F172A]" dir="rtl">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🛡️</span>
            <span className="text-xl font-black tracking-wider text-[#EA580C]">
              Nail Golden <span className="text-[#0284C7]">& KVRAT.ai</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-md text-sm">
              انضم إلى K.V.R 🛡️
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-20 px-6 text-center max-w-5xl mx-auto">
        <span className="inline-block bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/20 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
          تحت إشراف وإدارة K.V.R الدولية
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] leading-tight mb-6">
          المنظومة الرقمية الكبرى لربط وإدارة <span className="text-[#EA580C]">المنتجات النهائية</span> بنظامي B2B و B2C
        </h1>
        
        <p className="text-[#64748B] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
          نربط الأسواق ونمكن التجار والموردين في بنها، القاهرة، الجيزة، والقليوبية بأحدث محركات التنبؤ وسلاسل الإمداد الذكية للمنتجات النهائية حصرياً.
        </p>

        {/* Callout Banner */}
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl max-w-2xl mx-auto mb-10 shadow-sm text-right">
          <h3 className="text-lg font-bold text-[#EA580C] mb-2">⚡ امتيازات حصرية للموردين والتجار المبكرين</h3>
          <p className="text-sm text-[#64748B] leading-relaxed">
            تمنح المنصة الموردين والتجار المسجلين في هذه المرحلة الاستراتيجية إعفاءً كاملاً من رسوم الربط البرمجي مدى الحياة وعمولات تفضيلية ثابتة لا تتغير مع توسع الكيان.
          </p>
        </div>

        <button className="bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-base">
          ابتدئ الآن مع K.V.R
        </button>
      </header>

      {/* Feature Cards */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E2E8F0]">
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🏭</div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">تطبيق الموردين (B2B)</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">إدارة كاملة للمخازن، الطلبات، والأسعار الديناميكية للمنتجات النهائية بمرونة ودقة عالية.</p>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">التنبؤ الذكي بالطلب</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">خوارزميات تحليل بيانات السلوك والطلب المحلي لتحديد حجم الاحتياج بدقة متناهية عبر بنها ومحافظات الكور.</p>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">سلاسل الإمداد الرقمية</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">تتبع لحظي وإدارة ذكية للمخزون والتوصيل المباشر للعملاء والشركات (B2C & B2B).</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
        <p>© 2026 KVRAT.ai. جميع الحقوق محفوظة. إشراف وتنفيذ K.V.R.</p>
      </footer>

    </div>
  );
}
