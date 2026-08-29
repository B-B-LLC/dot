import type { Metadata } from 'next';

import { hekimler } from '@/site.config';
import {
  KLINIK_KIMLIK, YapisalVeri, hekimVeri, sayfaVeri
} from '../_ortak/yapisal-veri';
import { ustveri } from '../_ortak/ustveri';
import HekimlerIcerik from './hekimler-icerik';

const uzmanlar = hekimler.filter((hekim) => hekim.akademik !== '—').length;

const AD = 'Hekim kadrosu';

const ACIKLAMA =
  `Poliklinikte görev yapan ${hekimler.length} diş hekimi` +
  (uzmanlar ? `, ${uzmanlar} uzman hekim` : '') +
  '. Mezuniyet ve uzmanlık bilgileri.';

export const metadata: Metadata = ustveri({
  yol: '/hekimler',
  ad: AD,
  aciklama: ACIKLAMA
});

/* Hekimler bağımsız düğüm olarak yazılır; sayfa onlara `mainEntity` ile,
   klinik `employee` ile bağlanır. Klinik burada baştan tarif edilmez: aynı
   `@id` ile yalnız eksik alan eklenir, kök düzendeki kayıtla birleşir. Tür
   yine de yazılır, çünkü türsüz düğüm bazı denetleyicilerde uyarı verir. */
const HEKIM_DUGUMLERI = hekimler.map(hekimVeri);
const KIMLIKLER = HEKIM_DUGUMLERI.map((dugum) => ({ '@id': dugum['@id'] }));

export default function HekimlerSayfasi() {
  return (
    <>
      <YapisalVeri
        veri={sayfaVeri({
          yol: '/hekimler',
          baslik: metadata.title as string,
          aciklama: ACIKLAMA,
          anaVarlik: {
            '@type': 'ItemList',
            itemListElement: KIMLIKLER.map((kimlik, sira) => ({
              '@type': 'ListItem',
              position: sira + 1,
              item: kimlik
            }))
          },
          ekDugumler: [
            ...HEKIM_DUGUMLERI,
            { '@type': 'Dentist', '@id': KLINIK_KIMLIK, employee: KIMLIKLER }
          ]
        })}
      />
      <HekimlerIcerik />
    </>
  );
}
