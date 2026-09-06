import type { Metadata } from 'next';

import { klinik, sayfaBasligi } from '@/site.config';
import { OG_ALT, OG_OLCU, OG_TUR, OG_YOL } from './og-bilgi';

/* ==========================================================================
   SAYFA ÜSTVERİSİ

   Her rotanın `metadata`sı buradan üretilir. Tek yerden geçmesinin üç sebebi
   var, üçü de elle yazıldığında sessizce kaçırılmış şeylerdi:

   1. **Başlık kalıbı.** Kliniğin resmî tam adı arama sonucundaki ~60
      karakterlik alanı tek başına dolduruyor ve asıl bilgiyi — hangi işlem —
      kesiyordu. Kalıp artık `{Sayfa} | {Kısa ad}, {Şehir}`; şehir başlıkta
      duruyor çünkü hasta "izmir implant" diye arıyor.

   2. **`og:url`.** Next bunu canonical'dan türetmez, `openGraph.url`
      yazılmadıkça hiç basılmaz. Yoksa paylaşılan kart hangi adrese ait
      olduğunu söylemez.

   3. **`openGraph` kök düzeni ezer, birleştirmez.** Next üstveriyi *sığ*
      birleştirir: bir sayfa `openGraph` yazdığı anda kökteki bloğun tamamı
      düşer. Elle yazılan sayfalarda `siteName` böyle kayboluyordu; burada
      her seferinde yeniden kurulur.

   4. **`og:image` de o blokla birlikte düşer.** `app/opengraph-image.tsx`in
      ürettiği görsel kök düzenin `openGraph`ına yazılır, yani 3. maddedeki
      ezilmenin içindedir: `/hekimler`, `/iletisim`, `/tedaviler` ve yasal
      sayfalar paylaşıldığında kart görselsiz çıkıyordu. Blok burada kurulduğu
      için görsel de burada, kök rotanın adresiyle geri konur. Kendi
      `opengraph-image` dosyası olan segment `kendiGorseli` ile bunu kapatır —
      açık `images` dosya kuralını ezer ve tedavi sayfaları kendi görselini
      kaybederdi.
   ========================================================================== */

type Secenek = {
  /** Kök göreli adres: '/hekimler'. canonical ve og:url bundan üretilir. */
  yol: string;
  /** Sayfanın kendi adı ('Hekim kadrosu'). Kuyruğu sayfaBasligi() ekler.
      Verilmezse `baslik` olduğu gibi kullanılır — ana sayfa böyle yapar. */
  ad?: string;
  /** Kuyruksuz, hazır başlık. `ad` verildiyse yok sayılır. */
  baslik?: string;
  aciklama: string;
  /** Tedavi ve işlem sayfaları 'article'; ötekiler 'website'. */
  tur?: 'website' | 'article';
  /** Yasal sayfalar dizine girmez ama bağlantıları izlenir. */
  dizinDisi?: boolean;
  /** Segmentin kendi `opengraph-image` dosyası varsa true: görseli Next
      basar, buradan `images` yazılmaz. */
  kendiGorseli?: boolean;
};

export function ustveri({
  yol,
  ad,
  baslik,
  aciklama,
  tur = 'website',
  dizinDisi = false,
  kendiGorseli = false
}: Secenek): Metadata {
  const tamBaslik = ad ? sayfaBasligi(ad) : baslik!;
  return {
    title: tamBaslik,
    description: aciklama,
    alternates: { canonical: yol },
    ...(dizinDisi ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: tur,
      locale: 'tr_TR',
      siteName: klinik.ad,
      url: yol,
      title: tamBaslik,
      description: aciklama,
      ...(kendiGorseli
        ? {}
        : {
            images: [{
              url: OG_YOL,
              width: OG_OLCU.width,
              height: OG_OLCU.height,
              type: OG_TUR,
              alt: OG_ALT
            }]
          })
    }
  };
}
