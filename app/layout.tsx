import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Reveal from "../components/Reveal";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Beyaz Diş Kliniği | Ağız ve Diş Sağlığı Merkezi",
  description:
    "Ankara Çankaya'da ağız ve diş sağlığı. İmplant, ortodonti, estetik diş hekimliği ve çocuk diş hekimliği. Dijital görüntüleme ile planlanan tedavi süreçleri.",
  keywords: [
    "diş kliniği",
    "implant",
    "ortodonti",
    "diş beyazlatma",
    "zirkonyum kaplama",
  ],
  openGraph: {
    title: "Beyaz Diş Kliniği",
    description: "Ankara Çankaya'da ağız ve diş sağlığı hizmetleri.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        {/* Reveal animasyonlarının içeriği gizlemesi yalnızca .js altında
            geçerli. JS çalışmazsa hiçbir bölüm görünmez kalmaz. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Reveal />
        <SpeedInsights />
      </body>
    </html>
  );
}
