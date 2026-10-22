import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nail Golden & KVRAT.ai | منصة إدارة وسلاسل إمداد التجارة',
  description: 'منظومة متعددة التجار لربط عمليات B2B و B2C مع تقنيات التنبؤ الذكي بالطلب وإدارة سلاسل الإمداد.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-white text-gray-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
