import type { Metadata } from 'next';

import { klinik } from '@/site.config';
import IletisimIcerik from './iletisim-icerik';

export const metadata: Metadata = {
  title: `İletişim ve ulaşım — ${klinik.ad}`,
  description: `${klinik.adresTam}. Randevu talebi, çalışma saatleri ve ulaşım bilgileri.`,
  alternates: { canonical: '/iletisim' }
};

export default function IletisimSayfasi() {
  return <IletisimIcerik />;
}
