import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';

import { klinik, saatler, site, tedaviler } from '@/site.config';

import '@/ds/styles.css';
import './globals.css';

/* latin-ext alt kümesi Türkçe karakterler (ğ ş ı İ ç ö ü) için gerekli. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-jakarta'
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-mono'
});

/* Bu dosyadaki metinlerin tamamı site.config.ts'ten türetilir; klinik
   değiştiğinde burada elle güncellenecek bir şey kalmamalıdır. */

const BASLIK = `${klinik.ad} — ${klinik.konum}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.adres),
  title: BASLIK,
  description: klinik.metaAciklama,
  alternates: { canonical: '/' },
  /* Demo sürümü arama motorlarına kapalı — bkz. site.config.ts */
  robots: site.demoModu ? { index: false, follow: false } : undefined,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: klinik.ad,
    title: BASLIK,
    description: klinik.metaAciklama
  }
};

export const viewport: Viewport = {
  themeColor: '#06301f'
};

/* Yapısal veri: schema.org gün adlarını İngilizce ister. */
const GUN_ADLARI = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: klinik.ad,
  address: {
    '@type': 'PostalAddress',
    streetAddress: klinik.sokak,
    addressLocality: klinik.ilce,
    addressRegion: klinik.il,
    postalCode: klinik.postaKodu,
    addressCountry: 'TR'
  },
  telephone: klinik.telHref.replace(/^tel:/, ''),
  email: klinik.eposta,
  url: site.adres,
  openingHoursSpecification: saatler
    .filter((kural) => !kural.kapali)
    .map((kural) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: kural.gunler.map((gun) => GUN_ADLARI[gun]),
      opens: kural.ac,
      closes: kural.kap
    })),
  availableService: tedaviler.map((tedavi) => ({
    '@type': 'MedicalProcedure',
    name: tedavi.ad
  }))
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${jakarta.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
