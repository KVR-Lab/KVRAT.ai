 'use client';

import React, { useState } from 'react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // التعامل مع ضغط الأزرار والتوجيه
  const handleAction = (actionType: string) => {
    if (actionType === 'register' || actionType === 'start') {
      setShowModal(true);
    } else if (actionType === 'login') {
      window.location.href = '#login';
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
              className="text-[#64748B] hover:text-[#0F172A] font-bold px-4 py-2 transition-colors text-sm"
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
              className="p-2 text-[#0F172A] focus:outline-none"
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
              className="w-full bg-[#EA580C] text-white font-bold py-3 rounded-xl text-center shadow-md text-sm"
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
            تمنح المنصة الموردين والتجار المسجلين في هذه المرحلة الاستراتيجية إع
