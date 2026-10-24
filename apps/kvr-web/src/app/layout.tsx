import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KVRAT.ai | تسجيل الموردين والمصانع",
  description: "سجّل بيانات شركتك ومجالات التوريد استعدادًا لعرض منتجاتك وربطها بالعملاء عبر منظومة KVRAT.ai.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
