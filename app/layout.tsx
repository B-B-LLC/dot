import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Beyaz Diş Kliniği | Ağız ve Diş Sağlığı Merkezi",
  description:
    "İmplant, ortodonti, estetik diş hekimliği ve çocuk diş hekimliğinde 15 yıllık deneyim. Aynı gün randevu, ağrısız tedavi, şeffaf fiyatlandırma.",
  keywords: [
    "diş kliniği",
    "implant",
    "ortodonti",
    "diş beyazlatma",
    "zirkonyum kaplama",
  ],
  openGraph: {
    title: "Beyaz Diş Kliniği",
    description: "Güvenilir ve konforlu ağız ve diş sağlığı hizmeti.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
