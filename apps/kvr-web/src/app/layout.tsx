import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KVRAT.ai | سوق رقمي للتجارة والمنتجات والتوريد',
  description: 'سوق رقمي متعدد القطاعات يربط المصانع والموردين والمستوردين والموزعين والتجار والعملاء بمنتجات ومصادر توريد وفرص تجارية ضمن منظومة KVRAT.ai.',
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
