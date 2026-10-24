import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KVRAT.ai | تسجيل الموردين وشركاء التجارة',
  description: 'سجّل اهتمام شركتك أو مصنعك للانضمام إلى شبكة KVRAT.ai للموردين والتجارة وسلاسل الإمداد في السوق المصري.',
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
