import { ImageResponse } from 'next/og';

import { klinik } from '@/site.config';
import { renk } from './token-renk';

/* Paylaşım görselinin ortak düzeni.
   Ana sayfa (`app/opengraph-image.tsx`) ve tedavi sayfaları
   (`app/tedaviler/[id]/opengraph-image.tsx`) bu düzeni kullanır; aralarındaki
   tek fark ortadaki büyük yazıdır.

   Tasarım kararları, önizlemenin kırpılarak gösterilmesinden doğar: fotoğraf
   değil düz zemin, tek büyük satır, ortalanmış kompozisyon. Metinlerin tamamı
   site.config.ts'ten gelir; klinik değişince görsel de kendiliğinden değişir. */

/** Facebook, WhatsApp ve LinkedIn'in beklediği ölçü. */
export const OG_OLCU = { width: 1200, height: 630 };
export const OG_TUR = 'image/png';

/* Kırpmaya dayanıklı olmak zorunda: WhatsApp dar kartta görseli geniş şerit
   olarak değil, ortasından kesilmiş kare küçük resim olarak gösterir. 1200
   pikselin yalnız ortadaki 630'u görünür, iki yandan 285'er piksel gider.
   Bu yüzden düzen ortalanır ve yazılar bu karenin içinde kalacak genişlikle
   sınırlanır; sola yaslanmış başlık kırpılınca yarısı kayboluyordu.

   Kareden biraz dar tutulur ki yazı tam kesiğe dayanmasın. */
const GUVENLI_EN = 560;

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

/* Punto karakter sayısına göre kısılır. Ölçüt kutunun taşması değil, GUVENLI_EN
   genişliğine sığmaktır: "İmplantoloji" gibi tek uzun kelime satır sonundan
   bölünemediği için küçülmek zorundadır, "Restoratif diş tedavisi" ise boşluktan
   ikiye ayrılabildiği için daha az kısılır. */
function puntoAyarla(yazi: string, taban: number) {
  const uzunluk = yazi.length;
  if (uzunluk <= 6) return taban;
  if (uzunluk <= 9) return Math.round(taban * 0.85);
  if (uzunluk <= 13) return Math.round(taban * 0.72);
  if (uzunluk <= 16) return Math.round(taban * 0.62);
  if (uzunluk <= 26) return Math.round(taban * 0.55);
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
          alignItems: 'center',
          textAlign: 'center',
          background: `linear-gradient(150deg, ${ZEMIN_UST} 0%, ${ZEMIN} 100%)`
        }}
      >
        <div
          style={{
            display: 'flex',
            maxWidth: GUVENLI_EN,
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
            maxWidth: GUVENLI_EN,
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
            maxWidth: GUVENLI_EN,
            marginTop: 34,
            fontSize: 28,
            lineHeight: 1.35,
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
