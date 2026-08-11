import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';

import { site } from '@/site.config';

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

const BASLIK = 'Özel Meşe Ağız ve Diş Sağlığı Polikliniği — Alsancak, İzmir';
const ACIKLAMA =
  'Alsancak’ta zemin katta ağız ve diş sağlığı polikliniği. İmplantoloji, ortodonti, ' +
  'endodonti, pedodonti, periodontoloji ve restoratif diş tedavisi dallarında hasta kabul edilir.';

export const metadata: Metadata = {
  metadataBase: new URL(site.adres),
  title: BASLIK,
  description: ACIKLAMA,
  alternates: { canonical: '/' },
  /* Demo sürümü arama motorlarına kapalı — bkz. site.config.ts */
  robots: site.demoModu ? { index: false, follow: false } : undefined,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Özel Meşe Ağız ve Diş Sağlığı Polikliniği',
    title: BASLIK,
    description:
      'Girişte eşik ve merdiven yok. Çocuk hastalar için ayrı bekleme ve tedavi bölümü. ' +
      'Altı dalda hasta kabul ediliyor.'
  }
};

export const viewport: Viewport = {
  themeColor: '#06301f'
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Özel Meşe Ağız ve Diş Sağlığı Polikliniği',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kıbrıs Şehitleri Caddesi No: 148, Kat 1',
    addressLocality: 'Konak',
    addressRegion: 'İzmir',
    postalCode: '35220',
    addressCountry: 'TR'
  },
  telephone: '+902320000000',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00'
    },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' }
  ],
  availableService: [
    'İmplantoloji',
    'Ortodonti',
    'Endodonti',
    'Pedodonti',
    'Periodontoloji',
    'Restoratif diş tedavisi'
  ].map((name) => ({ '@type': 'MedicalProcedure', name }))
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
