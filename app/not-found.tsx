import type { Metadata } from 'next';

import { klinik, sayfaBasligi } from '@/site.config';
import { OG_ALT, OG_OLCU, OG_TUR, OG_YOL } from './_ortak/og-bilgi';
import BulunamadiIcerik from './_ortak/bulunamadi-icerik';

const BASLIK = sayfaBasligi('Sayfa bulunamadı');

const ACIKLAMA = 'Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.';

/* Kendi adresi olmayan bir ekran: canonical ve og:url verilmez, o yüzden
   ustveri() yerine elle yazılır.

   Alanları susturmak yetmez, `null` yazmak gerekir: yazılmadıklarında kök
   düzenin değerleri devralınıyordu ve her yanlış adres kendini ana sayfanın
   kopyası ilan ediyordu (canonical + og:url ana sayfaya bakıyordu). Aynı
   sığ birleşme yüzünden `openGraph` bloğu burada bütün olarak kurulur. */
export const metadata: Metadata = {
  title: BASLIK,
  description: ACIKLAMA,
  alternates: { canonical: null },
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: klinik.ad,
    title: BASLIK,
    description: ACIKLAMA,
    images: [{
      url: OG_YOL,
      width: OG_OLCU.width,
      height: OG_OLCU.height,
      type: OG_TUR,
      alt: OG_ALT
    }]
  }
};

export default function Bulunamadi() {
  return <BulunamadiIcerik />;
}
