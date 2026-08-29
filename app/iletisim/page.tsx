import type { Metadata } from 'next';

import { klinik } from '@/site.config';
import { KLINIK_KIMLIK, YapisalVeri, sayfaVeri } from '../_ortak/yapisal-veri';
import { ustveri } from '../_ortak/ustveri';
import IletisimIcerik from './iletisim-icerik';

const AD = 'İletişim ve ulaşım';
const ACIKLAMA = `${klinik.adresTam}. Randevu talebi, çalışma saatleri ve ulaşım bilgileri.`;

export const metadata: Metadata = ustveri({
  yol: '/iletisim',
  ad: AD,
  aciklama: ACIKLAMA
});

export default function IletisimSayfasi() {
  return (
    <>
      <YapisalVeri
        veri={sayfaVeri({
          yol: '/iletisim',
          tur: 'ContactPage',
          baslik: metadata.title as string,
          aciklama: ACIKLAMA,
          hakkinda: { '@id': KLINIK_KIMLIK }
        })}
      />
      <IletisimIcerik />
    </>
  );
}
