import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KVRAT.ai | Packaging Products & Supplier Network",
  description:
    "Discover packaging products and connect factories, suppliers, distributors, businesses and consumers through the KVRAT.ai packaging network.",
  applicationName: "KVRAT.ai",
  openGraph: {
    title: "KVRAT.ai | Packaging Products & Supplier Network",
    description:
      "A focused network for packaging products, supplier discovery and quotation requests.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
