import type { Metadata } from 'next';

import { islemler, tedaviler, tedavilerSayfasi } from '@/site.config';
import {
  KLINIK_KIMLIK, YapisalVeri, listeVeri, sayfaVeri
} from '../_ortak/yapisal-veri';
import { ustveri } from '../_ortak/ustveri';
import TedavilerIcerik from './tedaviler-icerik';

/* Tüm tedaviler dizini. Menüdeki "Tüm tedaviler" düğmesi buraya gelir ve
   işlem sayfalarının tamamı buradan bağlanır. */

export const metadata: Metadata = ustveri({
  yol: '/tedaviler',
  ad: tedavilerSayfasi.baslik,
  aciklama: tedavilerSayfasi.metaAciklama
});

const BASLIK = metadata.title as string;

export default function TedavilerSayfasi() {
  return (
    <>
      <YapisalVeri
        veri={sayfaVeri({
          yol: '/tedaviler',
          tur: 'CollectionPage',
          baslik: BASLIK,
          aciklama: tedavilerSayfasi.metaAciklama,
          kirintilar: [{ ad: 'Ana sayfa', yol: '/' }, { ad: 'Tedaviler' }],
          hakkinda: { '@id': KLINIK_KIMLIK },
          /* Sayfada görünen sıra: önce altı ana dal, sonra işlemler. Sayfası
             yazılmamış kalemler listede bağlantısız durur, buraya girmez. */
          anaVarlik: listeVeri([
            ...tedaviler.map((tedavi) => ({
              ad: tedavi.ad,
              yol: `/tedaviler/${tedavi.id}`
            })),
            ...islemler.map((islem) => ({
              ad: islem.ad,
              yol: `/tedaviler/${islem.slug}`
            }))
          ])
        })}
      />
      <TedavilerIcerik />
    </>
  );
}
