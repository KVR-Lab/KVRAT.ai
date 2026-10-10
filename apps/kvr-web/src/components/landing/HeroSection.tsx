'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onRegisterClick: () => void;
}

export default function HeroSection({ onRegisterClick }: HeroSectionProps) {
  return (
    <section className="relative w-full bg-white pt-20 pb-32 px-6 sm:px-8 lg:px-12">
      {/* Decorative SVG Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="w-full h-full opacity-[0.03]"
          viewBox="0 0 1200 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0B1215" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Heading */}
        <div className="space-y-6 mb-12">
          <div className="inline-block">
            <span className="px-4 py-2 bg-brand-light border border-brand-blue/20 rounded-full text-sm font-medium text-brand-blue">
              ✨ الشبكة العالمية لصناعة التعبئة والتغليف
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-brand-dark leading-[1.1]">
            KVRAT.ai
          </h1>

          <p className="text-2xl md:text-3xl text-brand-dark/70 font-light max-w-3xl leading-relaxed">
            منصة B2B متقدمة تربط الموردين والمصانع والمستودعات والمشترين في منظومة متكاملة.
          </p>

          <p className="text-lg text-brand-dark/60 max-w-2xl font-light">
            استفد من تقنيات الذكاء الاصطناعي لتحسين عملياتك اللوجستية وتوسيع نطاق عملك عالميًا.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button
            onClick={onRegisterClick}
            className="group relative px-8 py-4 bg-brand-blue text-white font-semibold rounded-lg text-lg transition-all duration-300 hover:bg-brand-navy hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
          >
            سجّل منشأتك الآن
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            className="px-8 py-4 bg-brand-light text-brand-blue font-semibold rounded-lg text-lg border-2 border-brand-blue/30 transition-all duration-300 hover:border-brand-blue hover:bg-brand-blue/5"
          >
            اتعرف أكثر
          </button>
        </div>

        {/* SVG Architecture Diagram */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <p className="text-sm font-semibold text-brand-dark/60 mb-8 uppercase tracking-wider">
            منموذج التشغيل
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            {/* Suppliers */}
            <div className="flex flex-col items-center space-y-3 flex-1">
              <div className="w-20 h-20 rounded-lg bg-brand-light border-2 border-brand-blue/30 flex items-center justify-center">
                <svg className="w-10 h-10 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m5 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="font-semibold text-brand-dark">الموردون</p>
              <p className="text-xs text-brand-dark/50 text-center">المواد الخام</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-brand-blue/30">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H5" />
              </svg>
            </div>

            {/* Manufacturers */}
            <div className="flex flex-col items-center space-y-3 flex-1">
              <div className="w-20 h-20 rounded-lg bg-brand-light border-2 border-brand-blue/30 flex items-center justify-center">
                <svg className="w-10 h-10 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-semibold text-brand-dark">المصانع</p>
              <p className="text-xs text-brand-dark/50 text-center">الإنتاج والتصنيع</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-brand-blue/30">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H5" />
              </svg>
            </div>

            {/* KVRAT Hub */}
            <div className="flex flex-col items-center space-y-3 flex-1">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-brand-blue to-brand-navy flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="font-semibold text-brand-dark">KVRAT Hub</p>
              <p className="text-xs text-brand-dark/50 text-center">المستودعات والتخزين</p>
            </div>

            {/* Arrow */}
            <div className="hidden md:block text-brand-blue/30">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H5" />
              </svg>
            </div>

            {/* Buyers */}
            <div className="flex flex-col items-center space-y-3 flex-1">
              <div className="w-20 h-20 rounded-lg bg-brand-light border-2 border-brand-blue/30 flex items-center justify-center">
                <svg className="w-10 h-10 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-semibold text-brand-dark">المشترون</p>
              <p className="text-xs text-brand-dark/50 text-center">السوق النهائي</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
