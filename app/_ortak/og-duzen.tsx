import { ImageResponse } from 'next/og';

import { AMBLEM_ACIK, AMBLEM_KOYU, Madalyon } from './amblem';
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

/* Madalyonun kendisi app/_ortak/amblem.tsx içindedir: aynı diş sekme ikonunda
   da kullanılır, iki yerde ayrı ayrı çizilmesin. */

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
          background: `linear-gradient(150deg, ${AMBLEM_KOYU} 0%, ${ZEMIN} 100%)`
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
              color: AMBLEM_ACIK
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
