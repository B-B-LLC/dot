import type { Metadata } from 'next';

import { klinik } from '@/site.config';
import { KLINIK_KIMLIK, YapisalVeri, sayfaVeri } from '../_ortak/yapisal-veri';
import IletisimIcerik from './iletisim-icerik';

const BASLIK = `İletişim ve ulaşım — ${klinik.ad}`;
const ACIKLAMA = `${klinik.adresTam}. Randevu talebi, çalışma saatleri ve ulaşım bilgileri.`;

export const metadata: Metadata = {
  title: BASLIK,
  description: ACIKLAMA,
  alternates: { canonical: '/iletisim' }
};

export default function IletisimSayfasi() {
  return (
    <>
      <YapisalVeri
        veri={sayfaVeri({
          yol: '/iletisim',
          tur: 'ContactPage',
          baslik: BASLIK,
          aciklama: ACIKLAMA,
          hakkinda: { '@id': KLINIK_KIMLIK }
        })}
      />
      <IletisimIcerik />
    </>
  );
}
