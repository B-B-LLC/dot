import { ImageResponse } from 'next/og';

import { AMBLEM_ACIK, AMBLEM_KOYU, Dis } from './_ortak/amblem';

/* Sekme ikonu. Dosyanın varlığı yeter: Next <link rel="icon"> etiketlerini
   kendisi basar ve üç ölçüyü de bağlar.

   Paylaşım görselindeki madalyonun tersi kullanılır — orada krem daire içinde
   koyu diş, burada koyu zemin üzerinde krem diş. Sebebi okunurluk: 32 pikselde
   açık zeminli bir simge, tarayıcının açık renkli sekme şeridinde kayboluyor.
   Koyu zemin ikisinde de ayrışır.

   192 ve 512 manifest için gerekir (ana ekrana eklenen kısayol), 32 tarayıcı
   sekmesi içindir. */

export const contentType = 'image/png';

export function generateImageMetadata() {
  return [32, 192, 512].map((olcu) => ({
    id: String(olcu),
    size: { width: olcu, height: olcu },
    contentType: 'image/png'
  }));
}

/* `id`, generateImageMetadata'nın döndürdüğü kalemin kimliğidir ve Next 16'da
   props'a promise olarak geçer. */
export default async function Ikon({ id }: { id: Promise<string | number> }) {
  const olcu = Number(await id);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: AMBLEM_KOYU,
          /* Küçük ölçüde köşe yuvarlaması dişin kendisini yiyecek kadar
             büyümesin diye orana bağlı verilir. */
          borderRadius: Math.round(olcu * 0.22)
        }}
      >
        <Dis olcu={Math.round(olcu * 0.62)} dolgu={AMBLEM_ACIK} />
      </div>
    ),
    { width: olcu, height: olcu }
  );
}
