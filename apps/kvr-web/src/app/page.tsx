 import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen antialiased selection:bg-[#00E676] selection:text-[#121212] bg-white text-[#0F172A] dir-rtl" dir="rtl">
      
      {/* Navbar */}
      <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#00E676] shadow-[0_0_10px_#00E676]"></div>
            <span className="text-xl font-black tracking-tight text-[#0F172A]">
              Nail Golden <span className="text-[#00E676]">&amp;</span> KVRAT.ai
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-[#0F172A] hover:bg-black text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg text-sm">
              دخول المنظومة
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-24 px-6 text-center max-w-5xl mx-auto">
        <span className="inline-block bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-sm">
          قيادة وتنفيذ سيادي | K.V.R Executive Authority
        </span>
        
        <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] leading-tight mb-6 tracking-tight">
          المنظومة الذكية للتجارة الإلكترونية متعددة الموردين والتنبؤ <span className="text-[#00E676] font-black">الذكي</span> بالطلب
        </h1>
        
        <p className="text-[#475569] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
          ربط وإدارة عمليات البيع للمنتجات النهائية بنظامي <strong className="font-bold text-[#0F172A]">B2B</strong> و <strong className="font-bold text-[#0F172A]">B2C</strong> وتمكين الموردين والتجار عبر بنها، القاهرة، الجيزة، والقليوبية بأحدث تقنيات التنبؤ بسلاسل الإمداد.
        </p>

        {/* Banner */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-2xl max-w-2xl mx-auto mb-10 text-right shadow-sm">
          <h3 className="text-base font-bold text-[#0F172A] mb-1 flex items-center gap-2">
            <span className="text-[#00E676]">●</span> نطاق العمليات المعتمد
          </h3>
          <p className="text-sm text-[#475569] leading-relaxed">
            تختص المنصة بالمنتجات النهائية والتجارة المباشرة للشركات والأفراد، مع ربط محركات التنبؤ وسلاسل الإمداد الذكية لضمان أعلى عائد استثماري.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-[#00E676] hover:bg-[#00C853] text-[#121212] font-black px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl text-base">
            انضم للمنظومة الآن
          </button>
        </div>
      </header>

      {/* Key Modules / Features Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E2E8F0]">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-sm hover:border-[#00E676] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center mb-6 border border-[#E2E8F0] text-[#121212] font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">التجارة متعددة الموردين (B2B &amp; B2C)</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              إدارة شاملة للمنتجات النهائية، عمليات البيع، والربط المباشر بين الموردين والتجار والعملاء.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-sm hover:border-[#00E676] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center mb-6 border border-[#E2E8F0] text-[#121212] font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">التنبؤ الذكي بالطلب</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              خوارزميات تحليل بيانات السلوك والطلب المحلي لتحديد حجم الاحتياج بدقة متناهية.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-sm hover:border-[#00E676] transition-all">
            <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center mb-6 border border-[#E2E8F0] text-[#121212] font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">سلاسل الإمداد والتأمين</h3>
            <p className="text-sm text-[#475569] leading-relaxed">
              تتبع لحظي وإدارة ذكية للمخزون والتوصيل المباشر عبر المحافظات المستهدفة.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#E2E8F0] text-center text-xs text-[#475569]">
        <p>© 2026 Nail Golden &amp; KVRAT.ai. جميع الحقوق محفوظة. إشراف وتنفيذ K.V.R.</p>
      </footer>

    </div>
  );
         }
