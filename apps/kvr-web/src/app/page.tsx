 'use client';

import React, { useState } from 'react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // معالجة ضغط الأزرار والتفاعل والتنقل
  const handleAction = (actionType: string) => {
    if (actionType === 'register' || actionType === 'start') {
      setShowModal(true);
    } else if (actionType === 'login') {
      alert('جاري التوجيه إلى بوابة تسجيل الدخول...');
    }
  };

  return (
    <div className="min-h-screen antialiased selection:bg-[#EA580C] selection:text-white bg-[#F8FAFC] text-[#0F172A]" dir="rtl">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/'}>
            <span className="text-2xl">🛡️</span>
            <span className="text-xl font-black tracking-wider text-[#EA580C]">
              Nail Golden <span className="text-[#0284C7]">& KVRAT.ai</span>
            </span>
          </div>

          {/* Desktop Navigation Action */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => handleAction('login')}
              className="text-[#64748B] hover:text-[#0F172A] font-bold px-4 py-2 transition-colors text-sm cursor-pointer"
            >
              تسجيل الدخول
            </button>
            <button 
              onClick={() => handleAction('register')}
              className="bg-[#EA580C] hover:bg-[#C2410C] active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-md text-sm cursor-pointer"
            >
              انضم إلى K.V.R 🛡️
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#0F172A] focus:outline-none cursor-pointer"
              aria-label="القائمة"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-[#E2E8F0] flex flex-col gap-3">
            <button 
              onClick={() => { handleAction('login'); setIsMenuOpen(false); }}
              className="w-full text-right py-2 text-[#0F172A] font-bold text-sm"
            >
              تسجيل الدخول
            </button>
            <button 
              onClick={() => { handleAction('register'); setIsMenuOpen(false); }}
              className="w-full bg-[#EA580C] text-white font-bold py-3 rounded-xl text-center shadow-md text-sm cursor-pointer"
            >
              انضم إلى K.V.R 🛡️
            </button>
          </div>
        )}
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
          نربط الأسواق ونمكن التجار والموردين في بنها، القاهرة، الجيزة، والقليوبية بأحدث محركات التنبؤ وسلاسل الإمداد الذكية للممنتجات النهائية حصرياً.
        </p>

        {/* Callout Banner */}
        <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl max-w-2xl mx-auto mb-10 shadow-sm text-right">
          <h3 className="text-lg font-bold text-[#EA580C] mb-2">⚡ امتيازات حصرية للموردين والتجار المبكرين</h3>
          <p className="text-sm text-[#64748B] leading-relaxed">
            تمنح المنصة الموردين والتجار المسجلين في هذه المرحلة الاستراتيجية إعفاءً كاملاً من رسوم الربط البرمجي مدى الحياة وعمولات تفضيلية ثابتة لا تتغير مع توسع الكيان.
          </p>
        </div>

        <button 
          onClick={() => handleAction('start')}
          className="bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-base cursor-pointer"
        >
          ابتدئ الآن مع K.V.R
        </button>
      </header>

      {/* Feature Cards */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#E2E8F0]">
        <div className="grid md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🏭</div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">تطبيق الموردين (B2B)</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">إدارة كاملة للمخازن، الطلبات، والأسعار الديناميكية للممنتجات النهائية بمرونة ودقة عالية.</p>
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

      {/* Registration Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-[#E2E8F0] shadow-2xl relative text-right">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 text-[#64748B] hover:text-[#0F172A] text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-2xl font-black text-[#0F172A] mb-2">الانضمام إلى المنظومة</h3>
            <p className="text-sm text-[#64748B] mb-6">يرجى اختيار نوع الحساب للبدء في التسجيل المباشر:</p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { alert('تم اختيار حساب مورد B2B'); setShowModal(false); }}
                className="w-full bg-[#F8FAFC] hover:bg-[#EA580C] hover:text-white border border-[#E2E8F0] text-[#0F172A] font-bold py-3 px-4 rounded-xl transition-all text-right flex justify-between items-center cursor-pointer"
              >
                <span>حساب مورد / مصنع (B2B)</span>
                <span>←</span>
              </button>
              <button 
                onClick={() => { alert('تم اختيار حساب تاجر / مجزأ B2C'); setShowModal(false); }}
                className="w-full bg-[#F8FAFC] hover:bg-[#0284C7] hover:text-white border border-[#E2E8F0] text-[#0F172A] font-bold py-3 px-4 rounded-xl transition-all text-right flex justify-between items-center cursor-pointer"
              >
                <span>حساب تاجر / منفذ (B2C)</span>
                <span>←</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
        <p>© 2026 KVRAT.ai. جميع الحقوق محفوظة. إشراف وتنفيذ K.V.R.</p>
      </footer>

    </div>
  );
}
