import type { Metadata } from 'next';

import { klinik } from '@/site.config';
import BulunamadiIcerik from './_ortak/bulunamadi-icerik';

export const metadata: Metadata = {
  title: `Sayfa bulunamadı — ${klinik.ad}`,
  robots: { index: false, follow: true }
};

export default function Bulunamadi() {
  return <BulunamadiIcerik />;
}
