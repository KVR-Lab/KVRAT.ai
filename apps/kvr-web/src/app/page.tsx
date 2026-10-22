'use client';

import React, { useState } from 'react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen antialiased selection:bg-[#EA580C] selection:text-white bg-[#F8FAFC] text-[#0F172A] w-full overflow-x-hidden" dir="rtl">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
            <span className="text-xl">🛡️</span>
            <span className="text-base sm:text-lg font-black tracking-wider text-[#EA580C]">
              Nail Golden <span className="text-[#0284C7]">& KVRAT.ai</span>
            </span>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => openAuth('login')}
              className="text-[#64748B] hover:text-[#0F172A] font-bold px-4 py-2 transition-colors text-sm cursor-pointer"
            >
              تسجيل الدخول
            </button>
            <button 
              onClick={() => openAuth('register')}
              className="bg-[#EA580C] hover:bg-[#C2410C] active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-md text-sm cursor-pointer"
            >
              انضم إلى K.V.R 🛡️
            </button>
          </div>

          {/* Mobile Menu Toggle */}
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

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
            <button 
              onClick={() => { openAuth('login'); setIsMenuOpen(false); }}
              className="w-full text-right py-2.5 px-3 text-[#0F172A] font-bold text-sm bg-gray-50 rounded-lg"
            >
              تسجيل الدخول
            </button>
            <button 
              onClick={() => { openAuth('register'); setIsMenuOpen(false); }}
              className="w-full bg-[#EA580C] text-white font-bold py-2.5 px-3 rounded-lg text-center shadow-sm text-sm"
            >
              انضم إلى K.V.R 🛡️
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="py-12 sm:py-20 px-4 text-center max-w-5xl mx-auto">
        <span className="inline-block bg-[#0284C7]/10 text-[#0284C7] border border-[#0284C7]/20 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6">
          تحت إشراف وإدارة K.V.R الدولية
        </span>
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0F172A] leading-snug sm:leading-tight mb-6">
          المنظومة الرقمية الكبرى لربط وإدارة <span className="text-[#EA580C]">المنتجات النهائية</span> بنظامي B2B و B2C
        </h1>
        
        <p className="text-[#64748B] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8 px-2">
          نربط الأسواق ونمكن التجار والموردين في بنها، القاهرة، الجيزة، والقليوبية بأحدث محركات التنبؤ وسلاسل الإمداد الذكية للمنتجات النهائية حصرياً.
        </p>

        {/* Callout Banner */}
        <div className="bg-white border border-[#E2E8F0] p-5 sm:p-6 rounded-2xl max-w-2xl mx-auto mb-8 shadow-sm text-right">
          <h3 className="text-base sm:text-lg font-bold text-[#EA580C] mb-2 flex items-center gap-2">
            <span>⚡</span>
            <span>امتيازات حصرية للموردين والتجار المبكرين</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            تمنح المنصة الموردين والتجار المسجلين في هذه المرحلة الاستراتيجية إعفاءً كاملاً من رسوم الربط البرمجي مدى الحياة وعمولات تفضيلية ثابتة لا تتغير مع توسع الكيان.
          </p>
        </div>

        <button 
          onClick={() => openAuth('register')}
          className="w-full sm:w-auto bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg text-base cursor-pointer"
        >
          ابتدئ الآن مع K.V.R
        </button>
      </header>

      {/* Feature Cards */}
      <section className="py-12 sm:py-16 px-4 max-w-7xl mx-auto border-t border-[#E2E8F0]">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">🏭</div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">تطبيق الموردين (B2B)</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">إدارة كاملة للمخازن، الطلبات، والأسعار الديناميكية للمنتجات النهائية بمرونة ودقة عالية.</p>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">التنبؤ الذكي بالطلب</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">خوارزميات تحليل بيانات السلوك والطلب المحلي لتحديد حجم الاحتياج بدقة متناهية عبر بنها ومحافظات الكور.</p>
          </div>

          <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2">سلاسل الإمداد الرقمية</h3>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">تتبع لحظي وإدارة ذكية للمخزون والتوصيل المباشر للعملاء والشركات (B2C & B2B).</p>
          </div>

        </div>
      </section>

      {/* Clean Interactive Modal (No Alert Browser Popups) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full border border-[#E2E8F0] shadow-2xl relative text-right">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 text-[#64748B] hover:text-[#0F172A] text-xl font-bold p-1 cursor-pointer"
            >
              ✕
            </button>

            {authMode === 'login' ? (
              <>
                <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-2">تسجيل الدخول</h3>
                <p className="text-xs sm:text-sm text-[#64748B] mb-5">ادخل إلى لوحة التحكم الخاصة بمنظومتك:</p>
                <form onSubmit={(e) => { e.preventDefault(); setShowModal(false); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">البريد الإلكتروني / رقم الهاتف</label>
                    <input type="text" className="w-full border border-[#E2E8F0] rounded-xl p-2.5 text-sm outline-none focus:border-[#0284C7]" placeholder="example@kvrat.ai" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] mb-1">كلمة المرور</label>
                    <input type="password" className="w-full border border-[#E2E8F0] rounded-xl p-2.5 text-sm outline-none focus:border-[#0284C7]" placeholder="••••••••" required />
                  </div>
                  <button type="submit" className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold py-3 rounded-xl transition-all text-sm cursor-pointer">
                    دخول المنظومة
                  </button>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-2">الانضمام إلى المنظومة</h3>
                <p className="text-xs sm:text-sm text-[#64748B] mb-5">اختر نوع الحساب للبدء في التسجيل المباشر:</p>
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="w-full bg-[#F8FAFC] hover:bg-[#EA580C] hover:text-white border border-[#E2E8F0] text-[#0F172A] font-bold py-3 px-4 rounded-xl transition-all text-right flex justify-between items-center text-sm cursor-pointer"
                  >
                    <span>حساب مورد / مصنع (B2B)</span>
                    <span>←</span>
                  </button>
                  <button 
                    onClick={() => setShowModal(false)}
                    className="w-full bg-[#F8FAFC] hover:bg-[#0284C7] hover:text-white border border-[#E2E8F0] text-[#0F172A] font-bold py-3 px-4 rounded-xl transition-all text-right flex justify-between items-center text-sm cursor-pointer"
                  >
                    <span>حساب تاجر / منفذ (B2C)</span>
                    <span>←</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
        <p>© 2026 Nail Golden & KVRAT.ai. جميع الحقوق محفوظة. إشراف وتنفيذ K.V.R.</p>
      </footer>

    </div>
  );
}
