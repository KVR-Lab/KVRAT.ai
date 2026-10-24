import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KVRAT.ai | Business & Consumer Marketplace',
  description: 'منظومة تجارية متعددة القطاعات تربط أصحاب المصانع والتجار والموردين والمسوقين بالعمولة والمستهلكين. اكتشف المنتجات واطلب عروض الأسعار وتواصل مباشرة.',
  applicationName: 'KVRAT.ai',
  keywords: ['KVRAT.ai', 'B2B', 'B2C', 'المصانع', 'الموردون', 'التجار', 'المسوقون بالعمولة', 'المنتجات'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-white text-gray-900 antialiased selection:bg-orange-100 selection:text-orange-900">
        {children}
      </body>
    </html>
  );
}
