import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nail Golden & KVRAT.ai | منظومة التجارة وسلاسل الإمداد',
  description: 'المنظومة الرقمية لربط وإدارة المنتجات النهائية بنظامي B2B وB2C، مع أدوات مستهدفة للتنبؤ بالطلب وإدارة سلاسل الإمداد الذكية في السوق المصري.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-white text-gray-900 antialiased selection:bg-sky-100 selection:text-sky-900">
        {children}
      </body>
    </html>
  );
}
