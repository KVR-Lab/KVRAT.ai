'use client';

import React, { useState } from 'react';
import { SectorCategory } from '@/types/facility.types';

interface Category {
  id: SectorCategory;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ReactNode;
  examples: string[];
}

const CATEGORIES: Category[] = [
  {
    id: SectorCategory.HOME_APPLIANCES,
    title: 'Home & Appliances',
    titleAr: 'تعبئة المنزل والأجهزة',
    description: 'Packaging for household appliances, electronics, and consumer goods',
    descriptionAr: 'تعبئة وتغليف الأجهزة المنزلية والإلكترونيات والسلع الاستهلاكية',
    icon: (
      <svg className="w-12 h-12 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 015.646 5.646 9 9 0 1020.354 15.354z" />
      </svg>
    ),
    examples: ['Microwave boxes', 'Fridge packaging', 'Electronics cartons'],
  },
  {
    id: SectorCategory.FOOD_PHARMA,
    title: 'Food & Pharmaceutical',
    titleAr: 'تعبئة الغذائية والدوائية',
    description: 'Specialized packaging for food safety and pharmaceutical compliance',
    descriptionAr: 'تعبئة متخصصة للغذاء والأدوية مع الالتزام بمعايير السلامة',
    icon: (
      <svg className="w-12 h-12 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7 20H5a2 2 0 01-2-2V9a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H19a2 2 0 012 2v9a2 2 0 01-2 2h-1" />
      </svg>
    ),
    examples: ['Food boxes', 'Medicine blister packs', 'Beverage cartons'],
  },
  {
    id: SectorCategory.PAPER_CARDBOARD,
    title: 'Paper & Cardboard',
    titleAr: 'التعبئة الورقية والكرتونية',
    description: 'Eco-friendly cardboard and paper-based packaging solutions',
    descriptionAr: 'حلول تعبئة ورقية وكرتونية صديقة للبيئة',
    icon: (
      <svg className="w-12 h-12 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    examples: ['Shipping boxes', 'Display packaging', 'Paper bags'],
  },
  {
    id: SectorCategory.PLASTIC_FLEXIBLE,
    title: 'Plastic & Flexible',
    titleAr: 'التعبئة البلاستيكية والمرنة',
    description: 'High-performance plastic films and flexible packaging materials',
    descriptionAr: 'مواد تعبئة بلاستيكية ومرنة عالية الأداء',
    icon: (
      <svg className="w-12 h-12 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    examples: ['Shrink wrap', 'Vacuum bags', 'Stand-up pouches'],
  },
  {
    id: SectorCategory.INDUSTRIAL_LOGISTICS,
    title: 'Industrial & Logistics',
    titleAr: 'التعبئة الصناعية واللوجستية',
    description: 'Heavy-duty industrial packaging and logistics supply solutions',
    descriptionAr: 'حلول التعبئة الصناعية والتوريدات اللوجستية الثقيلة',
    icon: (
      <svg className="w-12 h-12 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    examples: ['Pallets', 'Industrial drums', 'Transit packaging'],
  },
];

export default function CategoriesGrid() {
  const [expandedId, setExpandedId] = useState<SectorCategory | null>(null);

  return (
    <section className="w-full bg-brand-light py-24 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <p className="text-sm font-semibold text-brand-blue uppercase tracking-widest">
            📦 Our Sectors
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight">
            5 Category Specialists
          </h2>
          <p className="text-lg text-brand-dark/60 max-w-2xl font-light">
            Connect with industry leaders across all major packaging segments
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => setExpandedId(expandedId === category.id ? null : category.id)}
              className="group relative bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border border-transparent hover:border-brand-blue/30"
            >
              {/* Icon */}
              <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                {category.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-brand-dark mb-2 leading-snug">
                {category.titleAr}
              </h3>

              {/* Subtitle (English) */}
              <p className="text-xs text-brand-blue font-semibold mb-3 uppercase tracking-wide">
                {category.title}
              </p>

              {/* Description */}
              <p className="text-sm text-brand-dark/60 line-clamp-2 mb-3 leading-relaxed">
                {category.descriptionAr}
              </p>

              {/* Examples (Expandable) */}
              {expandedId === category.id && (
                <div className="mt-4 pt-4 border-t border-brand-blue/20 space-y-2 animate-slide-up">
                  <p className="text-xs font-semibold text-brand-blue uppercase">Examples:</p>
                  <ul className="space-y-1">
                    {category.examples.map((example, idx) => (
                      <li key={idx} className="text-xs text-brand-dark/50 flex items-start gap-2">
                        <span className="text-brand-blue mt-1">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Expand Indicator */}
              <div className="absolute bottom-3 right-3 text-brand-blue/30 transition-transform duration-300 group-hover:text-brand-blue">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7m0 0l-7 7m7-7H5" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 pt-12 border-t border-gray-300 flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex items-center gap-2 text-sm text-brand-dark/60">
            <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            ISO Certified Facilities
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-dark/60">
            <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Global Network
          </div>
          <div className="flex items-center gap-2 text-sm text-brand-dark/60">
            <svg className="w-5 h-5 text-brand-blue" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            24/7 Support
          </div>
        </div>
      </div>
    </section>
  );
}
