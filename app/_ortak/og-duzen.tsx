import { ImageResponse } from 'next/og';

import { renk } from './token-renk';

/* Paylaşım görselinin ortak düzeni: zümrüt zemin üzerinde krem madalyon.
   Ana sayfa (`app/opengraph-image.tsx`) yalnız madalyonu basar, tedavi
   sayfaları (`app/tedaviler/[id]/opengraph-image.tsx`) altına dalın adını
   ekler.

   Görselde yazı ya iridir ya da hiç yoktur. Sebebi OKUNUR_PUNTO notunda:
   önizleme küçük gösterildiğinde ince yazı okunmaz, leke bırakır. */

/** Facebook, WhatsApp ve LinkedIn'in beklediği ölçü. */
export const OG_OLCU = { width: 1200, height: 630 };
export const OG_TUR = 'image/png';

/* Kırpmaya dayanıklı olmak zorunda: WhatsApp dar kartta görseli geniş şerit
   olarak değil, ortasından kesilmiş kare küçük resim olarak gösterir. 1200
   pikselin yalnız ortadaki 630'u görünür, iki yandan 285'er piksel gider.
   Bu yüzden düzen ortalanır ve her şey bu karenin içinde kalacak ölçüde
   tutulur; sola yaslanmış başlık kırpılınca yarısı kayboluyordu. */
const GUVENLI_EN = 560;

/* O kare ekranda ~160 piksel çizilir, yani görsel dörtte birine iner. Bir
   yazının okunabilmesi için burada en az ~46 punto olması gerekir; altındaki
   her şey bulanık şeride döner. Görselin ana öğesinin yazı değil şekil olması
   da bundandır: WhatsApp küçük resmi hem küçültüp hem yeniden sıkıştırdığı
   için en çok zarar gören şey harflerin ince kıvrımlarıdır, dolu bir siluet
   ise bu işlemden neredeyse etkilenmez. */
const OKUNUR_PUNTO = 46;

const ZEMIN = renk('--emerald-950');
const ZEMIN_UST = renk('--emerald-900');
const KREM = renk('--sand-50');

/* Diş silueti, 100×100 kutuya çizilmiş tek yol. Vektör olduğu için madalyon
   hangi boyda basılırsa basılsın kenarları nettir. */
const DIS_YOLU =
  'M50 7 C29 7 15 20 15 39 C15 51 19 57 21 67 C23 80 25 94 34 94 C42 94 44 81 47 71 ' +
  'C48 67 52 67 53 71 C56 81 58 94 66 94 C75 94 77 80 79 67 C81 57 85 51 85 39 ' +
  'C85 20 71 7 50 7 Z';

/** Krem daire içinde zümrüt diş. `olcu` dairenin çapıdır. */
function Madalyon({ olcu }: { olcu: number }) {
  return (
    <svg width={olcu} height={olcu} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill={KREM} />
      {/* Diş, dairenin yaklaşık %60'ını kaplar ve ortalanır. */}
      <g transform="translate(20.2 20.2) scale(0.596)">
        <path d={DIS_YOLU} fill={ZEMIN_UST} />
      </g>
    </svg>
  );
}

type Secenek = {
  /** Madalyonun altındaki tek satır. Verilmezse görselde yalnız madalyon olur. */
  baslik?: string;
};

/* Başlık uzadıkça punto kısılır, ama OKUNUR_PUNTO'nun altına inmez: sığmayan
   ad küçültülerek değil, satıra sarılarak yerleşir. */
function puntoAyarla(yazi: string) {
  const uzunluk = yazi.length;
  if (uzunluk <= 9) return 84;
  if (uzunluk <= 13) return 72;
  if (uzunluk <= 20) return 62;
  return OKUNUR_PUNTO;
}

export function ogGorseli({ baslik }: Secenek = {}) {
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
        <Madalyon olcu={baslik ? 300 : 470} />

        {baslik ? (
          <div
            style={{
              display: 'flex',
              maxWidth: GUVENLI_EN,
              marginTop: 44,
              fontSize: puntoAyarla(baslik),
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              fontWeight: 700,
              color: KREM
            }}
          >
            {baslik}
          </div>
        ) : null}
      </div>
    ),
    OG_OLCU
  );
}
