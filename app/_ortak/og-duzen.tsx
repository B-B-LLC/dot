import { ImageResponse } from 'next/og';

import { klinik } from '@/site.config';
import { renk } from './token-renk';

/* Paylaşım görselinin ortak düzeni.
   Ana sayfa (`app/opengraph-image.tsx`) ve tedavi sayfaları
   (`app/tedaviler/[id]/opengraph-image.tsx`) bu düzeni kullanır; aralarındaki
   tek fark ortadaki büyük yazıdır.

   Tasarım kararları, önizlemenin WhatsApp'ta küçültülerek gösterilmesinden
   doğar: fotoğraf değil düz zemin, tek büyük satır, kenarlarda geniş boşluk.
   Metinlerin tamamı site.config.ts'ten gelir; klinik değişince görsel de
   kendiliğinden değişir. */

/** Facebook, WhatsApp ve LinkedIn'in beklediği ölçü. */
export const OG_OLCU = { width: 1200, height: 630 };
export const OG_TUR = 'image/png';

const ZEMIN = renk('--emerald-950');
const ZEMIN_UST = renk('--emerald-900');
const VURGU = renk('--emerald-300');
const BEYAZ = renk('--text-on-dark');
const BEYAZ_SOLUK = renk('--text-on-dark-muted');

type Secenek = {
  /** Üstteki küçük, harf aralığı açılmış satır. */
  ust: string;
  /** Ortadaki büyük yazı. */
  buyuk: string;
  /** Büyük yazının punto tabanı — uzun başlıklarda küçültülür. */
  punto: number;
  /** Alttaki açıklama satırı. */
  alt: string;
};

/** Uzun başlık kutuyu taşırmasın diye punto karakter sayısına göre kısılır. */
function puntoAyarla(yazi: string, taban: number) {
  const genislik = yazi.length;
  if (genislik <= 12) return taban;
  if (genislik <= 20) return Math.round(taban * 0.72);
  if (genislik <= 30) return Math.round(taban * 0.54);
  return Math.round(taban * 0.44);
}

export function ogGorseli({ ust, buyuk, punto, alt }: Secenek) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          /* Kenarlardan bol boşluk: küçük önizlemede kırpılan yer burasıdır. */
          padding: '0 96px',
          background: `linear-gradient(150deg, ${ZEMIN_UST} 0%, ${ZEMIN} 100%)`
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: '0.16em',
            fontWeight: 700,
            color: VURGU
          }}
        >
          {ust.toLocaleUpperCase('tr-TR')}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 26,
            fontSize: puntoAyarla(buyuk, punto),
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            fontWeight: 800,
            color: BEYAZ
          }}
        >
          {buyuk}
        </div>

        <div style={{ display: 'flex', width: 132, height: 5, marginTop: 40, background: VURGU }} />

        <div
          style={{
            display: 'flex',
            marginTop: 34,
            fontSize: 32,
            lineHeight: 1.3,
            color: BEYAZ_SOLUK
          }}
        >
          {alt}
        </div>
      </div>
    ),
    OG_OLCU
  );
}

/** Alt satır her iki görselde de aynı: kliniğin tam adı ve semti. */
export const OG_ALT_SATIR = `${klinik.ad} · ${klinik.konum}`;
