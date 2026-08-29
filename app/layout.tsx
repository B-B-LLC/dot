import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';

import { OlcumBetigi } from './_ortak/olcum';
import { renk } from './_ortak/token-renk';
import {
  KLINIK_KIMLIK, SITE_KIMLIK, YapisalVeri, grafik, mutlak
} from './_ortak/yapisal-veri';
import {
  anaBaslik, gorseller, haritaKonumu, klinik, olcum, saatler, site, tedaviler
} from '@/site.config';

import '@/ds/styles.css';
import './globals.css';

/* latin-ext alt kümesi Türkçe karakterler (ğ ş ı İ ç ö ü) için gerekli.

   Ağırlık listesi sitede gerçekten kullanılanla sınırlıdır: next/font burada
   sayılan her ağırlık × her stil × her alt küme için ayrı bir dosya indirir,
   kullanılmayanı da indirir. 300 hiçbir yerde geçmiyordu ve italik hiç
   kullanılmıyor — ikisi Jakarta'nın dosya sayısını üçte birine düşürüyor.
   Yeni bir ağırlık kullanacaksan önce buraya eklemen gerekir, yoksa tarayıcı
   en yakınını sentezler ve harfler kalınlaşmış gibi görünür. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta'
});

/* Tek satırlık künye yazılarında kullanılır; yalnız normal ve orta ağırlık. */
const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono'
});

/* Bu dosyadaki metinlerin tamamı site.config.ts'ten türetilir; klinik
   değiştiğinde burada elle güncellenecek bir şey kalmamalıdır. */

export const metadata: Metadata = {
  metadataBase: new URL(site.adres),
  title: anaBaslik,
  description: klinik.metaAciklama,
  alternates: { canonical: '/' },
  /* Demo sürümü arama motorlarına kapalı — bkz. site.config.ts */
  robots: site.demoModu ? { index: false, follow: false } : undefined,
  /* Search Console doğrulaması; kod yazılmadıysa etiket hiç basılmaz. */
  verification: olcum.googleDogrulama
    ? { google: olcum.googleDogrulama }
    : undefined,
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: klinik.ad,
    /* Ana sayfanın kendi adresi. Next `og:url`ü canonical'dan türetmez;
       alt sayfalarınkini _ortak/ustveri.ts basar. */
    url: '/',
    title: anaBaslik,
    description: klinik.metaAciklama
  }
};

export const viewport: Viewport = {
  /* Tarayıcı çubuğunun rengi; manifest'teki theme_color ile aynı token. */
  themeColor: renk('--emerald-900')
};

/* --- Yapısal veri ---------------------------------------------------------

   Kliniğin kendisi burada, kök düzende bir kez tarif edilir ve her sayfaya
   basılır. Sayfaların kendi verisi (kırıntı gezinme, sorular, tedavi) bu
   düğümü tekrar etmez, `@id` ile ona bağlanır — bkz. _ortak/yapisal-veri.tsx.

   Alanların çoğu koşulludur: config'te boş bırakılan bir bilgi için alan hiç
   basılmaz. Eksik alan sessizdir, uydurma alan zararlıdır. */

/* schema.org gün adlarını İngilizce ister. */
const GUN_ADLARI = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

/* Kliniğin fotoğrafları. Yolu boş bırakılan alanlar listeye girmez. */
const GORSELLER = [gorseller.hero, ...Object.values(gorseller.mekanlar)]
  .filter((gorsel) => gorsel.yol)
  .map((gorsel) => mutlak(gorsel.yol));

/** Config'teki 'enlem,boylam' metnini koordinat düğümüne çevirir; biçim
    tutmuyorsa (ya da alan boşsa) hiçbir şey döndürmez. */
function koordinatDugumu() {
  const eslesme = (klinik.haritaKoordinat ?? '')
    .match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (!eslesme) return undefined;
  return {
    '@type': 'GeoCoordinates',
    latitude: Number(eslesme[1]),
    longitude: Number(eslesme[2])
  };
}

const geo = koordinatDugumu();

const KLINIK_DUGUMU = {
  '@type': 'Dentist',
  '@id': KLINIK_KIMLIK,
  name: klinik.ad,
  description: klinik.metaAciklama,
  url: site.adres,
  telephone: klinik.telHref.replace(/^tel:/, ''),
  email: klinik.eposta,
  address: {
    '@type': 'PostalAddress',
    streetAddress: klinik.sokak,
    addressLocality: klinik.ilce,
    addressRegion: klinik.il,
    postalCode: klinik.postaKodu,
    addressCountry: 'TR'
  },
  ...(geo ? { geo } : {}),
  hasMap: haritaKonumu(),
  areaServed: { '@type': 'City', name: klinik.il },
  medicalSpecialty: 'Dentistry',
  logo: mutlak('/icon/512'),
  ...(GORSELLER.length ? { image: GORSELLER } : {}),
  /* Kliniğin kendi hesapları; yoksa alan basılmaz. */
  ...(klinik.sosyal?.length ? { sameAs: klinik.sosyal } : {}),
  openingHoursSpecification: saatler
    .filter((kural) => !kural.kapali)
    .map((kural) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: kural.gunler.map((gun) => GUN_ADLARI[gun]),
      opens: kural.ac,
      closes: kural.kap
    })),
  /* Ana dallar. `@id` tedavi sayfasındaki düğümle aynıdır, yani iki kayıt
     tek varlıkta birleşir. */
  availableService: tedaviler.map((tedavi) => ({
    '@type': 'MedicalProcedure',
    '@id': `${mutlak(`/tedaviler/${tedavi.id}`)}#islem`,
    name: tedavi.ad,
    description: tedavi.ozet,
    url: mutlak(`/tedaviler/${tedavi.id}`)
  }))
};

const SITE_DUGUMU = {
  '@type': 'WebSite',
  '@id': SITE_KIMLIK,
  url: site.adres,
  name: klinik.ad,
  inLanguage: 'tr-TR',
  publisher: { '@id': KLINIK_KIMLIK }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${jakarta.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <OlcumBetigi />
        <YapisalVeri veri={grafik([SITE_DUGUMU, KLINIK_DUGUMU])} />
      </body>
    </html>
  );
}
