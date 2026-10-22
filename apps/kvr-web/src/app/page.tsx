 import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navbar */}
      <header className="border-b border-gray-200 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="flex items-center space-x-3 space-x-reverse">
          <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900">
            Nail Golden & <span style={{ color: '#00E676' }}>KVRAT.ai</span>
          </span>
        </div>
        <nav className="hidden md:flex space-x-8 space-x-reverse text-sm font-semibold text-gray-600">
          <a href="#solutions" className="hover:text-black transition">الخدمات والحلول</a>
          <a href="#forecasting" className="hover:text-black transition">التنبؤ الذكي</a>
          <a href="#regions" className="hover:text-black transition">النطاق الجغرافي</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wide rounded-full border border-gray-200 bg-gray-50 text-gray-800">
          منظومة سلاسل الإمداد والحلول اللوجستية الذكية
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
          إدارة وتوزيع التجارة <br className="hidden sm:block" />
          بتقنيات <span style={{ color: '#00E676' }}>التنبؤ الذكي</span>
        </h1>
        <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          منصة متكاملة لخدمة قطاعات B2B و B2C للمنتجات النهائية، تُمكن التجار والشركات من تتبع الطلبات، تحسين المخزون، ورفع كفاءة التوريد في بنها، القاهرة، الجيزة، والقليوبية.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#register"
            className="px-8 py-3.5 rounded-lg text-white font-bold transition shadow-sm hover:opacity-95 text-center"
            style={{ backgroundColor: '#121212' }}
          >
            تسجيل منشأة جديدة
          </a>
          <a
            href="#solutions"
            className="px-8 py-3.5 rounded-lg border border-gray-300 font-bold text-gray-800 hover:bg-gray-50 transition text-center"
          >
            استكشف المنظومة
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="solutions" className="bg-gray-50 py-16 px-6 border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-right">
          
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 rounded-lg mb-6 flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: '#00E676' }}>
              01
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">تجارة B2B & B2C</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              بيع وتوزيع المنتجات النهائية للمؤسسات والأفراد عبر لوحة تحكم موحدة ومتابعة لحظية حركة العمليات.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 rounded-lg mb-6 flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: '#121212' }}>
              02
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">التنبؤ الذكي بالطلب</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              تحليل حركة المبيعات وتوقع احتياجات السوق والمخزون بدقة عالية للحد من النقص أو الهدر.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-12 h-12 rounded-lg mb-6 flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: '#00E676' }}>
              03
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">التغطية الإقليمية</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              ربط ونقل لوجستي متكامل يغطي نطاقات بنها، القليوبية، القاهرة، والجيزة بكفاءة عالية.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-sm text-gray-500 border-t border-gray-200 bg-white">
        <p>© 2026 Nail Golden & KVRAT.ai — جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
