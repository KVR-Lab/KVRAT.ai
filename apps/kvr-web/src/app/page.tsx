'use client';

import React, { useState } from 'react';

const BRAND = {
  orange: '#F97316',
  orangeDark: '#C2410C',
  blue: '#0284C7',
  blueDark: '#0369A1',
  ink: '#0F172A',
  muted: '#64748B',
  background: '#F8FAFC',
  border: '#E2E8F0',
};

const categories = [
  'أكياس وشنط التغليف',
  'الكرتون والعلب',
  'مواد التعبئة والتغليف',
  'البلاستيك ومواد التغليف',
  'الورق والمناديل',
  'الاسترتش والشرنك',
  'الأشرطة واللاصق',
  'ماكينات ومعدات التغليف',
  'عبوات الزجاج والبلاستيك',
  'مستلزمات المطاعم والمصانع',
  'مواد خام',
  'أخرى',
];

const governorates = [
  'القاهرة',
  'الجيزة',
  'الإسكندرية',
  'القليوبية',
  'الشرقية',
  'الغربية',
  'المنوفية',
  'الدقهلية',
  'البحيرة',
  'دمياط',
  'بورسعيد',
  'الإسماعيلية',
  'السويس',
  'كفر الشيخ',
  'الفيوم',
  'بني سويف',
  'المنيا',
  'أسيوط',
  'سوهاج',
  'قنا',
  'الأقصر',
  'أسوان',
  'مطروح',
  'شمال سيناء',
  'جنوب سيناء',
  'البحر الأحمر',
  'الوادي الجديد',
  'أخرى',
];

const initialForm = {
  companyName: '',
  contactName: '',
  role: '',
  accountType: 'مصنع',
  phone: '',
  whatsapp: '',
  email: '',
  governorate: '',
  city: '',
  address: '',
  categories: [] as string[],
  products: '',
  website: '',
  facebook: '',
  yearsInBusiness: '',
  customerTypes: [] as string[],
  distributionAreas: '',
  productionCapacity: '',
  minimumOrder: '',
  notes: '',
  consent: false,
};

type FormData = typeof initialForm;

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-sm font-extrabold text-orange-600">{eyebrow}</p>
      <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-sm font-bold text-slate-800">
        {label}
        {required && <span className="mr-1 text-red-600">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>}
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100';

function CheckOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 transition hover:border-sky-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-sky-600"
      />
      <span className="text-slate-700">{label}</span>
    </label>
  );
}

export default function LandingPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function updateField<K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleArrayValue(
    key: 'categories' | 'customerTypes',
    value: string,
    checked: boolean,
  ) {
    setForm((current) => {
      const existing = current[key];

      return {
        ...current,
        [key]: checked
          ? [...existing, value]
          : existing.filter((item) => item !== value),
      };
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage('');
    set/span>
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
